import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, Play, Pause } from "lucide-react";

export interface PresentationSlide {
  id: string;
  title: string;
  content: string;
  type: 'intro' | 'plan' | 'solution' | 'action' | 'insight' | 'summary';
  bullets?: string[];
  visual?: 'chart' | 'diagram' | 'timeline' | 'none';
  agentNote?: string;
}

interface AgentPresentationProps {
  slides: PresentationSlide[];
  agentName?: string;
  onClose: () => void;
}

export default function AgentPresentation({ slides, agentName = "Your Agent", onClose }: AgentPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  const getSlideColor = (type: PresentationSlide['type']) => {
    switch (type) {
      case 'intro': return 'from-purple-500/20 to-purple-500/5';
      case 'plan': return 'from-cyan-500/20 to-cyan-500/5';
      case 'solution': return 'from-green-500/20 to-green-500/5';
      case 'action': return 'from-orange-500/20 to-orange-500/5';
      case 'insight': return 'from-pink-500/20 to-pink-500/5';
      case 'summary': return 'from-blue-500/20 to-blue-500/5';
    }
  };

  const getSlideIcon = (type: PresentationSlide['type']) => {
    switch (type) {
      case 'intro': return '👋';
      case 'plan': return '📋';
      case 'solution': return '✨';
      case 'action': return '🎯';
      case 'insight': return '💡';
      case 'summary': return '🌟';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}>
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg">
            <span className="text-sm font-medium text-foreground">{agentName} Presents:</span>
          </div>
          <div className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
            <span className="text-xs text-cyan-400 font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="w-9 h-9 flex items-center justify-center bg-card/80 backdrop-blur-sm hover:bg-muted border border-border rounded-lg transition-colors"
            data-testid="button-autoplay"
            title={isAutoPlay ? "Pause" : "Auto-play"}
          >
            {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 flex items-center justify-center bg-card/80 backdrop-blur-sm hover:bg-muted border border-border rounded-lg transition-colors"
            data-testid="button-fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center bg-card/80 backdrop-blur-sm hover:bg-destructive/20 border border-border rounded-lg transition-colors"
            data-testid="button-close-presentation"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Slide */}
      <div className={`relative w-full max-w-5xl ${isFullscreen ? 'h-screen' : 'h-[600px]'} mx-auto`}>
        <div className={`w-full h-full bg-gradient-to-br ${getSlideColor(slide.type)} border border-border rounded-2xl p-8 sm:p-12 flex flex-col justify-center shadow-2xl`}>
          {/* Slide Type Badge */}
          <div className="absolute top-6 right-6">
            <div className="px-3 py-1.5 bg-card/60 backdrop-blur-sm border border-border rounded-full text-xs font-medium text-muted-foreground">
              {slide.type.toUpperCase()}
            </div>
          </div>

          {/* Slide Icon */}
          <div className="text-6xl mb-6 animate-fade-in">
            {getSlideIcon(slide.type)}
          </div>

          {/* Slide Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
            {slide.title}
          </h2>

          {/* Slide Content */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {slide.content && (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {slide.content}
              </p>
            )}

            {/* Bullet Points */}
            {slide.bullets && slide.bullets.length > 0 && (
              <ul className="space-y-3 mt-6">
                {slide.bullets.map((bullet, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start gap-3 text-foreground animate-slide-in"
                    style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                  >
                    <span className="text-cyan-400 text-xl mt-1">•</span>
                    <span className="text-lg">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Agent Note */}
            {slide.agentNote && (
              <div className="mt-8 p-4 bg-card/40 backdrop-blur-sm border border-border rounded-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <p className="text-sm italic text-muted-foreground">
                  <span className="text-cyan-400 font-medium">Agent Note:</span> {slide.agentNote}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-card/80 backdrop-blur-sm hover:bg-muted border border-border rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          data-testid="button-prev-slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-card/80 backdrop-blur-sm hover:bg-muted border border-border rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          data-testid="button-next-slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide 
                ? 'bg-cyan-400 w-8' 
                : 'bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
            data-testid={`thumbnail-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
