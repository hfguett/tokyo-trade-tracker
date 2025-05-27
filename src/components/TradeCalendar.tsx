
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay } from 'date-fns';
import { Trade } from './TradingDashboard';

interface TradeCalendarProps {
  trades: Trade[];
  onTradeClick: (trade: Trade) => void;
}

const TradeCalendar: React.FC<TradeCalendarProps> = ({ trades, onTradeClick }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getTradesForDate = (date: Date) => {
    return trades.filter(trade => isSameDay(trade.date, date));
  };

  const getTradeDayPnL = (date: Date) => {
    const dayTrades = getTradesForDate(date);
    return dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  };

  const selectedDateTrades = getTradesForDate(selectedDate);

  const modifiers = {
    profitable: (date: Date) => {
      const pnl = getTradeDayPnL(date);
      return pnl > 0;
    },
    loss: (date: Date) => {
      const pnl = getTradeDayPnL(date);
      return pnl < 0;
    },
    hasTrades: (date: Date) => {
      return getTradesForDate(date).length > 0;
    }
  };

  const modifiersStyles = {
    profitable: {
      backgroundColor: '#10b981',
      color: 'white',
      borderRadius: '6px'
    },
    loss: {
      backgroundColor: '#ef4444',
      color: 'white',
      borderRadius: '6px'
    },
    hasTrades: {
      fontWeight: 'bold'
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2 trading-card border-trading-mint/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <span className="mr-2">📅</span>
            Trading Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border border-trading-mint/20 bg-trading-blue/50 text-white p-3 pointer-events-auto"
          />
        </CardContent>
      </Card>

      {/* Selected Date Trades */}
      <Card className="trading-card border-trading-mint/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            {format(selectedDate, 'MMM dd, yyyy')}
          </CardTitle>
          <div className="text-sm text-gray-300">
            {selectedDateTrades.length} trade{selectedDateTrades.length !== 1 ? 's' : ''}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {selectedDateTrades.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No trades on this date
            </div>
          ) : (
            selectedDateTrades.map((trade) => (
              <div
                key={trade.id}
                className="p-3 rounded-lg border border-trading-mint/20 bg-trading-blue/30 cursor-pointer hover:bg-trading-mint/10 transition-colors"
                onClick={() => onTradeClick(trade)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-white">{trade.symbol}</div>
                    <div className="text-sm text-gray-300">
                      {trade.type.toUpperCase()} {trade.quantity} @ ${trade.entryPrice}
                    </div>
                  </div>
                  <Badge
                    variant={trade.pnl >= 0 ? 'default' : 'destructive'}
                    className={trade.pnl >= 0 ? 'bg-trading-profit' : 'bg-trading-loss'}
                  >
                    ${trade.pnl.toFixed(2)}
                  </Badge>
                </div>
                <div className="text-xs text-gray-400">
                  Status: {trade.status}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeCalendar;
