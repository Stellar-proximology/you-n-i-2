import { Circle, Brain, Zap, Heart, Eye, Star } from "lucide-react";

export interface FieldState {
  coherence: number;
  energy: number;
  state: string;
}

interface FieldStateIndicatorProps {
  field: "zer" | "mind" | "body" | "heart" | "soul" | "spirit";
  fieldState: FieldState;
  size?: "sm" | "md" | "lg";
}

const fieldIcons = {
  zer: Circle,
  mind: Brain,
  body: Zap,
  heart: Heart,
  soul: Eye,
  spirit: Star,
};

const fieldColors = {
  zer: "text-field-zer",
  mind: "text-field-mind",
  body: "text-field-body",
  heart: "text-field-heart",
  soul: "text-field-soul",
  spirit: "text-field-spirit",
};

export default function FieldStateIndicator({ field, fieldState, size = "md" }: FieldStateIndicatorProps) {
  const Icon = fieldIcons[field];
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  };
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center gap-2" data-testid={`field-indicator-${field}`}>
      <div className="relative">
        <svg className={sizeClasses[size]} viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`var(--field-${field})`}
            strokeWidth="8"
            strokeDasharray={`${fieldState.coherence * 283} 283`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`${iconSizes[size]} ${fieldColors[field]}`} />
        </div>
      </div>
      {size !== "sm" && (
        <div className="flex flex-col">
          <span className="text-sm font-medium capitalize text-foreground">{field}</span>
          <span className="text-xs text-muted-foreground">
            {Math.round(fieldState.coherence * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
