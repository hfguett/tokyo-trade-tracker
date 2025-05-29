
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Plus, Calendar, TrendingUp } from 'lucide-react';

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
}

const JournalPage: React.FC<JournalPageProps> = ({ accentColor }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as 'positive' | 'neutral' | 'negative',
    lessons: ''
  });

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(),
        ...newEntry
      };
      setEntries(prev => [entry, ...prev]);
      setNewEntry({ title: '', content: '', mood: 'neutral', lessons: '' });
      setShowAddForm(false);
    }
  };

  const accentClass = accentColor === 'mint' ? 'bg-gradient-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-64 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Trading Journal</h1>
            <p className="text-gray-400">Document your trading journey and insights</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className={`mt-4 lg:mt-0 ${accentClass} hover:scale-105 transform transition-all duration-300 shadow-lg glow-effect`}
          >
            <Plus className="h-5 w-5 mr-2" />
            New Entry
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-trading-mint" />
                Total Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white glow-text">
                {entries.length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-trading-mint" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white glow-text">
                {entries.filter(e => e.date.getMonth() === new Date().getMonth()).length}
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-trading-mint" />
                Positive Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white glow-text">
                {entries.filter(e => e.mood === 'positive').length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Entry Form */}
      {showAddForm && (
        <Card className="trading-card mb-8 border-trading-mint/30">
          <CardHeader>
            <CardTitle className="text-white">New Journal Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Label className="text-gray-300">Content</Label>
              <Textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white min-h-[120px]"
                placeholder="Write about your trading experience..."
              />
            </div>
            <div>
              <Label className="text-gray-300">Mood</Label>
              <select
                value={newEntry.mood}
                onChange={(e) => setNewEntry(prev => ({ ...prev, mood: e.target.value as any }))}
                className="w-full p-2 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
              >
                <option value="positive">Positive 😊</option>
                <option value="neutral">Neutral 😐</option>
                <option value="negative">Negative 😔</option>
              </select>
            </div>
            <div>
              <Label className="text-gray-300">Key Lessons</Label>
              <Textarea
                value={newEntry.lessons}
                onChange={(e) => setNewEntry(prev => ({ ...prev, lessons: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white"
                placeholder="What did you learn from today's trading?"
              />
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
              <div className="text-sm text-gray-400">Start documenting your trading journey</div>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                  <div>
                    <CardTitle className="text-white text-lg">{entry.title}</CardTitle>
                    <div className="text-sm text-gray-400 mt-1">
                      {entry.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className="mt-2 lg:mt-0">
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
              <CardContent>
                <div className="text-gray-300 mb-4 leading-relaxed">
                  {entry.content}
                </div>
                {entry.lessons && (
                  <div className="border-t border-trading-mint/20 pt-4">
                    <div className="text-sm font-medium text-trading-mint mb-2">Key Lessons:</div>
                    <div className="text-gray-400 text-sm">
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
