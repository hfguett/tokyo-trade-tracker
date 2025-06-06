
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import MainApp from '@/components/MainApp';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setShowDashboard(true);
  };

  return (
    <div className="min-h-screen">
      {!showDashboard ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <MainApp />
      )}
    </div>
  );
};

export default Index;
