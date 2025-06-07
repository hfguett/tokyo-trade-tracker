import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Plus, Calendar, TrendingUp, Palette, FileImage, Search, Filter, Star, Heart, CheckSquare, Target, Lightbulb, Users, Brain } from 'lucide-react';
import ProfessionalDrawingBoard from './ProfessionalDrawingBoard';

interface JournalPageProps {
  accentColor: 'mint' | 'purple';
}

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  lessons: string;
  drawings?: any[];
  tags: string[];
  rating: number;
  marketConditions: string;
  strategy: string;
  type: 'journal' | 'todo' | 'idea' | 'analysis';
}

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

interface Suggestion {
  id: string;
  text: string;
  category: 'strategy' | 'risk' | 'market' | 'personal';
  implemented: boolean;
}

const SmartJournalPage: React.FC<JournalPageProps> = ({ accentColor }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: '1', text: 'Review your position sizes - consider reducing risk per trade', category: 'risk', implemented: false },
    { id: '2', text: 'Set up alerts for key support/resistance levels', category: 'strategy', implemented: false },
    { id: '3', text: 'Analyze your best performing trades to identify patterns', category: 'strategy', implemented: false },
    { id: '4', text: 'Take a break if you have 3 consecutive losses', category: 'personal', implemented: false }
  ]);
  
  const [activeTab, setActiveTab] = useState<'journal' | 'todo' | 'suggestions' | 'drawing'>('journal');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDrawingBoard, setShowDrawingBoard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodo, setNewTodo] = useState('');
  
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as 'positive' | 'neutral' | 'negative',
    lessons: '',
    tags: '',
    rating: 3,
    marketConditions: '',
    strategy: '',
    type: 'journal' as 'journal' | 'todo' | 'idea' | 'analysis'
  });

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(),
        ...newEntry,
        tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        drawings: []
      };
      setEntries(prev => [entry, ...prev]);
      setNewEntry({ 
        title: '', 
        content: '', 
        mood: 'neutral', 
        lessons: '', 
        tags: '',
        rating: 3,
        marketConditions: '',
        strategy: '',
        type: 'journal'
      });
      setShowAddForm(false);
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        priority: 'medium'
      };
      setTodos(prev => [todo, ...prev]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(suggestion => 
      suggestion.id === id ? { ...suggestion, implemented: !suggestion.implemented } : suggestion
    ));
  };

  const handleSaveDrawing = (drawingData: any) => {
    console.log('Drawing saved:', drawingData);
    setShowDrawingBoard(false);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const accentClass = accentColor === 'mint' ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-6 lg:space-y-0">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 glow-text">Smart Personal Hub</h1>
            <p className="text-lg text-gray-300">Your trading journey, insights, tasks, and creative space all in one place</p>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'journal', label: 'Journal', icon: BookOpen },
            { id: 'todo', label: 'Todo List', icon: CheckSquare },
            { id: 'suggestions', label: 'Smart Suggestions', icon: Lightbulb },
            { id: 'drawing', label: 'Drawing Board', icon: Palette }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              onClick={() => setActiveTab(id as any)}
              variant={activeTab === id ? 'default' : 'outline'}
              className={`${activeTab === id ? accentClass : 'border-trading-mint/30 text-white hover:bg-trading-mint/20'} transition-all duration-300`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-trading-mint" />
                Entries
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {entries.length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-trading-mint" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {todos.filter(t => !t.completed).length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-trading-mint" />
                Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {suggestions.filter(s => !s.implemented).length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Star className="h-4 w-4 mr-2 text-trading-mint" />
                Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {entries.length > 0 ? (entries.reduce((sum, e) => sum + e.rating, 0) / entries.length).toFixed(1) : '0.0'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drawing Board Integration */}
      {showDrawingBoard && (
        <ProfessionalDrawingBoard
          onSave={handleSaveDrawing}
          onClose={() => setShowDrawingBoard(false)}
        />
      )}

      {/* Content based on active tab */}
      {activeTab === 'journal' && (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search journal entries..."
                  className="pl-10 border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
            </div>
            <Button 
              onClick={() => setShowAddForm(true)}
              className={`${accentClass} hover:scale-105 transition-all duration-300`}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>

          {/* Add Entry Form */}
          {showAddForm && (
            <Card className="trading-card mb-8 border-trading-mint/30">
              <CardHeader className="p-6">
                <CardTitle className="text-white text-xl">Create New Journal Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Entry Title</Label>
                    <Input
                      value={newEntry.title}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                      className="border-trading-mint/30 bg-trading-blue/50 text-white"
                      placeholder="e.g., Market Analysis - EUR/USD Breakout"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Entry Type</Label>
                    <select
                      value={newEntry.type}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full p-3 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
                    >
                      <option value="journal">Journal Entry</option>
                      <option value="analysis">Market Analysis</option>
                      <option value="idea">Trading Idea</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Content</Label>
                  <Textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                    className="border-trading-mint/30 bg-trading-blue/50 text-white min-h-[120px]"
                    placeholder="Your thoughts, analysis, and insights..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button onClick={handleAddEntry} className={`flex-1 ${accentClass}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Save Entry
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1 border-trading-mint/30 text-white">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Journal Entries */}
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300">
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl mb-2">{entry.title}</CardTitle>
                      <div className="text-sm text-gray-400">
                        {entry.date.toLocaleDateString()} • {entry.type}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < entry.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-gray-300 leading-relaxed">
                    {entry.content}
                  </div>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {entry.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-trading-mint/20 text-trading-mint text-sm rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'todo' && (
        <div className="space-y-6">
          <Card className="trading-card border-trading-mint/30">
            <CardHeader className="p-6">
              <CardTitle className="text-white text-xl">Task Management</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex space-x-4 mb-6">
                <Input
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 border-trading-mint/30 bg-trading-blue/50 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                />
                <Button onClick={handleAddTodo} className={accentClass}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>

              <div className="space-y-3">
                {todos.map((todo) => (
                  <div key={todo.id} className="flex items-center space-x-3 p-3 bg-trading-blue/30 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTodo(todo.id)}
                      className={todo.completed ? 'text-green-400' : 'text-gray-400'}
                    >
                      <CheckSquare className="h-4 w-4" />
                    </Button>
                    <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                      {todo.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'suggestions' && (
        <div className="space-y-6">
          <Card className="trading-card border-trading-mint/30">
            <CardHeader className="p-6">
              <CardTitle className="text-white text-xl flex items-center">
                <Brain className="h-6 w-6 mr-3 text-trading-mint" />
                Smart Trading Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-start space-x-4 p-4 bg-trading-blue/30 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSuggestion(suggestion.id)}
                      className={suggestion.implemented ? 'text-green-400' : 'text-yellow-400'}
                    >
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <div className={`${suggestion.implemented ? 'line-through text-gray-500' : 'text-white'}`}>
                        {suggestion.text}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Category: {suggestion.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'drawing' && (
        <div className="space-y-6">
          <Card className="trading-card border-trading-mint/30">
            <CardHeader className="p-6">
              <CardTitle className="text-white text-xl flex items-center">
                <Palette className="h-6 w-6 mr-3 text-trading-mint" />
                Professional Drawing & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="space-y-6">
                <div className="text-gray-300 text-lg">
                  Create professional chart analysis, drawings, and visual notes
                </div>
                <Button 
                  onClick={() => setShowDrawingBoard(true)}
                  className={`${accentClass} hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
                >
                  <Palette className="h-5 w-5 mr-2" />
                  Open Drawing Board
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SmartJournalPage;
