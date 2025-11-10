import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MagicSquare, Ephemeris, getPositions } from "@/lib/astrology-utils";
import { decodeHD, normalize, getAyanamsa } from "@/lib/humanDesignMath";
import { getHouseCusps, findHouse } from "@/lib/houseMath";
import { findResidentSquare, Resident } from "@/lib/residentSquare";
import { ArrowLeft, Palette } from "lucide-react";
import { Link } from "wouter";

const themes = {
  cosmic: { name: 'Cosmic Purple', color: 'hsl(270, 70%, 60%)', vars: { '--background': '270 50% 3%', '--foreground': '270 15% 85%', '--primary': '270 70% 60%' }},
  ocean: { name: 'Ocean Blue', color: 'hsl(200, 80%, 50%)', vars: { '--background': '200 50% 3%', '--foreground': '200 15% 85%', '--primary': '200 80% 50%' }},
  forest: { name: 'Forest Green', color: 'hsl(140, 60%, 50%)', vars: { '--background': '140 30% 3%', '--foreground': '140 15% 85%', '--primary': '140 60% 50%' }},
  sunset: { name: 'Sunset Orange', color: 'hsl(25, 90%, 55%)', vars: { '--background': '25 40% 3%', '--foreground': '25 15% 85%', '--primary': '25 90% 55%' }},
  rose: { name: 'Rose Pink', color: 'hsl(330, 70%, 60%)', vars: { '--background': '330 40% 3%', '--foreground': '330 15% 85%', '--primary': '330 70% 60%' }},
  cyber: { name: 'Cyber Cyan', color: 'hsl(180, 80%, 50%)', vars: { '--background': '180 30% 3%', '--foreground': '180 15% 85%', '--primary': '180 80% 50%' }},
};

export default function HumanDesignPage() {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>('cyber');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themes[currentTheme].vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [currentTheme]);
  /* ───────────── Current-sky transits ───────────── */
  const [now, setNow] = useState(new Date());
  const [transits, setTransits] = useState<any>(null);

  useEffect(() => {
    const eph = new Ephemeris(now);
    setTransits([
      { body: "Sun", lon: eph.lon("sun") },
      { body: "Moon", lon: eph.lon("moon") },
      { body: "Mercury", lon: eph.lon("mercury") },
      { body: "Venus", lon: eph.lon("venus") },
      { body: "Mars", lon: eph.lon("mars") },
    ]);
  }, [now]);

  /* ───────────── Natal input & calc ───────────── */
  const [birthDateTime, setBirthDateTime] = useState("1990-01-01T12:00");
  const [lat, setLat] = useState("37.7749");   // default SF
  const [lon, setLon] = useState("-122.4194");
  const [natal, setNatal] = useState<any>(null);

  /* ───────────── Geo systems & Houses ───────────── */
  const DESIGN_OFFSET_MS = 88 * 24 * 60 * 60 * 1000;
  const [sysBody, setSysBody] = useState<any>(null);
  const [sysDesign, setSysDesign] = useState<any>(null);
  const [houses, setHouses] = useState<number[]>([]);
  const [asc, setAsc] = useState<number | null>(null);

  const makeRows = (posArr: any[], fn: (lon: number) => number) =>
    posArr.map(({ body, lon }: any) => {
      const adj = fn(lon);
      return {
        body,
        lon: adj.toFixed(2),
        ...decodeHD(adj),
        house: houses.length === 12 ? findHouse(adj, houses) : "-"
      };
    });

  const calculateNatal = () => {
    const dateObj = new Date(birthDateTime);

    try {
      const bodyPos = getPositions({ date: dateObj, lat: Number(lat), lon: Number(lon) });
      const designPos = getPositions({
        date: new Date(dateObj.getTime() - DESIGN_OFFSET_MS),
        lat: Number(lat),
        lon: Number(lon),
      });

      setNatal(bodyPos);

      /* –– Houses & Ascendant –– */
      const { asc: ascDeg, cusps } = getHouseCusps(dateObj, Number(lat), Number(lon));
      setAsc(ascDeg);
      setHouses(cusps);

      /* –– sidereal & draco helpers –– */
      const ayan = getAyanamsa(dateObj);
      const nodeTrop = bodyPos.find((p: any) => p.body === "North Node")?.lon ?? 0;
      const nodeSide = normalize(nodeTrop - ayan); // sidereal-adjusted node

      const trop = (x: number) => normalize(x);
      const side = (x: number) => normalize(x - ayan);
      const draco = (x: number) => normalize(normalize(x - ayan) - nodeSide); // apply ayanamsa first, then subtract sidereal node

      setSysBody({
        tropical: makeRows(bodyPos, trop),
        sidereal: makeRows(bodyPos, side),
        draco: makeRows(bodyPos, draco)
      });

      setSysDesign({
        tropical: makeRows(designPos, trop),
        sidereal: makeRows(designPos, side),
        draco: makeRows(designPos, draco)
      });
    } catch (err) {
      console.error(err);
      setNatal(null);
    }
  };

  /* ───────────── Magic-square solver with residents ───────────── */
  const [magicInput, setMagicInput] = useState([
    8, 1, 6,
    3, 5, 7,
    4, 9, 2,
  ]);
  const [residents, setResidents] = useState<Resident[]>([
    { row: 1, col: 1, value: 5 }  // center resident by default
  ]);
  const [magicSolved, setMagicSolved] = useState<any>(null);
  const [solving, setSolving] = useState(false);

  const solveMagic = async () => {
    setSolving(true);
    try {
      const square = await findResidentSquare(3, residents, { maxAttempts: 50000 });
      // Verify if it's actually magic
      const targetSum = 15;
      const isMagic = square.every(row => row.reduce((a, b) => a + b, 0) === targetSum) &&
        [0, 1, 2].every(col => square.reduce((sum, row) => sum + row[col], 0) === targetSum) &&
        square[0][0] + square[1][1] + square[2][2] === targetSum &&
        square[0][2] + square[1][1] + square[2][0] === targetSum;
      
      const actualSum = square[0].reduce((a, b) => a + b, 0);
      setMagicSolved({ grid: square, isMagic, sum: actualSum });
    } catch (err) {
      console.error(err);
      setMagicSolved(null);
    } finally {
      setSolving(false);
    }
  };

  /* ───────────── Sample Mind/Body/Heart data ───────────── */
  const sampleSections = [
    {
      section: "Body",
      points: [
        { name: "Vital", value: 70 },
        { name: "Flow", value: 55 },
        { name: "Resilience", value: 85 },
      ],
    },
    {
      section: "Mind",
      points: [
        { name: "Focus", value: 60 },
        { name: "Creativity", value: 80 },
        { name: "Clarity", value: 65 },
      ],
    },
    {
      section: "Heart",
      points: [
        { name: "Empathy", value: 90 },
        { name: "Passion", value: 75 },
        { name: "Cohesion", value: 70 },
      ],
    },
  ];

  /* ───────────── Render ───────────── */
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Human Design Chart</h1>
              <p className="text-sm text-muted-foreground">Body, Voice & Cognition Portal</p>
            </div>
          </div>
          
          {/* Theme Switcher */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              data-testid="button-theme"
            >
              <Palette className="w-5 h-5" />
            </Button>
            {themeMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setThemeMenuOpen(false)}></div>
                <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-xl z-50 py-2">
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => { setCurrentTheme(key as keyof typeof themes); setThemeMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-3 ${
                        currentTheme === key ? 'text-foreground font-medium' : 'text-muted-foreground'
                      }`}
                      data-testid={`button-theme-${key}`}
                    >
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.color }}></div>
                      {t.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10">
        {/* 🌞 TRANSITS + NATAL INPUT */}
        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-4">
              Planetary Transits & Natal Chart
            </h2>

            <ul className="grid grid-cols-5 mb-6 gap-2 text-center text-foreground text-sm">
              {transits?.map((t: any) => (
                <li key={t.body} className="bg-card rounded p-2" data-testid={`transit-${t.body.toLowerCase()}`}>
                  <span className="block font-semibold">{t.body}</span>
                  {t.lon?.toFixed(1)}°
                </li>
              ))}
            </ul>

            {/* transit-time selector */}
            <div className="flex items-center gap-4 mb-8 text-sm">
              <label>Transit Time:</label>
              <input
                type="datetime-local"
                value={now.toISOString().slice(0, 16)}
                onChange={(e) => setNow(new Date(e.target.value))}
                className="bg-card border border-border rounded px-2 py-1"
                data-testid="input-transit-time"
              />
            </div>

            {/* birth-data inputs */}
            <div className="grid md:grid-cols-4 gap-4 items-center text-sm">
              <label className="md:col-span-4 text-foreground font-medium">
                Enter Birth Data
              </label>

              <input
                type="datetime-local"
                value={birthDateTime}
                onChange={(e) => setBirthDateTime(e.target.value)}
                className="bg-card border border-border rounded px-2 py-1"
                data-testid="input-birth-datetime"
              />
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
                className="bg-card border border-border rounded px-2 py-1"
                data-testid="input-latitude"
              />
              <input
                type="number"
                step="0.0001"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                placeholder="Longitude"
                className="bg-card border border-border rounded px-2 py-1"
                data-testid="input-longitude"
              />
              <Button onClick={calculateNatal} data-testid="button-calc-natal">
                Calculate Natal
              </Button>
            </div>

            {natal && (
              <div className="mt-6 bg-card rounded p-4 grid grid-cols-3 md:grid-cols-5 gap-2 text-center text-foreground text-xs">
                {natal.map((p: any) => (
                  <div key={p.body} className="bg-muted/50 rounded py-1" data-testid={`natal-${p.body.toLowerCase()}`}>
                    <div className="font-semibold text-sm">{p.body}</div>
                    {p.lon.toFixed(1)}°
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 📊 ACCORDIONS */}
        <Accordion type="single" collapsible className="space-y-6">
          {sampleSections.map(({ section, points }) => (
            <AccordionItem key={section} value={section.toLowerCase()}>
              <AccordionTrigger className="text-xl font-semibold" data-testid={`accordion-${section.toLowerCase()}`}>
                {section} Design
              </AccordionTrigger>

              <AccordionContent className="space-y-6">
                {/* section chart */}
                <Card className="bg-card/50 rounded-xl">
                  <CardContent className="p-4">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={points}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#c084fc"
                          strokeWidth={3}
                        />
                        <CartesianGrid
                          stroke="#64748b"
                          strokeDasharray="3 3"
                        />
                        <XAxis dataKey="name" stroke="#e2e8f0" />
                        <YAxis stroke="#e2e8f0" />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* magic square inside Body */}
                {section === "Body" && (
                  <Card className="bg-card/50 rounded-xl">
                    <CardContent className="p-4 space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        Magic Square Solver
                      </h3>
                      <p className="text-sm text-muted-foreground">Click cells to lock/unlock (pink = resident)</p>
                      <div className="grid grid-cols-3 gap-2 w-40 mx-auto">
                        {magicInput.map((val, idx) => {
                          const row = Math.floor(idx / 3);
                          const col = idx % 3;
                          const isResident = residents.some(r => r.row === row && r.col === col);
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (isResident) {
                                  setResidents(residents.filter(r => r.row !== row || r.col !== col));
                                } else {
                                  setResidents([...residents, { row, col, value: val }]);
                                }
                              }}
                              className={`bg-muted text-center py-2 rounded border ${
                                isResident ? "border-primary text-primary" : "border-primary"
                              }`}
                              data-testid={`input-magic-${idx}`}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                      <Button onClick={solveMagic} disabled={solving} data-testid="button-solve-magic">
                        {solving ? "Solving..." : "Solve Square"}
                      </Button>
                      {magicSolved && (
                        <pre className="bg-muted p-2 mt-4 rounded text-foreground text-center whitespace-pre-wrap" data-testid="text-magic-result">
                          {magicSolved.isMagic ? '✓ Magic!' : '✗ Not Magic'} (Sum: {magicSolved.sum})
                          {'\n'}
                          {magicSolved.grid.map((r: number[]) => r.join("  ")).join("\n")}
                        </pre>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* placeholder block */}
                <div className="bg-card/40 border border-border rounded-lg p-6 space-y-4 text-muted-foreground">
                  <p className="italic">
                    [Expansion area] {section} Gene Keys, Yijing hexagrams,
                    electron-map nodes, and sentence-engine modules will
                    appear here.
                  </p>
                  <Button variant="outline" asChild data-testid={`button-ask-ai-${section.toLowerCase()}`}>
                    <a href={`/ask-ai?context=${section}`}>
                      Ask SynthAI about {section}
                    </a>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}

          {/* NATAL GEO ACCORDION */}
          <AccordionItem value="natal-geo">
            <AccordionTrigger className="text-xl font-semibold" data-testid="accordion-natal-geo">
              Natal Geo (Body / Design)
            </AccordionTrigger>

            <AccordionContent className="space-y-8 overflow-x-auto">
              {asc !== null && (
                <p className="text-sm text-primary mb-4">
                  Ascendant: {asc.toFixed(2)}° ({decodeHD(asc).sign})
                </p>
              )}
              
              {["Body (Personality)", "Design"].map((label, idx) => {
                const sys = idx ? sysDesign : sysBody;
                if (!sys) return null;

                return (
                  <div key={label} className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground">{label}</h3>

                    {["tropical", "sidereal", "draco"].map((key) => (
                      <div key={key} className="space-y-2">
                        <h4 className="text-sm text-muted-foreground capitalize">{key}</h4>

                        <div className="overflow-x-auto">
                          <table className="min-w-full text-xs text-center border-collapse bg-muted/40 rounded">
                            <thead className="bg-card/70">
                              <tr>
                                <th className="px-2 py-1">Planet</th>
                                <th className="px-2 py-1">Gate</th>
                                <th className="px-2 py-1">Line</th>
                                <th className="px-2 py-1">Col</th>
                                <th className="px-2 py-1">Tone</th>
                                <th className="px-2 py-1">Base</th>
                                <th className="px-2 py-1">Deg</th>
                                <th className="px-2 py-1">Min</th>
                                <th className="px-2 py-1">Sec</th>
                                <th className="px-2 py-1">Zodiac</th>
                                <th className="px-2 py-1">House</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sys[key].map((r: any) => (
                                <tr key={r.body} className="border-t border-border">
                                  <td className="px-2 py-1">{r.body}</td>
                                  <td className="px-2 py-1">{r.gate}</td>
                                  <td className="px-2 py-1">{r.line}</td>
                                  <td className="px-2 py-1">{r.color}</td>
                                  <td className="px-2 py-1">{r.tone}</td>
                                  <td className="px-2 py-1">{r.base}</td>
                                  <td className="px-2 py-1">{r.deg}</td>
                                  <td className="px-2 py-1">{r.min}</td>
                                  <td className="px-2 py-1">{r.sec}</td>
                                  <td className="px-2 py-1">{r.sign}</td>
                                  <td className="px-2 py-1">-</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <footer className="pt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} You-n-i-verse
        </footer>
      </div>
    </div>
  );
}
