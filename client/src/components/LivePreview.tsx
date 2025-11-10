import { useState } from 'react';
import { Monitor, Smartphone, Tablet, Maximize2, RefreshCw, X, ExternalLink } from 'lucide-react';

interface LivePreviewProps {
  url?: string;
  html?: string;
  onClose: () => void;
}

export default function LivePreview({ url, html, onClose }: LivePreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      case 'desktop': return 'w-full';
    }
  };

  const getDeviceHeight = () => {
    switch (device) {
      case 'mobile': return 'h-[667px]';
      case 'tablet': return 'h-[1024px]';
      case 'desktop': return 'h-full';
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/95 flex flex-col ${isFullscreen ? 'p-0' : 'p-4'}`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between gap-4 mb-4 px-4 py-3 bg-card/80 backdrop-blur-sm border border-border rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Live Preview</span>
          {url && (
            <div className="px-3 py-1 bg-muted rounded text-xs text-muted-foreground font-mono max-w-md truncate">
              {url}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Device Selector */}
          <div className="flex items-center gap-1 bg-muted/50 rounded p-1">
            <button
              onClick={() => setDevice('mobile')}
              className={`px-2 py-1.5 rounded transition-colors ${
                device === 'mobile' 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="preview-mobile"
              title="Mobile (375px)"
            >
              <Smartphone size={16} />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`px-2 py-1.5 rounded transition-colors ${
                device === 'tablet' 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="preview-tablet"
              title="Tablet (768px)"
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => setDevice('desktop')}
              className={`px-2 py-1.5 rounded transition-colors ${
                device === 'desktop' 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="preview-desktop"
              title="Desktop (100%)"
            >
              <Monitor size={16} />
            </button>
          </div>

          {/* Actions */}
          <button
            onClick={handleRefresh}
            className="w-9 h-9 flex items-center justify-center bg-card/80 hover:bg-muted border border-border rounded transition-colors"
            data-testid="button-refresh-preview"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 flex items-center justify-center bg-card/80 hover:bg-muted border border-border rounded transition-colors"
            data-testid="button-fullscreen-preview"
            title="Toggle Fullscreen"
          >
            <Maximize2 size={16} />
          </button>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-card/80 hover:bg-muted border border-border rounded transition-colors"
              data-testid="button-open-new-tab"
              title="Open in New Tab"
            >
              <ExternalLink size={16} />
            </a>
          )}

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center bg-card/80 hover:bg-destructive/20 border border-border rounded transition-colors"
            data-testid="button-close-preview"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 flex items-center justify-center">
        <div className={`${getDeviceWidth()} ${getDeviceHeight()} bg-background border border-border rounded-lg shadow-2xl overflow-hidden transition-all duration-300`}>
          {url ? (
            <iframe
              key={refreshKey}
              src={url}
              className="w-full h-full"
              title="Live Preview"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          ) : html ? (
            <iframe
              key={refreshKey}
              srcDoc={html}
              className="w-full h-full"
              title="Live Preview"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Monitor size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm">No content to preview</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Device Info */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg">
          <span className="text-xs text-muted-foreground">
            {device === 'mobile' && '📱 iPhone SE (375 × 667)'}
            {device === 'tablet' && '📱 iPad (768 × 1024)'}
            {device === 'desktop' && '💻 Desktop (Responsive)'}
          </span>
        </div>
      </div>
    </div>
  );
}
