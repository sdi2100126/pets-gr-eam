import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import OwnerInfo from './pages/public/OwnerInfo';
import VetInfo from './pages/public/VetInfo';
import PublicSearchVets from './pages/public/PublicSearchVets';
import LostPetsPublic from './pages/public/LostPetsPublic';
import ReportFoundPublic from './pages/public/ReportFoundPublic';
import PublicVetProfile from './pages/public/PublicVetProfile';
import OwnerDashboard from './pages/owners/OwnerDashboard';
import PetHealthBook from './pages/owners/PetHealthBook';
import ReportLostPet from './pages/owners/ReportLostPet';
import ReportFoundPet from './pages/owners/ReportFoundPet';
import LostPetsHistory from './pages/owners/LostPetsHistory';
import SearchVets from './pages/owners/SearchVets';
import VetProfile from './pages/owners/VetProfile';
import BookAppointment from './pages/owners/BookAppointment';
import AppointmentsHistory from './pages/owners/AppointmentsHistory';
import RateVet from './pages/owners/RateVet';
import OwnerProfile from './pages/owners/OwnerProfile';
import VetDashboard from './pages/vets/VetDashboard';
import VetProfileEdit from './pages/vets/VetProfileEdit';
import RegisterPet from './pages/vets/RegisterPet';
import RegisterEvent from './pages/vets/RegisterEvent';
import MedicalActions from './pages/vets/MedicalActions';
import MedicalActionsHistory from './pages/vets/MedicalActionsHistory';
import ManageAppointments from './pages/vets/ManageAppointments';
import ViewReviews from './pages/vets/ViewReviews';function App() {
const [user, setUser] = useState(() => {
const saved = localStorage.getItem('user');
return saved ? JSON.parse(saved) : null;
});const login = (userData) => {
setUser(userData);
localStorage.setItem('user', JSON.stringify(userData));
};const logout = () => {
setUser(null);
localStorage.removeItem('user');
};return (
<Router>
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/" element={<HomePage user={user} onLogout={logout} />} />
<Route path="/login" element={<Login onLogin={login} />} />
<Route path="/owner/info" element={<OwnerInfo />} />
<Route path="/vet/info" element={<VetInfo />} />
<Route path="/public/search-vets" element={<PublicSearchVets />} />
<Route path="/lost-pets" element={<LostPetsPublic />} />
<Route path="/public/vet-profile/:id" element={<PublicVetProfile />} />
<Route path="/public/lost-pets" element={<LostPetsPublic />} />
<Route path="/public/report-found/:id" element={<ReportFoundPublic />} />    
<Route path="/owner/dashboard" element={user?.role === 'owner' ? <OwnerDashboard user={user} onLogout={logout} /> : <Navigate to="/login" />} />
<Route path="/public/lost-pets" element={<LostPetsPublic user={user} onLogout={logout} />} />
<Route path="/public/search-vets" element={<PublicSearchVets user={user} onLogout={logout} />} />
<Route path="/public/vet-profile/:id" element={<PublicVetProfile user={user} onLogout={logout} />} /> 
    <Route path="/owner/pet-health/:id" element={user?.role === 'owner' ? <PetHealthBook user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/report-lost" element={user?.role === 'owner' ? <ReportLostPet user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/report-lost/:id" element={user?.role === 'owner' ? <ReportLostPet user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/report-found" element={user?.role === 'owner' ? <ReportFoundPet user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/lost-pets-history" element={user?.role === 'owner' ? <LostPetsHistory user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/search-vets" element={user?.role === 'owner' ? <SearchVets user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/vet-profile/:id" element={user?.role === 'owner' ? <VetProfile user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/book-appointment" element={user?.role === 'owner' ? <BookAppointment user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/appointments-history" element={user?.role === 'owner' ? <AppointmentsHistory user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/rate-vet" element={user?.role === 'owner' ? <RateVet user={user} onLogout={logout} /> : <Navigate to="/login" />} />    <Route path="/vet/dashboard" element={user?.role === 'vet' ? <VetDashboard user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/owner/profile" element={user?.role === 'owner' ? <OwnerProfile user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/profile" element={user?.role === 'vet' ? <VetProfileEdit user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/profile-edit" element={user?.role === 'vet' ? <VetProfileEdit user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/register-pet" element={user?.role === 'vet' ? <RegisterPet user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/register-event" element={user?.role === 'vet' ? <RegisterEvent user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/medical-actions" element={user?.role === 'vet' ? <MedicalActions user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/medical-actions-history" element={user?.role === 'vet' ? <MedicalActionsHistory user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/appointments" element={user?.role === 'vet' ? <ManageAppointments user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/manage-appointments" element={user?.role === 'vet' ? <ManageAppointments user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/reviews" element={user?.role === 'vet' ? <ViewReviews user={user} onLogout={logout} /> : <Navigate to="/login" />} />
    <Route path="/vet/view-reviews" element={user?.role === 'vet' ? <ViewReviews user={user} onLogout={logout} /> : <Navigate to="/login" />} />
  </Routes>
</Router>
);
}export default App;