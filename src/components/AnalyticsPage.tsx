
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Area, AreaChart } from 'recharts';
import { Trade } from '@/types/Trade';
import { TrendingUp, TrendingDown, Target, Activity, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { gsap } from 'gsap';

interface AnalyticsPageProps {
  trades: Trade[];
  accentColor: 'mint' | 'purple';
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ trades, accentColor }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

  const accentColorValue = accentColor === 'mint' ? '#10b981' : '#8b5cf6';

  useEffect(() => {
    if (pageRef.current) {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    if (chartsRef.current?.children) {
      gsap.from(chartsRef.current.children, {
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

  // Symbol performance
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
      existing.volume += trade.quantity * trade.entryPrice;
    } else {
      acc.push({ 
        month, 
        pnl: trade.pnl, 
        volume: trade.quantity * trade.entryPrice,
        trades: 1 
      });
    }
    return acc;
  }, [] as Array<{ month: string; pnl: number; volume: number; trades: number }>);

  const COLORS = [accentColorValue, '#ef4444', '#f59e0b', '#06b6d4', '#8b5cf6', '#ec4899'];

  return (
    <div ref={pageRef} className="p-4 lg:p-8 ml-0 lg:ml-72 min-h-screen trading-gradient">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Advanced Analytics</h1>
        <p className="text-gray-400 text-sm lg:text-base">Deep insights into your trading performance and patterns</p>
      </div>

      {/* Key Metrics - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <Card className="trading-card">
          <CardHeader className="pb-2 lg:pb-3 p-3 lg:p-6">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <Activity className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className={`text-xl lg:text-3xl font-bold ${winRate >= 60 ? 'profit-glow' : winRate >= 40 ? 'text-yellow-400' : 'loss-glow'}`}>
              {winRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {winningTrades}W / {losingTrades}L
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2 lg:pb-3 p-3 lg:p-6">
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
              {totalTrades} trades
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2 lg:pb-3 p-3 lg:p-6">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <TrendingUp className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Avg Win
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-xl lg:text-3xl font-bold profit-glow">
              ${avgWin.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Per winning trade
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2 lg:pb-3 p-3 lg:p-6">
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
              Per losing trade
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Mobile Responsive */}
      <div ref={chartsRef} className="space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Symbol Performance */}
          <Card className="trading-card">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-white text-lg lg:text-xl">Symbol Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6 pt-0">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={symbolPerformance}>
                  <XAxis dataKey="symbol" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="pnl" 
                    fill={accentColorValue}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Performance */}
          <Card className="trading-card">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-white text-lg lg:text-xl">Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6 pt-0">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pnl" 
                    stroke={accentColorValue} 
                    fill={`${accentColorValue}20`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trading Volume Chart */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Trading Volume Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
