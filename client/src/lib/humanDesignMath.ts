export const zodiac = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// Each gate = 360° / 64 = 5.625°  |  each line = gate / 6 = 0.9375°
const GATE_SIZE   = 360 / 64;
const LINE_SIZE   = GATE_SIZE / 6;
const COLOR_SIZE  = LINE_SIZE / 6;   // 0.15625°
const TONE_SIZE   = COLOR_SIZE / 6;  // 0.0260416°
const BASE_SIZE   = TONE_SIZE / 5;   // 0.0052083°

export function toDMS(lon: number) {
  const deg = Math.floor(lon);
  const minF = (lon - deg) * 60;
  const min = Math.floor(minF);
  const sec = ((minF - min) * 60).toFixed(2);
  return { deg, min, sec };
}

export function decodeHD(lon: number) {
  const gate   = Math.floor(lon / GATE_SIZE) + 1;               // 1-64
  const gatePos = lon - (gate - 1) * GATE_SIZE;

  const line   = Math.floor(gatePos / LINE_SIZE) + 1;           // 1-6
  const linePos = gatePos - (line - 1) * LINE_SIZE;

  const color  = Math.floor(linePos / COLOR_SIZE) + 1;          // 1-6
  const colPos = linePos - (color - 1) * COLOR_SIZE;

  const tone   = Math.floor(colPos / TONE_SIZE) + 1;            // 1-6
  const tonePos= colPos - (tone - 1) * TONE_SIZE;

  const base   = Math.floor(tonePos / BASE_SIZE) + 1;           // 1-5

  const sign   = zodiac[Math.floor(lon / 30)];
  const { deg, min, sec } = toDMS(lon % 30);                    // intra-sign DMS

  return { gate, line, color, tone, base, sign, deg, min, sec };
}

export const normalize = (lon: number) =>
  ((lon % 360) + 360) % 360;

/* ––– Lahiri ayanāṁśa (precision ~0.1°) –––  */
export function getAyanamsa(date: Date) {
  const y = (date.getTime() - Date.UTC(2000, 0, 1)) /
            (365.2425 * 24 * 3600 * 1000);          // tropical years since 2000
  return 23.85675 + 0.013 * y;                      // degrees
}
