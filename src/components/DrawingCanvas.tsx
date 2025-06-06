
import React, { useState, useRef } from 'react';
import { Excalidraw, exportToCanvas, exportToSvg } from '@excalidraw/excalidraw';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Download, Upload, X, Palette, Layers, PenTool } from 'lucide-react';

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
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      
      if (onSave) {
        onSave(drawingData);
      }
      
      console.log('Professional chart analysis saved successfully', drawingData);
    } catch (error) {
      console.error('Error saving chart analysis:', error);
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
          getDimensions: () => ({ width: 1920, height: 1080 })
        });
        
        const link = document.createElement('a');
        link.download = `smart-journal-analysis-${Date.now()}.png`;
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
        link.download = `smart-journal-analysis-${Date.now()}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting chart analysis:', error);
    }
  };

  const loadTemplate = (templateType: 'support-resistance' | 'trend-lines' | 'fibonacci' | 'patterns') => {
    if (!excalidrawAPI) return;

    // Create template elements based on type
    const templates = {
      'support-resistance': [
        {
          type: 'line',
          x: 100,
          y: 200,
          width: 600,
          height: 0,
          strokeColor: '#10b981',
          strokeWidth: 3,
          roughness: 0
        },
        {
          type: 'line',
          x: 100,
          y: 300,
          width: 600,
          height: 0,
          strokeColor: '#ef4444',
          strokeWidth: 3,
          roughness: 0
        }
      ],
      'trend-lines': [
        {
          type: 'line',
          x: 100,
          y: 300,
          width: 500,
          height: -100,
          strokeColor: '#3b82f6',
          strokeWidth: 2,
          roughness: 0
        }
      ],
      'fibonacci': [
        // Fibonacci retracement levels
        ...Array.from({ length: 6 }, (_, i) => ({
          type: 'line',
          x: 100,
          y: 150 + i * 30,
          width: 600,
          height: 0,
          strokeColor: '#f59e0b',
          strokeWidth: 1,
          roughness: 0,
          opacity: 70
        }))
      ],
      'patterns': [
        {
          type: 'rectangle',
          x: 200,
          y: 150,
          width: 200,
          height: 100,
          strokeColor: '#8b5cf6',
          backgroundColor: 'transparent',
          strokeWidth: 2,
          roughness: 0
        }
      ]
    };

    // This is a simplified approach - in a real implementation,
    // you'd use the Excalidraw API to add these elements
    console.log('Loading template:', templateType, templates[templateType]);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-[95vw] h-[95vh] trading-card border-trading-mint/40">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-trading-mint/20">
          <CardTitle className="text-white flex items-center text-2xl">
            <PenTool className="h-8 w-8 mr-4 text-trading-mint" />
            Professional Chart Analysis & Drawing Board
          </CardTitle>
          
          <div className="flex items-center space-x-3">
            {/* Template Buttons */}
            <div className="hidden lg:flex items-center space-x-2 mr-4">
              <Button
                onClick={() => loadTemplate('support-resistance')}
                variant="outline"
                size="sm"
                className="border-trading-mint/30 text-white hover:bg-trading-mint/20"
              >
                S/R Lines
              </Button>
              <Button
                onClick={() => loadTemplate('trend-lines')}
                variant="outline"
                size="sm"
                className="border-trading-mint/30 text-white hover:bg-trading-mint/20"
              >
                Trends
              </Button>
              <Button
                onClick={() => loadTemplate('fibonacci')}
                variant="outline"
                size="sm"
                className="border-trading-mint/30 text-white hover:bg-trading-mint/20"
              >
                Fibonacci
              </Button>
            </div>

            {/* Export Buttons */}
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
            
            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint hover:scale-105 transition-all duration-300 px-6"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Analysis'}
            </Button>
            
            {/* Close Button */}
            {onClose && (
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0 h-full">
          <div className="h-[calc(95vh-120px)] bg-white rounded-b-lg overflow-hidden">
            <Excalidraw
              excalidrawAPI={(api) => {
                setExcalidrawAPI(api);
                console.log('Excalidraw API initialized', api);
              }}
              initialData={initialData || {
                elements: [],
                appState: {
                  viewBackgroundColor: '#ffffff',
                  gridSize: null,
                  zoom: { value: 1 },
                  scrollX: 0,
                  scrollY: 0,
                  zenModeEnabled: false,
                  theme: 'light'
                }
              }}
              theme="light"
              UIOptions={{
                canvasActions: {
                  saveToActiveFile: false,
                  loadScene: false,
                  export: false,
                  toggleTheme: false,
                },
                tools: {
                  image: true,
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawingCanvas;
