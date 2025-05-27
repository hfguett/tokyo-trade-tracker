
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Edit2, Save } from 'lucide-react';
import { format } from 'date-fns';
import { Trade } from './TradingDashboard';

interface TradeDetailsModalProps {
  trade: Trade;
  onClose: () => void;
  onUpdate: (trade: Trade) => void;
}

const TradeDetailsModal: React.FC<TradeDetailsModalProps> = ({ trade, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrade, setEditedTrade] = useState(trade);

  const handleSave = () => {
    onUpdate(editedTrade);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTrade(trade);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg trading-card border-trading-mint/30">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">{trade.symbol} Trade Details</CardTitle>
              <p className="text-gray-300 text-sm mt-1">
                {format(trade.date, 'EEEE, MMMM dd, yyyy')}
              </p>
            </div>
            <div className="flex space-x-2">
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-trading-mint hover:text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditing ? (
            // View Mode
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Type</Label>
                  <div className="text-white font-medium capitalize">{trade.type}</div>
                </div>
                <div>
                  <Label className="text-gray-300">Status</Label>
                  <Badge variant={trade.status === 'open' ? 'outline' : 'default'} className="ml-2">
                    {trade.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Quantity</Label>
                  <div className="text-white font-medium">{trade.quantity}</div>
                </div>
                <div>
                  <Label className="text-gray-300">Entry Price</Label>
                  <div className="text-white font-medium">${trade.entryPrice.toFixed(2)}</div>
                </div>
              </div>

              {trade.exitPrice && (
                <div>
                  <Label className="text-gray-300">Exit Price</Label>
                  <div className="text-white font-medium">${trade.exitPrice.toFixed(2)}</div>
                </div>
              )}

              <div>
                <Label className="text-gray-300">PnL</Label>
                <div className={`text-xl font-bold ${trade.pnl >= 0 ? 'text-trading-profit' : 'text-trading-loss'}`}>
                  ${trade.pnl.toFixed(2)}
                </div>
              </div>

              {trade.remarks && (
                <div>
                  <Label className="text-gray-300">Remarks</Label>
                  <div className="text-white bg-trading-blue/30 p-3 rounded-lg border border-trading-mint/20 mt-2">
                    {trade.remarks}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Edit Mode
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Quantity</Label>
                  <Input
                    type="number"
                    value={editedTrade.quantity}
                    onChange={(e) => setEditedTrade(prev => ({ ...prev, quantity: parseFloat(e.target.value) }))}
                    className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Entry Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editedTrade.entryPrice}
                    onChange={(e) => setEditedTrade(prev => ({ ...prev, entryPrice: parseFloat(e.target.value) }))}
                    className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Exit Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editedTrade.exitPrice || ''}
                  onChange={(e) => setEditedTrade(prev => ({ 
                    ...prev, 
                    exitPrice: e.target.value ? parseFloat(e.target.value) : undefined 
                  }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">PnL ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editedTrade.pnl}
                  onChange={(e) => setEditedTrade(prev => ({ ...prev, pnl: parseFloat(e.target.value) }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Remarks</Label>
                <Textarea
                  value={editedTrade.remarks || ''}
                  onChange={(e) => setEditedTrade(prev => ({ ...prev, remarks: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white min-h-20"
                  placeholder="Add trade notes..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-trading-mint/30 text-white hover:bg-trading-mint/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-mint hover:scale-105 transform transition-all duration-300"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeDetailsModal;
