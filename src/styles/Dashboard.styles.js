export const styles = {
  dashboardContainer: { 
    fontFamily: 'system-ui, -apple-system, sans-serif', // Tipografía un toque más moderna
    backgroundColor: '#f8fafc', // Gris más limpio y menos apagado (slate-50)
    minHeight: '100vh', 
    margin: 0 
  },
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#1e3a8a', 
    color: 'white', 
    padding: '16px 38px', 
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
    // Hover recomendado en JS o CSS: backgroundColor: '#ef4444', color: 'white'
  },
  mainContent: { 
    padding: '40px 30px', 
    maxWidth: '1280px', 
    margin: '0 auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '30px' 
  },
  metricsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
    gap: '24px' 
  },
  // Base para la tarjeta genérica
  card: { 
    backgroundColor: 'white', 
    padding: '24px', 
    borderRadius: '12px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
    borderLeft: '4px solid #3b82f6', // Borde azul de acento por defecto
    transition: 'transform 0.2s ease'
  },
  metricNumber: { 
    fontSize: '36px', 
    fontWeight: '800', 
    color: '#1e3a8a', 
    margin: '8px 0 0 0',
    letterSpacing: '-0.05em'
  },
  sectionCard: { 
    backgroundColor: 'white', 
    padding: '30px', 
    borderRadius: '12px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)' 
  },
  sectionHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexWrap: 'wrap', 
    gap: '20px', 
    marginBottom: '24px' 
  },
  searchInput: { 
    padding: '10px 16px', 
    borderRadius: '8px', 
    border: '1px solid #cbd5e1', 
    width: '100%', 
    maxWidth: '320px', 
    fontSize: '14px', 
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: '#f8fafc'
    // Focus recomendado: border: '1px solid #3b82f6', backgroundColor: '#fff', boxShadow: '0 0 0 3px rgba(59,130,246,0.1)'
  },
  addBtn: { 
    backgroundColor: '#10b981', 
    color: 'white', 
    border: 'none', 
    padding: '10px 18px', 
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
  },
  cancelBtn: { 
    backgroundColor: '#6b7280', 
    color: 'white', 
    border: 'none', 
    padding: '10px 18px', 
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s ease'
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
    fontSize: '15px',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.2)'
  },
  // Botón "Eliminar" de la tabla
  deleteBtn: { 
    backgroundColor: '#ef4444', 
    color: 'white', 
    border: 'none', 
    padding: '6px 14px', 
    borderRadius: '6px', 
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'background-color 0.2s ease'
  },
  // Botón "Ver Legajo" de la tabla
  actionBtn: { 
    backgroundColor: '#2563eb', // Un azul más refinado e intenso
    color: 'white', 
    border: 'none', 
    padding: '6px 14px', 
    borderRadius: '6px', 
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'background-color 0.2s ease'
  },
  // Botón "Editar" de la tabla (si mantuviste estilos en línea en el componente, este sirve de guía)
  editBtn: {
    backgroundColor: '#f59e0b', // Ámbar moderno en vez de naranja chillón
    color: 'white',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'background-color 0.2s ease'
  },
  formGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
    gap: '20px', 
    marginTop: '20px' 
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
    transition: 'all 0.2s ease'
  },
  tableResponsive: { 
    width: '100%', 
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  table: { 
    width: '100%', 
    borderCollapse: 'collapse', 
    textAlign: 'left' 
  },
  thRow: { 
    backgroundColor: '#f8fafc' 
  },
  th: { 
    padding: '14px 18px', 
    borderBottom: '2px solid #e2e8f0', 
    color: '#475569', 
    fontWeight: '600',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  td: { 
    padding: '16px 18px', // Le damos un poquito más de aire vertical a las filas
    borderBottom: '1px solid #e2e8f0', 
    color: '#334155',
    fontSize: '14px',
    verticalAlign: 'middle'
  },
  infoText: { 
    color: '#64748b', 
    textAlign: 'center', 
    padding: '30px',
    fontSize: '15px' 
  },
  errorText: { 
    color: '#ef4444', 
    textAlign: 'center', 
    padding: '30px',
    fontSize: '15px' 
  },
  errorAlert: { 
    gridColumn: '1 / -1', 
    backgroundColor: '#fee2e2', 
    color: '#991b1b', 
    padding: '12px', 
    borderRadius: '6px', 
    textAlign: 'center', 
    border: '1px solid #fca5a5', 
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '14px'
  }
};