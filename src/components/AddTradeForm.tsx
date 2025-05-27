
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { Trade } from './TradingDashboard';
import { cn } from '@/lib/utils';

interface AddTradeFormProps {
  onSubmit: (trade: Omit<Trade, 'id'>) => void;
  onCancel: () => void;
}

const AddTradeForm: React.FC<AddTradeFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    symbol: '',
    type: 'buy' as 'buy' | 'sell',
    quantity: '',
    entryPrice: '',
    exitPrice: '',
    pnl: '',
    remarks: '',
    status: 'closed' as 'open' | 'closed'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trade: Omit<Trade, 'id'> = {
      date: formData.date,
      symbol: formData.symbol.toUpperCase(),
      type: formData.type,
      quantity: parseFloat(formData.quantity),
      entryPrice: parseFloat(formData.entryPrice),
      exitPrice: formData.exitPrice ? parseFloat(formData.exitPrice) : undefined,
      pnl: parseFloat(formData.pnl),
      remarks: formData.remarks,
      status: formData.status
    };

    onSubmit(trade);
  };

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md trading-card border-trading-mint/30">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Add New Trade</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label className="text-white">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-trading-mint/30 bg-trading-blue/50 text-white",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && handleInputChange('date', date)}
                    initialFocus
                    className="bg-trading-blue border-trading-mint/30 text-white p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Symbol */}
            <div className="space-y-2">
              <Label className="text-white">Symbol</Label>
              <Input
                value={formData.symbol}
                onChange={(e) => handleInputChange('symbol', e.target.value)}
                placeholder="e.g., AAPL, TSLA"
                className="border-trading-mint/30 bg-trading-blue/50 text-white placeholder:text-gray-400"
                required
              />
            </div>

            {/* Type and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Type</Label>
                <Select value={formData.type} onValueChange={(value: 'buy' | 'sell') => handleInputChange('type', value)}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-trading-blue border-trading-mint/30">
                    <SelectItem value="buy" className="text-white">Buy</SelectItem>
                    <SelectItem value="sell" className="text-white">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'open' | 'closed') => handleInputChange('status', value)}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-trading-blue border-trading-mint/30">
                    <SelectItem value="open" className="text-white">Open</SelectItem>
                    <SelectItem value="closed" className="text-white">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quantity and Prices */}
            <div className="space-y-2">
              <Label className="text-white">Quantity</Label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="100"
                className="border-trading-mint/30 bg-trading-blue/50 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Entry Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.entryPrice}
                  onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                  placeholder="150.00"
                  className="border-trading-mint/30 bg-trading-blue/50 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Exit Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.exitPrice}
                  onChange={(e) => handleInputChange('exitPrice', e.target.value)}
                  placeholder="155.00"
                  className="border-trading-mint/30 bg-trading-blue/50 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* PnL */}
            <div className="space-y-2">
              <Label className="text-white">PnL ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.pnl}
                onChange={(e) => handleInputChange('pnl', e.target.value)}
                placeholder="500.00"
                className="border-trading-mint/30 bg-trading-blue/50 text-white placeholder:text-gray-400"
                required
              />
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Label className="text-white">Remarks</Label>
              <Textarea
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                placeholder="Trade notes and analysis..."
                className="border-trading-mint/30 bg-trading-blue/50 text-white placeholder:text-gray-400 min-h-20"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 border-trading-mint/30 text-white hover:bg-trading-mint/20"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-mint hover:scale-105 transform transition-all duration-300"
              >
                Add Trade
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTradeForm;
