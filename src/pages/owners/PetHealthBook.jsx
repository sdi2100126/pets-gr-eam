import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

function PetHealthBook({ user, onLogout }) {
  const [ownerData, setOwnerData] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (!user?.id) {
        setOwnerData(null);
        setPets([]);
        setSelectedPetId('');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const ownerRef = doc(db, 'owners', user.id);
        const ownerSnap = await getDoc(ownerRef);
        const owner = ownerSnap.exists() ? ownerSnap.data() : null;

        const petsRef = collection(db, 'pets');
        const petsQ = query(petsRef, where('ownerid', '==', user.id));
        const petsSnap = await getDocs(petsQ);
        const petsList = petsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        setOwnerData(owner);

        setPets(petsList);
        setSelectedPetId((prev) => prev || (petsList[0]?.id ?? ''));
      } catch (e) {
        setOwnerData(null);
        setPets([]);
        setSelectedPetId('');
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [user?.id]);

  const selectedPet = useMemo(
    () => pets.find((p) => p.id === selectedPetId) || null,
    [pets, selectedPetId]
  );

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

            {isLoading ? (
              <div className="info-section">
                <p>Φόρτωση δεδομένων…</p>
              </div>
            ) : (
              <>
                <div className="info-section">
                  <h2>Στοιχεία Ιδιοκτήτη</h2>
                  {ownerData ? (
                    <div className="info-grid">
                      <p><strong>Όνομα:</strong> {ownerData.firstName || ''}</p>
                      <p><strong>Επώνυμο:</strong> {ownerData.lastName || ''}</p>
                      <p><strong>Αρ. Σταθερού Τηλεφώνου:</strong> {ownerData.landline || ''}</p>
                      <p><strong>Αρ. Κινητού Τηλεφώνου:</strong> {ownerData.phone || ''}</p>
                      <p><strong>E-mail:</strong> {ownerData.email || ''}</p>
                      <p><strong>Α.Φ.Μ:</strong> {ownerData.afm || ''}</p>
                      <p><strong>Α.Μ.Κ.Α:</strong> {ownerData.amka || ''}</p>
                      <p><strong>Αριθμός Ταυτότητας:</strong> {ownerData.idnumber || ''}</p>
                      <p><strong>Ημ/νια Γέννησης:</strong> {ownerData.birthDate || ''}</p>
                      <p><strong>Διευθήνση Κατοικίας:</strong> {ownerData.address || ownerData.adress || ''}</p>
                      <p><strong>Περιοχή:</strong> {ownerData.location || ''}</p>
                      <p><strong>Ταχυδρομικός Κωδικάς:</strong> {ownerData.post || ''}</p>
                    </div>
                  ) : (
                    <p>Δεν βρέθηκαν στοιχεία ιδιοκτήτη.</p>
                  )}
                </div>

                <div className="info-section">
                  <h2>Στοιχεία κατοικιδίου</h2>

                  {pets.length > 0 ? (
                    <>
                      {pets.length > 1 && (
                        <div className="form-group" style={{ marginBottom: 16 }}>
                          <label>Επιλογή κατοικιδίου:</label>
                          <select
                            value={selectedPetId}
                            onChange={(e) => setSelectedPetId(e.target.value)}
                          >
                            {pets.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.Name || 'Κατοικίδιο'} {p.micro ? `(${p.micro})` : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {selectedPet ? (
                        <div className="info-grid">
                          <p><strong>Όνομα:</strong> {selectedPet.Name || ''}</p>
                          <p><strong>Είδος:</strong> {selectedPet.kind || ''}</p>
                          <p><strong>Ράτσα:</strong> {selectedPet.race || ''}</p>
                          <p><strong>Χρώμα:</strong> {selectedPet.colour || ''}</p>
                          <p><strong>Φύλο:</strong> {selectedPet.gender || ''}</p>
                          <p><strong>Αριθμός chip:</strong> {selectedPet.micro || ''}</p>
                          <p><strong>Έτος γέννησης:</strong> {selectedPet.yearofbirth || ''}</p>
                        </div>
                      ) : (
                        <p>Δεν βρέθηκαν στοιχεία για το επιλεγμένο κατοικίδιο.</p>
                      )}
                    </>
                  ) : (
                    <p>Δεν βρέθηκαν κατοικίδια για τον χρήστη.</p>
                  )}
                </div>

                <div className="info-section">
                  <h2>Ιστορικό υγείας</h2>
                  {selectedPet ? (
                    <div className="info-grid">
                      <p><strong>Εμβολιασμοί:</strong> {selectedPet.vax || ''}</p>
                      <p><strong>Αποπαρασιτώσεις:</strong> {selectedPet.parasite || ''}</p>
                      <p><strong>Χειρουργικές πράξεις:</strong> {selectedPet.surgery || ''}</p>
                      <p><strong>Χρόνιες παθήσεις:</strong> {selectedPet.chronic || ''}</p>
                      <p><strong>Σχόλια:</strong> {selectedPet.notes || ''}</p>
                    </div>
                  ) : (
                    <p>Επιλέξτε κατοικίδιο για να εμφανιστεί το ιστορικό υγείας.</p>
                  )}
                </div>

                <div className="action-buttons">
                  <button className="btn-secondary" disabled={!selectedPet}>
                    Επεξεργασία Βιβλιάριου
                  </button>
                  <button className="btn-primary" disabled={!selectedPet}>
                    Εκτύπωση Βιβλιαρίου
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PetHealthBook;
