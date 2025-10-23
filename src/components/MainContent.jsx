import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import Modal from './Modal';
import EditTaskForm from './EditTaskForm';
import Notification from './Notification';

function MainContent() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para saber si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para guardar la tarea que estamos editando
  const [editingTask, setEditingTask] = useState(null); 
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  
  useEffect(() => {
    // ... (la función fetchTasks se queda exactamente igual que antes)
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/Task/getTasks');
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta de la red');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // --- NUEVAS FUNCIONES PARA MANEJAR EL MODAL ---
  // Función para abrir el modal
  const handleOpenEditModal = (task) => {
    setEditingTask(task); // Guarda la tarea seleccionada
    setIsModalOpen(true); // Abre el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setEditingTask(null); // Limpia la tarea seleccionada
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/Task/delete/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }

      // 4. Actualiza el estado para quitar la tarea de la UI al instante
      setTasks(tasks.filter(task => task.id !== taskId));
      
      // 5. Muestra la notificación de éxito
      setNotification({ message: 'Tarea eliminada con éxito', type: 'success', show: true });

    } catch (error) {
      console.error("No se pudo eliminar la tarea:", error);
      // Muestra la notificación de error
      setNotification({ message: 'Error al eliminar la tarea', type: 'error', show: true });
    }
  };

  if (isLoading) return <div className="p-10">Cargando tareas...</div>;
  if (error) return <div className="p-10 text-red-500">Error al cargar las tareas: {error.message}</div>;

  return (
    <div className="flex-1 p-10">
      <h2 className="text-3xl font-bold mb-6">Dashboard de Tareas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          // Pasamos la función para abrir el modal a cada tarjeta
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask} 
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* 3. Reemplaza el contenido del modal con el formulario */}
        <EditTaskForm 
          taskToEdit={editingTask}
          onClose={handleCloseModal}
          onTaskUpdated={handleTaskUpdated}
        />
      </Modal>

      {notification.show && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
    </div>
  );
}

export default MainContent;