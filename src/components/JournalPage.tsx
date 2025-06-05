
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Plus, Calendar, TrendingUp, Palette, FileImage } from 'lucide-react';

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
  drawings?: string[];
  tags: string[];
}

const JournalPage: React.FC<JournalPageProps> = ({ accentColor }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDrawingTool, setShowDrawingTool] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as 'positive' | 'neutral' | 'negative',
    lessons: '',
    tags: ''
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
      setNewEntry({ title: '', content: '', mood: 'neutral', lessons: '', tags: '' });
      setShowAddForm(false);
    }
  };

  const accentClass = accentColor === 'mint' ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Smart Trading Journal</h1>
            <p className="text-gray-400">Document your trading journey with insights and analysis</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => setShowDrawingTool(true)}
              variant="outline"
              className="border-trading-mint/40 hover:bg-trading-mint/20 text-white"
            >
              <Palette className="h-4 w-4 mr-2" />
              Drawing Board
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              className={`${accentClass} hover:scale-105 transform transition-all duration-300 shadow-lg glow-effect`}
            >
              <Plus className="h-5 w-5 mr-2" />
              New Entry
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-trading-mint" />
                Total Entries
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-white glow-text">
                {entries.length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-trading-mint" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-white glow-text">
                {entries.filter(e => e.date.getMonth() === new Date().getMonth()).length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-trading-mint" />
                Positive Mood
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-white glow-text">
                {entries.filter(e => e.mood === 'positive').length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover p-4">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <FileImage className="h-4 w-4 mr-2 text-trading-mint" />
                With Drawings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-white glow-text">
                {entries.filter(e => e.drawings && e.drawings.length > 0).length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drawing Tool Modal */}
      {showDrawingTool && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <Card className="trading-card w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Trading Chart Analysis</span>
                <Button variant="outline" onClick={() => setShowDrawingTool(false)} className="border-trading-mint/30 text-white">
                  Close
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-900 rounded-lg p-6 min-h-[400px] border-2 border-trading-mint/30">
                <div className="text-center text-gray-400 py-20">
                  <Palette className="h-16 w-16 mx-auto mb-4 text-trading-mint" />
                  <div className="text-xl mb-2">Professional Drawing Board</div>
                  <div className="text-sm">Chart analysis and pattern recognition tools</div>
                  <div className="text-xs mt-4 text-gray-500">
                    Future update: Excalidraw integration for advanced drawing capabilities
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Entry Form */}
      {showAddForm && (
        <Card className="trading-card mb-8 border-trading-mint/30">
          <CardHeader className="p-6">
            <CardTitle className="text-white">New Journal Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Title</Label>
                <Input
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="Enter entry title..."
                />
              </div>
              <div>
                <Label className="text-gray-300">Tags (comma separated)</Label>
                <Input
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="scalping, support, resistance"
                />
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Content</Label>
              <Textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white min-h-[150px]"
                placeholder="Write about your trading experience, market analysis, strategies used..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Mood</Label>
                <select
                  value={newEntry.mood}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, mood: e.target.value as any }))}
                  className="w-full p-3 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
                >
                  <option value="positive">😊 Positive - Great trading day</option>
                  <option value="neutral">😐 Neutral - Average session</option>
                  <option value="negative">😔 Negative - Learning experience</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-300">Key Lessons</Label>
                <Textarea
                  value={newEntry.lessons}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, lessons: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="What did you learn from today's trading?"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleAddEntry} className={`flex-1 ${accentClass}`}>
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
        {entries.length === 0 ? (
          <Card className="trading-card">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <div className="text-xl text-gray-300 mb-2">No journal entries yet</div>
              <div className="text-sm text-gray-400 mb-6">Start documenting your trading journey with insights and analysis</div>
              <Button 
                onClick={() => setShowAddForm(true)}
                className={`${accentClass} hover:scale-105 transform transition-all duration-300`}
              >
                <Plus className="h-5 w-5 mr-2" />
                Create First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
              <CardHeader className="p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-3 lg:space-y-0">
                  <div className="flex-1">
                    <CardTitle className="text-white text-xl mb-2">{entry.title}</CardTitle>
                    <div className="text-sm text-gray-400 mb-3">
                      {entry.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {entry.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-trading-mint/20 text-trading-mint text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      entry.mood === 'positive' ? 'bg-green-600/20 text-green-400' :
                      entry.mood === 'negative' ? 'bg-red-600/20 text-red-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {entry.mood === 'positive' ? '😊 Positive' :
                       entry.mood === 'negative' ? '😔 Negative' :
                       '😐 Neutral'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-gray-300 mb-6 leading-relaxed text-base">
                  {entry.content}
                </div>
                {entry.lessons && (
                  <div className="border-t border-trading-mint/20 pt-6">
                    <div className="text-sm font-medium text-trading-mint mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Key Lessons Learned:
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
