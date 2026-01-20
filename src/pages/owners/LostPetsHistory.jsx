
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "../../styles/owner.css";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase"; 

function LostPetsHistory({ user, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("declarations");

  const [missingDeclarations, setMissingDeclarations] = useState([]);
  const [foundDeclarations, setFoundDeclarations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const MISSING_COLLECTION = "missing_dec";
  const FOUND_COLLECTION = "found_dec";

  useEffect(() => {
    const run = async () => {
      if (!user?.id) {
        setMissingDeclarations([]);
        setFoundDeclarations([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // Fetch missing declarations 
        const missingRef = collection(db, MISSING_COLLECTION);
        const missingQ = query(missingRef, where("ownerid", "==", user.id));
        const missingSnap = await getDocs(missingQ);
        const missingList = missingSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          type: "missing",
        }));

        // Fetch found declarations
        const foundRef = collection(db, FOUND_COLLECTION);
        const foundQ = query(foundRef, where("creator_id", "==", user.id));
        const foundSnap = await getDocs(foundQ);
        const foundList = foundSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          type: "found",
        }));

        setMissingDeclarations(missingList);
        setFoundDeclarations(foundList);
      } catch (e) {
        setMissingDeclarations([]);
        setFoundDeclarations([]);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [user?.id]);

  const declarations = [...missingDeclarations, ...foundDeclarations];

  const statusLabel = (state) => {
    if (state === "active") return "Ενεργή";
    if (state === "draft") return "Πρόχειρο";
    return state || "-";
  };

  const statusClass = (state) => {
    if (state === "active") return "active";
    if (state === "draft") return "draft";
    return "";
  };

  const handleDelete = async (decl) => {
    try {
      const col = decl.type === "missing" ? MISSING_COLLECTION : FOUND_COLLECTION;
      await deleteDoc(doc(db, col, decl.id));

  
      if (decl.type === "missing") {
        setMissingDeclarations((prev) => prev.filter((x) => x.id !== decl.id));
      } else {
        setFoundDeclarations((prev) => prev.filter((x) => x.id !== decl.id));
      }
    } catch (e) {
      alert(e?.message || "Αποτυχία διαγραφής.");
    }
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />

        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Ιστορικό Δηλώσεων
          </div>

          

          {activeTab === "declarations" && (
            <>
              {isLoading ? (
                <div className="info-section">
                  <p>Φόρτωση δεδομένων…</p>
                </div>
              ) : (
                <div className="declarations-grid">
                  {declarations.length === 0 ? (
                    <div className="info-section">
                      <p>Δεν βρέθηκαν δηλώσεις.</p>
                    </div>
                  ) : (
                    declarations.map((decl) => {
                      const isMissing = decl.type === "missing";

                      
                      const title = isMissing
                        ? decl.title || "Δήλωση Απώλειας"
                        : "Δήλωση Εύρεσης";

                      return (
                        <div key={`${decl.type}-${decl.id}`} className="declaration-card card-elevated">
                          <div className="card-top">
                            <div className="card-title-row">
                              <div className="title-stack">
                                <h3 className="card-title">{title}</h3>
                                <div className="card-subtitle">
                                  <span className={`type-pill ${isMissing ? "missing" : "found"}`}>
                                    {isMissing ? "Απώλεια" : "Εύρεση"}
                                  </span>
                                  <span className="dot" />
                                  <span className="muted">
                                    {decl.location ? decl.location : "Άγνωστη περιοχή"}
                                  </span>
                                </div>
                              </div>

                              <span className={`status-badge ${statusClass(decl.state)} status-pill`}>
                                {statusLabel(decl.state)}
                              </span>
                            </div>

                            <div className="meta-row">
                              <div className="meta-item">
                                <span className="meta-label">Ημ/νία</span>
                                <span className="meta-value">{decl.date || "-"}</span>
                              </div>

                              {isMissing ? (
                                <>
                                  <div className="meta-item">
                                    <span className="meta-label">Ράτσα</span>
                                    <span className="meta-value">{decl.race || "-"}</span>
                                  </div>
                                  <div className="meta-item">
                                    <span className="meta-label">Χαρακτηριστικό</span>
                                    <span className="meta-value">{decl.characteristic || "-"}</span>
                                  </div>
                                </>
                              ) : (
                                <div className="meta-item">
                                  <span className="meta-label">Microchip</span>
                                  <span className="meta-value mono">{decl.microchip || "-"}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {isMissing && decl.photo ? (
                            <div className="card-media media-frame">
                              <img src={decl.photo} alt="Φωτογραφία κατοικιδίου" className="media-img" />
                            </div>
                          ) : null}

                          <div className="card-body">
                            <div className="desc-header">
                              <strong>Περιγραφή</strong>
                            </div>

                            <p className="desc-text clamp-4">
                              {decl.text || "-"}
                            </p>
                          </div>

                          <div className="card-actions actions-row">
                            <button
                              className="btn-secondary"
                              onClick={() =>
                                navigate(
                                  isMissing ? `/owner/report-lost/${decl.id}` : `/owner/report-found/${decl.id}`
                                )
                              }
                            >
                              {decl.state === "active" ? "Προβολή / Επεξεργασία" : "Προβολή πλήρους Δήλωσης"}
                            </button>

                            <button className="btn-danger" onClick={() => handleDelete(decl)}>
                              Διαγραφή
                            </button>
                          </div>
                        </div>
                      );

                    })
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === "create" && (
            <div
              className="create-declaration"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <button className="btn-primary" onClick={() => navigate("/owner/report-lost")}>
                Νέα Δήλωση Απώλειας
              </button>
              <button className="btn-primary" onClick={() => navigate("/owner/report-found")}>
                Νέα Δήλωση Εύρεσης
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
