export const styles = {
  dashboardContainer: { 
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh', 
    margin: 0 
  },
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#1e3a8a', 
    color: 'white', 
    padding: '16px 20px', // Ajustado para móviles
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
  },
  logo: { 
    margin: 0, 
    fontSize: '20px', 
    fontWeight: '700', 
    letterSpacing: '-0.025em' 
  },
  logoutBtn: { 
    backgroundColor: 'transparent', 
    color: '#fca5a5', 
    border: '1px solid #ef4444', 
    padding: '8px 16px', 
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s ease-in-out'
  },
  mainContent: { 
    padding: '20px 15px', // Más aire en pantallas pequeñas
    maxWidth: '1280px', 
    margin: '0 auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px' 
  },
  metricsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
    gap: '24px' 
  },
  card: { 
    backgroundColor: 'white', 
    padding: '24px', 
    borderRadius: '12px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
    borderLeft: '4px solid #3b82f6',
    transition: 'transform 0.2s ease'
  },
  metricNumber: { 
    fontSize: '36px', 
    fontWeight: '800', 
    color: '#1e3a8a', 
    margin: '8px 0 0 0',
    letterSpacing: '-0.05em'
  },
  // Tarjetas de secciones (el fondo blanco que contiene todo)
  sectionCard: { 
    backgroundColor: 'white', 
    padding: '15px', // Reducido de 30px a 15px para ganar espacio
    borderRadius: '12px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
    width: '100%',
    boxSizing: 'border-box' // Asegura que el padding no desborde
  },
  sectionHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexWrap: 'wrap', 
    gap: '15px', 
    marginBottom: '20px' 
  },
  searchInput: { 
    padding: '10px 16px', 
    borderRadius: '8px', 
    border: '1px solid #cbd5e1', 
    width: '100%', 
    maxWidth: '320px', 
    fontSize: '14px', 
    outline: 'none',
    backgroundColor: '#f8fafc',
    boxSizing: 'border-box' // Asegura que no se desborde
  },
  addBtn: { 
    backgroundColor: '#10b981', 
    color: 'white', 
    border: 'none', 
    padding: '8px 12px', // Botón más compacto
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontWeight: '600',
    fontSize: '13px',
    width: 'auto', // Deja que el texto decida el ancho
    display: 'inline-flex'
  },
  saveBtn: { 
    backgroundColor: '#1e3a8a', 
    color: 'white', 
    border: 'none', 
    padding: '14px 24px', 
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontWeight: '600', 
    width: '100%',
    fontSize: '15px'
  },
 formGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1fr', // Forzamos 1 sola columna SIEMPRE en móviles
    gap: '12px', 
    marginTop: '20px',
    width: '100%',
    boxSizing: 'border-box' // Importante para que el grid no se salga
  },
  inputGroup: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '6px' 
  },
  label: { 
    fontSize: '13px', 
    fontWeight: '600', 
    color: '#475569' 
  },
  input: { 
    padding: '10px 14px', 
    borderRadius: '6px', 
    border: '1px solid #cbd5e1', 
    fontSize: '14px', 
    outline: 'none', 
    backgroundColor: 'white',
    width: '100%', 
    boxSizing: 'border-box' // CRUCIAL para responsive
  },
 // Asegura que el contenedor de la tabla sea el límite absoluto
  tableResponsive: { 
    width: '100%',
    maxWidth: '100%', // No permite que se pase del ancho del dispositivo
    overflowX: 'auto', // Permite el scroll solo si es estrictamente necesario
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    display: 'block' // Asegura el comportamiento de bloque
  },
  table: { 
    width: '100%', 
    borderCollapse: 'collapse', 
    tableLayout: 'fixed', // ESTO ES LA CLAVE
    wordWrap: 'break-word' // Si el texto es largo, se corta en lugar de ensanchar
  },
  td: { 
    padding: '12px 10px', // Ajustado para ahorrar espacio
    borderBottom: '1px solid #e2e8f0', 
    color: '#334155',
    fontSize: '13px'
  }
};