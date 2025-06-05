
import React, { useState, useRef } from 'react';
import { Excalidraw, exportToCanvas, exportToSvg } from '@excalidraw/excalidraw';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Download, Upload, X, Palette } from 'lucide-react';

interface DrawingCanvasProps {
  onSave?: (drawingData: any) => void;
  onClose?: () => void;
  initialData?: any;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onSave, onClose, initialData }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!excalidrawAPI) return;
    
    setIsLoading(true);
    try {
      const elements = excalidrawAPI.getSceneElements();
      const appState = excalidrawAPI.getAppState();
      
      const drawingData = {
        elements,
        appState,
        timestamp: new Date().toISOString()
      };
      
      if (onSave) {
        onSave(drawingData);
      }
      
      console.log('Drawing saved successfully');
    } catch (error) {
      console.error('Error saving drawing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format: 'png' | 'svg') => {
    if (!excalidrawAPI) return;
    
    try {
      const elements = excalidrawAPI.getSceneElements();
      const appState = excalidrawAPI.getAppState();
      
      if (format === 'png') {
        const canvas = await exportToCanvas({
          elements,
          appState,
          files: excalidrawAPI.getFiles(),
        });
        
        const link = document.createElement('a');
        link.download = `chart-analysis-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } else {
        const svg = await exportToSvg({
          elements,
          appState,
          files: excalidrawAPI.getFiles(),
        });
        
        const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `chart-analysis-${Date.now()}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting drawing:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[90vh] trading-card border-trading-mint/30">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-trading-mint/20">
          <CardTitle className="text-white flex items-center">
            <Palette className="h-6 w-6 mr-3 text-trading-mint" />
            Professional Chart Analysis & Drawing Board
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => handleExport('png')}
              variant="outline"
              size="sm"
              className="border-trading-mint/30 text-white hover:bg-trading-mint/20"
            >
              <Download className="h-4 w-4 mr-2" />
              PNG
            </Button>
            <Button
              onClick={() => handleExport('svg')}
              variant="outline"
              size="sm"
              className="border-trading-mint/30 text-white hover:bg-trading-mint/20"
            >
              <Download className="h-4 w-4 mr-2" />
              SVG
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint hover:scale-105 transition-all"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Drawing'}
            </Button>
            {onClose && (
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="border-trading-mint/30 text-white hover:bg-red-500/20"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <div className="h-full bg-white rounded-b-lg overflow-hidden">
            <Excalidraw
              ref={(api) => setExcalidrawAPI(api)}
              initialData={initialData}
              theme="light"
              UIOptions={{
                canvasActions: {
                  saveToActiveFile: false,
                  loadScene: false,
                  export: false,
                  toggleTheme: false,
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawingCanvas;
