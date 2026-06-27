import React from 'react';

const Legajo = ({
  vistaLegajo,
  onVolver,
  loadingLegajo,
  promedioGeneral,
  notaError,
  nuevaNota,
  onNotaChange,
  onNotaSubmit,
  notaLoading,
  materiasDisponibles,
  boletin,
  styles
}) => {
  return (
    <div style={styles.sectionCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e3a8a' }}>Legajo: {vistaLegajo.apellido}, {vistaLegajo.nombre}</h2>
          <p style={{ margin: '5px 0 0 0', color: '#4b5563' }}>DNI: {vistaLegajo.dni} | Curso: {vistaLegajo.curso || 'N/C'}</p>
        </div>
        <button onClick={onVolver} style={styles.cancelBtn}>← Volver al Listado</button>
      </div>

      {loadingLegajo ? (
        <p style={styles.infoText}>Cargando boletín analítico...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Cuadro de Promedio Destacado */}
          <div style={{ backgroundColor: '#eff6ff', padding: '15px 20px', borderRadius: '6px', borderLeft: '5px solid #3b82f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, color: '#1e40af' }}>Promedio General Académico:</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>
              {typeof promedioGeneral === 'number' ? promedioGeneral.toFixed(2) : promedioGeneral}
            </span>
          </div>

          {/* Formulario para Asentar Calificaciones */}
          <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#374151' }}>Asentar Nueva Calificación en Acta</h4>
            <form onSubmit={onNotaSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
              {notaError && <div style={{ ...styles.errorAlert, width: '100%', marginBottom: '10px' }}>{notaError}</div>}
              
              <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={styles.label}>Seleccionar Materia</label>
                <select 
                  value={nuevaNota.materiaId} 
                  onChange={(e) => onNotaChange({ ...nuevaNota, materiaId: e.target.value })}
                  style={styles.input}
                  required
                >
                  <option value="">-- Elija una materia --</option>
                  {materiasDisponibles.map(mat => {
                    const materiaIdSeguro = mat._id || mat.id;
                    return (
                      <option key={materiaIdSeguro} value={materiaIdSeguro}>
                        {mat.nombre} {mat.codigo ? `(${mat.codigo})` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div style={{ width: '120px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={styles.label}>Instancia</label>
                <select 
                  value={nuevaNota.tipo} 
                  onChange={(e) => onNotaChange({ ...nuevaNota, tipo: e.target.value })}
                  style={styles.input}
                >
                  <option value="Parcial">Parcial</option>
                  <option value="Final">Final</option>
                  <option value="Recuperatorio">Recuperatorio</option>
                </select>
              </div>

              <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={styles.label}>Nota (1-10)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  step="1"
                  value={nuevaNota.valor} 
                  onChange={(e) => onNotaChange({ ...nuevaNota, valor: e.target.value })}
                  style={styles.input} 
                  placeholder="10"
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={notaLoading} 
                style={{ 
                  ...styles.addBtn, 
                  height: '38px', 
                  backgroundColor: '#1e3a8a',
                  opacity: notaLoading ? 0.6 : 1,
                  cursor: notaLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {notaLoading ? 'Procesando...' : 'Asentar Nota'}
              </button>
            </form>
          </div>

          {/* Tabla de Calificaciones */}
          <div>
            <h4 style={{ margin: '0 0 15px 0', color: '#374151' }}>Historial del Boletín</h4>
            <div style={styles.tableResponsive}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thRow}>
                    <th style={styles.th}>Materia</th>
                    <th style={styles.th}>Instancia</th>
                    <th style={styles.th}>Calificación</th>
                    <th style={styles.th}>Fecha de Carga</th>
                  </tr>
                </thead>
                <tbody>
                  {boletin.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ ...styles.infoText, textAlign: 'center', padding: '30px', color: '#6b7280', backgroundColor: '#f9fafb', fontStyle: 'italic' }}>
                        Este alumno aún no registra calificaciones asentadas en bedelía.
                      </td>
                    </tr>
                  ) : (
                    [...boletin].reverse().map((item, idx) => {
                      const notaIdSeguro = item._id || item.id || idx;
                      return (
                        <tr key={notaIdSeguro} style={styles.tr}>
                          <td style={styles.td}>
                            {item.materiaId?.nombre || 
                             (typeof item.materiaId === 'object' ? item.materiaId.nombre : item.materiaId) || 
                             'Materia Asignada'}
                          </td>
                          <td style={styles.td}>{item.tipo || 'Parcial'}</td>
                          <td style={{ ...styles.td, fontWeight: 'bold', color: item.valor >= 4 ? '#10b981' : '#ef4444' }}>
                            {item.valor}
                          </td>
                          <td style={styles.td}>
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('es-AR') : 'Reciente'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Legajo;