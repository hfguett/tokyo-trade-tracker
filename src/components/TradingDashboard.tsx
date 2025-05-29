
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, Plus, BarChart3, Target, DollarSign, Bell, Settings, User, Filter, Download } from 'lucide-react';
import TradeCalendar from './TradeCalendar';
import AddTradeForm from './AddTradeForm';
import TradeDetailsModal from './TradeDetailsModal';
import ProgressCharts from './ProgressCharts';
import { gsap } from 'gsap';

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
  const statsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate statistics
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const profitableTrades = trades.filter(trade => trade.pnl > 0).length;
  const totalTrades = trades.length;
  const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;
  const avgTrade = totalTrades > 0 ? totalPnL / totalTrades : 0;
  const maxWin = trades.length > 0 ? Math.max(...trades.map(t => t.pnl)) : 0;
  const maxLoss = trades.length > 0 ? Math.min(...trades.map(t => t.pnl)) : 0;
  const profitFactor = trades.length > 0 ? 
    Math.abs(trades.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0) / 
    trades.filter(t => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0)) : 0;

  // Progress goals
  const weeklyGoal = 1000;
  const monthlyGoal = 5000;
  const yearlyGoal = 50000;
  const weeklyProgress = Math.min((totalPnL / weeklyGoal) * 100, 100);
  const monthlyProgress = Math.min((totalPnL / monthlyGoal) * 100, 100);
  const yearlyProgress = Math.min((totalPnL / yearlyGoal) * 100, 100);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current?.children, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });

    // Stats cards animation
    gsap.from(statsRef.current?.children, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.3
    });

    // Content animation
    gsap.from(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.8
    });
  }, []);

  const handleAddTrade = (trade: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString(),
    };
    setTrades(prev => [...prev, newTrade]);
    setShowAddForm(false);

    // Animate new trade addition
    gsap.from(statsRef.current?.children, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
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
        {/* Enhanced Header */}
        <div ref={headerRef} className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="relative">
              <TrendingUp className="h-10 w-10 text-trading-mint mr-4" />
              <div className="absolute inset-0 bg-trading-mint/30 rounded-full blur-lg"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Elite Trading Dashboard</h1>
              <p className="text-gray-400 mt-1">Professional portfolio management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-trading-mint/30 text-white hover:bg-trading-mint/20">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            <Button variant="outline" className="border-trading-mint/30 text-white hover:bg-trading-mint/20">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-trading-mint/30 text-white hover:bg-trading-mint/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-mint hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-mint-500/25"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Trade
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-trading-mint" />
                Total PnL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${totalPnL >= 0 ? 'profit-glow' : 'loss-glow'}`}>
                ${totalPnL.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {totalTrades} trades
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Target className="h-4 w-4 mr-2 text-trading-mint" />
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {winRate.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {profitableTrades} wins
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Average Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${avgTrade >= 0 ? 'profit-glow' : 'loss-glow'}`}>
                ${avgTrade.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Max Win</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold profit-glow">
                ${maxWin.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Max Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold loss-glow">
                ${maxLoss.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Profit Factor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {profitFactor.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white mb-2">
                ${totalPnL.toFixed(0)} / ${monthlyGoal}
              </div>
              <Progress value={monthlyProgress} className="h-2" />
              <div className="text-xs text-trading-mint mt-1">
                {monthlyProgress.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'calendar' ? 'default' : 'outline'}
            onClick={() => setActiveTab('calendar')}
            className={activeTab === 'calendar' ? 
              'bg-gradient-mint shadow-lg' : 
              'border-trading-mint/30 text-white hover:bg-trading-mint/20 hover:border-trading-mint/50'
            }
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button
            variant={activeTab === 'progress' ? 'default' : 'outline'}
            onClick={() => setActiveTab('progress')}
            className={activeTab === 'progress' ? 
              'bg-gradient-mint shadow-lg' : 
              'border-trading-mint/30 text-white hover:bg-trading-mint/20 hover:border-trading-mint/50'
            }
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics & Progress
          </Button>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="space-y-6">
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
