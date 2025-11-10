import { useEffect, useRef, useState } from "react";

interface ConsciousnessFieldVizProps {
  active: number[];
  polyvagalState?: 'ventral' | 'sympathetic' | 'dorsal';
  mode?: 'organic' | 'geometric' | 'neural';
}

export default function ConsciousnessFieldViz({ 
  active, 
  polyvagalState = 'ventral', 
  mode = 'organic' 
}: ConsciousnessFieldVizProps) {
  const [currentMode, setCurrentMode] = useState(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    
    const width = canvas.width / 2;
    const height = canvas.height / 2;
    
    let frame = 0;
    let animationId: number;
    
    const stateParams = {
      ventral: { speed: 0.02, intensity: 0.6, smoothness: 0.9 },
      sympathetic: { speed: 0.08, intensity: 1.0, smoothness: 0.3 },
      dorsal: { speed: 0.01, intensity: 0.3, smoothness: 0.95 }
    };
    
    const params = stateParams[polyvagalState];
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      frame += params.speed;
      
      if (currentMode === 'organic') {
        active.forEach((hex, idx) => {
          const hue = (hex * 5.625) % 360;
          const x = width / 2 + Math.sin(frame + idx) * (width / 3) * params.intensity;
          const y = height / 2 + Math.cos(frame + idx * 0.7) * (height / 3) * params.intensity;
          const radius = 20 + Math.sin(frame * 2 + idx) * 10 * params.smoothness;
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.8)`);
          gradient.addColorStop(1, `hsla(${hue}, 70%, 30%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (currentMode === 'geometric') {
        ctx.strokeStyle = `hsla(${frame * 50 % 360}, 70%, 60%, ${params.intensity})`;
        ctx.lineWidth = 2;
        
        active.forEach((hex, idx) => {
          const sides = 3 + (hex % 5);
          const radius = 30 + (hex % 40);
          const rotation = frame + idx * 0.5;
          const x = width / 2 + Math.cos(idx * 0.5) * (width / 4);
          const y = height / 2 + Math.sin(idx * 0.5) * (height / 4);
          
          ctx.beginPath();
          for (let i = 0; i <= sides; i++) {
            const angle = (i / sides) * Math.PI * 2 + rotation;
            const px = x + Math.cos(angle) * radius * params.smoothness;
            const py = y + Math.sin(angle) * radius * params.smoothness;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        });
      } else if (currentMode === 'neural') {
        const nodes = active.map((hex, idx) => ({
          x: (width / 2) + Math.cos(idx * 0.8 + frame * 0.3) * (width / 3),
          y: (height / 2) + Math.sin(idx * 0.8 + frame * 0.3) * (height / 3),
          hex
        }));
        
        ctx.strokeStyle = `rgba(100, 200, 255, ${params.intensity * 0.3})`;
        ctx.lineWidth = 1;
        nodes.forEach((n1, i) => {
          nodes.slice(i + 1).forEach(n2 => {
            const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          });
        });
        
        nodes.forEach(node => {
          const hue = (node.hex * 5.625) % 360;
          ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4 + Math.sin(frame * 3) * 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = `hsla(${hue}, 90%, 80%, ${Math.sin(frame * 4 + node.hex) * 0.5 + 0.5})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8 + Math.sin(frame * 3) * 4, 0, Math.PI * 2);
          ctx.stroke();
        });
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => cancelAnimationFrame(animationId);
  }, [active, polyvagalState, currentMode]);
  
  const modes = [
    { id: 'organic', label: '🌊 Organic' },
    { id: 'geometric', label: '◇ Geometric' },
    { id: 'neural', label: '⚡ Neural' }
  ] as const;
  
  return (
    <div className="bg-black/40 border border-purple-500/30 rounded-lg backdrop-blur-md p-3">
      <div className="mb-2">
        <h3 className="text-center mb-2 text-sm font-light text-foreground tracking-wide">
          Consciousness Field
        </h3>
        <div className="flex justify-center gap-2 mb-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setCurrentMode(m.id)}
              className={`px-2 py-1 text-[10px] rounded transition ${
                currentMode === m.id
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50'
                  : 'bg-white/5 text-muted-foreground border border-border hover:bg-white/10'
              }`}
              data-testid={`button-mode-${m.id}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: 'radial-gradient(circle at center, #0a0a1a 0%, #000000 100%)' }}
        />
        
        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur text-[9px]">
          <span className={`${
            polyvagalState === 'ventral' ? 'text-green-400' :
            polyvagalState === 'sympathetic' ? 'text-yellow-400' :
            'text-blue-400'
          }`}>
            ● {polyvagalState}
          </span>
        </div>
        
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur text-[9px] text-muted-foreground">
          {active.length} active
        </div>
      </div>
    </div>
  );
}
