import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function OwnerProfile({ user, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Κωνσταντίνα',
    lastName: 'Τασοπούλου',
    email: 'ktasopoulou@gmail.com',
    phone: '694 1234567',
    landline: '210 1234567',
    birthDate: '1994-03-10',
    gender: 'Γυναίκα',
    area: 'Περιστέρι',
    address: 'Λεωφόρος Αθηνών 45',
    postalCode: '12134',
    afm: '123456789',
    amka: '12345678901',
    doy: 'ΠΕΡΙΣΤΕΡΙΟΥ',
    idNumber: 'ΑΒ 123456'
  });

  const handleSave = () => {
    console.log('Profile saved:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Προσωπικό προφίλ
          </div>

          <div className="profile-container">
            <div className="profile-header">
              <h1>Προσωπικό Προφίλ</h1>
              {!isEditing && (
                <button className="btn-primary" onClick={() => setIsEditing(true)}>
                  Επεξεργασία Προφίλ
                </button>
              )}
            </div>

            <div className="profile-section">
              <h2>Στοιχεία Σύνδεσης</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Όνομα Χρήστη:</label>
                  <p>{user?.username || 'Κων. Τασοπούλου'}</p>
                </div>
                <div className="info-item">
                  <label>E-mail:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  ) : (
                    <p>{formData.email}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Κωδικός Πρόσβασης:</label>
                  <p>* * * * * *</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Προσωπικά Στοιχεία</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Όνομα:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  ) : (
                    <p>{formData.firstName}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Επώνυμο:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  ) : (
                    <p>{formData.lastName}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Ημερομηνία Γέννησης:</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    />
                  ) : (
                    <p>{formData.birthDate}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Φύλο:</label>
                  {isEditing ? (
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="Άνδρας">Άνδρας</option>
                      <option value="Γυναίκα">Γυναίκα</option>
                      <option value="Άλλο">Άλλο</option>
                    </select>
                  ) : (
                    <p>{formData.gender}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Περιοχή:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                    />
                  ) : (
                    <p>{formData.area}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Στοιχεία Επικοινωνίας</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Αρ. Κινητού Τηλεφώνου:</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  ) : (
                    <p>{formData.phone}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Αρ. Σταθερού Τηλεφώνου:</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.landline}
                      onChange={(e) => setFormData({...formData, landline: e.target.value})}
                    />
                  ) : (
                    <p>{formData.landline}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Διεύθυνση Κατοικίας:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  ) : (
                    <p>{formData.address}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Ταχυδρομικός Κωδικός:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                    />
                  ) : (
                    <p>{formData.postalCode}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Φορολογικά Στοιχεία</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Α.Φ.Μ:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.afm}
                      onChange={(e) => setFormData({...formData, afm: e.target.value})}
                    />
                  ) : (
                    <p>{formData.afm}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Α.Μ.Κ.Α:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.amka}
                      onChange={(e) => setFormData({...formData, amka: e.target.value})}
                    />
                  ) : (
                    <p>{formData.amka}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>ΔΟΥ:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.doy}
                      onChange={(e) => setFormData({...formData, doy: e.target.value})}
                    />
                  ) : (
                    <p>{formData.doy}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Αριθμός Ταυτότητας:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                    />
                  ) : (
                    <p>{formData.idNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button className="btn-secondary" onClick={handleCancel}>
                  Ακύρωση
                </button>
                <button className="btn-primary" onClick={handleSave}>
                  Αποθήκευση Αλλαγών
                </button>
              </div>
            )}

            <div className="danger-zone">
              <h3>Επικίνδυνη Ζώνη</h3>
              <p>Η διαγραφή του λογαριασμού σας είναι μόνιμη και δεν μπορεί να αναιρεθεί.</p>
              <button className="btn-danger">Διαγραφή Λογαριασμού</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OwnerProfile;