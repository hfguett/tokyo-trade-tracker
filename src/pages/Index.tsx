
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import TradingDashboard from '@/components/TradingDashboard';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAccessClick = () => {
    setShowDashboard(true);
  };

  const handleBackToLanding = () => {
    setShowDashboard(false);
  };

  return (
    <div className="min-h-screen">
      {!showDashboard ? (
        <LandingPage onAccessClick={handleAccessClick} />
      ) : (
        <TradingDashboard />
      )}
    </div>
  );
};

export default Index;
