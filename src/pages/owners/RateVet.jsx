import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function RateVet({ user, onLogout }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [categories, setCategories] = useState([]);
  const [comment, setComment] = useState('');

  const ratingCategories = [
    'Συνέπεια στο ραντεβού',
    'Επικοινωνία και σαφήνεια οδηγιών',
    'Φιλικότητα & χειρισμός ζώου',
    'Επαγγελματισμός',
    'Καθαριότητα και οργάνωση χώρου',
    'Αναμονή πριν την εξέταση',
    'Σχέση ποιότητας–κόστους'
  ];

  const handleCategoryToggle = (category) => {
    setCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    console.log('Review submitted:', { rating, categories, comment });
    navigate('/owner/appointments-history');
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Ιστορικό Ραντεβού / Αξιολόγιση
          </div>

          <div className="rating-container">
            <h2>Αξιολόγηση Κτηνιάτρου</h2>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star ${rating >= star ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="form-group">
              <label>Ποιους τομείς θα θέλατε να αξιολογήσετε;</label>
              <div className="checkbox-group">
                {ratingCategories.map(category => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Γράψτε τη γνώμη σας για την εμπειρία σας:</label>
              <textarea
                rows="6"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Μοιραστείτε τη γνώμη σας..."
              />
            </div>

            <button className="btn-primary" onClick={handleSubmit}>
              Υποβολή
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RateVet;