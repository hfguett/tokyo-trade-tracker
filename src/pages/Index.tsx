
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import MainApp from '@/components/MainApp';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAccessClick = () => {
    setShowDashboard(true);
  };

  return (
    <div className="min-h-screen">
      {!showDashboard ? (
        <LandingPage onAccessClick={handleAccessClick} />
      ) : (
        <MainApp />
      )}
    </div>
  );
};

export default Index;
