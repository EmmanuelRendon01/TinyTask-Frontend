import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard'; // Importamos nuestro nuevo componente

function MainContent() {
  // 1. Estados del componente
  const [tasks, setTasks] = useState([]); // Para almacenar la lista de tareas
  const [isLoading, setIsLoading] = useState(true); // Para saber si estamos cargando datos
  const [error, setError] = useState(null); // Para almacenar cualquier error

  // 2. useEffect para hacer la llamada a la API
  useEffect(() => {
    // Función para obtener los datos
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/Task/getTasks');
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta de la red');
        }
        const data = await response.json();
        setTasks(data); // Guardamos los datos en el estado
      } catch (error) {
        setError(error); // Guardamos el error en el estado
      } finally {
        setIsLoading(false); // Dejamos de cargar, ya sea con éxito o con error
      }
    };

    fetchTasks(); // Ejecutamos la función
  }, []); // El array vacío [] significa que este efecto se ejecuta solo una vez, cuando el componente se monta

  // 3. Renderizado condicional basado en los estados
  if (isLoading) {
    return <div className="p-10">Cargando tareas...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">Error al cargar las tareas: {error.message}</div>;
  }

  // 4. Renderizado de la lista de tareas
  return (
    <div className="flex-1 p-10">
      <h2 className="text-3xl font-bold mb-6">Dashboard de Tareas</h2>
      
      {/* Contenedor de la grilla de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default MainContent;