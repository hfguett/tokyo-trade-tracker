
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign, Activity, Plus, Calendar, Target, BarChart3, AlertTriangle, Users, Clock } from 'lucide-react';
import AddTradeForm from './AddTradeForm';
import EnhancedDashboard from './EnhancedDashboard';

export interface Trade {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  date: Date;
  pnl?: number;
  fees?: number;
  exchange?: string;
  strategy?: string;
  notes?: string;
  status: 'open' | 'closed';
}

interface TradingDashboardProps {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
  accentColor: 'mint' | 'purple';
}

const TradingDashboard: React.FC<TradingDashboardProps> = ({ trades, setTrades, accentColor }) => {
  return <EnhancedDashboard accentColor={accentColor} />;
};

export default TradingDashboard;
