import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function ViewReviews({ user, onLogout }) {
  const reviews = [
    {
      id: 1,
      name: 'Μαρία Κ.',
      pet: 'Ρόκυ (Σκύλος)',
      date: '12/04/2025',
      rating: 5,
      categories: ['Συνέπεια', 'Επικοινωνία', 'Φιλικότητα'],
      comment: 'Πολύ φιλική και προσεκτική με το σκύλο μου.'
    },
    {
      id: 2,
      name: 'Νίκος Π.',
      pet: 'Μίνα (Γάτα)',
      date: '03/03/2025',
      rating: 4,
      categories: ['Επικοινωνία', 'Επαγγελματισμός'],
      comment: 'Καλός επαγγελματίας, λίγο μεγάλη αναμονή.'
    },
    {
      id: 3,
      name: 'Μαρία Κ.',
      pet: 'Ρόκυ (Σκύλος)',
      date: '12/04/2025',
      rating: 5,
      categories: ['Συνέπεια', 'Επικοινωνία', 'Φιλικότητα'],
      comment: 'Πολύ φιλική και προσεκτική με το σκύλο μου.'
    },
    {
      id: 4,
      name: 'Νίκος Π.',
      pet: 'Μίνα (Γάτα)',
      date: '03/03/2025',
      rating: 4,
      categories: ['Επικοινωνία', 'Επαγγελματισμός'],
      comment: 'Καλός επαγγελματίας, λίγο μεγάλη αναμονή.'
    }
  ];

  const averageRating = 4.7;
  const totalReviews = 23;

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="vet" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Κτηνιάτρους / Αξιολογήσεις
          </div>

          <h1>Οι Αξιολογήσεις σας</h1>
          <p className="average-rating">
            Μέση Βαθμολογία: {averageRating}/5 ({totalReviews} αξιολογήσεις)
          </p>

          <div className="reviews-grid">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <strong>{review.name}</strong>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-pet">Κατοικίδιο: {review.pet}</p>
                <div className="review-rating">
                  Βαθμολογία: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <div className="review-categories">
                  <strong>Κατηγορίες:</strong> {review.categories.join(', ')}
                </div>
                <div className="review-comment">
                  <strong>Σχόλιο:</strong>
                  <p>"{review.comment}"</p>
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

export default ViewReviews;