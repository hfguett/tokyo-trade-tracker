
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Target, Eye, AlertTriangle, Camera, FileImage, Plus, Palette } from 'lucide-react';
import { Trade } from '@/types/Trade';
import { gsap } from 'gsap';
import DrawingCanvas from './DrawingCanvas';

interface PortfolioPageProps {
  trades: Trade[];
  accentColor: 'mint' | 'purple';
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ trades, accentColor, setTrades }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [showOCR, setShowOCR] = useState(false);
  const [showDrawing, setShowDrawing] = useState(false);
  const [ocrFile, setOcrFile] = useState<File | null>(null);

  const accentColorValue = accentColor === 'mint' ? '#10b981' : '#8b5cf6';

  useEffect(() => {
    if (pageRef.current) {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    if (cardsRef.current?.children) {
      gsap.from(cardsRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3
      });
    }
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

  const handleOCRUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOcrFile(file);
      // Simulate OCR processing
      console.log('Processing OCR for file:', file.name);
      // In a real implementation, this would send the file to an OCR service
      setTimeout(() => {
        const mockTrade: Omit<Trade, 'id'> = {
          symbol: 'BTC',
          type: 'buy',
          quantity: 1,
          entryPrice: 45000,
          leverage: 1,
          date: new Date(),
          pnl: 0,
          exchange: 'Binance',
          status: 'open',
          remarks: 'Imported via OCR'
        };
        
        const newTrade: Trade = {
          ...mockTrade,
          id: Date.now().toString()
        };
        
        setTrades(prev => [...prev, newTrade]);
        setOcrFile(null);
        setShowOCR(false);
      }, 2000);
    }
  };

  const COLORS = [accentColorValue, '#ef4444', '#f59e0b', '#06b6d4', '#8b5cf6'];

  return (
    <div ref={pageRef} className="p-4 lg:p-8 ml-0 lg:ml-72 min-h-screen trading-gradient">
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Portfolio Overview</h1>
            <p className="text-gray-400 text-sm lg:text-base">Comprehensive view of your trading portfolio performance</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 lg:gap-3 mt-4 lg:mt-0">
            <Button
              onClick={() => setShowDrawing(true)}
              className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint hover:scale-105 transition-all duration-300 text-sm lg:text-base px-3 lg:px-4 py-2"
            >
              <Palette className="h-4 w-4 mr-2" />
              Professional Drawing
            </Button>
            
            <Button
              onClick={() => setShowOCR(true)}
              variant="outline"
              className="border-trading-mint/30 text-white hover:bg-trading-mint/20 text-sm lg:text-base px-3 lg:px-4 py-2"
            >
              <Camera className="h-4 w-4 mr-2" />
              OCR Import
            </Button>
          </div>
        </div>
      </div>

      {/* OCR Upload Modal */}
      {showOCR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md trading-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileImage className="h-5 w-5 mr-2" />
                Import Trade via OCR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-trading-mint/30 rounded-lg p-6 text-center">
                <Camera className="h-12 w-12 mx-auto text-trading-mint mb-4" />
                <p className="text-white mb-4">Upload a screenshot or image of your trade</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleOCRUpload}
                  className="hidden"
                  id="ocr-upload"
                />
                <label htmlFor="ocr-upload" className="cursor-pointer">
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-purple-700">
                    <span>Choose Image</span>
                  </Button>
                </label>
              </div>
              {ocrFile && (
                <div className="text-center">
                  <p className="text-white">Processing: {ocrFile.name}</p>
                  <div className="mt-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-trading-mint mx-auto"></div>
                  </div>
                </div>
              )}
              <Button 
                onClick={() => setShowOCR(false)} 
                variant="outline" 
                className="w-full border-purple-500/30 text-white"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Drawing Canvas */}
      {showDrawing && (
        <DrawingCanvas 
          onClose={() => setShowDrawing(false)}
          onSave={(data) => {
            console.log('Drawing saved:', data);
            setShowDrawing(false);
          }}
        />
      )}

      {/* Key Metrics - Mobile Optimized */}
      <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <Card className="trading-card">
          <CardHeader className="pb-2 lg:pb-3 p-3 lg:p-6">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <DollarSign className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className={`text-xl lg:text-3xl font-bold ${totalPnL >= 0 ? 'profit-glow' : 'loss-glow'}`}>
              ${totalPnL.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Total P&L
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2 lg:pb-3 p-3 lg:p-6">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <Target className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              ROI
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className={`text-xl lg:text-3xl font-bold ${roi >= 0 ? 'profit-glow' : 'loss-glow'}`}>
              {roi.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Return on Investment
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2 lg:pb-3 p-3 lg:p-6">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <Eye className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-xl lg:text-3xl font-bold text-white">
              ${totalInvested.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Capital Deployed
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2 lg:pb-3 p-3 lg:p-6">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <AlertTriangle className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-xl lg:text-3xl font-bold text-yellow-400">
              7.2/10
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Portfolio Risk
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Asset Distribution */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={assetDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
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
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyPerformance}>
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
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

      {/* Additional Portfolio Info - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Sharpe Ratio</span>
              <span className="text-white font-bold">1.45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Max Drawdown</span>
              <span className="text-red-400 font-bold">-12.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Volatility</span>
              <span className="text-yellow-400 font-bold">18.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Beta</span>
              <span className="text-white font-bold">0.85</span>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Goals Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-3 lg:space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 text-sm lg:text-base">Monthly Goal</span>
                <span className="text-white text-sm lg:text-base">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 text-sm lg:text-base">Yearly Goal</span>
                <span className="text-white text-sm lg:text-base">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 text-sm lg:text-base">Win Rate Goal</span>
                <span className="text-white text-sm lg:text-base">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-2 lg:space-y-3">
            {trades
              .sort((a, b) => b.pnl - a.pnl)
              .slice(0, 5)
              .map((trade, index) => (
                <div key={trade.id} className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium text-sm lg:text-base">{trade.symbol}</span>
                    <div className="text-xs text-gray-400">
                      {trade.date.toLocaleDateString()}
                    </div>
                  </div>
                  <Badge
                    variant={trade.pnl >= 0 ? 'default' : 'destructive'}
                    className={`text-xs lg:text-sm ${trade.pnl >= 0 ? 
                      `${accentColor === 'mint' ? 'bg-trading-profit' : 'bg-purple-600'} shadow-lg` : 
                      'bg-trading-loss shadow-lg'
                    }`}
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
