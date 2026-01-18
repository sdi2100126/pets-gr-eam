import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar({ role }) {
  const location = useLocation();

  const ownerLinks = [
    { path: '/owner/dashboard', label: 'Πληροφορίες' },
    { path: '/owner/pet-health/1', label: 'Προβολή Βιβλιάριου' },
    { path: '/owner/report-lost', label: 'Δήλωση Απώλειας' },
    { path: '/owner/report-found', label: 'Δήλωση Εύρεσης' },
    { path: '/owner/lost-pets-history', label: 'Ιστορικό Δηλώσεων' },
    { path: '/owner/search-vets', label: 'Αναζήτηση Κτηνιάτρου' },
    { path: '/owner/appointments-history', label: 'Ιστορικό Ραντεβού' },
    { path: '/owner/profile', label: 'Προσωπικό Προφίλ' }
  ];

  const vetLinks = [
    { path: '/vet/dashboard', label: 'Πληροφορίες' },
    { path: '/vet/profile-edit', label: 'Δημόσιο προφίλ' },
    { path: '/vet/register-pet', label: 'Καταγραφή κατοικιδίου' },
    { path: '/vet/register-event', label: 'Καταγραφή συμβάντων' },
    { path: '/vet/medical-actions', label: 'Ιατρικές Πράξεις' },
    { path: '/vet/medical-actions-history', label: 'Ιστορικό Πράξεων' },
    { path: '/vet/view-reviews', label: 'Αξιολογήσεις' },
    { path: '/vet/manage-appointments', label: 'Πρόγραμμα' }
  ];

  const publicLinks = [
    { path: '/public/lost-pets', label: 'Αναζητείστε χαμένα κατοικίδια' },
    { path: '/public/search-vets', label: 'Αναζήτηση Κτηνιάτρων' },
    { path: '/login', label: 'Δημιουργία προφίλ' }
  ];

  const links = role === 'owner' ? ownerLinks : role === 'vet' ? vetLinks : publicLinks;

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {links.map(link => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;