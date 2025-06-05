
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Plus, Calendar, TrendingUp, Palette, FileImage, Search, Filter, Star, Heart } from 'lucide-react';
import DrawingCanvas from './DrawingCanvas';

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
}

const JournalPage: React.FC<JournalPageProps> = ({ accentColor }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDrawingTool, setShowDrawingTool] = useState(false);
  const [editingDrawing, setEditingDrawing] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState<string>('all');
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as 'positive' | 'neutral' | 'negative',
    lessons: '',
    tags: '',
    rating: 3,
    marketConditions: '',
    strategy: ''
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
        strategy: ''
      });
      setShowAddForm(false);
    }
  };

  const handleSaveDrawing = (drawingData: any) => {
    console.log('Drawing saved:', drawingData);
    setShowDrawingTool(false);
    setEditingDrawing(null);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMood = filterMood === 'all' || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  const accentClass = accentColor === 'mint' ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-6 lg:space-y-0">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 glow-text">Smart Trading Journal</h1>
            <p className="text-lg text-gray-300">Professional trading insights with advanced chart analysis and AI-powered pattern recognition</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => setShowDrawingTool(true)}
              variant="outline"
              className="border-trading-mint/50 hover:bg-trading-mint/20 text-white hover:scale-105 transition-all duration-300"
            >
              <Palette className="h-5 w-5 mr-2" />
              Professional Drawing Board
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              className={`${accentClass} hover:scale-105 transform transition-all duration-300 shadow-lg glow-effect`}
            >
              <Plus className="h-5 w-5 mr-2" />
              New Journal Entry
            </Button>
          </div>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search entries, tags, strategies..."
                className="pl-10 border-trading-mint/30 bg-trading-blue/50 text-white placeholder-gray-400"
              />
            </div>
          </div>
          <div>
            <select
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value)}
              className="w-full p-3 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
            >
              <option value="all">All Moods</option>
              <option value="positive">😊 Positive</option>
              <option value="neutral">😐 Neutral</option>
              <option value="negative">😔 Learning Experience</option>
            </select>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 mb-8">
          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-trading-mint" />
                Total Entries
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {entries.length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-trading-mint" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {entries.filter(e => e.date.getMonth() === new Date().getMonth()).length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Heart className="h-4 w-4 mr-2 text-trading-mint" />
                Positive Mood
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {entries.filter(e => e.mood === 'positive').length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <FileImage className="h-4 w-4 mr-2 text-trading-mint" />
                With Drawings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {entries.filter(e => e.drawings && e.drawings.length > 0).length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
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

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-trading-mint" />
                Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                {new Set(entries.map(e => e.strategy).filter(s => s)).size}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Real Excalidraw Integration */}
      {showDrawingTool && (
        <DrawingCanvas
          onSave={handleSaveDrawing}
          onClose={() => setShowDrawingTool(false)}
          initialData={editingDrawing}
        />
      )}

      {/* Enhanced Add Entry Form */}
      {showAddForm && (
        <Card className="trading-card mb-8 border-trading-mint/30">
          <CardHeader className="p-6">
            <CardTitle className="text-white text-xl">Create New Journal Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-300 text-sm font-medium">Entry Title</Label>
                <Input
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="e.g., EURUSD Breakout Strategy Analysis"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm font-medium">Trading Strategy</Label>
                <Input
                  value={newEntry.strategy}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, strategy: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="e.g., Support/Resistance, Breakout, Scalping"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 text-sm font-medium">Market Analysis & Entry Content</Label>
              <Textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white min-h-[120px]"
                placeholder="Detailed analysis of market conditions, entry/exit points, risk management, and trade rationale..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-300 text-sm font-medium">Market Conditions</Label>
                <select
                  value={newEntry.marketConditions}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, marketConditions: e.target.value }))}
                  className="w-full p-3 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
                >
                  <option value="">Select Conditions</option>
                  <option value="trending">Trending Market</option>
                  <option value="ranging">Ranging Market</option>
                  <option value="volatile">High Volatility</option>
                  <option value="low-volume">Low Volume</option>
                  <option value="news-driven">News Driven</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-300 text-sm font-medium">Trading Mood</Label>
                <select
                  value={newEntry.mood}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, mood: e.target.value as any }))}
                  className="w-full p-3 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
                >
                  <option value="positive">😊 Confident & Focused</option>
                  <option value="neutral">😐 Neutral & Calm</option>
                  <option value="negative">😔 Learning Experience</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-300 text-sm font-medium">Session Rating (1-5)</Label>
                <select
                  value={newEntry.rating}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="w-full p-3 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
                >
                  <option value={1}>⭐ Poor (1)</option>
                  <option value={2}>⭐⭐ Below Average (2)</option>
                  <option value={3}>⭐⭐⭐ Average (3)</option>
                  <option value={4}>⭐⭐⭐⭐ Good (4)</option>
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent (5)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-300 text-sm font-medium">Key Lessons & Insights</Label>
                <Textarea
                  value={newEntry.lessons}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, lessons: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="What patterns did you notice? What would you do differently?"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm font-medium">Tags (comma separated)</Label>
                <Input
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="scalping, support, resistance, breakout, fomo"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button onClick={handleAddEntry} className={`flex-1 ${accentClass} hover:scale-105 transition-all`}>
                <Plus className="h-4 w-4 mr-2" />
                Save Journal Entry
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1 border-trading-mint/30 text-white hover:bg-trading-mint/20">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Journal Entries */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <Card className="trading-card">
            <CardContent className="text-center py-16">
              <div className="text-8xl mb-6">📊</div>
              <div className="text-2xl text-gray-300 mb-4">No journal entries yet</div>
              <div className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Start documenting your trading journey with professional insights, chart analysis, and strategy development</div>
              <Button 
                onClick={() => setShowAddForm(true)}
                className={`${accentClass} hover:scale-105 transform transition-all duration-300 text-lg px-8 py-4`}
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
              <CardHeader className="p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <CardTitle className="text-white text-xl lg:text-2xl mb-3">{entry.title}</CardTitle>
                    <div className="text-sm text-gray-400 mb-4">
                      {entry.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    {entry.strategy && (
                      <div className="mb-3">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full">
                          Strategy: {entry.strategy}
                        </span>
                      </div>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {entry.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-trading-mint/20 text-trading-mint text-sm rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < entry.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      entry.mood === 'positive' ? 'bg-green-600/20 text-green-400' :
                      entry.mood === 'negative' ? 'bg-red-600/20 text-red-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {entry.mood === 'positive' ? '😊 Confident' :
                       entry.mood === 'negative' ? '😔 Learning' :
                       '😐 Neutral'}
                    </span>
                    {entry.marketConditions && (
                      <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                        {entry.marketConditions}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-gray-300 mb-6 leading-relaxed text-base lg:text-lg">
                  {entry.content}
                </div>
                {entry.lessons && (
                  <div className="border-t border-trading-mint/20 pt-6">
                    <div className="text-sm font-medium text-trading-mint mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Key Insights & Lessons:
                    </div>
                    <div className="text-gray-400 text-sm leading-relaxed bg-trading-mint/5 p-4 rounded-lg border border-trading-mint/20">
                      {entry.lessons}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default JournalPage;
