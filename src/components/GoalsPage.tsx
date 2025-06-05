
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, TrendingUp, Calendar, DollarSign, Plus, Trophy, Dice6, Lightbulb, Star } from 'lucide-react';
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
  reward?: string;
}

const GoalsPage: React.FC<GoalsPageProps> = ({ trades, accentColor }) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Monthly Profit Target',
      target: 5000,
      current: 0,
      deadline: new Date(2024, 11, 31),
      type: 'profit',
      reward: 'Upgrade trading setup'
    },
    {
      id: '2',
      title: 'Win Rate Goal',
      target: 70,
      current: 0,
      deadline: new Date(2024, 11, 31),
      type: 'winrate',
      reward: 'Celebrate with team dinner'
    },
    {
      id: '3',
      title: 'Trade Volume',
      target: 100,
      current: 0,
      deadline: new Date(2024, 11, 31),
      type: 'trades',
      reward: 'New trading course'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showRandomGenerator, setShowRandomGenerator] = useState(false);
  const [randomPrompt, setRandomPrompt] = useState('');
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    type: 'profit' as 'profit' | 'trades' | 'winrate',
    deadline: '',
    reward: ''
  });

  const tradingPrompts = [
    "Focus on risk management over profit maximization today",
    "Practice patience - wait for your best setups only",
    "Review your worst trade from last week and identify lessons",
    "Set smaller position sizes and aim for consistency",
    "Focus on one currency pair or asset class today",
    "Practice meditation for 10 minutes before trading",
    "Set a maximum of 3 trades for today",
    "Review market structure before entering any position",
    "Write down your trading plan before market open",
    "Focus on process over outcome today",
    "Practice gratitude for your trading opportunities",
    "Review successful traders' strategies",
    "Focus on support and resistance levels",
    "Practice proper position sizing calculations",
    "Set stop losses before entering any trade"
  ];

  const motivationalQuotes = [
    "The market rewards patience and punishes impatience.",
    "Risk management is the key to long-term success.",
    "Every loss is a lesson in disguise.",
    "Consistency beats perfection in trading.",
    "Your worst enemy in trading is yourself.",
    "Master your emotions, master the markets.",
    "Plan your trades, trade your plan.",
    "The trend is your friend until it ends.",
    "Small profits add up to big gains.",
    "Discipline is the bridge between goals and accomplishment."
  ];

  // Calculate current values based on trades
  const totalPnL = trades.reduce((sum, trade) => sum + (trade.pnl * trade.leverage), 0);
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
        type: newGoal.type,
        reward: newGoal.reward
      };
      setGoals(prev => [...prev, goal]);
      setNewGoal({ title: '', target: '', type: 'profit', deadline: '', reward: '' });
      setShowAddForm(false);
    }
  };

  const generateRandomPrompt = () => {
    const isQuote = Math.random() > 0.5;
    const array = isQuote ? motivationalQuotes : tradingPrompts;
    const randomIndex = Math.floor(Math.random() * array.length);
    setRandomPrompt(array[randomIndex]);
  };

  const accentClass = accentColor === 'mint' ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Goals & Inspiration</h1>
            <p className="text-gray-400">Set targets, track progress, and get daily trading motivation</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => setShowRandomGenerator(true)}
              variant="outline"
              className="border-trading-mint/40 hover:bg-trading-mint/20 text-white"
            >
              <Dice6 className="h-4 w-4 mr-2" />
              Daily Inspiration
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              className={`${accentClass} hover:scale-105 transform transition-all duration-300 shadow-lg glow-effect`}
            >
              <Plus className="h-5 w-5 mr-2" />
              New Goal
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-trading-mint" />
                Total Profit
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className={`text-3xl font-bold glow-text ${totalPnL >= 0 ? 'text-trading-mint' : 'text-red-400'}`}>
                ${totalPnL.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Target className="h-4 w-4 mr-2 text-trading-mint" />
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-white glow-text">
                {winRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-trading-mint" />
                Total Trades
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-white glow-text">
                {totalTrades}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-trading-mint" />
                Goals Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-white glow-text">
                {updatedGoals.filter(g => g.current >= g.target).length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Random Generator Modal */}
      {showRandomGenerator && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <Card className="trading-card w-full max-w-lg">
            <CardHeader className="p-6">
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-trading-mint" />
                  Daily Trading Inspiration
                </span>
                <Button variant="outline" onClick={() => setShowRandomGenerator(false)} className="border-trading-mint/30 text-white">
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <Button onClick={generateRandomPrompt} className={`${accentClass} mb-6`}>
                  <Dice6 className="h-5 w-5 mr-2" />
                  Generate Inspiration
                </Button>
                {randomPrompt && (
                  <div className="bg-trading-mint/10 border border-trading-mint/30 rounded-lg p-6">
                    <Star className="h-6 w-6 text-trading-mint mx-auto mb-3" />
                    <p className="text-white text-lg leading-relaxed italic">
                      "{randomPrompt}"
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="trading-card mb-8 border-trading-mint/30">
          <CardHeader className="p-6">
            <CardTitle className="text-white">Set New Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Goal Title</Label>
                <Input
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="e.g., Q4 Profit Target"
                />
              </div>
              <div>
                <Label className="text-gray-300">Reward</Label>
                <Input
                  value={newGoal.reward}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, reward: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="e.g., New trading monitor"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Goal Type</Label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full p-3 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
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
              <div>
                <Label className="text-gray-300">Deadline</Label>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
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
            <Card key={goal.id} className={`trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}`}>
              <CardHeader className="p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-3 lg:space-y-0">
                  <div className="flex-1">
                    <CardTitle className="text-white text-xl flex items-center mb-2">
                      {isCompleted && <Trophy className="h-6 w-6 mr-2 text-yellow-400" />}
                      {goal.title}
                    </CardTitle>
                    <div className="text-sm text-gray-400 mb-2">
                      Due: {goal.deadline.toLocaleDateString()}
                      {daysLeft > 0 && <span className="ml-2">({daysLeft} days left)</span>}
                    </div>
                    {goal.reward && (
                      <div className="text-sm text-trading-mint">
                        🎁 Reward: {goal.reward}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isCompleted ? 'bg-green-600/20 text-green-400 border border-green-500/30' :
                      progress > 50 ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {isCompleted ? '✅ Completed!' : `${progress.toFixed(1)}% Complete`}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">
                      {goal.current.toFixed(goal.type === 'winrate' ? 1 : 0)}
                      {goal.type === 'profit' && '$'}
                      {goal.type === 'winrate' && '%'}
                    </span>
                    <span className="text-white font-bold">
                      Target: {goal.target}
                      {goal.type === 'profit' && '$'}
                      {goal.type === 'winrate' && '%'}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-trading-mint to-green-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </Progress>
                  {!isCompleted && (
                    <div className="text-xs text-gray-400">
                      {goal.type === 'profit' && `$${(goal.target - goal.current).toFixed(2)} remaining`}
                      {goal.type === 'winrate' && `${(goal.target - goal.current).toFixed(1)}% to go`}
                      {goal.type === 'trades' && `${goal.target - goal.current} more trades needed`}
                    </div>
                  )}
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
              <div className="text-sm text-gray-400 mb-6">Create your first trading goal to track progress</div>
              <Button 
                onClick={() => setShowAddForm(true)}
                className={`${accentClass} hover:scale-105 transform transition-all duration-300`}
              >
                <Plus className="h-5 w-5 mr-2" />
                Set First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
