
import React, { useState, useEffect } from 'react';
import TradeForm from './TradeForm';
import EnhancedDashboard from './EnhancedDashboard';
import { Trade } from '@/types/Trade';

interface TradingDashboardProps {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
  accentColor: 'mint' | 'purple';
  onTradeClick?: (trade: Trade) => void;
}

const TradingDashboard: React.FC<TradingDashboardProps> = ({ trades, setTrades, accentColor, onTradeClick }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTrade = (trade: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString()
    };
    setTrades(prev => [...prev, newTrade]);
    setShowAddForm(false);
  };

  return (
    <div className="relative">
      <EnhancedDashboard 
        accentColor={accentColor} 
        onAddTrade={() => setShowAddForm(true)} 
        trades={trades} 
        onTradeClick={onTradeClick} 
      />
      
      {showAddForm && (
        <TradeForm
          onSubmit={handleAddTrade}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default TradingDashboard;
