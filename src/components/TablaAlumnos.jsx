import React from 'react';

const TablaAlumnos = ({ 
  alumnosFiltrados, 
  loading, 
  error, 
  onVerLegajo, 
  onEditar, // ◄ Agregamos esta prop
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
            <th style={styles.th}>Nombre y Apellido</th>
            <th style={styles.th}>DNI</th>
            <th style={styles.th}>Curso</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnosFiltrados.map((alumno) => {
            const targetId = alumno._id || alumno.id;

            return (
              <tr key={targetId} style={styles.tr}>
                <td style={styles.td}>{alumno.nombre} {alumno.apellido}</td>
                <td style={styles.td}>{alumno.dni}</td>
                <td style={styles.td}>{alumno.curso || 'N/C'}</td>
                <td style={styles.td}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => onVerLegajo(alumno)} style={styles.actionBtn}>
                      Ver Legajo
                    </button>
                    {/* ◄ NUEVO BOTÓN DE EDITAR */}
                    <button 
                      onClick={() => onEditar(alumno)} 
                      style={{...styles.actionBtn, backgroundColor: '#f59e0b'}}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => onEliminar(targetId, `${alumno.nombre} ${alumno.apellido}`)} 
                      style={styles.deleteBtn}
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