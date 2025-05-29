
import React, { useState } from 'react';
import Navigation from './Navigation';
import TradingDashboard from './TradingDashboard';
import TradeCalendar from './TradeCalendar';
import AnalyticsPage from './AnalyticsPage';
import PortfolioPage from './PortfolioPage';
import SettingsPage from './SettingsPage';
import TradeDetailsModal from './TradeDetailsModal';
import MarketOverview from './MarketOverview';
import TradingNews from './TradingNews';
import { Trade } from './TradingDashboard';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [accentColor, setAccentColor] = useState<'mint' | 'purple'>('purple');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleAccentColorChange = (color: 'mint' | 'purple') => {
    setAccentColor(color);
  };

  const handleTradeClick = (trade: Trade) => {
    setSelectedTrade(trade);
  };

  const handleUpdateTrade = (updatedTrade: Trade) => {
    setTrades(prev => 
      prev.map(trade => 
        trade.id === updatedTrade.id ? updatedTrade : trade
      )
    );
    setSelectedTrade(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <TradingDashboard trades={trades} setTrades={setTrades} accentColor={accentColor} />;
      case 'calendar':
        return (
          <div className="ml-64 p-8 min-h-screen trading-gradient">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Trading Calendar</h1>
              <p className="text-gray-400">View and manage your trades by date</p>
            </div>
            <TradeCalendar trades={trades} onTradeClick={handleTradeClick} />
          </div>
        );
      case 'analytics':
        return <AnalyticsPage trades={trades} accentColor={accentColor} />;
      case 'portfolio':
        return <PortfolioPage trades={trades} accentColor={accentColor} />;
      case 'market':
        return <MarketOverview accentColor={accentColor} />;
      case 'news':
        return <TradingNews accentColor={accentColor} />;
      case 'journal':
        return (
          <div className="ml-64 p-8 min-h-screen trading-gradient">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Trading Journal</h1>
              <p className="text-gray-400">Document your trading journey and insights</p>
            </div>
            <div className="text-white text-center py-20">
              <h2 className="text-2xl mb-4">📝 Trading Journal</h2>
              <p className="text-gray-400">Coming soon - Advanced journaling features</p>
            </div>
          </div>
        );
      case 'risk':
        return (
          <div className="ml-64 p-8 min-h-screen trading-gradient">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Risk Management</h1>
              <p className="text-gray-400">Monitor and control your trading risk</p>
            </div>
            <div className="text-white text-center py-20">
              <h2 className="text-2xl mb-4">🛡️ Risk Management</h2>
              <p className="text-gray-400">Coming soon - Advanced risk management tools</p>
            </div>
          </div>
        );
      case 'goals':
        return (
          <div className="ml-64 p-8 min-h-screen trading-gradient">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Goals & Targets</h1>
              <p className="text-gray-400">Set and track your trading objectives</p>
            </div>
            <div className="text-white text-center py-20">
              <h2 className="text-2xl mb-4">🎯 Goals & Targets</h2>
              <p className="text-gray-400">Coming soon - Goal setting and tracking</p>
            </div>
          </div>
        );
      case 'settings':
        return <SettingsPage accentColor={accentColor} onAccentColorChange={handleAccentColorChange} />;
      default:
        return <TradingDashboard trades={trades} setTrades={setTrades} accentColor={accentColor} />;
    }
  };

  return (
    <div className="min-h-screen trading-gradient">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        accentColor={accentColor}
      />
      {renderCurrentPage()}
      
      {selectedTrade && (
        <TradeDetailsModal
          trade={selectedTrade}
          onClose={() => setSelectedTrade(null)}
          onUpdate={handleUpdateTrade}
        />
      )}
    </div>
  );
};

export default MainApp;
