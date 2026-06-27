// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Importaciones de las pantallas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta privada/protegida: Dashboard de Bedelía */}
          <Route path="/dashboard" element={<Dashboard />} /> 
          
          {/* Ruta por defecto: si no coincide con nada, redirige al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;