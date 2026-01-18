import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function VetDashboard({ user, onLogout }) {

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="vet" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Κτηνιάτρους / Πληροφορίες
          </div>

          <div className="dashboard-container">
            <h1>Καλώς ήρθατε στο Pets.gr</h1>
            <p className="subtitle">Διαχειριστείτε το προφίλ σας και τις υπηρεσίες σας</p>

            <div className="info-section">
              <h2>Δημόσιο προφίλ</h2>
              <p>Από το μενού λογαριασμού επιλέξτε «Δημόσιο Προφίλ».</p>
              <p>Συμπληρώστε τα στοιχεία σας, τις ειδικότητές σας και το πρόγραμμα διαθεσιμότητάς σας.</p>
              <p>Προσθέστε επιπλέον υπηρεσίες που προσφέρετε για να προσελκύσετε περισσότερους πελάτες.</p>
            </div>

            <div className="info-section">
              <h2>Καταγραφή Συμβάντων</h2>
              <p>Καταγράψτε σημαντικά συμβάντα στη ζωή των κατοικιδίων που παρακολουθείτε.</p>
              <p>Τα συμβάντα περιλαμβάνουν: γέννηση, υιοθεσία, μεταβίβαση, απώλεια ή θάνατος.</p>
              <p>Κάθε καταγραφή ενημερώνει αυτόματα το βιβλιάριο υγείας του κατοικιδίου.</p>
            </div>

            <div className="info-section">
              <h2>Ιατρικές Πράξεις</h2>
              <p>Καταγράψτε όλες τις ιατρικές πράξεις που εκτελείτε.</p>
              <p>Οι πληροφορίες αποθηκεύονται στο ψηφιακό βιβλιάριο υγείας του κατοικιδίου.</p>
              <p>Οι ιδιοκτήτες μπορούν να δουν το πλήρες ιστορικό των κατοικιδίων τους.</p>
            </div>

            <div className="info-section">
              <h2>Διαχείριση Ραντεβού</h2>
              <p>Δείτε όλα τα εισερχόμενα αιτήματα ραντεβού από ιδιοκτήτες.</p>
              <p>Επιβεβαιώστε ή ακυρώστε ραντεβού ανάλογα με τη διαθεσιμότητά σας.</p>
              <p>Παρακολουθήστε το ιστορικό ολοκληρωμένων και ακυρωμένων ραντεβού.</p>
            </div>

            <div className="info-section">
              <h2>Αξιολογήσεις</h2>
              <p>Δείτε τις αξιολογήσεις που έχετε λάβει από τους πελάτες σας.</p>
              <p>Οι αξιολογήσεις βοηθούν στη βελτίωση των υπηρεσιών σας.</p>
              <p>Η μέση βαθμολογία σας εμφανίζεται στο δημόσιο προφίλ σας.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VetDashboard;