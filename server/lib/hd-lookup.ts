import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "shared", "hd-data.json");
const raw = fs.readFileSync(dataPath, "utf8");
const HD = JSON.parse(raw);

export interface HDCoordinate {
  gate: number;
  line: number;
  color: number;
  tone: number;
  base: number;
}

export interface HDMetadata {
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
}

export function decodeHD(fullCode: HDCoordinate): HDMetadata {
  const gate = HD.gates[String(fullCode.gate)];
  const line = HD.lines[String(fullCode.line)];
  const color = HD.colors[String(fullCode.color)];
  const tone = HD.tones[String(fullCode.tone)];
  const base = HD.bases[String(fullCode.base)];

  return { gate, line, color, tone, base };
}

export function sentence(fullCode: HDCoordinate): string {
  const { gate, line, color, tone, base } = decodeHD(fullCode);

  const parts = [
    gate.name,
    line.sentence_fragment,
    color.sentence_fragment,
    tone.sentence_fragment,
    base.sentence_fragment
  ];

  return parts.filter(Boolean).join(" ");
}
