
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, Calendar, Clock, Target } from 'lucide-react';
import { Trade } from './TradingDashboard';
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
    gsap.from(pageRef.current, {
      opacity: 0,
      x: 100,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(chartsRef.current?.children, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
      delay: 0.4
    });
  }, []);

  // Create cumulative P&L data
  const cumulativePnL = trades
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .reduce((acc, trade, index) => {
      const cumulative = index === 0 ? trade.pnl : acc[index - 1].cumulative + trade.pnl;
      acc.push({
        date: trade.date.toLocaleDateString(),
        cumulative,
        pnl: trade.pnl,
        symbol: trade.symbol
      });
      return acc;
    }, [] as Array<{ date: string; cumulative: number; pnl: number; symbol: string }>);

  // Daily performance
  const dailyPerformance = trades.reduce((acc, trade) => {
    const date = trade.date.toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.totalPnL += trade.pnl;
      existing.trades += 1;
    } else {
      acc.push({ date, totalPnL: trade.pnl, trades: 1 });
    }
    return acc;
  }, [] as Array<{ date: string; totalPnL: number; trades: number }>);

  // Symbol performance
  const symbolPerformance = trades.reduce((acc, trade) => {
    const existing = acc.find(item => item.symbol === trade.symbol);
    if (existing) {
      existing.totalPnL += trade.pnl;
      existing.trades += 1;
      existing.winRate = (existing.wins / existing.trades) * 100;
      if (trade.pnl > 0) existing.wins += 1;
    } else {
      acc.push({
        symbol: trade.symbol,
        totalPnL: trade.pnl,
        trades: 1,
        wins: trade.pnl > 0 ? 1 : 0,
        winRate: trade.pnl > 0 ? 100 : 0
      });
    }
    return acc;
  }, [] as Array<{ symbol: string; totalPnL: number; trades: number; wins: number; winRate: number }>);

  return (
    <div ref={pageRef} className="p-8 ml-64 min-h-screen trading-gradient">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Advanced Analytics</h1>
        <p className="text-gray-400">Deep insights into your trading performance and patterns</p>
      </div>

      <div ref={chartsRef} className="space-y-8">
        {/* Cumulative P&L Chart */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Cumulative P&L Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={cumulativePnL}>
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: `1px solid ${accentColorValue}`, 
                    borderRadius: '8px' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke={accentColorValue} 
                  fill={`${accentColorValue}20`}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Performance and Trade Count */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
                Daily P&L Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyPerformance}>
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar 
                    dataKey="totalPnL" 
                    fill={accentColorValue}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
                Trading Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyPerformance}>
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="trades" 
                    stroke={accentColorValue} 
                    strokeWidth={3}
                    dot={{ fill: accentColorValue, strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Symbol Performance Analysis */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Symbol Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {symbolPerformance.map((symbol, index) => (
                <div key={symbol.symbol} className="p-4 rounded-xl border border-trading-mint/30 bg-trading-blue/40">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">{symbol.symbol}</h3>
                    <span className={`text-sm font-medium ${symbol.totalPnL >= 0 ? 'profit-glow' : 'loss-glow'}`}>
                      ${symbol.totalPnL.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Trades:</span>
                      <span className="text-white">{symbol.trades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Win Rate:</span>
                      <span className="text-white">{symbol.winRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Avg per Trade:</span>
                      <span className={symbol.totalPnL >= 0 ? 'profit-glow' : 'loss-glow'}>
                        ${(symbol.totalPnL / symbol.trades).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="text-white">Trading Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Best Trading Day</span>
                <span className="text-white">Monday</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg Holding Period</span>
                <span className="text-white">2.3 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Most Traded Symbol</span>
                <span className="text-white">{symbolPerformance[0]?.symbol || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Longest Win Streak</span>
                <span className="profit-glow">7 trades</span>
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="text-white">Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Risk/Reward Ratio</span>
                <span className="text-white">1:2.4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Max Risk per Trade</span>
                <span className="text-yellow-400">2.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Portfolio Heat</span>
                <span className="text-red-400">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Recovery Factor</span>
                <span className="text-white">3.2</span>
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="text-white">Performance Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${accentColor === 'mint' ? 'profit-glow' : 'text-purple-400'}`}>
                  8.5/10
                </div>
                <p className="text-gray-300 text-sm">Overall Performance</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Consistency</span>
                  <span className="text-white">9/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Risk Management</span>
                  <span className="text-white">8/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Profitability</span>
                  <span className="text-white">8.5/10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
