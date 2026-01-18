import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function PetHealthBook({ user, onLogout }) {

  const ownerData = {
    firstName: 'Μαρία',
    lastName: 'Παπαλάμπρου',
    landline: '210 7743209',
    phone: '694 0844581',
    email: 'mariap@gmail.com',
    afm: '176804234',
    amka: '10048077',
    doy: 'ΑΓΙΑΣ ΠΑΡΑΣΚΕΥΗΣ',
    idNumber: 'ΑΜ 123445',
    birthDate: '10/04/1980',
    address: 'Σολωμού 5, Αγία Παρασκευή',
    postalCode: '153 41'
  };

  const petData = {
    name: 'ΜΑΧ',
    species: 'Σκύλος',
    color: 'Μαύρο',
    chip: '12131',
    birthDate: '10/03/2020',
    vaccinated: 'ΝΑΙ',
    deworming: 'Εσωτερικές, Εξωτερικές',
    surgeries: 'Στείρωση',
    chronicConditions: '',
    comments: ''
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Προβολή Βιβλιάριου
          </div>

          <div className="health-book-container">
            <h1>Βιβλιάριο Κατοικιδίου</h1>

            <div className="info-section">
              <h2>Στοιχεία Ιδιοκτήτη</h2>
              <div className="info-grid">
                <p><strong>Όνομα:</strong> {ownerData.firstName}</p>
                <p><strong>Επώνυμο:</strong> {ownerData.lastName}</p>
                <p><strong>Αρ. Σταθερού Τηλεφώνου:</strong> {ownerData.landline}</p>
                <p><strong>Αρ. Κινητού Τηλεφώνου:</strong> {ownerData.phone}</p>
                <p><strong>E-mail:</strong> {ownerData.email}</p>
                <p><strong>Α.Φ.Μ:</strong> {ownerData.afm}</p>
                <p><strong>Α.Μ.Κ.Α:</strong> {ownerData.amka}</p>
                <p><strong>ΔΟΥ:</strong> {ownerData.doy}</p>
                <p><strong>Αριθμός Ταυτότητας:</strong> {ownerData.idNumber}</p>
                <p><strong>Ημ/νια Γέννησης:</strong> {ownerData.birthDate}</p>
                <p><strong>Διευθήνση Κατοικίας:</strong> {ownerData.address}</p>
                <p><strong>Ταχυδρομικός Κωδικάς:</strong> {ownerData.postalCode}</p>
              </div>
            </div>

            <div className="info-section">
              <h2>Στοιχεία κατοικιδίου</h2>
              <div className="info-grid">
                <p><strong>Όνομα:</strong> {petData.name}</p>
                <p><strong>Είδος:</strong> {petData.species}</p>
                <p><strong>Χρώμα:</strong> {petData.color}</p>
                <p><strong>Αριθμός chip:</strong> {petData.chip}</p>
                <p><strong>Ημ/νια Γέννησης:</strong> {petData.birthDate}</p>
              </div>
            </div>

            <div className="info-section">
              <h2>Ιστορικό υγείας</h2>
              <div className="info-grid">
                <p><strong>Εμβολιασμένο:</strong> {petData.vaccinated}</p>
                <p><strong>Αποπαρασιτώσεις:</strong> {petData.deworming}</p>
                <p><strong>Χειρουργικές πράξεις:</strong> {petData.surgeries}</p>
                <p><strong>Χρόνιες παθήσεις:</strong> {petData.chronicConditions}</p>
                <p><strong>Σχόλια:</strong> {petData.comments}</p>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-secondary">Επεξεργασία Βιβλιάριου</button>
              <button className="btn-primary">Εκτύπωση Βιβλιαρίου</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PetHealthBook;