interface PlanetData {
  name: string;
  gate: string;
  line: string;
  color: string;
  tone: string;
  base: string;
  degree: string;
  minute: string;
  second: string;
  axis: string;
  zodiac: string;
  house: string;
}

interface GeoNatalMatrixProps {
  data: {
    ascendingMind: PlanetData[];
    ascendingBody: PlanetData[];
    descendingMind: PlanetData[];
    descendingBody: PlanetData[];
  };
}

export default function GeoNatalMatrix({ data }: GeoNatalMatrixProps) {
  const sections = ["ascendingMind", "ascendingBody", "descendingMind", "descendingBody"] as const;
  const labels = {
    ascendingMind: "Ascending Mind",
    ascendingBody: "Ascending Body",
    descendingMind: "Descending Mind",
    descendingBody: "Descending Body"
  };

  const headers = [
    "Planet","Gate","Line","Color","Tone","Base",
    "Degree","Minute","Second","Axis","Zodiac","House"
  ];

  return (
    <div className="bg-black/40 border border-cyan-500/30 rounded-lg backdrop-blur-md p-4 font-mono text-xs">
      <h3 className="text-cyan-300 font-semibold text-center mb-3 tracking-wide">
        Geo-Natal Matrix
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map(section => (
          <div key={section}>
            <h4 className="text-center text-cyan-400 mb-2 border-b border-cyan-400/30 pb-1 text-sm">
              {labels[section]}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-cyan-500/20 border-b border-cyan-400/30">
                    {headers.map(h => (
                      <th key={h} className="px-2 py-1 font-semibold text-[10px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data[section] || []).map((p, i) => (
                    <tr key={i} className="border-b border-border hover:bg-white/5">
                      <td className="px-2 py-1">{p.name}</td>
                      <td className="px-2 py-1">{p.gate}</td>
                      <td className="px-2 py-1">{p.line}</td>
                      <td className="px-2 py-1">{p.color}</td>
                      <td className="px-2 py-1">{p.tone}</td>
                      <td className="px-2 py-1">{p.base}</td>
                      <td className="px-2 py-1">{p.degree}</td>
                      <td className="px-2 py-1">{p.minute}</td>
                      <td className="px-2 py-1">{p.second}</td>
                      <td className="px-2 py-1">{p.axis}</td>
                      <td className="px-2 py-1">{p.zodiac}</td>
                      <td className="px-2 py-1">{p.house}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(data[section] || []).length === 0 && (
              <div className="text-center text-muted-foreground mt-2 italic text-xs">
                No {labels[section]} data.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
