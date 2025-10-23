import React from 'react';
import { RxDashboard } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';


// Recibimos las props "isOpen" y "toggle" desde App.jsx
function Sidebar({ isOpen, toggle }) {
  return (
    // La clase de ancho cambia según el valor de "isOpen"
    <div className={`h-screen ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white flex flex-col transition-all duration-300`}>
      
      <div className="p-5 border-b border-gray-700 flex justify-between items-center">
        {/* El título solo se muestra si "isOpen" es true */}
        <h1 className={`text-2xl font-bold ${!isOpen && 'hidden'}`}>
          Gestor
        </h1>
        {/* Este botón llama a la función "toggle" al hacerle clic */}
        <button onClick={toggle} className="p-2 rounded-full hover:bg-gray-700">
          {/* El icono cambia según el valor de "isOpen" */}
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      <nav className="flex-1 p-5">
        <ul>
          <li>
            {/* 2. Reemplaza <a> por <Link> y href por to */}
            <Link to="/" className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
              <RxDashboard size={24} />
              <span className={`ml-3 ${!isOpen && 'hidden'}`}>Dashboard</span>
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/newTask" className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
              <IoIosAddCircleOutline size={24} />
              <span className={`ml-3 ${!isOpen && 'hidden'}`}>Nueva Tarea</span>
            </Link>
          </li>
          <li className="mt-2">
            <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
              <CiSettings size={24} />
              <span className={`ml-3 ${!isOpen && 'hidden'}`}>Configuración</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;