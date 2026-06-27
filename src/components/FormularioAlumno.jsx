import React from 'react';

const FormularioAlumno = ({ 
  nuevoAlumno, 
  onChange, 
  onSubmit, 
  formError, 
  formLoading, 
  styles,
  esEdicion = false // Nueva prop con valor por defecto false
}) => {
  return (
    <form onSubmit={onSubmit} style={styles.formGrid}>
      {formError && <div style={styles.errorAlert}>{formError}</div>}
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>Legajo</label>
        <input 
          type="text" 
          name="legajo" 
          value={nuevoAlumno.legajo} 
          onChange={onChange} 
          required 
          disabled={esEdicion} // Si editamos, bloqueamos el legajo
          style={{...styles.input, backgroundColor: esEdicion ? '#e5e7eb' : 'white'}} 
          placeholder="2026A001" 
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Nombre</label>
        <input type="text" name="nombre" value={nuevoAlumno.nombre} onChange={onChange} required style={styles.input} placeholder="Sofía" />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Apellido</label>
        <input type="text" name="apellido" value={nuevoAlumno.apellido} onChange={onChange} required style={styles.input} placeholder="Martínez" />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>DNI</label>
        <input type="number" name="dni" value={nuevoAlumno.dni} onChange={onChange} required style={styles.input} placeholder="44111222" />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Email</label>
        <input type="email" name="email" value={nuevoAlumno.email} onChange={onChange} required style={styles.input} placeholder="sofia@example.com" />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Fecha de Nacimiento</label>
        <input type="date" name="fechaNacimiento" value={nuevoAlumno.fechaNacimiento} onChange={onChange} required style={styles.input} />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Curso</label>
        <input type="text" name="curso" value={nuevoAlumno.curso} onChange={onChange} required style={styles.input} placeholder="1A" />
      </div>

      <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
        <button type="submit" disabled={formLoading} style={styles.saveBtn}>
          {formLoading 
            ? 'Guardando cambios...' 
            : esEdicion ? 'Actualizar Alumno' : 'Guardar Alumno en Base de Datos'
          }
        </button>
      </div>
    </form>
  );
};

export default FormularioAlumno;