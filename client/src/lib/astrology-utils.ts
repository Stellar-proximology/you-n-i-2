// Ephemeris calculations for planetary positions
export class Ephemeris {
  private date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  // Calculate longitude for celestial body
  lon(body: string): number {
    const jd = this.julianDate(this.date);
    const T = (jd - 2451545.0) / 36525.0;

    switch (body.toLowerCase()) {
      case "sun":
        return this.sunLongitude(T);
      case "moon":
        return this.moonLongitude(T);
      case "mercury":
        return this.mercuryLongitude(T);
      case "venus":
        return this.venusLongitude(T);
      case "mars":
        return this.marsLongitude(T);
      case "northnode":
      case "north node":
        return this.northNodeLongitude(T);
      default:
        return 0;
    }
  }

  private julianDate(date: Date): number {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    const h = date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0;

    let a = Math.floor((14 - m) / 12);
    let y2 = y + 4800 - a;
    let m2 = m + 12 * a - 3;

    let jdn = d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
    return jdn + (h - 12) / 24.0;
  }

  private sunLongitude(T: number): number {
    const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(this.toRadians(M)) +
              (0.019993 - 0.000101 * T) * Math.sin(this.toRadians(2 * M)) +
              0.000289 * Math.sin(this.toRadians(3 * M));
    return this.normalize(L0 + C);
  }

  private moonLongitude(T: number): number {
    const L = 218.3164477 + 481267.88123421 * T;
    const D = 297.8501921 + 445267.1114034 * T;
    const M = 357.5291092 + 35999.0502909 * T;
    const Mp = 134.9633964 + 477198.8675055 * T;
    
    let lon = L + 6.288774 * Math.sin(this.toRadians(Mp));
    lon += 1.274027 * Math.sin(this.toRadians(2 * D - Mp));
    lon += 0.658314 * Math.sin(this.toRadians(2 * D));
    
    return this.normalize(lon);
  }

  private mercuryLongitude(T: number): number {
    const L = 252.250906 + 149472.6746358 * T;
    const correction = 23.4406 * Math.sin(this.toRadians(L));
    return this.normalize(L + correction);
  }

  private venusLongitude(T: number): number {
    const L = 181.979801 + 58517.8156760 * T;
    const correction = 0.7758 * Math.sin(this.toRadians(L));
    return this.normalize(L + correction);
  }

  private marsLongitude(T: number): number {
    const L = 355.433 + 19140.299 * T;
    const correction = 1.849 * Math.sin(this.toRadians(L));
    return this.normalize(L + correction);
  }

  private northNodeLongitude(T: number): number {
    // Mean longitude of ascending node
    const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + T * T * T / 450000;
    return this.normalize(omega);
  }

  private toRadians(deg: number): number {
    return deg * Math.PI / 180.0;
  }

  private normalize(deg: number): number {
    let result = deg % 360;
    if (result < 0) result += 360;
    return result;
  }
}

// Get natal positions from birth data
export function getPositions(params: {
  date: Date;
  lat: number;
  lon: number;
}): Array<{ body: string; lon: number }> {
  const eph = new Ephemeris(params.date);
  
  return [
    { body: "Sun", lon: eph.lon("sun") },
    { body: "Moon", lon: eph.lon("moon") },
    { body: "Mercury", lon: eph.lon("mercury") },
    { body: "Venus", lon: eph.lon("venus") },
    { body: "Mars", lon: eph.lon("mars") },
    { body: "North Node", lon: eph.lon("northnode") },
  ];
}

// Magic Square solver
export class MagicSquare {
  private size: number;
  private grid: number[][] = [];

  constructor(size: number) {
    this.size = size;
    this.grid = Array(size).fill(0).map(() => Array(size).fill(0));
  }

  fill(values: number[]) {
    let idx = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = values[idx++] || 0;
      }
    }
  }

  solve(): { grid: number[][]; isMagic: boolean; sum: number } {
    const targetSum = this.grid[0].reduce((a, b) => a + b, 0);
    let isMagic = true;

    // Check rows
    for (let i = 0; i < this.size; i++) {
      const rowSum = this.grid[i].reduce((a, b) => a + b, 0);
      if (rowSum !== targetSum) isMagic = false;
    }

    // Check columns
    for (let j = 0; j < this.size; j++) {
      let colSum = 0;
      for (let i = 0; i < this.size; i++) {
        colSum += this.grid[i][j];
      }
      if (colSum !== targetSum) isMagic = false;
    }

    // Check diagonals
    let diag1 = 0, diag2 = 0;
    for (let i = 0; i < this.size; i++) {
      diag1 += this.grid[i][i];
      diag2 += this.grid[i][this.size - 1 - i];
    }
    if (diag1 !== targetSum || diag2 !== targetSum) isMagic = false;

    return {
      grid: this.grid,
      isMagic,
      sum: targetSum
    };
  }
}

// Simple OrbitViewer component placeholder
export function OrbitViewer({ bodies, date }: { bodies: any[]; date: Date }) {
  return null; // Will be rendered as fallback in component
}
