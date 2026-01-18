import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/login.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'owner'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      alert('Παρακαλώ συμπληρώστε όλα τα πεδία');
      return;
    }

    const user = {
      role: credentials.role,
      id: Math.floor(Math.random() * 10000),
      username: credentials.username,
      firstName: credentials.role === 'owner' ? 'Χρήστης' : 'Κτηνίατρος',
      lastName: 'Demo',
      email: `${credentials.username}@example.com`
    };

    onLogin(user);
    
    if (credentials.role === 'owner') {
      navigate('/owner/dashboard');
    } else {
      navigate('/vet/dashboard');
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h1>Σύνδεση στο Pets.gr</h1>
          <p className="login-subtitle">Συνδεθείτε για να έχετε πρόσβαση σε όλες τις λειτουργίες της πλατφόρμας</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Τύπος Χρήστη:</label>
              <select
                value={credentials.role}
                onChange={(e) => setCredentials({...credentials, role: e.target.value})}
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
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Εισάγετε το όνομα χρήστη"
                required
              />
            </div>

            <div className="form-group">
              <label>Κωδικός:</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Εισάγετε τον κωδικό"
                required
              />
            </div>

            <button type="submit" className="btn-primary">Σύνδεση</button>
          </form>

          <div className="login-footer">
            <p>Δεν έχετε λογαριασμό; <a href="/register">Εγγραφείτε τώρα</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;