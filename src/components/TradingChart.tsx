import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface TradingChartProps {
  symbol: string;
  data: ChartData[];
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  height?: number;
}

const TradingChart: React.FC<TradingChartProps> = ({ 
  symbol, 
  data, 
  currentPrice,
  change = 0,
  changePercent = 0,
  height = 400 
}) => {
  const [timeframe, setTimeframe] = useState('1H');
  const [chartType, setChartType] = useState<'line' | 'area' | 'candle'>('area');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D', '1W'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(price);
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isPositive = change >= 0;

  const renderChart = () => {
    const chartData = data.map(item => ({
      ...item,
      time: formatTimestamp(item.timestamp),
      price: item.close
    }));

    const gradientId = `gradient-${symbol.replace('/', '-')}`;

    if (chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="0%" 
                  stopColor={isPositive ? "#10b981" : "#ef4444"} 
                  stopOpacity={0.8}
                />
                <stop 
                  offset="100%" 
                  stopColor={isPositive ? "#10b981" : "#ef4444"} 
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={formatPrice}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(15, 19, 30, 0.95)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => [formatPrice(value), 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={formatPrice}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(15, 19, 30, 0.95)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number) => [formatPrice(value), 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: isPositive ? "#10b981" : "#ef4444" }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className={`trading-card border-trading-mint/30 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <CardTitle className="text-white text-xl lg:text-2xl font-bold">
                {symbol}
              </CardTitle>
              {currentPrice && (
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-2xl lg:text-3xl font-bold text-white">
                    {formatPrice(currentPrice)}
                  </span>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                    isPositive 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-red-600/20 text-red-400'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{formatPrice(Math.abs(change))}</span>
                    <span>({Math.abs(changePercent).toFixed(2)}%)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Timeframe Selector */}
            <div className="flex bg-trading-blue/50 rounded-lg p-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                  className={`text-xs px-3 py-1 ${
                    timeframe === tf 
                      ? 'bg-trading-mint text-black' 
                      : 'text-gray-400 hover:text-white hover:bg-trading-mint/20'
                  }`}
                >
                  {tf}
                </Button>
              ))}
            </div>

            {/* Chart Type Selector */}
            <div className="flex bg-trading-blue/50 rounded-lg p-1">
              <Button
                variant={chartType === 'line' ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType('line')}
                className={chartType === 'line' ? 'bg-trading-mint text-black' : 'text-gray-400 hover:text-white'}
              >
                <Activity className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === 'area' ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType('area')}
                className={chartType === 'area' ? 'bg-trading-mint text-black' : 'text-gray-400 hover:text-white'}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="border-trading-mint/30 text-white hover:bg-trading-mint/20"
            >
              {isFullscreen ? 'Exit' : 'Fullscreen'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="px-6 pb-6">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingChart;
