import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function LostPetsHistory({ user, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('declarations');

  const declarations = [
    {
      id: 1,
      title: 'Αναζητείται κατοικίδιο',
      views: 156,
      date: '20/11/2024',
      area: 'Παγκράτι',
      species: 'Σκύλος',
      status: 'active',
      description: 'Καλησπέρα, μένουμε στο Παγκράτι και πράσφατα χάσαμε το σκύλο μας. Χρείαζόμαστε άμεσο βοήθεια για τον εντοπισμό του. Πρόκειται για ένα μαύρο γερμανικό ποιμενικό. Ακούει στο όνομα Μαξ, είναι ιδίαίτερα φιλικός και καλά εκπαιδευμένος.'
    },
    {
      id: 2,
      title: 'Αναζητείται κατοικίδιο',
      views: 89,
      date: '15/11/2024',
      area: 'Παγκράτι',
      species: 'Σκύλος',
      status: 'draft',
      description: 'Προσωρινή περιγραφή...'
    }
  ];

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Ιστορικό Δηλώσεων
          </div>

          <div className="tabs">
            <button
              className={activeTab === 'declarations' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('declarations')}
            >
              Οι Δηλώσεις σας
            </button>
            <button
              className={activeTab === 'create' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('create')}
            >
              Δημιουργία Δήλωσης
            </button>
          </div>

          {activeTab === 'declarations' && (
            <div className="declarations-grid">
              {declarations.map(decl => (
                <div key={decl.id} className="declaration-card">
                  <div className="card-header">
                    <h3>{decl.title}</h3>
                    <span className={`status-badge ${decl.status}`}>
                      {decl.status === 'active' ? 'Ενεργή' : 'Πρόχειρο'}
                    </span>
                  </div>
                  <div className="card-info">
                    <p><strong>Προβολές:</strong> {decl.views}</p>
                    <p><strong>Ημ/νία Ανάρτησης:</strong> {decl.date}</p>
                    <p><strong>Περιοχή:</strong> {decl.area}</p>
                    <p><strong>Είδος:</strong> {decl.species}</p>
                  </div>
                  <div className="card-description">
                    <strong>Περιγραφή</strong>
                    <p>{decl.description}</p>
                  </div>
                  <div className="card-actions">
                    {decl.status === 'active' ? (
                      <>
                        <button className="btn-secondary" onClick={() => navigate(`/owner/report-lost/${decl.id}`)}>
                          Επεξεργασία
                        </button>
                        <button className="btn-danger">Διαγραφή Δήλωσης</button>
                      </>
                    ) : (
                      <button className="btn-secondary">Προβολή πλήρους Δήλωσης</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="create-declaration">
              <button
                className="btn-primary"
                onClick={() => navigate('/owner/report-lost')}
              >
                Νέα Δήλωση Απώλειας
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LostPetsHistory;