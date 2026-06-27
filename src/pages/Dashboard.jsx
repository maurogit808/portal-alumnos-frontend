import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/Api';
import { styles } from '../styles/Dashboard.styles';

// Importación de los nuevos componentes hijos
import FormularioAlumno from '../components/FormularioAlumno';
import TablaAlumnos from '../components/TablaAlumnos';
import Legajo from '../components/Legajo';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para el Formulario de Alumno (Alta y Edición)
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoAlumnoId, setEditandoAlumnoId] = useState(null); 
  const [nuevoAlumno, setNuevoAlumno] = useState({
    legajo: '', nombre: '', apellido: '', dni: '', email: '', fechaNacimiento: '', curso: ''
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Gestión de Legajos, Notas y Materias
  const [vistaLegajo, setVistaLegajo] = useState(null); 
  const [boletin, setBoletin] = useState([]);
  const [promedioGeneral, setPromedioGeneral] = useState(0);
  const [materiasDisponibles, setMateriasDisponibles] = useState([]);
  const [loadingLegajo, setLoadingLegajo] = useState(false);

  // Estado para el formulario de carga de Notas
  const [nuevaNota, setNuevaNota] = useState({ materiaId: '', valor: '', tipo: 'Parcial' });
  const [notaError, setNotaError] = useState('');
  const [notaLoading, setNotaLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const obtenerAlumnos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/alumnos'); 
      const datosAlumnos = Array.isArray(response.data) ? response.data : response.data.alumnos || [];
      setAlumnos(datosAlumnos);
    } catch (err) {
      setError('No se pudieron cargar los alumnos de bedelía.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const obtenerMateriasDisponibles = async () => {
    try {
      const response = await api.get('/materias');
      const datosMaterias = Array.isArray(response.data) ? response.data : response.data.materias || [];
     // console.log("📚 MATERIAS TRAÍDAS CON ÉXITO:", datosMaterias); //
      setMateriasDisponibles(datosMaterias);
    } catch (err) {
      console.error('Error al traer materias globales:', err);
    }
  };

  useEffect(() => {
    if (user) {
      obtenerAlumnos();
      obtenerMateriasDisponibles();
    }
  }, [user]);

 const handleVerLegajo = async (alumno) => {
    setVistaLegajo(alumno);
    setLoadingLegajo(true);
    setNotaError('');
    try {
      const targetId = alumno._id || alumno.id;
      
      // 1. Traemos el boletín tradicional
      const resBoletin = await api.get(`/alumnos/${targetId}/boletin`);
      
      // 2. Traemos todas las materias para extraer las notas embebidas
      const resMaterias = await api.get(`/materias`);
      const todasLasMaterias = resMaterias.data;
      
      // 3. Extraemos notas embebidas de materias donde el alumno participa
      const notasEmbebidas = todasLasMaterias.reduce((acc, materia) => {
        const notasDelAlumno = (materia.notas || []).filter(n => n.alumno === targetId);
        return [...acc, ...notasDelAlumno.map(n => ({
          ...n,
          materiaId: { _id: materia._id, nombre: materia.nombre }
        }))];
      }, []);

      const datosBoletin = Array.isArray(resBoletin.data) ? resBoletin.data : resBoletin.data.boletin || [];
      
      // 4. Combinamos y FILTRAMOS duplicados usando un Map por ID
      const boletinCombinado = [...datosBoletin, ...notasEmbebidas];
      const boletinSinDuplicados = Array.from(
        new Map(boletinCombinado.map(n => [n._id || n.id, n])).values()
      );

      setBoletin(boletinSinDuplicados);

      // 5. Obtenemos promedio
      const resPromedio = await api.get(`/alumnos/${targetId}/promedio`);
      setPromedioGeneral(resPromedio.data?.promedio || resPromedio.data?.promedioGeneral || 0);
      
    } catch (err) {
      console.error('Error al cargar datos del legajo:', err);
      setNotaError('No se pudieron cargar los datos del legajo.');
    } finally {
      setLoadingLegajo(false);
    }
  };
  // ======================================================
  // SUBMIT NOTA ACTUALIZADO Y VALIDADO DEFINITIVAMENTE
  // ======================================================
  const handleSubmitNota = async (e) => {
    e.preventDefault();
    
    // 1. Validaciones básicas de campos vacíos
    if (!nuevaNota.materiaId || !nuevaNota.valor) {
      setNotaError('Por favor, completa todos los campos.');
      return;
    }

    const valorNum = Number(nuevaNota.valor);

    // 2. Validación estricta del rango numérico (1 a 10) y tipo entero
    if (isNaN(valorNum) || valorNum < 1 || valorNum > 10 || !Number.isInteger(valorNum)) {
      setNotaError('La calificación debe ser un número entero entre 1 y 10.');
      return;
    }

    // Si pasa el filtro, limpiamos errores previos y disparamos el loading
    setNotaError('');
    setNotaLoading(true);

    const targetId = vistaLegajo._id || vistaLegajo.id;

    try {
      // Intento 1: Guardado embebido en el documento Materia
      await api.post(`/materias/${nuevaNota.materiaId}/notas`, {
        alumno: targetId,
        valor: valorNum,
        descripcion: nuevaNota.tipo
      });
      
      // Reseteo exitoso del formulario
      setNuevaNota({ materiaId: '', valor: '', tipo: 'Parcial' });
      await handleVerLegajo(vistaLegajo);

    } catch (err) {
      console.warn('Fallo el intento 1 en /materias, ejecutando fallback en /notas...');
      
      try {
        // Intento 2 (Fallback): Colección suelta de Notas
        await api.post('/notas', {
          alumno: targetId,
          materia: nuevaNota.materiaId,
          valor: valorNum,
          descripcion: nuevaNota.tipo
        });
        
        setNuevaNota({ materiaId: '', valor: '', tipo: 'Parcial' });
        await handleVerLegajo(vistaLegajo);

      } catch (err2) {
        console.error('Ambos intentos de guardado fallaron:', err2);
        setNotaError(err2.response?.data?.message || err2.response?.data?.error || 'Error al asentar la calificación.');
      }
    } finally {
      // Se libera el botón de forma segura al finalizar todo el circuito
      setNotaLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNuevoAlumno({ ...nuevoAlumno, [e.target.name]: e.target.value });
  };

  const handleEditarClick = (alumno) => {
    const fechaFormateada = alumno.fechaNacimiento ? alumno.fechaNacimiento.split('T')[0] : '';
    
    setNuevoAlumno({
      legajo: alumno.legajo || '',
      nombre: alumno.nombre || '',
      apellido: alumno.apellido || '',
      dni: alumno.dni || '',
      email: alumno.email || '',
      fechaNacimiento: fechaFormateada,
      curso: alumno.curso || ''
    });
    setEditandoAlumnoId(alumno._id || alumno.id);
    setMostrarForm(true);
    setFormError('');
  };

  const handleCancelarFormulario = () => {
    setMostrarForm(false);
    setEditandoAlumnoId(null);
    setNuevoAlumno({ legajo: '', nombre: '', apellido: '', dni: '', email: '', fechaNacimiento: '', curso: '' });
    setFormError('');
  };

  const handleSubmitAlumno = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      if (editandoAlumnoId) {
        await api.put(`/alumnos/${editandoAlumnoId}`, nuevoAlumno);
        setEditandoAlumnoId(null);
      } else {
        await api.post('/alumnos', nuevoAlumno);
      }
      
      setNuevoAlumno({ legajo: '', nombre: '', apellido: '', dni: '', email: '', fechaNacimiento: '', curso: '' });
      setMostrarForm(false);
      obtenerAlumnos(); 
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al procesar los datos del alumno.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEliminarAlumno = async (id, nombreCompleto) => {
    if (!id) {
      alert('Error: El alumno no tiene un ID válido asociado.');
      return;
    }
    
    if (window.confirm(`¿Estás seguro de que querés eliminar a ${nombreCompleto}?`)) {
      try {
        await api.delete(`/alumnos/${id}`);
        setAlumnos(alumnos.filter(al => (al.id || al._id) !== id));
        if (vistaLegajo?.id === id || vistaLegajo?._id === id) setVistaLegajo(null);
      } catch (err) {
        console.error(err);
        alert('No se pudo eliminar el alumno. Revisá la conexión o los permisos del backend.');
      }
    }
  };

  const alumnosFiltrados = alumnos.filter((alumno) =>
    alumno.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    alumno.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
    alumno.dni?.toString().includes(busqueda)
  );

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.navbar}>
        <h2 style={styles.logo}>UTN Bedelía Panel</h2>
        <button onClick={logout} style={styles.logoutBtn}>Cerrar Sesión</button>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.metricsGrid}>
          <div style={styles.card}>
            <h3>Total Alumnos</h3>
            <p style={styles.metricNumber}>{alumnos.length}</p>
          </div>
          <div style={styles.card}>
            <h3>Módulos Activos</h3>
            <p style={styles.metricNumber}>Bedelía</p>
          </div>
        </div>

        {!vistaLegajo ? (
          <>
            <div style={styles.sectionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>
                  {editandoAlumnoId ? 'Editando Alumno Oficial' : 'Gestión de Matrículas'}
                </h3>
                <button 
                  onClick={mostrarForm ? handleCancelarFormulario : () => setMostrarForm(true)} 
                  style={mostrarForm ? styles.cancelBtn : styles.addBtn}
                >
                  {mostrarForm ? 'Cancelar' : '＋ Registrar Alumno'}
                </button>
              </div>

              {mostrarForm && (
                <FormularioAlumno 
                  nuevoAlumno={nuevoAlumno}
                  onChange={handleInputChange}
                  onSubmit={handleSubmitAlumno}
                  formError={formError}
                  formLoading={formLoading}
                  styles={styles}
                  esEdicion={!!editandoAlumnoId}
                />
              )}
            </div>

            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h3 style={{ margin: 0 }}>Listado Oficial de Alumnos</h3>
                <input
                  type="text"
                  placeholder="Buscar por nombre, apellido o DNI..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

              <TablaAlumnos 
                alumnosFiltrados={alumnosFiltrados}
                loading={loading}
                error={error}
                onVerLegajo={handleVerLegajo}
                onEditar={handleEditarClick}
                onEliminar={handleEliminarAlumno}
                styles={styles}
              />
            </div>
          </>
        ) : (
          <Legajo 
            vistaLegajo={vistaLegajo}
            onVolver={() => setVistaLegajo(null)}
            loadingLegajo={loadingLegajo}
            promedioGeneral={promedioGeneral}
            notaError={notaError}
            nuevaNota={nuevaNota}
            onNotaChange={setNuevaNota}
            onNotaSubmit={handleSubmitNota}
            notaLoading={notaLoading}
            materiasDisponibles={materiasDisponibles}
            boletin={boletin}
            styles={styles}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;