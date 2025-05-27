
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, Plus, BarChart3, Target, DollarSign } from 'lucide-react';
import TradeCalendar from './TradeCalendar';
import AddTradeForm from './AddTradeForm';
import TradeDetailsModal from './TradeDetailsModal';
import ProgressCharts from './ProgressCharts';

export interface Trade {
  id: string;
  date: Date;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  entryPrice: number;
  exitPrice?: number;
  pnl: number;
  remarks?: string;
  status: 'open' | 'closed';
}

const TradingDashboard: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'calendar' | 'progress'>('calendar');

  // Calculate statistics
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const profitableTrades = trades.filter(trade => trade.pnl > 0).length;
  const totalTrades = trades.length;
  const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;

  // Weekly progress (mock data for now)
  const weeklyGoal = 1000;
  const weeklyProgress = Math.min((totalPnL / weeklyGoal) * 100, 100);

  // Monthly progress
  const monthlyGoal = 5000;
  const monthlyProgress = Math.min((totalPnL / monthlyGoal) * 100, 100);

  const handleAddTrade = (trade: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString(),
    };
    setTrades(prev => [...prev, newTrade]);
    setShowAddForm(false);
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

  return (
    <div className="min-h-screen trading-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-trading-mint mr-3" />
            <h1 className="text-3xl font-bold text-white">Trading Dashboard</h1>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-mint hover:scale-105 transform transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Trade
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="trading-card border-trading-mint/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-trading-mint" />
                Total PnL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-trading-profit' : 'text-trading-loss'}`}>
                ${totalPnL.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Target className="h-4 w-4 mr-2 text-trading-mint" />
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {winRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Weekly Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">
                ${totalPnL.toFixed(0)} / ${weeklyGoal}
              </div>
              <Progress value={weeklyProgress} className="h-2" />
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">
                ${totalPnL.toFixed(0)} / ${monthlyGoal}
              </div>
              <Progress value={monthlyProgress} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'calendar' ? 'default' : 'outline'}
            onClick={() => setActiveTab('calendar')}
            className={activeTab === 'calendar' ? 'bg-gradient-mint' : 'border-trading-mint/30 text-white hover:bg-trading-mint/20'}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button
            variant={activeTab === 'progress' ? 'default' : 'outline'}
            onClick={() => setActiveTab('progress')}
            className={activeTab === 'progress' ? 'bg-gradient-mint' : 'border-trading-mint/30 text-white hover:bg-trading-mint/20'}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Progress Analytics
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {activeTab === 'calendar' ? (
            <TradeCalendar trades={trades} onTradeClick={handleTradeClick} />
          ) : (
            <ProgressCharts trades={trades} />
          )}
        </div>

        {/* Modals */}
        {showAddForm && (
          <AddTradeForm 
            onSubmit={handleAddTrade}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {selectedTrade && (
          <TradeDetailsModal
            trade={selectedTrade}
            onClose={() => setSelectedTrade(null)}
            onUpdate={handleUpdateTrade}
          />
        )}
      </div>
    </div>
  );
};

export default TradingDashboard;
