// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados para controlar los inputs y los errores
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Llamamos a la función global del contexto
      await login(email, password);
      
      // Si sale todo bien, lo mandamos al Dashboard/Home del portal
      navigate('/dashboard');
    } catch (err) {
      // Si el backend tira error (ej: 401 o 400), lo capturamos acá
      const mensajeError = err.response?.data?.message || 'Error al iniciar sesión. Intente nuevamente.';
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Portal Alumnos UTN</h2>
        <p style={styles.subtitle}>Iniciá sesión para gestionar bedelía</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@utn.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Estilos básicos en línea y responsivos para zafar rápido y prolijo
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px', // Asegura que en pantallas grandes no se estire y en 320px se adapte
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    margin: '0 0 10px 0',
    color: '#1f2937',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    margin: '0 0 25px 0',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4b5563',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  errorAlert: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
    border: '1px solid #fca5a5',
  },
};

export default Login;