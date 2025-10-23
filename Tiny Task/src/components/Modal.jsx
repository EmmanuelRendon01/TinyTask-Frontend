import React from 'react';

// Recibe 3 props:
// 1. isOpen: Un booleano para saber si debe mostrarse o no.
// 2. onClose: Una función que se ejecutará para cerrar el modal.
// 3. children: El contenido que se mostrará DENTRO del modal.
function Modal({ isOpen, onClose, children }) {
  // Si isOpen es falso, no renderizamos nada.
  if (!isOpen) return null;

  return (
    // Contenedor principal del modal (el fondo oscuro)
    // - fixed: Posición fija relativa a la ventana del navegador.
    // - inset-0: Cubre toda la pantalla (top-0, right-0, bottom-0, left-0).
    // - bg-black/50: Fondo negro con 50% de opacidad.
    // - flex items-center justify-center: Centra el contenido (la caja del modal).
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Cierra el modal si se hace clic en el fondo
    >
      {/* La caja blanca del modal */}
      {/* - bg-white: Fondo blanco.
          - p-8: Padding grande.
          - rounded-lg: Bordes redondeados.
          - shadow-xl: Sombra pronunciada.
          - max-w-md: Ancho máximo para que no sea demasiado grande en pantallas anchas.
          - w-full: Ocupa todo el ancho disponible en pantallas pequeñas.
      */}
      <div 
        className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // ¡MUY IMPORTANTE!
      >
        {/* Contenedor para el botón de cerrar */}
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            {/* Usamos un HTML entity para el ícono de 'X' */}
            &times; 
          </button>
        </div>
        
        {/* Aquí es donde se renderizará el contenido que pasemos al modal */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;