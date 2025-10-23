import React from 'react';

// 1. Recibimos la nueva prop 'onEdit'
function TaskCard({ task, onEdit, onDelete }) { 
  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          User ID: {task.user_id}
        </span>
      </div>

      <p className="text-gray-600 mb-4">
        {task.description}
      </p>

      <div className="flex justify-end space-x-2">
        <button 
          onClick={() => onEdit(task)} 
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Editar
        </button>

        <button 
          onClick={() => onDelete(task.id)}
          className="text-sm font-medium text-red-600 hover:text-red-800"
        >
          Eliminar
        </button>
      </div>

    </div>
  );
}

export default TaskCard;