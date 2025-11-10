// Human Design Chart Calculator - Translated from SharpAstrology.HumanDesign
// Simplified version for web use

export interface HumanDesignChart {
  type: string;
  profile: string;
  authority: string;
  strategy: string;
  incarnationCross: string;
  definedCenters: string[];
  activeGates: number[];
  activeChannels: string[];
  variables: {
    digestion: string;
    environment: string;
    perspective: string;
    awareness: string;
  };
  personality: GateActivation[];
  design: GateActivation[];
}

export interface GateActivation {
  planet: string;
  gate: number;
  line: number;
  color: number;
  tone: number;
  base?: number;
}

export interface HDInterpretation {
  gate: {
    name: string;
    theme: string;
    keynote: string;
  };
  line: {
    name: string;
    sentence_fragment: string;
  };
  color: {
    name: string;
    sentence_fragment: string;
  };
  tone: {
    name: string;
    sentence_fragment: string;
  };
  base: {
    name: string;
    sentence_fragment: string;
  };
  sentence: string;
}

// Human Design Gates to I Ching Hexagrams mapping
const GATES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];

// Channel definitions (gate pairs that form channels)
const CHANNELS = [
  [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52], [10, 20],
  [10, 34], [10, 57], [11, 56], [12, 22], [13, 33], [16, 48], [17, 62], [18, 58],
  [19, 49], [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51], [26, 44],
  [27, 50], [28, 38], [29, 46], [30, 41], [32, 54], [35, 36], [37, 40], [39, 55], [42, 53], [47, 64]
];

// Nine Centers in Human Design
const CENTERS = [
  'Head', 'Ajna', 'Throat', 'G', 'Heart', 'Spleen', 'Solar Plexus', 'Sacral', 'Root'
];

// Gate to Center mapping
const GATE_TO_CENTER: { [key: number]: string } = {
  // Head Center
  64: 'Head', 61: 'Head', 63: 'Head',
  // Ajna Center
  47: 'Ajna', 24: 'Ajna', 4: 'Ajna', 17: 'Ajna', 43: 'Ajna', 11: 'Ajna',
  // Throat Center
  62: 'Throat', 23: 'Throat', 56: 'Throat', 35: 'Throat', 12: 'Throat', 45: 'Throat', 33: 'Throat', 8: 'Throat', 31: 'Throat', 20: 'Throat', 16: 'Throat',
  // G Center
  7: 'G', 1: 'G', 13: 'G', 10: 'G',
  // Heart Center (Ego/Will)
  51: 'Heart', 21: 'Heart', 40: 'Heart', 26: 'Heart',
  // Spleen Center
  48: 'Spleen', 57: 'Spleen', 44: 'Spleen', 50: 'Spleen', 32: 'Spleen', 28: 'Spleen', 18: 'Spleen',
  // Solar Plexus Center
  36: 'Solar Plexus', 22: 'Solar Plexus', 37: 'Solar Plexus', 6: 'Solar Plexus', 49: 'Solar Plexus', 55: 'Solar Plexus', 30: 'Solar Plexus',
  // Sacral Center
  34: 'Sacral', 5: 'Sacral', 14: 'Sacral', 29: 'Sacral', 59: 'Sacral', 9: 'Sacral', 3: 'Sacral', 42: 'Sacral', 27: 'Sacral',
  // Root Center
  58: 'Root', 38: 'Root', 54: 'Root', 53: 'Root', 60: 'Root', 52: 'Root', 19: 'Root', 39: 'Root', 41: 'Root'
};

function calculateGateFromAngle(angle: number): number {
  // Convert ecliptic longitude to Human Design gate (1-64)
  // Each gate covers approximately 5.625 degrees (360 / 64)
  const gateSize = 360 / 64;
  const gateIndex = Math.floor(angle / gateSize);
  return GATES[gateIndex % 64];
}

function calculateLine(angle: number): number {
  // Each gate has 6 lines
  const gateSize = 360 / 64;
  const lineSize = gateSize / 6;
  const withinGate = angle % gateSize;
  return Math.floor(withinGate / lineSize) + 1;
}

function calculateColor(angle: number): number {
  // Each line has 6 colors
  const gateSize = 360 / 64;
  const lineSize = gateSize / 6;
  const colorSize = lineSize / 6;
  const withinLine = angle % lineSize;
  return Math.floor(withinLine / colorSize) + 1;
}

function calculateTone(angle: number): number {
  // Each color has 6 tones
  const gateSize = 360 / 64;
  const lineSize = gateSize / 6;
  const colorSize = lineSize / 6;
  const toneSize = colorSize / 6;
  const withinColor = angle % colorSize;
  return Math.floor(withinColor / toneSize) + 1;
}

function calculateBase(angle: number): number {
  // Each tone has 5 bases
  const gateSize = 360 / 64;
  const lineSize = gateSize / 6;
  const colorSize = lineSize / 6;
  const toneSize = colorSize / 6;
  const baseSize = toneSize / 5;
  const withinTone = angle % toneSize;
  return Math.floor(withinTone / baseSize) + 1;
}

export function calculateHumanDesignChart(
  birthDate: Date,
  birthLat: number = 0,
  birthLon: number = 0
): HumanDesignChart {
  // For simplified version, we'll use basic calculations
  // In production, you'd use Swiss Ephemeris or NASA JPL data
  
  const personality: GateActivation[] = [];
  const design: GateActivation[] = [];
  
  // Calculate Design date (approximately 88 degrees before birth)
  const designDate = new Date(birthDate.getTime() - 88 * 24 * 60 * 60 * 1000);
  
  // Simplified planetary positions (in reality, use astronomia or ephemeris)
  const planets = ['Sun', 'Earth', 'Moon', 'North Node', 'South Node', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
  
  // Mock calculations - in production use real ephemeris
  planets.forEach((planet, i) => {
    const baseAngle = (birthDate.getTime() / 100000000 + i * 30) % 360;
    const designAngle = (designDate.getTime() / 100000000 + i * 30) % 360;
    
    personality.push({
      planet,
      gate: calculateGateFromAngle(baseAngle),
      line: calculateLine(baseAngle),
      color: calculateColor(baseAngle),
      tone: calculateTone(baseAngle),
      base: calculateBase(baseAngle)
    });
    
    design.push({
      planet,
      gate: calculateGateFromAngle(designAngle),
      line: calculateLine(designAngle),
      color: calculateColor(designAngle),
      tone: calculateTone(designAngle),
      base: calculateBase(designAngle)
    });
  });
  
  // Collect all active gates
  const activeGates = Array.from(new Set([
    ...personality.map(p => p.gate),
    ...design.map(d => d.gate)
  ])).sort((a, b) => a - b);
  
  // Find active channels
  const activeChannels: string[] = [];
  CHANNELS.forEach(([gate1, gate2]) => {
    if (activeGates.includes(gate1) && activeGates.includes(gate2)) {
      activeChannels.push(`${gate1}-${gate2}`);
    }
  });
  
  // Determine defined centers based on active channels
  const definedCenters: string[] = [];
  activeGates.forEach(gate => {
    const center = GATE_TO_CENTER[gate];
    if (center && !definedCenters.includes(center)) {
      definedCenters.push(center);
    }
  });
  
  // Determine Type based on defined centers
  let type = 'Reflector';
  const hasSacral = definedCenters.includes('Sacral');
  const hasThroat = definedCenters.includes('Throat');
  const hasHeart = definedCenters.includes('Heart');
  
  if (hasSacral && hasThroat) {
    type = 'Manifesting Generator';
  } else if (hasSacral) {
    type = 'Generator';
  } else if (hasThroat && (hasHeart || definedCenters.includes('G'))) {
    type = 'Manifestor';
  } else if (!hasSacral && definedCenters.length > 0) {
    type = 'Projector';
  }
  
  // Profile (based on Sun and Earth lines)
  const sunLine = personality[0].line;
  const earthLine = design[1].line;
  const profile = `${sunLine}/${earthLine}`;
  
  // Authority
  let authority = 'Lunar (Moon)';
  if (definedCenters.includes('Solar Plexus')) authority = 'Emotional';
  else if (definedCenters.includes('Sacral')) authority = 'Sacral';
  else if (definedCenters.includes('Spleen')) authority = 'Splenic';
  else if (definedCenters.includes('Heart')) authority = 'Ego';
  else if (definedCenters.includes('G')) authority = 'Self-Projected';
  
  // Strategy based on Type
  const strategyMap: { [key: string]: string } = {
    'Generator': 'To Respond',
    'Manifesting Generator': 'To Respond',
    'Manifestor': 'To Inform',
    'Projector': 'To Wait for Invitation',
    'Reflector': 'To Wait a Lunar Cycle'
  };
  
  const strategy = strategyMap[type];
  
  // Incarnation Cross (simplified)
  const sunGate = personality[0].gate;
  const earthGate = personality[1].gate;
  const incarnationCross = `Cross of ${sunGate}/${earthGate}`;
  
  // Variables (simplified based on nodes)
  const variables = {
    digestion: `Color ${personality[3].color} - Tone ${personality[3].tone}`,
    environment: `Color ${design[3].color} - Tone ${design[3].tone}`,
    perspective: `Color ${personality[4].color} - Tone ${personality[4].tone}`,
    awareness: `Color ${design[4].color} - Tone ${design[4].tone}`
  };
  
  return {
    type,
    profile,
    authority,
    strategy,
    incarnationCross,
    definedCenters,
    activeGates,
    activeChannels,
    variables,
    personality,
    design
  };
}
