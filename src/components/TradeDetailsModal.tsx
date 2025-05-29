
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Edit2, Save, Cancel } from 'lucide-react';
import { Trade } from './TradingDashboard';

interface TradeDetailsModalProps {
  trade: Trade;
  onClose: () => void;
  onUpdate: (trade: Trade) => void;
}

const TradeDetailsModal: React.FC<TradeDetailsModalProps> = ({ trade, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    exitPrice: trade.exitPrice?.toString() || '',
    remarks: trade.remarks || '',
    status: trade.status
  });

  const handleSave = () => {
    const exitPrice = editData.exitPrice ? parseFloat(editData.exitPrice) : undefined;
    let pnl = trade.pnl;
    
    if (exitPrice) {
      pnl = trade.type === 'buy' 
        ? (exitPrice - trade.entryPrice) * trade.quantity
        : (trade.entryPrice - exitPrice) * trade.quantity;
    }

    const updatedTrade: Trade = {
      ...trade,
      exitPrice,
      pnl,
      remarks: editData.remarks,
      status: editData.status as 'open' | 'closed'
    };

    onUpdate(updatedTrade);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md trading-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center">
              {trade.symbol} Trade Details
              <Badge className={`ml-2 ${trade.pnl >= 0 ? 'bg-purple-600' : 'bg-red-600'}`}>
                ${trade.pnl.toFixed(2)}
              </Badge>
            </CardTitle>
            <div className="flex space-x-2">
              {!isEditing && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Type</Label>
              <div className="text-white font-medium">{trade.type.toUpperCase()}</div>
            </div>
            <div>
              <Label className="text-gray-300">Quantity</Label>
              <div className="text-white font-medium">{trade.quantity}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Entry Price</Label>
              <div className="text-white font-medium">${trade.entryPrice}</div>
            </div>
            <div>
              <Label className="text-gray-300">Exit Price</Label>
              {isEditing ? (
                <Input
                  type="number"
                  step="0.01"
                  value={editData.exitPrice}
                  onChange={(e) => setEditData(prev => ({ ...prev, exitPrice: e.target.value }))}
                  className="border-purple-500/30 bg-trading-blue/50 text-white"
                  placeholder="Enter exit price"
                />
              ) : (
                <div className="text-white font-medium">
                  {trade.exitPrice ? `$${trade.exitPrice}` : 'Not set'}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Date</Label>
            <div className="text-white font-medium">{trade.date.toLocaleDateString()}</div>
          </div>

          <div>
            <Label className="text-gray-300">Status</Label>
            {isEditing ? (
              <select 
                value={editData.status}
                onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value as 'open' | 'closed' }))}
                className="w-full p-2 rounded-md border border-purple-500/30 bg-trading-blue/50 text-white"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            ) : (
              <Badge variant={trade.status === 'closed' ? 'default' : 'secondary'}>
                {trade.status}
              </Badge>
            )}
          </div>

          <div>
            <Label className="text-gray-300">Remarks</Label>
            {isEditing ? (
              <Textarea
                value={editData.remarks}
                onChange={(e) => setEditData(prev => ({ ...prev, remarks: e.target.value }))}
                className="border-purple-500/30 bg-trading-blue/50 text-white"
                placeholder="Add your trading notes..."
              />
            ) : (
              <div className="text-white bg-trading-blue/30 p-3 rounded-md min-h-[80px]">
                {trade.remarks || 'No remarks added'}
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="flex space-x-4 pt-4">
              <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 border-purple-500/30 text-white">
                <Cancel className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={onClose} className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
              Close
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeDetailsModal;
