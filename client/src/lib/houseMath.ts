/* helpers/houseMath.ts */

// Simple house and ascendant calculations
// Uses equal-house system for simplicity

export function getHouseCusps(date: Date, lat: number, lon: number) {
  // Convert to Julian Date
  const jd = dateToJulianDate(date);
  
  // Calculate Local Sidereal Time
  const gst = greenwichSiderealTime(jd);
  const lst = (gst * 15 + lon) % 360; // Convert to degrees
  
  // Calculate Ascendant (simplified formula)
  const ε = meanObliquity(jd); // Obliquity of ecliptic
  const latRad = lat * Math.PI / 180;
  const lstRad = lst * Math.PI / 180;
  const εRad = ε * Math.PI / 180;
  
  const asc = Math.atan2(
    -Math.cos(lstRad),
    Math.sin(εRad) * Math.tan(latRad) + Math.cos(εRad) * Math.sin(lstRad)
  ) * 180 / Math.PI;
  
  const ascNorm = (asc + 360) % 360;
  
  // Equal-house cusps: cusp 1 = Asc; cusp n = Asc + 30°·(n-1)
  const cusps = Array.from({ length: 12 }, (_, i) =>
    (ascNorm + 30 * i) % 360
  );
  
  return { asc: ascNorm, cusps };
}

function dateToJulianDate(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const h = date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0;
  
  let a = Math.floor((14 - m) / 12);
  let y2 = y + 4800 - a;
  let m2 = m + 12 * a - 3;
  
  let jdn = d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + 
            Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
  
  return jdn + (h - 12) / 24.0;
}

function greenwichSiderealTime(jd: number): number {
  // Simplified GST calculation (returns hours)
  const T = (jd - 2451545.0) / 36525.0;
  const θ0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 
             0.000387933 * T * T - T * T * T / 38710000.0;
  return (θ0 % 360) / 15; // Convert to hours
}

function meanObliquity(jd: number): number {
  // Mean obliquity of the ecliptic (degrees)
  const T = (jd - 2451545.0) / 36525.0;
  return 23.439291 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
}

export function findHouse(lon: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const end = cusps[(i + 1) % 12];
    
    if (start < end) {
      if (lon >= start && lon < end) return i + 1;
    } else { 
      // wrap-around at 360°
      if (lon >= start || lon < end) return i + 1;
    }
  }
  return 0;
}
