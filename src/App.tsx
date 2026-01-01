import React, { useState } from 'react';
import { CitizenPortal } from './components/CitizenPortal';
import { LoginPage } from './components/LoginPage';
import { CitizenLanding } from './components/CitizenLanding';
import { NewConnectionFormImage } from './components/citizen/NewConnectionFormImage';
import { FirstConnectionGrievance } from './components/citizen/FirstConnectionGrievance';

export default function App() {
  const [userRole, setUserRole] = useState<'citizen' | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [showFirstConnection, setShowFirstConnection] = useState(false);
  const [showFirstGrievance, setShowFirstGrievance] = useState(false);
  const [grievanceApplicationId, setGrievanceApplicationId] = useState('');

  const handleLogin = (role: 'citizen', userData: any) => {
    setUserRole(role);
    setCurrentUser(userData);
    setShowLanding(false);
    setShowFirstConnection(false);
    setShowFirstGrievance(false);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setShowLanding(true);
    setShowFirstConnection(false);
    setShowFirstGrievance(false);
  };

  const handleNavigateToLogin = () => {
    setShowLanding(false);
    setShowFirstConnection(false);
    setShowFirstGrievance(false);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
    setShowFirstConnection(false);
    setShowFirstGrievance(false);
  };

  const handleFirstConnectionClick = () => {
    setShowLanding(false);
    setShowFirstConnection(true);
    setShowFirstGrievance(false);
  };

  const handleBackFromFirstConnection = () => {
    setShowLanding(true);
    setShowFirstConnection(false);
    setShowFirstGrievance(false);
  };

  const handleFirstGrievanceClick = () => {
    setShowLanding(false);
    setShowFirstConnection(false);
    setShowFirstGrievance(true);
  };

  const handleBackFromFirstGrievance = () => {
    setShowLanding(true);
    setShowFirstConnection(false);
    setShowFirstGrievance(false);
  };

  // Show first connection form
  if (showFirstConnection) {
    return <NewConnectionFormImage onBack={handleBackFromFirstConnection} />;
  }

  // Show first connection grievance form
  if (showFirstGrievance) {
    return <FirstConnectionGrievance onBack={handleBackFromFirstGrievance} prefilledApplicationId={grievanceApplicationId} />;
  }

  // Show landing page first
  if (showLanding && !userRole) {
    return <CitizenLanding onNavigateToLogin={handleNavigateToLogin} onNavigateToFirstConnection={handleFirstConnectionClick} onNavigateToFirstGrievance={handleFirstGrievanceClick} />;
  }

  // Show login page
  if (!userRole) {
    return <LoginPage onLogin={handleLogin} onBackToLanding={handleBackToLanding} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {userRole === 'citizen' && (
        <CitizenPortal user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}