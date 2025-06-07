
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Edit2 } from 'lucide-react';
import { Trade } from '@/types/Trade';
import TradeForm from './TradeForm';

interface TradeDetailsModalProps {
  trade: Trade;
  onClose: () => void;
  onUpdate: (trade: Trade) => void;
}

const TradeDetailsModal: React.FC<TradeDetailsModalProps> = ({ trade, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedTradeData: Omit<Trade, 'id'>) => {
    const updatedTrade: Trade = {
      ...updatedTradeData,
      id: trade.id
    };
    onUpdate(updatedTrade);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TradeForm
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        initialData={trade}
        isEditing={true}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md lg:max-w-lg trading-card max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4 lg:p-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center text-lg lg:text-xl">
              {trade.symbol} Trade Details
              <Badge className={`ml-2 text-xs lg:text-sm ${trade.pnl >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                ${trade.pnl.toFixed(2)}
              </Badge>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-300 text-sm">Type</div>
              <div className="text-white font-medium">{trade.type.toUpperCase()}</div>
            </div>
            <div>
              <div className="text-gray-300 text-sm">Quantity</div>
              <div className="text-white font-medium">{trade.quantity}</div>
            </div>
          </div>

          {trade.exchange && (
            <div>
              <div className="text-gray-300 text-sm">Exchange</div>
              <div className="text-white font-medium">{trade.exchange}</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-300 text-sm">Entry Price</div>
              <div className="text-white font-medium">${trade.entryPrice}</div>
            </div>
            <div>
              <div className="text-gray-300 text-sm">Exit Price</div>
              <div className="text-white font-medium">
                {trade.exitPrice ? `$${trade.exitPrice}` : 'Not set'}
              </div>
            </div>
          </div>

          <div>
            <div className="text-gray-300 text-sm">Date</div>
            <div className="text-white font-medium">{trade.date.toLocaleDateString()}</div>
          </div>

          <div>
            <div className="text-gray-300 text-sm">Status</div>
            <Badge variant={trade.status === 'closed' ? 'default' : 'secondary'}>
              {trade.status}
            </Badge>
          </div>

          {trade.remarks && (
            <div>
              <div className="text-gray-300 text-sm">Notes</div>
              <div className="text-white bg-trading-blue/30 p-3 rounded-md">
                {trade.remarks}
              </div>
            </div>
          )}

          <Button onClick={onClose} className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeDetailsModal;
