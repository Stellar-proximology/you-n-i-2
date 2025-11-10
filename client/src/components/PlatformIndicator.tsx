import { Monitor, Smartphone, Tablet } from "lucide-react";
import { usePlatform } from "@/hooks/usePlatform";

export default function PlatformIndicator() {
  const platform = usePlatform();

  const getPlatformIcon = () => {
    switch (platform.type) {
      case 'mobile':
        return <Smartphone className="w-3 h-3" />;
      case 'tablet':
        return <Tablet className="w-3 h-3" />;
      default:
        return <Monitor className="w-3 h-3" />;
    }
  };

  const getPlatformColor = () => {
    switch (platform.type) {
      case 'mobile':
        return 'text-green-400';
      case 'tablet':
        return 'text-blue-400';
      default:
        return 'text-purple-400';
    }
  };

  return (
    <div 
      className="flex items-center gap-1.5 px-2 py-1 bg-muted/50 rounded text-xs"
      data-testid="platform-indicator"
      title={`Platform: ${platform.type} | OS: ${platform.os} | ${platform.isTouchDevice ? 'Touch' : 'Mouse'}`}
    >
      <div className={getPlatformColor()}>
        {getPlatformIcon()}
      </div>
      <span className="text-muted-foreground hidden sm:inline capitalize">
        {platform.type}
      </span>
      {platform.isStandalone && (
        <span className="ml-1 px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded font-medium">
          PWA
        </span>
      )}
    </div>
  );
}
