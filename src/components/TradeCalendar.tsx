import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay } from 'date-fns';
import { Trade } from '@/types/Trade';
import { gsap } from 'gsap';

interface TradeCalendarProps {
  trades: Trade[];
  onTradeClick: (trade: Trade) => void;
}

const TradeCalendar: React.FC<TradeCalendarProps> = ({ trades, onTradeClick }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const tradesRef = useRef<HTMLDivElement>(null);

  const getTradesForDate = (date: Date) => {
    return trades.filter(trade => isSameDay(trade.date, date));
  };

  const getTradeDayPnL = (date: Date) => {
    const dayTrades = getTradesForDate(date);
    return dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  };

  const selectedDateTrades = getTradesForDate(selectedDate);

  useEffect(() => {
    // Animate calendar on mount
    gsap.from(calendarRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Animate trades list
    gsap.from(tradesRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3
    });
  }, []);

  useEffect(() => {
    // Animate trades when date changes
    if (tradesRef.current) {
      gsap.from(tradesRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, [selectedDate]);

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
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
    },
    loss: {
      backgroundColor: '#ef4444',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
    },
    hasTrades: {
      fontWeight: 'bold',
      border: '2px solid rgba(16, 185, 129, 0.3)'
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Enhanced Calendar */}
      <Card ref={calendarRef} className="lg:col-span-2 trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <span className="mr-3 text-2xl">📅</span>
            Professional Trading Calendar
          </CardTitle>
          <p className="text-gray-400">Click on any date to view trade details</p>
        </CardHeader>
        <CardContent className="flex justify-center p-8">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-xl border border-trading-mint/30 bg-trading-blue/50 text-white p-4 pointer-events-auto shadow-2xl"
          />
        </CardContent>
      </Card>

      {/* Enhanced Selected Date Trades */}
      <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            {format(selectedDate, 'EEEE, MMM dd, yyyy')}
          </CardTitle>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-300">
              {selectedDateTrades.length} trade{selectedDateTrades.length !== 1 ? 's' : ''}
            </div>
            {selectedDateTrades.length > 0 && (
              <div className={`text-lg font-bold ${getTradeDayPnL(selectedDate) >= 0 ? 'profit-glow' : 'loss-glow'}`}>
                ${getTradeDayPnL(selectedDate).toFixed(2)}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent ref={tradesRef} className="space-y-4 max-h-96 overflow-y-auto">
          {selectedDateTrades.length === 0 ? (
            <div className="text-gray-400 text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <div className="text-lg">No trades on this date</div>
              <div className="text-sm mt-2">Add a trade to get started</div>
            </div>
          ) : (
            selectedDateTrades.map((trade) => (
              <div
                key={trade.id}
                className="p-4 rounded-xl border border-trading-mint/30 bg-trading-blue/40 cursor-pointer hover:bg-trading-mint/10 hover:border-trading-mint/50 transition-all duration-300 hover:scale-102 hover:shadow-lg"
                onClick={() => onTradeClick(trade)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold text-white text-lg">{trade.symbol}</div>
                    <div className="text-sm text-gray-300">
                      {trade.type.toUpperCase()} {trade.quantity} @ ${trade.entryPrice}
                    </div>
                    {trade.exitPrice && (
                      <div className="text-xs text-gray-400">
                        Exit: ${trade.exitPrice}
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={trade.pnl >= 0 ? 'default' : 'destructive'}
                    className={`${trade.pnl >= 0 ? 'bg-trading-profit shadow-green-500/20' : 'bg-trading-loss shadow-red-500/20'} shadow-lg text-white font-bold`}
                  >
                    ${trade.pnl.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    Status: <span className={`${trade.status === 'closed' ? 'text-gray-300' : 'text-trading-mint'} font-medium`}>
                      {trade.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Click for details
                  </div>
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
