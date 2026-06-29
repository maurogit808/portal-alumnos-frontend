import React from 'react';

const TablaAlumnos = ({ 
  alumnosFiltrados, 
  loading, 
  error, 
  onVerLegajo, 
  onEditar, 
  onEliminar, 
  styles 
}) => {
  if (loading) return <p style={styles.infoText}>Cargando registros de alumnos...</p>;
  if (error) return <p style={styles.errorText}>{error}</p>;
  if (alumnosFiltrados.length === 0) return <p style={styles.infoText}>No se encontraron alumnos registrados.</p>;

  return (
    <div style={styles.tableResponsive}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thRow}>
            <th style={styles.th}>Alumno</th>
            <th style={styles.th}>DNI</th>
            <th style={{...styles.th, width: '80px'}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnosFiltrados.map((alumno) => {
            const targetId = alumno._id || alumno.id;

            return (
              <tr key={targetId} style={styles.tr}>
                <td style={styles.td}>{alumno.nombre} {alumno.apellido}</td>
                <td style={styles.td}>{alumno.dni}</td>
                <td style={{...styles.td, width: '80px'}}>
                  {/* Botones apilados verticalmente para evitar ensanchar la tabla */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button 
                      onClick={() => onVerLegajo(alumno)} 
                      style={{...styles.actionBtn, padding: '4px 6px', fontSize: '10px'}}
                    >
                      Legajo
                    </button>
                    <button 
                      onClick={() => onEditar(alumno)} 
                      style={{...styles.actionBtn, backgroundColor: '#f59e0b', padding: '4px 6px', fontSize: '10px'}}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => onEliminar(targetId, `${alumno.nombre} ${alumno.apellido}`)} 
                      style={{...styles.deleteBtn, padding: '4px 6px', fontSize: '10px'}}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAlumnos;