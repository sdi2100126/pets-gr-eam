// src/pages/owner/SearchVets.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "../../styles/owner.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const VETS_COLLECTION = "vets";

function SearchVets({ user, onLogout }) {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    area: "",
    experienceMonths: [0, 12],
    experienceYears: [0, 13],
    availability: "",
    cost: "",
    specializations: [],
    services: [],
    cardPayment: false,
    insurance: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const [isLoading, setIsLoading] = useState(true);
  const [vets, setVets] = useState([]);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);

      try {
        const vetsRef = collection(db, VETS_COLLECTION);
        const snap = await getDocs(vetsRef);

        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setVets(list);
      } catch (e) {
        console.error("Error loading vets:", e);
        setVets([]);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  const handleCheckbox = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      area: "",
      experienceMonths: [0, 12],
      experienceYears: [0, 13],
      availability: "",
      cost: "",
      specializations: [],
      services: [],
      cardPayment: false,
      insurance: false,
    });
    setSearchTerm("");
    setSortBy("rating");
  };

  const normalizedVets = useMemo(() => {
    return vets.map((v) => {
      const name =
        v.name ||
        v.fullName ||
        v.displayName ||
        `${v.firstName || ""} ${v.lastName || ""}`.trim() ||
        "Κτηνίατρος";

      const area = v.area || v.location || v.city || "";
      const rating = typeof v.rating === "number" ? v.rating : Number(v.rating) || 0;

      const description = v.description || v.bio || v.about || "";

      const specs = Array.isArray(v.specializations) ? v.specializations : [];
      const services = Array.isArray(v.services) ? v.services : [];

      const acceptsCard = Boolean(v.cardPayment ?? v.acceptsCard ?? false);
      const hasInsurance = Boolean(v.insurance ?? v.acceptsInsurance ?? false);

      const expYears = Number(v.experienceYears ?? v.yearsExperience ?? 0) || 0;
      const expMonths = Number(v.experienceMonths ?? v.monthsExperience ?? 0) || 0;
      const expTotalMonths =
        Number(v.experienceTotalMonths ?? v.totalMonths ?? (expYears * 12 + expMonths)) || 0;

      const cost = v.cost || v.visitCost || v.price || "";

      return {
        raw: v,
        id: v.id,
        name,
        rating,
        area,
        description,
        specializations: specs,
        services,
        cardPayment: acceptsCard,
        insurance: hasInsurance,
        experienceTotalMonths: expTotalMonths,
        cost,
        locationAddress: v.address || v.locationAddress || "",
      };
    });
  }, [vets]);

  const filteredAndSorted = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const areaFilter = (filters.area || "").trim().toLowerCase();

    const inRange = (value, min, max) => value >= min && value <= max;

    const minMonths = (filters.experienceYears?.[0] ?? 0) * 12 + (filters.experienceMonths?.[0] ?? 0);
    const maxMonths = (filters.experienceYears?.[1] ?? 13) * 12 + (filters.experienceMonths?.[1] ?? 12);

    let list = normalizedVets.filter((v) => {
      // search term
      if (term) {
        const hay = `${v.name} ${v.area} ${v.description}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }

      if (areaFilter) {
        const a = (v.area || "").toLowerCase();
        if (!a.includes(areaFilter)) return false;
      }

      if (filters.specializations.length > 0) {
        const set = new Set(v.specializations);
        for (const s of filters.specializations) if (!set.has(s)) return false;
      }

      if (filters.services.length > 0) {
        const set = new Set(v.services);
        for (const s of filters.services) if (!set.has(s)) return false;
      }

      if (filters.cardPayment && !v.cardPayment) return false;
      if (filters.insurance && !v.insurance) return false;

      if (v.experienceTotalMonths > 0) {
        if (!inRange(v.experienceTotalMonths, minMonths, maxMonths)) return false;
      }

      return true;
    });

    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name, "el"));
    } else if (sortBy === "experience") {
      list.sort((a, b) => (b.experienceTotalMonths || 0) - (a.experienceTotalMonths || 0));
    } else {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [normalizedVets, filters, searchTerm, sortBy]);

  // ✅ FIX: Use vet.area instead of vet.location (which doesn't exist on normalized vets)
  const handleBookAppointment = (vet) => {
    // Store in localStorage
    const payload = {
      vetId: vet.id,
      vetName: vet.name,
      vetLocation: vet.area, // ✅ Changed from vet.location to vet.area
    };
    
    localStorage.setItem("selectedVet", JSON.stringify(payload));
    
    console.log("📝 Saved to localStorage:", payload); // Debug log
    
    // Navigate with both URL param AND state
    navigate(`/owner/book-appointment/${vet.id}`, {
      state: { 
        vetId: vet.id,
        vetName: vet.name, 
        vetLocation: vet.area 
      },
    });
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area search-vets">
          <div className="breadcrumbs">Αρχική / Για Ιδιοκτήτες / Αναζήτηση κτηνιάτρου</div>

          <div className="search-layout">
            <aside className="filters-sidebar">
              <h3>Φίλτρα</h3>
              <button className="clear-filters" onClick={clearFilters}>
                Καθαρισμός Φίλτρων
              </button>

              <div className="filter-group">
                <label>Περιοχή:</label>
                <input
                  type="text"
                  placeholder="Εισάγετε τοποθεσία"
                  value={filters.area}
                  onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                />
              </div>

              <div className="filter-group">
                <label>Προϋπηρεσία:</label>
                <div className="slider-group">
                  <label>Μήνες (0-12)</label>
                  <input type="range" min="0" max="12" />
                  <label>Χρόνια (0-13+)</label>
                  <input type="range" min="0" max="13" />
                </div>
              </div>

              <div className="filter-group">
                <label>Διαθεσιμότητα:</label>
                <input type="text" placeholder="Επιλέξτε ώρες" />
              </div>

              <div className="filter-group">
                <label>Κόστος Επίσκεψης:</label>
                <input type="text" placeholder="Από - Έως" />
              </div>

              <div className="filter-group">
                <label>Ειδίκευση:</label>
                <div className="checkbox-group">
                  {[
                    "Γενική κτηνιατρική",
                    "Χειρούργος",
                    "Οδοντιατρική",
                    "Οφθαλμολογία",
                    "Ορθοπεδική",
                  ].map((spec) => (
                    <label key={spec} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.specializations.includes(spec)}
                        onChange={() => handleCheckbox("specializations", spec)}
                      />
                      {spec}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Επιπλέον Υπηρεσίες:</label>
                <div className="checkbox-group">
                  {[
                    "Χώρος στάθμευσης",
                    "Δυνατότητα κατ οίκον επίσκεψης",
                    "Grooming",
                  ].map((service) => (
                    <label key={service} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.services.includes(service)}
                        onChange={() => handleCheckbox("services", service)}
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Πληρωμή με κάρτα:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="card" /> Ναι
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="card" /> Όχι
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <label>Συμβεβλιμένος σε ασφάλεια:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="insurance" /> Ναι
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="insurance" /> Όχι
                  </label>
                </div>
              </div>
            </aside>

            <div className="vets-results">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="🔍 Αναζήτηση"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="rating">Ταξινόμηση κατά: Βαθμολογία</option>
                  <option value="name">Όνομα</option>
                  <option value="experience">Εμπειρία</option>
                </select>
              </div>

              {isLoading ? (
                <div className="info-section">
                  <p>Φόρτωση κτηνιάτρων…</p>
                </div>
              ) : (
                <div className="vets-grid">
                  {filteredAndSorted.length === 0 ? (
                    <div className="info-section">
                      <p>Δεν βρέθηκαν κτηνίατροι με αυτά τα κριτήρια.</p>
                    </div>
                  ) : (
                    filteredAndSorted.map((vet) => (
                      <div key={vet.id} className="vet-card">
                        <h3>{vet.name}</h3>

                        <div className="rating">
                          {"★".repeat(Math.max(0, Math.min(5, Math.floor(vet.rating))))}
                          {"☆".repeat(Math.max(0, 5 - Math.floor(vet.rating)))}
                          <span>{Number(vet.rating || 0).toFixed(1)}</span>
                        </div>

                        <p className="area">{vet.area || "—"}</p>
                        <p className="description">
                          {vet.description || "Δεν υπάρχει περιγραφή."}
                        </p>

                        <button
                          className="btn-primary"
                          onClick={() => navigate(`/owner/vet-profile/${vet.id}`)}
                        >
                          Προβολή Προφίλ
                        </button>

                        <button
                          className="btn-secondary"
                          style={{ marginTop: 8 }}
                          onClick={() => handleBookAppointment(vet)}
                        >
                          Κλείσιμο Ραντεβού
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchVets;