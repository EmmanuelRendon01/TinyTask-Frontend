import React, { useEffect } from 'react';

// Recibe 3 props:
// message: El texto a mostrar.
// type: 'success' (verde) o 'error' (rojo) para cambiar el color.
// onClose: Función para cerrar la notificación (en caso de que queramos añadir un botón de cerrar).
function Notification({ message, type, onClose }) {

  // 1. useEffect para hacer que la notificación desaparezca sola
  useEffect(() => {
    // Configura un temporizador para llamar a onClose después de 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3000 milisegundos = 3 segundos

    // 2. Función de limpieza: si el componente se desmonta antes de los 3s, cancelamos el temporizador.
    return () => clearTimeout(timer);
  }, [message, onClose]); // Se re-ejecuta si el mensaje cambia

  // 3. Clases base para la notificación
  const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white transition-opacity duration-300";

  // 4. Clases de color condicionales
  const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      {message}
    </div>
  );
}

export default Notification;