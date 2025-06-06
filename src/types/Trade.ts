
export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  entryPrice: number;
  exitPrice?: number;
  leverage: number;
  date: Date;
  pnl: number;
  fees?: number;
  exchange?: string;
  strategy?: string;
  remarks?: string;
  status: 'open' | 'closed';
}
