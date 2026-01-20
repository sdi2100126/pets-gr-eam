// src/pages/owners/BookAppointment.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "../../styles/owner.css";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";



const MEETINGS_COLLECTION = "meetings";
const PETS_COLLECTION = "pets";
const VETS_COLLECTION = "vets";

function BookAppointment({ user, onLogout }) {
  const navigate = useNavigate();
  const locationRouter = useLocation();
  const { vetId: vetIdParam } = useParams();

  // Read selected vet from localStorage (safe parsing)
  let storedVet = null;
  try {
    storedVet = JSON.parse(localStorage.getItem("selectedVet") || "null");
  } catch {
    storedVet = null;
  }

  // ✅ FIX: vetId from URL param OR navigation state OR localStorage
  const vetId = vetIdParam || locationRouter.state?.vetId || storedVet?.vetId || "";

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [vetInfo, setVetInfo] = useState({
    name: locationRouter.state?.vetName || storedVet?.vetName || "",
    location: locationRouter.state?.vetLocation || storedVet?.vetLocation || "",
  });

  const [pets, setPets] = useState([]);
  const petOptions = useMemo(() => {
    return pets.map((p) => ({
      id: p.id,
      label: `${p.Name || "Κατοικίδιο"}${p.kind ? ` (${p.kind})` : ""}${
        p.micro ? ` • ${p.micro}` : ""
      }`,
    }));
  }, [pets]);

  const [appointmentData, setAppointmentData] = useState({
    petId: "",
    reason: "",
    date: "",
    time: "",
  });

  const reasons = [
    "Εμβολιασμός",
    "Στείρωση",
    "Καταγραφή μικροτσίπ",
    "Γενική εξέταση",
    "Χειρουργείο",
    "Έκτακτο περιστατικό",
  ];

  const times = useMemo(
    () => Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`),
    []
  );

  // 🔍 DEBUG: Log vet resolution on mount
  useEffect(() => {
    console.log("🔍 VetId Resolution Debug:", {
      vetIdParam,
      navigationState: locationRouter.state,
      storedVet,
      finalVetId: vetId,
    });
  }, []);

  // ✅ Fetch vet info from Firestore if we have vetId but missing name/location
  useEffect(() => {
    const fetchVetInfo = async () => {
      if (!vetId) return;
      
      // If we already have vet info, skip fetching
      if (vetInfo.name && vetInfo.location) return;

      try {
        const vetDocRef = doc(db, VETS_COLLECTION, vetId);
        const vetSnap = await getDoc(vetDocRef);
        
        if (vetSnap.exists()) {
          const vetData = vetSnap.data();
          setVetInfo({
            name: vetData.name || vetData.Name || "Κτηνίατρος",
            location: vetData.location || vetData.Location || "",
          });
        }
      } catch (error) {
        console.error("Error fetching vet info:", error);
      }
    };

    fetchVetInfo();
  }, [vetId]);

  // Load owner pets from Firestore
  useEffect(() => {
    const run = async () => {
      if (!user?.id) {
        setPets([]);
        setAppointmentData((prev) => ({ ...prev, petId: "" }));
        return;
      }

      try {
        const petsRef = collection(db, PETS_COLLECTION);
        const petsQ = query(petsRef, where("ownerid", "==", user.id));
        const petsSnap = await getDocs(petsQ);
        const list = petsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        setPets(list);

        // Default select first pet if none selected
        setAppointmentData((prev) => ({
          ...prev,
          petId: prev.petId || (list[0]?.id ?? ""),
        }));
      } catch (error) {
        console.error("Error loading pets:", error);
        setPets([]);
      }
    };

    run();
  }, [user?.id]);

  const stepLabels = [
    "Επιλογή Κατοικιδίου",
    "Λόγος Επίσκεψης",
    "Επιλογή Ημέρας",
    "Επιλογή Ώρας",
    "Προεσκόπιση",
  ];

  const canGoNext = useMemo(() => {
    if (step === 1) return Boolean(appointmentData.petId);
    if (step === 2) return Boolean(appointmentData.reason);
    if (step === 3) return Boolean(appointmentData.date);
    if (step === 4) return Boolean(appointmentData.time);
    return true;
  }, [step, appointmentData]);

  const handleNext = () => {
    if (!canGoNext) return;
    if (step < 5) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const selectedPetLabel =
    petOptions.find((p) => p.id === appointmentData.petId)?.label || "";

  const handleSubmit = async () => {
    if (!user?.id) {
      alert("Πρέπει να είστε συνδεδεμένος/η.");
      return;
    }

    

    if (!appointmentData.petId || !appointmentData.reason || !appointmentData.date || !appointmentData.time) {
      alert("Συμπληρώστε όλα τα πεδία.");
      return;
    }

    setIsLoading(true);

    try {
      await addDoc(collection(db, MEETINGS_COLLECTION), {
        vetid: vetId,
        ownerid: user.id,
        state: "pending",
        location: vetInfo.location || "",
        date: appointmentData.date,
        time: appointmentData.time,
        petid: appointmentData.petId,
        reason: appointmentData.reason,
        createdAt: serverTimestamp(),
      });

      // Clean up stored vet after successful booking
      localStorage.removeItem("selectedVet");

      navigate("/owner/appointments-history");
    } catch (e) {
      console.error("Error creating appointment:", e);
      alert(e?.message || "Αποτυχία δημιουργίας ραντεβού.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Αναζήτηση κτηνιάτρου / Δημιουργία Ραντεβού
          </div>

          

          <div className="appointment-stepper">
            <div className="stepper-progress">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="step-wrapper">
                  <div className={`step-circle ${step >= num ? "active" : ""}`}>
                    {step > num ? "✓" : num}
                  </div>
                  {num < 5 && (
                    <div className={`step-line ${step > num ? "active" : ""}`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="stepper-labels">
              {stepLabels.map((label, idx) => (
                <span key={idx} className={step === idx + 1 ? "active-label" : ""}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="step-content">
            {step === 1 && (
              <div className="form-group">
                <h2>Για ποιό ζωάκι συντροφιάς είναι το ραντεβού;</h2>

                <select
                  value={appointmentData.petId}
                  onChange={(e) =>
                    setAppointmentData((prev) => ({ ...prev, petId: e.target.value }))
                  }
                >
                  <option value="">Επιλέξτε κατοικίδιο</option>
                  {petOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>

                {!user?.id && (
                  <p style={{ marginTop: 8, color: '#666' }}>
                    Πρέπει να είστε συνδεδεμένος/η για να φορτωθούν τα κατοικίδια.
                  </p>
                )}
                
                {user?.id && pets.length === 0 && (
                  <p style={{ marginTop: 8, color: '#666' }}>
                    Δεν βρέθηκαν κατοικίδια. Προσθέστε ένα κατοικίδιο πρώτα.
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="form-group">
                <h2>Ποιός είναι ο λόγος επίσκεψης;</h2>
                <select
                  value={appointmentData.reason}
                  onChange={(e) =>
                    setAppointmentData((prev) => ({ ...prev, reason: e.target.value }))
                  }
                >
                  <option value="">Επιλέξτε ιατρική πράξη</option>
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {step === 3 && (
              <div className="form-group">
                <h2>Ποιά ημέρα επιθυμείτε να συναντηθείτε;</h2>
                <input
                  type="date"
                  value={appointmentData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) =>
                    setAppointmentData((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>
            )}

            {step === 4 && (
              <div className="form-group">
                <h2>Ποιά ώρα επιθυμείτε να συναντηθείτε;</h2>
                <div className="time-selection">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`time-button ${appointmentData.time === t ? "selected" : ""}`}
                      onClick={() => setAppointmentData((prev) => ({ ...prev, time: t }))}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="preview-section">
                <h2>Είστε σίγουροι για τα στοιχεία του ραντεβού σας;</h2>
                <div className="preview-details">
                  <p>
                    <strong>Συνάντηση με:</strong> {vetInfo.name || "Κτηνίατρος"}
                  </p>
                  <p>
                    <strong>Τοποθεσία:</strong> {vetInfo.location || "—"}
                  </p>
                  <p>
                    <strong>Κατοικίδιο:</strong> {selectedPetLabel || "—"}
                  </p>
                  <p>
                    <strong>Λόγος:</strong> {appointmentData.reason || "—"}
                  </p>
                  <p>
                    <strong>Μέρα:</strong> {appointmentData.date || "—"}
                  </p>
                  <p>
                    <strong>Ώρα:</strong> {appointmentData.time || "—"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              className="btn-secondary"
              onClick={() => (step === 1 ? navigate("/owner/dashboard") : handleBack())}
              disabled={isLoading}
            >
              {step === 1 ? "Ακύρωση" : "Πίσω"}
            </button>

            {step < 5 && (
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={!canGoNext || isLoading}
              >
                Συνέχεια
              </button>
            )}

            {step === 5 && (
              <button className="btn-primary" onClick={handleSubmit} disabled={isLoading || !vetId}>
                {isLoading ? "Υποβολή…" : "Οριστική υποβολή"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookAppointment;