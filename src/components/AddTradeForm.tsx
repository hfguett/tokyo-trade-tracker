import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { Trade } from './TradingDashboard';

interface AddTradeFormProps {
  onSubmit: (trade: Omit<Trade, 'id'>) => void;
  onCancel: () => void;
}

const AddTradeForm: React.FC<AddTradeFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    type: 'buy' as 'buy' | 'sell',
    quantity: '',
    entryPrice: '',
    exitPrice: '',
    leverage: '1',
    date: new Date().toISOString().split('T')[0],
    remarks: '',
    status: 'open' as 'open' | 'closed'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryPrice = parseFloat(formData.entryPrice);
    const exitPrice = formData.exitPrice ? parseFloat(formData.exitPrice) : undefined;
    const quantity = parseInt(formData.quantity);
    const leverage = parseInt(formData.leverage);
    
    let pnl = 0;
    if (exitPrice) {
      pnl = formData.type === 'buy' 
        ? (exitPrice - entryPrice) * quantity
        : (entryPrice - exitPrice) * quantity;
    }

    const trade: Omit<Trade, 'id'> = {
      symbol: formData.symbol.toUpperCase(),
      type: formData.type,
      quantity,
      entryPrice,
      exitPrice,
      leverage,
      date: new Date(formData.date),
      pnl,
      remarks: formData.remarks,
      status: formData.status
    };

    onSubmit(trade);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md trading-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Add New Trade</CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-white">Symbol</Label>
              <Input
                value={formData.symbol}
                onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
                placeholder="AAPL, TSLA, etc."
                className="border-purple-500/30 bg-trading-blue/50 text-white"
                required
              />
            </div>

            <div>
              <Label className="text-white">Type</Label>
              <Select value={formData.type} onValueChange={(value: 'buy' | 'sell') => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="border-purple-500/30 bg-trading-blue/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Quantity</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  className="border-purple-500/30 bg-trading-blue/50 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Leverage</Label>
                <Select value={formData.leverage} onValueChange={(value: string) => setFormData(prev => ({ ...prev, leverage: value }))}>
                  <SelectTrigger className="border-purple-500/30 bg-trading-blue/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                    <SelectItem value="3">3x</SelectItem>
                    <SelectItem value="5">5x</SelectItem>
                    <SelectItem value="10">10x</SelectItem>
                    <SelectItem value="20">20x</SelectItem>
                    <SelectItem value="50">50x</SelectItem>
                    <SelectItem value="100">100x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Entry Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.entryPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, entryPrice: e.target.value }))}
                  className="border-purple-500/30 bg-trading-blue/50 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Exit Price (Optional)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.exitPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, exitPrice: e.target.value }))}
                  className="border-purple-500/30 bg-trading-blue/50 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="border-purple-500/30 bg-trading-blue/50 text-white"
                required
              />
            </div>

            <div>
              <Label className="text-white">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'open' | 'closed') => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger className="border-purple-500/30 bg-trading-blue/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Remarks</Label>
              <Textarea
                value={formData.remarks}
                onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                placeholder="Add notes about this trade..."
                className="border-purple-500/30 bg-trading-blue/50 text-white"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:scale-105 transition-all">
                Add Trade
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-purple-500/30 text-white hover:bg-purple-500/20">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTradeForm;
