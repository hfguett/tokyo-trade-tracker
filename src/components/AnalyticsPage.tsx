
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Activity, BarChart3 } from 'lucide-react';
import { Trade } from '@/types/Trade';
import { gsap } from 'gsap';

interface AnalyticsPageProps {
  trades: Trade[];
  accentColor: 'mint' | 'purple';
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ trades, accentColor }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    if (cardsRef.current?.children) {
      gsap.from(cardsRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3
      });
    }
  }, []);

  // Calculate analytics data
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.pnl > 0).length;
  const losingTrades = trades.filter(trade => trade.pnl < 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const avgWin = winningTrades > 0 ? trades.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0) / winningTrades : 0;
  const avgLoss = losingTrades > 0 ? Math.abs(trades.filter(t => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0) / losingTrades) : 0;

  const COLORS = [accentColor === 'mint' ? '#10b981' : '#8b5cf6', '#ef4444', '#f59e0b', '#06b6d4'];

  // Performance by symbol
  const symbolPerformance = trades.reduce((acc, trade) => {
    const existing = acc.find(item => item.symbol === trade.symbol);
    if (existing) {
      existing.pnl += trade.pnl;
      existing.trades += 1;
    } else {
      acc.push({ symbol: trade.symbol, pnl: trade.pnl, trades: 1 });
    }
    return acc;
  }, [] as Array<{ symbol: string; pnl: number; trades: number }>);

  // Monthly performance
  const monthlyData = trades.reduce((acc, trade) => {
    const month = trade.date.toLocaleString('default', { month: 'short', year: '2-digit' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.pnl += trade.pnl;
      existing.trades += 1;
    } else {
      acc.push({ month, pnl: trade.pnl, trades: 1 });
    }
    return acc;
  }, [] as Array<{ month: string; pnl: number; trades: number }>);

  return (
    <div ref={pageRef} className="p-4 lg:p-8 ml-0 lg:ml-72 min-h-screen trading-gradient">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Advanced Analytics</h1>
        <p className="text-gray-400 text-sm lg:text-base">Comprehensive analysis of your trading performance</p>
      </div>

      {/* Key Metrics - Mobile Optimized */}
      <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <TrendingUp className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className={`text-xl lg:text-3xl font-bold ${winRate >= 60 ? 'profit-glow' : 'text-yellow-400'}`}>
              {winRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {winningTrades}/{totalTrades} trades
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <DollarSign className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Total P&L
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className={`text-xl lg:text-3xl font-bold ${totalPnL >= 0 ? 'profit-glow' : 'loss-glow'}`}>
              ${totalPnL.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              All time
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <Target className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Avg Win
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-xl lg:text-3xl font-bold profit-glow">
              ${avgWin.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Per trade
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <TrendingDown className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Avg Loss
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-xl lg:text-3xl font-bold loss-glow">
              ${avgLoss.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Per trade
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Symbol Performance */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6 mr-2 text-trading-mint" />
              Performance by Symbol
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={symbolPerformance.slice(0, 10)}>
                <XAxis dataKey="symbol" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="pnl" fill={accentColor === 'mint' ? '#10b981' : '#8b5cf6'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Performance */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Activity className="h-5 w-5 lg:h-6 lg:w-6 mr-2 text-trading-mint" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke={accentColor === 'mint' ? '#10b981' : '#8b5cf6'} 
                  strokeWidth={3}
                  dot={{ fill: accentColor === 'mint' ? '#10b981' : '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Profit Factor</span>
              <span className="text-white font-bold">
                {avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Largest Win</span>
              <span className="text-green-400 font-bold">
                ${Math.max(...trades.map(t => t.pnl), 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Largest Loss</span>
              <span className="text-red-400 font-bold">
                ${Math.min(...trades.map(t => t.pnl), 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Total Trades</span>
              <span className="text-white font-bold">{totalTrades}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Trading Frequency</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">This Month</span>
              <span className="text-white font-bold">
                {trades.filter(t => t.date.getMonth() === new Date().getMonth()).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">This Week</span>
              <span className="text-white font-bold">
                {trades.filter(t => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return t.date >= weekAgo;
                }).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Today</span>
              <span className="text-white font-bold">
                {trades.filter(t => 
                  t.date.toDateString() === new Date().toDateString()
                ).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Avg/Day</span>
              <span className="text-white font-bold">
                {totalTrades > 0 ? (totalTrades / 30).toFixed(1) : '0'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Top Symbols</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-2 lg:space-y-3">
            {symbolPerformance
              .sort((a, b) => b.pnl - a.pnl)
              .slice(0, 5)
              .map((item, index) => (
                <div key={item.symbol} className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium text-sm lg:text-base">{item.symbol}</span>
                    <div className="text-xs text-gray-400">
                      {item.trades} trades
                    </div>
                  </div>
                  <Badge
                    variant={item.pnl >= 0 ? 'default' : 'destructive'}
                    className={`text-xs lg:text-sm ${item.pnl >= 0 ? 
                      `${accentColor === 'mint' ? 'bg-trading-profit' : 'bg-purple-600'} shadow-lg` : 
                      'bg-trading-loss shadow-lg'
                    }`}
                  >
                    ${item.pnl.toFixed(2)}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
