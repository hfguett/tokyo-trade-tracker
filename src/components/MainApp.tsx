
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
import JournalPage from './JournalPage';
import RiskManagementPage from './RiskManagementPage';
import GoalsPage from './GoalsPage';
import WorldClockPage from './WorldClockPage';
import WalletPage from './WalletPage';
import { Trade } from '@/types/Trade';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [accentColor, setAccentColor] = useState<'mint' | 'purple'>('mint');
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
        return <TradingDashboard trades={trades} setTrades={setTrades} accentColor={accentColor} onTradeClick={handleTradeClick} />;
      case 'calendar':
        return (
          <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Trading Calendar</h1>
              <p className="text-gray-400">View and manage your trades by date</p>
            </div>
            <TradeCalendar trades={trades} onTradeClick={handleTradeClick} />
          </div>
        );
      case 'analytics':
        return <AnalyticsPage trades={trades} accentColor={accentColor} />;
      case 'portfolio':
        return <PortfolioPage trades={trades} accentColor={accentColor} setTrades={setTrades} />;
      case 'market':
        return <MarketOverview accentColor={accentColor} />;
      case 'news':
        return <TradingNews accentColor={accentColor} />;
      case 'journal':
        return <JournalPage accentColor={accentColor} />;
      case 'risk':
        return <RiskManagementPage trades={trades} accentColor={accentColor} />;
      case 'goals':
        return <GoalsPage trades={trades} accentColor={accentColor} />;
      case 'worldclock':
        return <WorldClockPage accentColor={accentColor} />;
      case 'wallet':
        return <WalletPage accentColor={accentColor} />;
      case 'settings':
        return <SettingsPage accentColor={accentColor} onAccentColorChange={handleAccentColorChange} />;
      default:
        return <TradingDashboard trades={trades} setTrades={setTrades} accentColor={accentColor} onTradeClick={handleTradeClick} />;
    }
  };

  return (
    <div className="min-h-screen trading-gradient w-full">
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
