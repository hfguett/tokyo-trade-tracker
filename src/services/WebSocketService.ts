
interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
  exchange: string;
}

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: number;
  exchange: string;
}

interface PortfolioUpdate {
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  positions: Array<{
    symbol: string;
    quantity: number;
    avgPrice: number;
    currentPrice: number;
    pnl: number;
    pnlPercent: number;
  }>;
}

type WebSocketMessage = {
  type: 'market_data' | 'trade' | 'portfolio_update' | 'error' | 'connection_status';
  data: MarketData | Trade | PortfolioUpdate | any;
  timestamp: number;
};

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;
  private subscribers: Map<string, Array<(data: any) => void>> = new Map();
  private connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error' = 'disconnected';

  constructor(private url: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);
        this.connectionStatus = 'connecting';
        this.notifySubscribers('connection_status', { status: this.connectionStatus });

        this.ws.onopen = () => {
          console.log('WebSocket connected to Go backend');
          this.connectionStatus = 'connected';
          this.reconnectAttempts = 0;
          this.notifySubscribers('connection_status', { status: this.connectionStatus });
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('WebSocket connection closed');
          this.connectionStatus = 'disconnected';
          this.notifySubscribers('connection_status', { status: this.connectionStatus });
          this.handleReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.connectionStatus = 'error';
          this.notifySubscribers('connection_status', { status: this.connectionStatus });
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(message: WebSocketMessage) {
    this.notifySubscribers(message.type, message.data);
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect().catch(console.error);
      }, this.reconnectInterval);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  subscribe(type: string, callback: (data: any) => void): () => void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }
    this.subscribers.get(type)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(type);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  private notifySubscribers(type: string, data: any) {
    const callbacks = this.subscribers.get(type);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected. Message not sent:', message);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  getConnectionStatus() {
    return this.connectionStatus;
  }

  // Methods for easy backend integration
  subscribeToMarketData(symbols: string[]) {
    this.send({
      type: 'subscribe_market_data',
      symbols: symbols
    });
  }

  unsubscribeFromMarketData(symbols: string[]) {
    this.send({
      type: 'unsubscribe_market_data',
      symbols: symbols
    });
  }

  requestPortfolioUpdate() {
    this.send({
      type: 'request_portfolio_update'
    });
  }

  placeTrade(trade: Omit<Trade, 'id' | 'timestamp'>) {
    this.send({
      type: 'place_trade',
      trade: trade
    });
  }
}

export default WebSocketService;
export type { MarketData, Trade, PortfolioUpdate, WebSocketMessage };
