import React, { useState, useEffect } from 'react';

function EditTaskForm({ taskToEdit, onClose, onTaskUpdated }) {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });


  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
      });
    }
  }, [taskToEdit]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...taskToEdit,
      ...formData,
    };

    try {
      const response = await fetch(`https://tinytask-16id.onrender.com/api/Task/update/${taskToEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }

      const result = await response.json();
      
      onTaskUpdated(result);
      onClose(); // Cerramos el modal

    } catch (error) {
      console.error("No se pudo actualizar la tarea:", error);
    }
  };

  if (!taskToEdit) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Editar Tarea</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32"
          required
        />
      </div>
      <div className="flex items-center justify-end space-x-2">
        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;