
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Trade } from './TradingDashboard';
import { format, startOfWeek, startOfMonth, isWithinInterval, subDays, subWeeks, subMonths } from 'date-fns';

interface ProgressChartsProps {
  trades: Trade[];
}

const ProgressCharts: React.FC<ProgressChartsProps> = ({ trades }) => {
  // Calculate daily PnL for the last 30 days
  const dailyData = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayTrades = trades.filter(trade => 
      format(trade.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    const dayPnL = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    
    dailyData.push({
      date: format(date, 'MMM dd'),
      pnl: dayPnL,
      trades: dayTrades.length
    });
  }

  // Calculate weekly PnL for the last 12 weeks
  const weeklyData = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = startOfWeek(subWeeks(new Date(), i));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const weekTrades = trades.filter(trade => 
      isWithinInterval(trade.date, { start: weekStart, end: weekEnd })
    );
    const weekPnL = weekTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    
    weeklyData.push({
      week: format(weekStart, 'MMM dd'),
      pnl: weekPnL,
      trades: weekTrades.length
    });
  }

  // Calculate monthly PnL for the last 6 months
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(new Date(), i));
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth() + 1);
    monthEnd.setDate(monthEnd.getDate() - 1);
    
    const monthTrades = trades.filter(trade => 
      isWithinInterval(trade.date, { start: monthStart, end: monthEnd })
    );
    const monthPnL = monthTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    
    monthlyData.push({
      month: format(monthStart, 'MMM yyyy'),
      pnl: monthPnL,
      trades: monthTrades.length
    });
  }

  // Win/Loss distribution
  const profitableTrades = trades.filter(trade => trade.pnl > 0).length;
  const losingTrades = trades.filter(trade => trade.pnl < 0).length;
  const breakEvenTrades = trades.filter(trade => trade.pnl === 0).length;

  const winLossData = [
    { name: 'Profitable', value: profitableTrades, color: '#10b981' },
    { name: 'Losses', value: losingTrades, color: '#ef4444' },
    { name: 'Break Even', value: breakEvenTrades, color: '#64748b' }
  ];

  // Goals and progress
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const weeklyGoal = 1000;
  const monthlyGoal = 5000;
  const yearlyGoal = 50000;

  const weeklyProgress = Math.min((totalPnL / weeklyGoal) * 100, 100);
  const monthlyProgress = Math.min((totalPnL / monthlyGoal) * 100, 100);
  const yearlyProgress = Math.min((totalPnL / yearlyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Goals Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="trading-card border-trading-mint/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Weekly Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Progress</span>
                <span className="text-white">${totalPnL.toFixed(0)} / ${weeklyGoal}</span>
              </div>
              <Progress value={weeklyProgress} className="h-3" />
              <div className="text-right text-sm text-trading-mint">
                {weeklyProgress.toFixed(1)}% Complete
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Monthly Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Progress</span>
                <span className="text-white">${totalPnL.toFixed(0)} / ${monthlyGoal}</span>
              </div>
              <Progress value={monthlyProgress} className="h-3" />
              <div className="text-right text-sm text-trading-mint">
                {monthlyProgress.toFixed(1)}% Complete
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Yearly Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Progress</span>
                <span className="text-white">${totalPnL.toFixed(0)} / ${yearlyGoal}</span>
              </div>
              <Progress value={yearlyProgress} className="h-3" />
              <div className="text-right text-sm text-trading-mint">
                {yearlyProgress.toFixed(1)}% Complete
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily PnL Chart */}
        <Card className="trading-card border-trading-mint/20">
          <CardHeader>
            <CardTitle className="text-white">Daily PnL (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #10b981',
                    borderRadius: '6px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="pnl" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Win/Loss Distribution */}
        <Card className="trading-card border-trading-mint/20">
          <CardHeader>
            <CardTitle className="text-white">Trade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #10b981',
                    borderRadius: '6px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly PnL Trend */}
        <Card className="trading-card border-trading-mint/20">
          <CardHeader>
            <CardTitle className="text-white">Weekly PnL Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #10b981',
                    borderRadius: '6px',
                    color: '#fff'
                  }}
                />
                <Line type="monotone" dataKey="pnl" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly PnL */}
        <Card className="trading-card border-trading-mint/20">
          <CardHeader>
            <CardTitle className="text-white">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #10b981',
                    borderRadius: '6px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="pnl" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressCharts;
