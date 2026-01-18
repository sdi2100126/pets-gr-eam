import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/login.css';
import { db } from '../firebase';

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'owner',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = credentials.username.trim();
    const password = credentials.password;

    if (!username || !password) {
      alert('Παρακαλώ συμπληρώστε όλα τα πεδία');
      return;
    }

    setIsLoading(true);

    try {
      const colName = credentials.role === 'owner' ? 'owners' : 'vets';
      const ref = collection(db, colName);
      const q = query(ref, where('username', '==', username), limit(1));
      const snap = await getDocs(q);

      if (snap.empty) {
        alert('Λανθασμένα στοιχεία σύνδεσης');
        return;
      }

      const doc = snap.docs[0];
      const data = doc.data();

      if (data.pass1 !== password) {
        alert('Λανθασμένος κωδικός');
        return;
      }

      const user =
        credentials.role === 'owner'
          ? {
              id: doc.id,
              role: 'owner',
              firstName: data.firstName ?? '',
              lastName: data.lastName ?? '',
              pass1: data.pass1 ?? '',
              pass2: data.pass2 ?? '',
              birthDate: data.birthDate ?? '',
              username: data.username ?? '',
              gender: data.gender ?? '',
              email: data.email ?? '',
              address: data.address ?? '',
              phone: data.phone ?? '',
              landline: data.landline ?? '',
              amka: data.amka ?? '',
              afm: data.afm ?? '',
              adress: data.adress ?? '',
              location: data.location ?? '',
              post: data.post ?? '',
              idnumber: data.idnumber ?? '',
            }
          : {
              id: doc.id,
              role: 'vet',
              firstName: data.firstName ?? '',
              lastName: data.lastName ?? '',
              pass1: data.pass1 ?? '',
              pass2: data.pass2 ?? '',
              birthDate: data.birthDate ?? '',
              username: data.username ?? '',
              gender: data.gender ?? '',
              email: data.email ?? '',
              address: data.address ?? '',
              phone: data.phone ?? '',
              landline: data.landline ?? '',
              amka: data.amka ?? '',
              afm: data.afm ?? '',
              adress: data.adress ?? '',
              location: data.location ?? '',
              post: data.post ?? '',
              idnumber: data.idnumber ?? '',
              speciality: data.speciality ?? '',
              degree: data.degree ?? '',
              xp: data.xp ?? '',
              available: data.available ?? '',
            };

      onLogin(user);
      localStorage.setItem('authUser', JSON.stringify(user));

      navigate(credentials.role === 'owner' ? '/owner/dashboard' : '/vet/dashboard');
    } catch (err) {
      alert('Σφάλμα σύνδεσης');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <div className="login-container">
        <div className="login-box">
          <h1>Σύνδεση στο Pets.gr</h1>
          <p className="login-subtitle">
            Συνδεθείτε για να έχετε πρόσβαση σε όλες τις λειτουργίες της πλατφόρμας
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Τύπος Χρήστη:</label>
              <select
                value={credentials.role}
                onChange={(e) =>
                  setCredentials({ ...credentials, role: e.target.value })
                }
                disabled={isLoading}
              >
                <option value="owner">Ιδιοκτήτης Κατοικιδίου</option>
                <option value="vet">Επαγγελματίας Κτηνίατρος</option>
              </select>
            </div>

            <div className="form-group">
              <label>Όνομα Χρήστη:</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Κωδικός:</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Γίνεται σύνδεση…' : 'Σύνδεση'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Δεν έχετε λογαριασμό; <Link to="/register">Εγγραφείτε τώρα</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
