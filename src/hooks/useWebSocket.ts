
import { useEffect, useRef, useState } from 'react';
import WebSocketService, { MarketData, Trade, PortfolioUpdate } from '../services/WebSocketService';

interface UseWebSocketReturn {
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  marketData: Map<string, MarketData>;
  portfolioData: PortfolioUpdate | null;
  recentTrades: Trade[];
  connect: () => void;
  disconnect: () => void;
  subscribeToSymbols: (symbols: string[]) => void;
  placeTrade: (trade: any) => void;
}

export const useWebSocket = (url: string = 'ws://localhost:8080/ws'): UseWebSocketReturn => {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [marketData, setMarketData] = useState<Map<string, MarketData>>(new Map());
  const [portfolioData, setPortfolioData] = useState<PortfolioUpdate | null>(null);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  
  const wsService = useRef<WebSocketService | null>(null);

  useEffect(() => {
    wsService.current = new WebSocketService(url);

    // Subscribe to connection status
    const unsubscribeStatus = wsService.current.subscribe('connection_status', (data) => {
      setConnectionStatus(data.status);
    });

    // Subscribe to market data
    const unsubscribeMarket = wsService.current.subscribe('market_data', (data: MarketData) => {
      setMarketData(prev => {
        const newMap = new Map(prev);
        newMap.set(data.symbol, data);
        return newMap;
      });
    });

    // Subscribe to portfolio updates
    const unsubscribePortfolio = wsService.current.subscribe('portfolio_update', (data: PortfolioUpdate) => {
      setPortfolioData(data);
    });

    // Subscribe to trades
    const unsubscribeTrades = wsService.current.subscribe('trade', (data: Trade) => {
      setRecentTrades(prev => [data, ...prev.slice(0, 99)]); // Keep last 100 trades
    });

    return () => {
      unsubscribeStatus();
      unsubscribeMarket();
      unsubscribePortfolio();
      unsubscribeTrades();
      if (wsService.current) {
        wsService.current.disconnect();
      }
    };
  }, [url]);

  const connect = () => {
    if (wsService.current) {
      wsService.current.connect().catch(console.error);
    }
  };

  const disconnect = () => {
    if (wsService.current) {
      wsService.current.disconnect();
    }
  };

  const subscribeToSymbols = (symbols: string[]) => {
    if (wsService.current) {
      wsService.current.subscribeToMarketData(symbols);
    }
  };

  const placeTrade = (trade: any) => {
    if (wsService.current) {
      wsService.current.placeTrade(trade);
    }
  };

  return {
    connectionStatus,
    marketData,
    portfolioData,
    recentTrades,
    connect,
    disconnect,
    subscribeToSymbols,
    placeTrade
  };
};
