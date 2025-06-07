
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X, Calculator, Save } from 'lucide-react';
import { Trade } from '@/types/Trade';

interface TradeFormProps {
  onSubmit: (trade: Omit<Trade, 'id'>) => void;
  onCancel: () => void;
  initialData?: Partial<Trade>;
  isEditing?: boolean;
}

const TradeForm: React.FC<TradeFormProps> = ({ onSubmit, onCancel, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState({
    symbol: initialData?.symbol || '',
    type: initialData?.type || 'buy' as 'buy' | 'sell',
    quantity: initialData?.quantity?.toString() || '',
    entryPrice: initialData?.entryPrice?.toString() || '',
    exitPrice: initialData?.exitPrice?.toString() || '',
    leverage: initialData?.leverage?.toString() || '1',
    exchange: initialData?.exchange || '',
    date: initialData?.date ? initialData.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    remarks: initialData?.remarks || '',
    status: initialData?.status || 'open' as 'open' | 'closed',
    pnl: initialData?.pnl?.toString() || '0',
    fees: initialData?.fees?.toString() || '0'
  });

  const exchanges = [
    'Binance', 'Coinbase Pro', 'Kraken', 'Bybit', 'OKX', 'KuCoin', 
    'Huobi', 'Gate.io', 'Bitfinex', 'Deribit', 'FTX', 'Other'
  ];

  const calculatePnL = () => {
    const entry = parseFloat(formData.entryPrice) || 0;
    const exit = parseFloat(formData.exitPrice) || 0;
    const qty = parseFloat(formData.quantity) || 0;
    const leverage = parseFloat(formData.leverage) || 1;
    const fees = parseFloat(formData.fees) || 0;

    if (entry > 0 && exit > 0 && qty > 0) {
      let pnl = 0;
      if (formData.type === 'buy') {
        pnl = (exit - entry) * qty * leverage - fees;
      } else {
        pnl = (entry - exit) * qty * leverage - fees;
      }
      setFormData(prev => ({ ...prev, pnl: pnl.toFixed(2) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trade: Omit<Trade, 'id'> = {
      symbol: formData.symbol.toUpperCase(),
      type: formData.type,
      quantity: parseFloat(formData.quantity) || 0,
      entryPrice: parseFloat(formData.entryPrice) || 0,
      exitPrice: formData.exitPrice ? parseFloat(formData.exitPrice) : undefined,
      leverage: parseFloat(formData.leverage) || 1,
      exchange: formData.exchange,
      date: new Date(formData.date),
      pnl: parseFloat(formData.pnl) || 0,
      fees: parseFloat(formData.fees) || 0,
      remarks: formData.remarks,
      status: formData.status
    };

    onSubmit(trade);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl trading-card max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-xl">
              {isEditing ? 'Edit Trade' : 'Add New Trade'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Symbol *</Label>
                <Input
                  value={formData.symbol}
                  onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
                  placeholder="BTC, ETH, AAPL..."
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Exchange</Label>
                <Select 
                  value={formData.exchange} 
                  onValueChange={(value: string) => setFormData(prev => ({ ...prev, exchange: value }))}
                >
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white">
                    <SelectValue placeholder="Select exchange" />
                  </SelectTrigger>
                  <SelectContent>
                    {exchanges.map((exchange) => (
                      <SelectItem key={exchange} value={exchange}>
                        {exchange}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white">Type *</Label>
                <Select value={formData.type} onValueChange={(value: 'buy' | 'sell') => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Long (Buy)</SelectItem>
                    <SelectItem value="sell">Short (Sell)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">Quantity *</Label>
                <Input
                  type="number"
                  step="0.00001"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Leverage</Label>
                <Select value={formData.leverage} onValueChange={(value: string) => setFormData(prev => ({ ...prev, leverage: value }))}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Entry Price *</Label>
                <Input
                  type="number"
                  step="0.00001"
                  value={formData.entryPrice}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, entryPrice: e.target.value }));
                  }}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Exit Price</Label>
                <Input
                  type="number"
                  step="0.00001"
                  value={formData.exitPrice}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, exitPrice: e.target.value }));
                  }}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white">Fees</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.fees}
                  onChange={(e) => setFormData(prev => ({ ...prev, fees: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label className="text-white">P&L</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.pnl}
                    onChange={(e) => setFormData(prev => ({ ...prev, pnl: e.target.value }))}
                    className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  />
                  <Button type="button" onClick={calculatePnL} size="sm" variant="outline" className="border-trading-mint/30">
                    <Calculator className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-white">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'open' | 'closed') => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-white">Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white"
                required
              />
            </div>

            <div>
              <Label className="text-white">Trade Notes</Label>
              <Textarea
                value={formData.remarks}
                onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                placeholder="Strategy, market conditions, lessons learned..."
                className="border-trading-mint/30 bg-trading-blue/50 text-white min-h-[80px]"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint hover:scale-105 transition-all">
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Update Trade' : 'Add Trade'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-trading-mint/30 text-white hover:bg-trading-mint/20">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeForm;
