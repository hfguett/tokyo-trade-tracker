
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Plus, Calendar, TrendingUp, Pencil, Save, Eye } from 'lucide-react';

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
  drawing?: string;
}

const JournalPage: React.FC<JournalPageProps> = ({ accentColor }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDrawing, setShowDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as 'positive' | 'neutral' | 'negative',
    lessons: '',
    drawing: ''
  });

  // Simple drawing functionality
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#1a1f2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  }, [showDrawing]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawingData = canvas.toDataURL();
    setNewEntry(prev => ({ ...prev, drawing: drawingData }));
    setShowDrawing(false);
  };

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(),
        ...newEntry
      };
      setEntries(prev => [entry, ...prev]);
      setNewEntry({ title: '', content: '', mood: 'neutral', lessons: '', drawing: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 glow-text">Smart Journal</h1>
              <p className="text-gray-400 text-lg">Document your trading journey with advanced analytics</p>
            </div>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-trading-mint/50 text-white hover:bg-trading-mint/20 hover:border-trading-mint hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-trading-mint/40 px-6 py-3"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Journal Entry
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-300 glow-hover">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                  <BookOpen className="h-5 w-5 mr-3 text-trading-mint" />
                  Total Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white glow-text mb-2">
                  {entries.length}
                </div>
                <div className="text-sm text-gray-400">Journal entries recorded</div>
              </CardContent>
            </Card>

            <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-300 glow-hover">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-trading-mint" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white glow-text mb-2">
                  {entries.filter(e => e.date.getMonth() === new Date().getMonth()).length}
                </div>
                <div className="text-sm text-gray-400">Entries this month</div>
              </CardContent>
            </Card>

            <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-300 glow-hover">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-3 text-trading-mint" />
                  Positive Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white glow-text mb-2">
                  {entries.filter(e => e.mood === 'positive').length}
                </div>
                <div className="text-sm text-gray-400">Positive entries</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <Card className="trading-card mb-10 border-trading-mint/40">
            <CardHeader>
              <CardTitle className="text-white text-xl">Create New Journal Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-300 text-sm font-medium mb-2 block">Entry Title</Label>
                <Input
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="border-trading-mint/30 bg-slate-800/50 text-white h-12"
                  placeholder="Enter a descriptive title..."
                />
              </div>
              
              <div>
                <Label className="text-gray-300 text-sm font-medium mb-2 block">Trading Experience</Label>
                <Textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  className="border-trading-mint/30 bg-slate-800/50 text-white min-h-[140px]"
                  placeholder="Describe your trading session, market observations, and thoughts..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300 text-sm font-medium mb-2 block">Trading Mood</Label>
                  <select
                    value={newEntry.mood}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, mood: e.target.value as any }))}
                    className="w-full p-3 rounded-md border border-trading-mint/30 bg-slate-800/50 text-white h-12"
                  >
                    <option value="positive">😊 Positive & Confident</option>
                    <option value="neutral">😐 Neutral & Focused</option>
                    <option value="negative">😔 Challenging Day</option>
                  </select>
                </div>

                <div>
                  <Label className="text-gray-300 text-sm font-medium mb-2 block">Chart Analysis</Label>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      onClick={() => setShowDrawing(true)}
                      className="flex-1 bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-trading-mint/50 text-white hover:bg-trading-mint/20 hover:border-trading-mint transition-all duration-300"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Draw Chart
                    </Button>
                    {newEntry.drawing && (
                      <Button
                        type="button"
                        variant="outline"
                        className="border-trading-mint/40 text-trading-mint"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-300 text-sm font-medium mb-2 block">Key Lessons & Insights</Label>
                <Textarea
                  value={newEntry.lessons}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, lessons: e.target.value }))}
                  className="border-trading-mint/30 bg-slate-800/50 text-white min-h-[100px]"
                  placeholder="What did you learn? What would you do differently?"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleAddEntry} 
                  className="flex-1 bg-gradient-to-r from-teal-700 via-trading-mint to-emerald-600 hover:from-emerald-700 hover:via-teal-500 hover:to-trading-mint text-white font-medium py-3"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)} 
                  className="flex-1 border-trading-mint/40 text-white hover:bg-trading-mint/20 py-3"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Drawing Canvas Modal */}
        {showDrawing && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="trading-card max-w-4xl w-full">
              <CardHeader>
                <CardTitle className="text-white">Chart Analysis - Draw Your Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="border-2 border-trading-mint/40 rounded-lg cursor-crosshair w-full max-w-full"
                    style={{ maxHeight: '400px', backgroundColor: '#1a1f2e' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                </div>
                <div className="flex gap-4">
                  <Button onClick={saveDrawing} className="flex-1 bg-gradient-to-r from-teal-700 via-trading-mint to-emerald-600 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Drawing
                  </Button>
                  <Button variant="outline" onClick={() => setShowDrawing(false)} className="flex-1 border-trading-mint/40 text-white">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Journal Entries */}
        <div className="space-y-8">
          {entries.length === 0 ? (
            <Card className="trading-card">
              <CardContent className="text-center py-16">
                <div className="text-6xl mb-6">📊</div>
                <div className="text-2xl text-gray-300 mb-4 glow-text">Start Your Trading Journal</div>
                <div className="text-gray-400 mb-8 max-w-md mx-auto">
                  Document your trades, analyze charts, and track your growth as a professional trader
                </div>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-teal-700 via-trading-mint to-emerald-600 hover:from-emerald-700 hover:via-teal-500 hover:to-trading-mint text-white px-8 py-3"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-300 glow-hover">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-2">{entry.title}</CardTitle>
                      <div className="text-sm text-gray-400">
                        {entry.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        entry.mood === 'positive' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                        entry.mood === 'negative' ? 'bg-red-600/20 text-red-400 border border-red-600/30' :
                        'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                      }`}>
                        {entry.mood === 'positive' ? '😊 Positive' :
                         entry.mood === 'negative' ? '😔 Challenging' :
                         '😐 Neutral'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-gray-300 leading-relaxed text-base">
                    {entry.content}
                  </div>
                  
                  {entry.drawing && (
                    <div className="border border-trading-mint/30 rounded-lg p-4">
                      <div className="text-sm font-medium text-trading-mint mb-3 flex items-center">
                        <Pencil className="h-4 w-4 mr-2" />
                        Chart Analysis
                      </div>
                      <img src={entry.drawing} alt="Chart analysis" className="max-w-full rounded border border-trading-mint/20" />
                    </div>
                  )}
                  
                  {entry.lessons && (
                    <div className="border-t border-trading-mint/20 pt-6">
                      <div className="text-sm font-medium text-trading-mint mb-3 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Key Lessons & Insights
                      </div>
                      <div className="text-gray-400 leading-relaxed">
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
    </div>
  );
};

export default JournalPage;
