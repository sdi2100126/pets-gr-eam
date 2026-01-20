import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function ManageAppointments({ user, onLogout }) {

  const appointments = [
    {
      id: 1,
      ownerName: 'ΜΑΡΙΑ Τ.',
      status: 'pending',
      day: 'Δευτέρα',
      time: '18:30'
    },
    {
      id: 2,
      ownerName: 'ΜΑΡΙΑ Τ.',
      status: 'completed',
      day: 'Δευτέρα',
      time: '18:30'
    },
    {
      id: 3,
      ownerName: 'ΜΑΡΙΑ Τ.',
      status: 'cancelled',
      day: 'Δευτέρα',
      time: '18:30'
    }
  ];

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Σε Αναμονή';
      case 'completed': return 'Ολοκληρώθηκε';
      case 'cancelled': return 'Ακυρώθηκε';
      default: return status;
    }
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="vet" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για κτηνιάτρους / Πρόγραμμα
          </div>
          <h1>Πρόγραμμα Ραντεβού</h1>

          <div className="appointments-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {appointments.map(apt => (
              <div 
                key={apt.id} 
                className="appointment-card"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                    Συνάντηση με
                  </h3>
                  <p style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#333' }}>
                    {apt.ownerName}
                  </p>
                </div>

                <div className="card-info" style={{ marginBottom: '20px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>
                      <strong>Κατάσταση</strong>
                    </p>
                    <span 
                      className={`status-badge ${apt.status}`}
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: '500',
                        backgroundColor: 
                          apt.status === 'pending' ? '#fff3cd' :
                          apt.status === 'completed' ? '#d4edda' :
                          apt.status === 'cancelled' ? '#f8d7da' : '#e0e0e0',
                        color:
                          apt.status === 'pending' ? '#856404' :
                          apt.status === 'completed' ? '#155724' :
                          apt.status === 'cancelled' ? '#721c24' : '#333'
                      }}
                    >
                      {getStatusLabel(apt.status)}
                    </span>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>
                      <strong>Μέρα</strong>
                    </p>
                    <p style={{ margin: 0, fontSize: '15px', color: '#333' }}>{apt.day}</p>
                  </div>

                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>
                      <strong>Ώρα</strong>
                    </p>
                    <p style={{ margin: 0, fontSize: '15px', color: '#333' }}>{apt.time}</p>
                  </div>
                </div>

                <div className="card-actions" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <button className="btn-secondary" style={{
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    Προβολή
                  </button>
                  {apt.status === 'pending' && (
                    <>
                      <button className="btn-primary" style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#28a745',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Επιβεβαίωση
                      </button>
                      <button className="btn-danger" style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Ακύρωση
                      </button>
                    </>
                  )}
                  {(apt.status === 'completed' || apt.status === 'cancelled') && (
                    <button className="btn-danger" style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      Διαγραφή
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageAppointments;