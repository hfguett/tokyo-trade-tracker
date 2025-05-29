
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, TrendingUp, Calendar, DollarSign, Plus, Trophy } from 'lucide-react';
import { Trade } from './TradingDashboard';

interface GoalsPageProps {
  trades: Trade[];
  accentColor: 'mint' | 'purple';
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: Date;
  type: 'profit' | 'trades' | 'winrate';
}

const GoalsPage: React.FC<GoalsPageProps> = ({ trades, accentColor }) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Monthly Profit Target',
      target: 5000,
      current: 0,
      deadline: new Date(2024, 11, 31),
      type: 'profit'
    },
    {
      id: '2',
      title: 'Win Rate Goal',
      target: 70,
      current: 0,
      deadline: new Date(2024, 11, 31),
      type: 'winrate'
    },
    {
      id: '3',
      title: 'Trade Volume',
      target: 100,
      current: 0,
      deadline: new Date(2024, 11, 31),
      type: 'trades'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    type: 'profit' as 'profit' | 'trades' | 'winrate',
    deadline: ''
  });

  // Calculate current values based on trades
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winRate = trades.length > 0 ? (trades.filter(t => t.pnl > 0).length / trades.length) * 100 : 0;
  const totalTrades = trades.length;

  const updateGoalProgress = (goal: Goal) => {
    switch (goal.type) {
      case 'profit':
        return { ...goal, current: totalPnL };
      case 'winrate':
        return { ...goal, current: winRate };
      case 'trades':
        return { ...goal, current: totalTrades };
      default:
        return goal;
    }
  };

  const updatedGoals = goals.map(updateGoalProgress);

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        target: parseFloat(newGoal.target),
        current: 0,
        deadline: new Date(newGoal.deadline),
        type: newGoal.type
      };
      setGoals(prev => [...prev, goal]);
      setNewGoal({ title: '', target: '', type: 'profit', deadline: '' });
      setShowAddForm(false);
    }
  };

  const accentClass = accentColor === 'mint' ? 'bg-gradient-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-64 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Goals & Targets</h1>
            <p className="text-gray-400">Set and track your trading objectives</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className={`mt-4 lg:mt-0 ${accentClass} hover:scale-105 transform transition-all duration-300 shadow-lg glow-effect`}
          >
            <Plus className="h-5 w-5 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-trading-mint" />
                Total Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold glow-text ${totalPnL >= 0 ? 'text-trading-mint' : 'text-red-400'}`}>
                ${totalPnL.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Target className="h-4 w-4 mr-2 text-trading-mint" />
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white glow-text">
                {winRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-trading-mint" />
                Total Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white glow-text">
                {totalTrades}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="trading-card mb-8 border-trading-mint/30">
          <CardHeader>
            <CardTitle className="text-white">Set New Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Goal Title</Label>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white"
                placeholder="e.g., Q4 Profit Target"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Goal Type</Label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full p-2 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
                >
                  <option value="profit">Profit Target ($)</option>
                  <option value="trades">Number of Trades</option>
                  <option value="winrate">Win Rate (%)</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-300">Target Value</Label>
                <Input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="1000"
                />
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Deadline</Label>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white"
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleAddGoal} className={`flex-1 ${accentClass}`}>
                Create Goal
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1 border-trading-mint/30 text-white">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-6">
        {updatedGoals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isCompleted = goal.current >= goal.target;
          const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

          return (
            <Card key={goal.id} className={`trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover ${isCompleted ? 'border-green-500/50' : ''}`}>
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                  <div>
                    <CardTitle className="text-white text-lg flex items-center">
                      {isCompleted && <Trophy className="h-5 w-5 mr-2 text-yellow-400" />}
                      {goal.title}
                    </CardTitle>
                    <div className="text-sm text-gray-400 mt-1">
                      Due: {goal.deadline.toLocaleDateString()}
                      {daysLeft > 0 && <span className="ml-2">({daysLeft} days left)</span>}
                    </div>
                  </div>
                  <div className="mt-2 lg:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isCompleted ? 'bg-green-600/20 text-green-400' :
                      progress > 50 ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-blue-600/20 text-blue-400'
                    }`}>
                      {isCompleted ? 'Completed' : `${progress.toFixed(1)}% Complete`}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">
                      {goal.current.toFixed(goal.type === 'winrate' ? 1 : 0)}
                      {goal.type === 'profit' && '$'}
                      {goal.type === 'winrate' && '%'}
                    </span>
                    <span className="text-white font-bold">
                      {goal.target}
                      {goal.type === 'profit' && '$'}
                      {goal.type === 'winrate' && '%'}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="text-xs text-gray-400">
                    {goal.type === 'profit' && `$${(goal.target - goal.current).toFixed(2)} remaining`}
                    {goal.type === 'winrate' && `${(goal.target - goal.current).toFixed(1)}% to go`}
                    {goal.type === 'trades' && `${goal.target - goal.current} more trades needed`}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {updatedGoals.length === 0 && (
          <Card className="trading-card">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <div className="text-xl text-gray-300 mb-2">No goals set yet</div>
              <div className="text-sm text-gray-400">Create your first trading goal to track progress</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
