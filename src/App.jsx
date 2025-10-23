import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // 1. Importa Routes y Route
import Sidebar from './components/SideBar';
import MainContent from './components/MainContent';
import NewTask from './pages/NewTask'; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      
      {/* 2. El contenido principal ahora es manejado por Routes */}
      <div className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/newTask" element={<NewTask />} /> {/* Descomenta esta línea */}
        </Routes>
      </div>
    </div>
  );
}

export default App;