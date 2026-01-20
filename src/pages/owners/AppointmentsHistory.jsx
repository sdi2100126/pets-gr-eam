// src/pages/owner/AppointmentsHistory.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "../../styles/owner.css";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const APPOINTMENTS_COLLECTION = "meetings";

const VETS_COLLECTION = "vets";

function AppointmentsHistory({ user, onLogout }) {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [vetNames, setVetNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (!user?.id) {
        setAppointments([]);
        setVetNames({});
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // 1) Fetch appointments for owner 
        const aptRef = collection(db, APPOINTMENTS_COLLECTION);
        const aptQ = query(aptRef, where("ownerid", "==", user.id));
        const aptSnap = await getDocs(aptQ);

        const list = aptSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setAppointments(list);

        
        const uniqueVetIds = Array.from(
          new Set(list.map((a) => a.vetid).filter(Boolean))
        );

        if (uniqueVetIds.length === 0) {
          setVetNames({});
          return;
        }

        
        const pairs = await Promise.all(
          uniqueVetIds.map(async (vetId) => {
            try {
              const vetSnap = await getDoc(doc(db, VETS_COLLECTION, vetId));
              if (!vetSnap.exists()) return [vetId, null];

              const v = vetSnap.data();
              
              const name =
                v.name ||
                v.fullName ||
                v.displayName ||
                `${v.firstName || ""} ${v.lastName || ""}`.trim() ||
                vetId;

              return [vetId, name];
            } catch {
              return [vetId, null];
            }
          })
        );

        const map = {};
        for (const [id, name] of pairs) {
          if (name) map[id] = name;
        }
        setVetNames(map);
      } catch (e) {
        setAppointments([]);
        setVetNames({});
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [user?.id]);

  const getStatusLabel = (state) => {
    switch (state) {
      case "pending":
        return "Σε Αναμονή";
      case "completed":
        return "Ολοκληρώθηκε";
      case "cancelled":
        return "Ακυρώθηκε";
      default:
       
        return state || "-";
    }
  };

  const getStatusClass = (state) => {
    if (state === "pending" || state === "completed" || state === "cancelled") return state;
    if (state === "active") return "pending";
    return "";
  };

  const handleDelete = async (apt) => {
    try {
      await deleteDoc(doc(db, APPOINTMENTS_COLLECTION, apt.id));
      setAppointments((prev) => prev.filter((x) => x.id !== apt.id));
    } catch (e) {
      alert(e?.message || "Αποτυχία διαγραφής.");
    }
  };

  const handleCancel = async (apt) => {
    alert("Για ακύρωση με αλλαγή state χρειάζεται updateDoc. Αν θέλεις, στο γράφω ακριβώς.");
  };

  const sortedAppointments = useMemo(() => {
    const toSortable = (v) => {
      if (!v) return 0;
      const parsed = Date.parse(v);
      return Number.isFinite(parsed) ? parsed : 0;
    };
    return [...appointments].sort((a, b) => toSortable(b.date) - toSortable(a.date));
  }, [appointments]);

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Ιστορικό Ραντεβού
          </div>

          <h1>Ραντεβού</h1>

          {isLoading ? (
            <div className="info-section">
              <p>Φόρτωση δεδομένων…</p>
            </div>
          ) : (
            <div className="appointments-grid">
              {sortedAppointments.length === 0 ? (
                <div className="info-section">
                  <p>Δεν βρέθηκαν ραντεβού.</p>
                </div>
              ) : (
                sortedAppointments.map((apt) => {
                  const vetName = vetNames[apt.vetid] || apt.vetid || "—";

                  return (
                    <div key={apt.id} className="appointment-card card-elevated">
                      <div className="card-top">
                        <div className="card-title-row">
                          <div className="title-stack">
                            <h3 className="card-title">Συνάντηση με</h3>
                            <div className="card-subtitle">
                              <span className="muted">{vetName}</span>
                              <span className="dot" />
                              <span className="muted">{apt.location || "Άγνωστη τοποθεσία"}</span>
                            </div>
                          </div>

                          <span className={`status-badge ${getStatusClass(apt.state)} status-pill`}>
                            {getStatusLabel(apt.state)}
                          </span>
                        </div>

                        <div className="meta-row">
                          <div className="meta-item">
                            <span className="meta-label">Ημ/νία</span>
                            <span className="meta-value">{apt.date || "-"}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">Ώρα</span>
                            <span className="meta-value mono">{apt.time || "-"}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">Κωδικός</span>
                            <span className="meta-value mono">{apt.id}</span>
                          </div>
                        </div>
                      </div>

                      <div className="card-actions actions-row">
                        <button className="btn-secondary">
                          Προβολή
                        </button>

                        {apt.state === "pending" && (
                          <>
                            <button
                              className="btn-secondary"
                              onClick={() => navigate(`/owner/edit-meeting/${apt.id}`)}
                            >
                              Επεξεργασία
                            </button>
                            <button className="btn-danger" onClick={() => handleCancel(apt)}>
                              Ακύρωση
                            </button>
                          </>
                        )}

                        {apt.state === "completed" && (
                          <button
                            className="btn-primary"
                            onClick={() => navigate("/owner/rate-vet")}
                          >
                            Αξιολόγηση
                          </button>
                        )}

                        {apt.state === "cancelled" && (
                          <button className="btn-danger" onClick={() => handleDelete(apt)}>
                            Διαγραφή
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentsHistory;
