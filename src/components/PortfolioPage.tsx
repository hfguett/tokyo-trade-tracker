
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Target, Eye, AlertTriangle } from 'lucide-react';
import { Trade } from './TradingDashboard';
import { gsap } from 'gsap';

interface PortfolioPageProps {
  trades: Trade[];
  accentColor: 'mint' | 'purple';
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ trades, accentColor }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const accentColorValue = accentColor === 'mint' ? '#10b981' : '#8b5cf6';

  useEffect(() => {
    gsap.from(pageRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(cardsRef.current?.children, {
      y: 80,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.3
    });
  }, []);

  // Portfolio calculations
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalInvested = trades.reduce((sum, trade) => sum + (trade.quantity * trade.entryPrice), 0);
  const roi = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
  
  // Asset distribution
  const assetDistribution = trades.reduce((acc, trade) => {
    const existing = acc.find(item => item.symbol === trade.symbol);
    if (existing) {
      existing.value += Math.abs(trade.pnl);
    } else {
      acc.push({ symbol: trade.symbol, value: Math.abs(trade.pnl) });
    }
    return acc;
  }, [] as Array<{ symbol: string; value: number }>);

  // Monthly performance
  const monthlyPerformance = trades.reduce((acc, trade) => {
    const month = trade.date.toLocaleString('default', { month: 'short', year: '2-digit' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.pnl += trade.pnl;
    } else {
      acc.push({ month, pnl: trade.pnl });
    }
    return acc;
  }, [] as Array<{ month: string; pnl: number }>);

  const COLORS = [accentColorValue, '#ef4444', '#f59e0b', '#06b6d4', '#8b5cf6'];

  return (
    <div ref={pageRef} className="p-8 ml-64 min-h-screen trading-gradient">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Portfolio Overview</h1>
        <p className="text-gray-400">Comprehensive view of your trading portfolio performance</p>
      </div>

      {/* Key Metrics */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="trading-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <DollarSign className={`h-4 w-4 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${totalPnL >= 0 ? 'profit-glow' : 'loss-glow'}`}>
              ${totalPnL.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Total P&L
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Target className={`h-4 w-4 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${roi >= 0 ? 'profit-glow' : 'loss-glow'}`}>
              {roi.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Return on Investment
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Eye className={`h-4 w-4 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              ${totalInvested.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Capital Deployed
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <AlertTriangle className={`h-4 w-4 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              7.2/10
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Portfolio Risk
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Asset Distribution */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white">Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill={accentColorValue}
                  dataKey="value"
                  label={({ symbol, percent }) => `${symbol} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Performance */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPerformance}>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar 
                  dataKey="pnl" 
                  fill={accentColorValue}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white">Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Sharpe Ratio</span>
              <span className="text-white font-bold">1.45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Max Drawdown</span>
              <span className="text-red-400 font-bold">-12.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Volatility</span>
              <span className="text-yellow-400 font-bold">18.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Beta</span>
              <span className="text-white font-bold">0.85</span>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white">Goals Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Monthly Goal</span>
                <span className="text-white">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Yearly Goal</span>
                <span className="text-white">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Win Rate Goal</span>
                <span className="text-white">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trades
              .sort((a, b) => b.pnl - a.pnl)
              .slice(0, 5)
              .map((trade, index) => (
                <div key={trade.id} className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium">{trade.symbol}</span>
                    <div className="text-xs text-gray-400">
                      {trade.date.toLocaleDateString()}
                    </div>
                  </div>
                  <Badge
                    variant={trade.pnl >= 0 ? 'default' : 'destructive'}
                    className={trade.pnl >= 0 ? 
                      `${accentColor === 'mint' ? 'bg-trading-profit' : 'bg-purple-600'} shadow-lg` : 
                      'bg-trading-loss shadow-lg'
                    }
                  >
                    ${trade.pnl.toFixed(2)}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioPage;
