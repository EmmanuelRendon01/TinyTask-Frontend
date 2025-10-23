import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para redirigir al usuario

function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Inicializa el hook

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene que el formulario recargue la página

    const newTask = { 
      title, 
      description
    };

    try {
      // Reemplaza la URL con el endpoint POST de tu API
      const response = await fetch('https://tinytask-16id.onrender.com/api/Task/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      // Si todo va bien, redirige al usuario al dashboard
      navigate('/');

    } catch (error) {
      console.error("No se pudo crear la tarea:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Crear Tarea
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTaskPage;