
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Plus, DollarSign, Target, Bell, Settings, Download } from 'lucide-react';
import AddTradeForm from './AddTradeForm';
import TradeDetailsModal from './TradeDetailsModal';
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

interface TradingDashboardProps {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
  accentColor: 'mint' | 'purple';
}

const TradingDashboard: React.FC<TradingDashboardProps> = ({ trades, setTrades, accentColor }) => {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
  const monthlyProgress = Math.min((totalPnL / monthlyGoal) * 100, 100);

  const accentClass = accentColor === 'mint' ? 'bg-gradient-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';
  const hoverClass = accentColor === 'mint' ? 'hover:shadow-mint-500/25' : 'hover:shadow-purple-500/25';

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

  const handleUpdateTrade = (updatedTrade: Trade) => {
    setTrades(prev => 
      prev.map(trade => 
        trade.id === updatedTrade.id ? updatedTrade : trade
      )
    );
    setSelectedTrade(null);
  };

  return (
    <div className="ml-64 p-8 min-h-screen">
      {/* Enhanced Header */}
      <div ref={headerRef} className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="relative">
            <TrendingUp className={`h-10 w-10 mr-4 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
            <div className={`absolute inset-0 ${accentColor === 'mint' ? 'bg-trading-mint/30' : 'bg-purple-400/30'} rounded-full blur-lg`}></div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Elite Trading Dashboard</h1>
            <p className="text-gray-400 mt-1">Professional portfolio management</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className={`${accentColor === 'mint' ? 'border-trading-mint/30' : 'border-purple-500/30'} text-white ${accentColor === 'mint' ? 'hover:bg-trading-mint/20' : 'hover:bg-purple-500/20'}`}>
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
          <Button variant="outline" className={`${accentColor === 'mint' ? 'border-trading-mint/30' : 'border-purple-500/30'} text-white ${accentColor === 'mint' ? 'hover:bg-trading-mint/20' : 'hover:bg-purple-500/20'}`}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setShowAddForm(true)}
            className={`${accentClass} hover:scale-105 transform transition-all duration-300 shadow-lg ${hoverClass}`}
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
              <DollarSign className={`h-4 w-4 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
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
              <Target className={`h-4 w-4 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
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
            <div className={`text-xs mt-1 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`}>
              {monthlyProgress.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trades */}
      <div ref={contentRef}>
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            {trades.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📊</div>
                <div className="text-lg text-gray-300">No trades yet</div>
                <div className="text-sm text-gray-400 mt-2">Add your first trade to get started</div>
              </div>
            ) : (
              <div className="space-y-3">
                {trades.slice(-5).reverse().map((trade) => (
                  <div
                    key={trade.id}
                    className="p-4 rounded-xl border border-trading-mint/30 bg-trading-blue/40 cursor-pointer hover:bg-trading-mint/10 hover:border-trading-mint/50 transition-all duration-300"
                    onClick={() => setSelectedTrade(trade)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">{trade.symbol}</div>
                        <div className="text-sm text-gray-300">
                          {trade.type.toUpperCase()} {trade.quantity} @ ${trade.entryPrice}
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${trade.pnl >= 0 ? 'profit-glow' : 'loss-glow'}`}>
                        ${trade.pnl.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
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
  );
};

export default TradingDashboard;
