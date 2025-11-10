import { useState } from 'react';
import { Calculator, User, MapPin, Calendar, Sparkles, MessageSquare } from 'lucide-react';
import { calculateHumanDesignChart, HumanDesignChart, HDInterpretation } from '@/lib/humanDesign';
import { useToast } from '@/hooks/use-toast';
import BrowserSideTools from './BrowserSideTools';
import { apiRequest } from '@/lib/queryClient';

const CITIES_BY_STATE: { [key: string]: Array<{ name: string; lat: number; lon: number }> } = {
  'Alabama': [
    { name: 'Birmingham', lat: 33.5207, lon: -86.8025 },
    { name: 'Montgomery', lat: 32.3668, lon: -86.3000 },
    { name: 'Mobile', lat: 30.6954, lon: -88.0399 },
    { name: 'Huntsville', lat: 34.7304, lon: -86.5861 },
  ],
  'Alaska': [
    { name: 'Anchorage', lat: 61.2181, lon: -149.9003 },
    { name: 'Fairbanks', lat: 64.8378, lon: -147.7164 },
    { name: 'Juneau', lat: 58.3019, lon: -134.4197 },
  ],
  'Arizona': [
    { name: 'Phoenix', lat: 33.4484, lon: -112.0740 },
    { name: 'Tucson', lat: 32.2226, lon: -110.9747 },
    { name: 'Mesa', lat: 33.4152, lon: -111.8315 },
    { name: 'Scottsdale', lat: 33.4942, lon: -111.9261 },
  ],
  'Arkansas': [
    { name: 'Little Rock', lat: 34.7465, lon: -92.2896 },
    { name: 'Fort Smith', lat: 35.3859, lon: -94.3985 },
    { name: 'Fayetteville', lat: 36.0626, lon: -94.1574 },
  ],
  'California': [
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'San Diego', lat: 32.7157, lon: -117.1611 },
    { name: 'San Jose', lat: 37.3382, lon: -121.8863 },
    { name: 'Sacramento', lat: 38.5816, lon: -121.4944 },
    { name: 'Oakland', lat: 37.8044, lon: -122.2712 },
  ],
  'Colorado': [
    { name: 'Denver', lat: 39.7392, lon: -104.9903 },
    { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214 },
    { name: 'Aurora', lat: 39.7294, lon: -104.8319 },
    { name: 'Boulder', lat: 40.0150, lon: -105.2705 },
  ],
  'Connecticut': [
    { name: 'Hartford', lat: 41.7658, lon: -72.6734 },
    { name: 'New Haven', lat: 41.3083, lon: -72.9279 },
    { name: 'Stamford', lat: 41.0534, lon: -73.5387 },
  ],
  'Delaware': [
    { name: 'Wilmington', lat: 39.7391, lon: -75.5398 },
    { name: 'Dover', lat: 39.1582, lon: -75.5244 },
  ],
  'Florida': [
    { name: 'Miami', lat: 25.7617, lon: -80.1918 },
    { name: 'Tampa', lat: 27.9506, lon: -82.4572 },
    { name: 'Orlando', lat: 28.5383, lon: -81.3792 },
    { name: 'Jacksonville', lat: 30.3322, lon: -81.6557 },
    { name: 'St. Petersburg', lat: 27.7676, lon: -82.6403 },
  ],
  'Georgia': [
    { name: 'Atlanta', lat: 33.7490, lon: -84.3880 },
    { name: 'Augusta', lat: 33.4735, lon: -82.0105 },
    { name: 'Savannah', lat: 32.0809, lon: -81.0912 },
    { name: 'Columbus', lat: 32.4609, lon: -84.9877 },
  ],
  'Hawaii': [
    { name: 'Honolulu', lat: 21.3099, lon: -157.8581 },
    { name: 'Hilo', lat: 19.7297, lon: -155.0900 },
  ],
  'Idaho': [
    { name: 'Boise', lat: 43.6150, lon: -116.2023 },
    { name: 'Idaho Falls', lat: 43.4916, lon: -112.0339 },
  ],
  'Illinois': [
    { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
    { name: 'Springfield', lat: 39.7817, lon: -89.6501 },
    { name: 'Naperville', lat: 41.7508, lon: -88.1535 },
  ],
  'Indiana': [
    { name: 'Indianapolis', lat: 39.7684, lon: -86.1581 },
    { name: 'Fort Wayne', lat: 41.0793, lon: -85.1394 },
    { name: 'Evansville', lat: 37.9716, lon: -87.5711 },
  ],
  'Iowa': [
    { name: 'Des Moines', lat: 41.5868, lon: -93.6250 },
    { name: 'Cedar Rapids', lat: 41.9779, lon: -91.6656 },
  ],
  'Kansas': [
    { name: 'Wichita', lat: 37.6872, lon: -97.3301 },
    { name: 'Kansas City', lat: 39.1142, lon: -94.6275 },
    { name: 'Topeka', lat: 39.0558, lon: -95.6890 },
  ],
  'Kentucky': [
    { name: 'Louisville', lat: 38.2527, lon: -85.7585 },
    { name: 'Lexington', lat: 38.0406, lon: -84.5037 },
  ],
  'Louisiana': [
    { name: 'New Orleans', lat: 29.9511, lon: -90.0715 },
    { name: 'Baton Rouge', lat: 30.4515, lon: -91.1871 },
    { name: 'Shreveport', lat: 32.5252, lon: -93.7502 },
  ],
  'Maine': [
    { name: 'Portland', lat: 43.6591, lon: -70.2568 },
    { name: 'Augusta', lat: 44.3106, lon: -69.7795 },
  ],
  'Maryland': [
    { name: 'Baltimore', lat: 39.2904, lon: -76.6122 },
    { name: 'Annapolis', lat: 38.9784, lon: -76.4922 },
  ],
  'Massachusetts': [
    { name: 'Boston', lat: 42.3601, lon: -71.0589 },
    { name: 'Worcester', lat: 42.2626, lon: -71.8023 },
    { name: 'Cambridge', lat: 42.3736, lon: -71.1097 },
  ],
  'Michigan': [
    { name: 'Detroit', lat: 42.3314, lon: -83.0458 },
    { name: 'Grand Rapids', lat: 42.9634, lon: -85.6681 },
    { name: 'Ann Arbor', lat: 42.2808, lon: -83.7430 },
  ],
  'Minnesota': [
    { name: 'Minneapolis', lat: 44.9778, lon: -93.2650 },
    { name: 'St. Paul', lat: 44.9537, lon: -93.0900 },
  ],
  'Mississippi': [
    { name: 'Jackson', lat: 32.2988, lon: -90.1848 },
    { name: 'Gulfport', lat: 30.3674, lon: -89.0928 },
  ],
  'Missouri': [
    { name: 'Kansas City', lat: 39.0997, lon: -94.5786 },
    { name: 'St. Louis', lat: 38.6270, lon: -90.1994 },
    { name: 'Springfield', lat: 37.2090, lon: -93.2923 },
  ],
  'Montana': [
    { name: 'Billings', lat: 45.7833, lon: -108.5007 },
    { name: 'Missoula', lat: 46.8721, lon: -113.9940 },
  ],
  'Nebraska': [
    { name: 'Omaha', lat: 41.2565, lon: -95.9345 },
    { name: 'Lincoln', lat: 40.8136, lon: -96.7026 },
  ],
  'Nevada': [
    { name: 'Las Vegas', lat: 36.1699, lon: -115.1398 },
    { name: 'Reno', lat: 39.5296, lon: -119.8138 },
  ],
  'New Hampshire': [
    { name: 'Manchester', lat: 42.9956, lon: -71.4548 },
    { name: 'Concord', lat: 43.2081, lon: -71.5376 },
  ],
  'New Jersey': [
    { name: 'Newark', lat: 40.7357, lon: -74.1724 },
    { name: 'Jersey City', lat: 40.7178, lon: -74.0431 },
    { name: 'Trenton', lat: 40.2171, lon: -74.7429 },
  ],
  'New Mexico': [
    { name: 'Albuquerque', lat: 35.0844, lon: -106.6504 },
    { name: 'Santa Fe', lat: 35.6870, lon: -105.9378 },
  ],
  'New York': [
    { name: 'New York City', lat: 40.7128, lon: -74.0060 },
    { name: 'Buffalo', lat: 42.8864, lon: -78.8784 },
    { name: 'Rochester', lat: 43.1566, lon: -77.6088 },
    { name: 'Albany', lat: 42.6526, lon: -73.7562 },
  ],
  'North Carolina': [
    { name: 'Charlotte', lat: 35.2271, lon: -80.8431 },
    { name: 'Raleigh', lat: 35.7796, lon: -78.6382 },
    { name: 'Greensboro', lat: 36.0726, lon: -79.7920 },
  ],
  'North Dakota': [
    { name: 'Fargo', lat: 46.8772, lon: -96.7898 },
    { name: 'Bismarck', lat: 46.8083, lon: -100.7837 },
  ],
  'Ohio': [
    { name: 'Columbus', lat: 39.9612, lon: -82.9988 },
    { name: 'Cleveland', lat: 41.4993, lon: -81.6944 },
    { name: 'Cincinnati', lat: 39.1031, lon: -84.5120 },
  ],
  'Oklahoma': [
    { name: 'Oklahoma City', lat: 35.4676, lon: -97.5164 },
    { name: 'Tulsa', lat: 36.1540, lon: -95.9928 },
  ],
  'Oregon': [
    { name: 'Portland', lat: 45.5152, lon: -122.6784 },
    { name: 'Eugene', lat: 44.0521, lon: -123.0868 },
    { name: 'Salem', lat: 44.9429, lon: -123.0351 },
  ],
  'Pennsylvania': [
    { name: 'Philadelphia', lat: 39.9526, lon: -75.1652 },
    { name: 'Pittsburgh', lat: 40.4406, lon: -79.9959 },
    { name: 'Harrisburg', lat: 40.2732, lon: -76.8867 },
  ],
  'Rhode Island': [
    { name: 'Providence', lat: 41.8240, lon: -71.4128 },
  ],
  'South Carolina': [
    { name: 'Charleston', lat: 32.7765, lon: -79.9311 },
    { name: 'Columbia', lat: 34.0007, lon: -81.0348 },
  ],
  'South Dakota': [
    { name: 'Sioux Falls', lat: 43.5460, lon: -96.7313 },
    { name: 'Rapid City', lat: 44.0805, lon: -103.2310 },
  ],
  'Tennessee': [
    { name: 'Nashville', lat: 36.1627, lon: -86.7816 },
    { name: 'Memphis', lat: 35.1495, lon: -90.0490 },
    { name: 'Knoxville', lat: 35.9606, lon: -83.9207 },
  ],
  'Texas': [
    { name: 'Houston', lat: 29.7604, lon: -95.3698 },
    { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
    { name: 'Austin', lat: 30.2672, lon: -97.7431 },
    { name: 'San Antonio', lat: 29.4241, lon: -98.4936 },
    { name: 'Fort Worth', lat: 32.7555, lon: -97.3308 },
  ],
  'Utah': [
    { name: 'Salt Lake City', lat: 40.7608, lon: -111.8910 },
    { name: 'Provo', lat: 40.2338, lon: -111.6585 },
  ],
  'Vermont': [
    { name: 'Burlington', lat: 44.4759, lon: -73.2121 },
    { name: 'Montpelier', lat: 44.2601, lon: -72.5754 },
  ],
  'Virginia': [
    { name: 'Virginia Beach', lat: 36.8529, lon: -75.9780 },
    { name: 'Richmond', lat: 37.5407, lon: -77.4360 },
    { name: 'Norfolk', lat: 36.8508, lon: -76.2859 },
  ],
  'Washington': [
    { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
    { name: 'Spokane', lat: 47.6588, lon: -117.4260 },
    { name: 'Tacoma', lat: 47.2529, lon: -122.4443 },
  ],
  'West Virginia': [
    { name: 'Charleston', lat: 38.3498, lon: -81.6326 },
    { name: 'Huntington', lat: 38.4192, lon: -82.4452 },
  ],
  'Wisconsin': [
    { name: 'Milwaukee', lat: 43.0389, lon: -87.9065 },
    { name: 'Madison', lat: 43.0731, lon: -89.4012 },
  ],
  'Wyoming': [
    { name: 'Cheyenne', lat: 41.1400, lon: -104.8202 },
    { name: 'Casper', lat: 42.8501, lon: -106.3252 },
  ],
};

const US_STATES = Object.keys(CITIES_BY_STATE).sort();

export default function HumanDesignHome() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [birthLat, setBirthLat] = useState('');
  const [birthLon, setBirthLon] = useState('');
  const [chart, setChart] = useState<HumanDesignChart | null>(null);
  const [showSideTools, setShowSideTools] = useState(false);
  const [sunInterpretation, setSunInterpretation] = useState<HDInterpretation | null>(null);
  const [isLoadingInterpretation, setIsLoadingInterpretation] = useState(false);
  const { toast } = useToast();

  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedCity('');
    setBirthLat('');
    setBirthLon('');
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    if (selectedState && cityName) {
      const city = CITIES_BY_STATE[selectedState]?.find(c => c.name === cityName);
      if (city) {
        setBirthLat(city.lat.toFixed(4));
        setBirthLon(city.lon.toFixed(4));
      }
    }
  };

  const handleCalculate = async () => {
    if (!birthDate || !birthTime) {
      toast({
        title: 'Missing Information',
        description: 'Please enter your birth date and time',
        variant: 'destructive'
      });
      return;
    }

    const dateTime = new Date(`${birthDate}T${birthTime}`);
    const lat = parseFloat(birthLat) || 0;
    const lon = parseFloat(birthLon) || 0;

    const calculatedChart = calculateHumanDesignChart(dateTime, lat, lon);
    setChart(calculatedChart);

    // Fetch interpretation for Sun position
    const sunPersonality = calculatedChart.personality.find(p => p.planet === 'Sun');
    if (sunPersonality && sunPersonality.base) {
      setIsLoadingInterpretation(true);
      try {
        const response = await apiRequest('POST', '/api/hd-meaning', {
          gate: sunPersonality.gate,
          line: sunPersonality.line,
          color: sunPersonality.color,
          tone: sunPersonality.tone,
          base: sunPersonality.base
        });
        const interpretation = await response.json() as HDInterpretation;
        setSunInterpretation(interpretation);
      } catch (error) {
        console.error('Failed to load interpretation:', error);
      } finally {
        setIsLoadingInterpretation(false);
      }
    }

    toast({
      title: 'Chart Calculated!',
      description: `Your Human Design Type: ${calculatedChart.type}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-purple-950/20 to-background p-4 sm:p-6 md:p-8 relative">
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowSideTools(!showSideTools)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-500/30 text-cyan-400 rounded-full flex items-center justify-center shadow-lg z-40 transition-transform hover:scale-110"
        data-testid="button-open-side-tools"
      >
        <MessageSquare size={24} />
      </button>

      {/* Side Tools Panel */}
      <BrowserSideTools visible={showSideTools} onClose={() => setShowSideTools(false)} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              YOUNIVERSE
            </h1>
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
          </div>
          <p className="text-lg sm:text-xl text-purple-400 mb-2">Human Design Calculator</p>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Discover your unique energetic blueprint and learn how you're designed to navigate life
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Birth Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm"
                data-testid="input-birth-date"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                Birth Time (24-Hour Format)
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm"
                data-testid="input-birth-time"
              />
              <p className="text-xs text-muted-foreground mt-1">Use 24-hour format (e.g., 14:30 for 2:30 PM)</p>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Birth State
              </label>
              <select
                value={selectedState}
                onChange={(e) => handleStateSelect(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm"
                data-testid="select-state"
              >
                <option value="">Select a state...</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Birth City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => handleCitySelect(e.target.value)}
                disabled={!selectedState}
                className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm disabled:opacity-50"
                data-testid="select-city"
              >
                <option value="">Select a city...</option>
                {selectedState && CITIES_BY_STATE[selectedState]?.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Latitude
              </label>
              <input
                type="number"
                step="0.0001"
                value={birthLat}
                onChange={(e) => setBirthLat(e.target.value)}
                placeholder="Auto-filled from state"
                className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm"
                data-testid="input-latitude"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Longitude
              </label>
              <input
                type="number"
                step="0.0001"
                value={birthLon}
                onChange={(e) => setBirthLon(e.target.value)}
                placeholder="Auto-filled from state"
                className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm"
                data-testid="input-longitude"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-6 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
            data-testid="button-calculate-chart"
          >
            <Calculator className="w-5 h-5" />
            Calculate Your Human Design Chart
          </button>
        </div>

        {/* Chart Results */}
        {chart && (
          <div className="space-y-4 sm:space-y-6">
            {/* Type & Profile */}
            <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-lg p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1">Type</div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">{chart.type}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1">Profile</div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-400">{chart.profile}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1">Authority</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">{chart.authority}</div>
                </div>
              </div>
            </div>

            {/* Strategy & Cross */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Strategy</h3>
                <p className="text-lg text-cyan-400">{chart.strategy}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Incarnation Cross</h3>
                <p className="text-sm text-purple-400">{chart.incarnationCross}</p>
              </div>
            </div>

            {/* Defined Centers */}
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Defined Centers ({chart.definedCenters.length}/9)</h3>
              <div className="flex flex-wrap gap-2">
                {chart.definedCenters.map((center) => (
                  <span
                    key={center}
                    className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-xs sm:text-sm"
                  >
                    {center}
                  </span>
                ))}
              </div>
            </div>

            {/* Active Gates */}
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Active Gates ({chart.activeGates.length})</h3>
              <div className="flex flex-wrap gap-2">
                {chart.activeGates.map((gate) => (
                  <span
                    key={gate}
                    className="px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded text-xs sm:text-sm font-mono"
                  >
                    {gate}
                  </span>
                ))}
              </div>
            </div>

            {/* Active Channels */}
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Active Channels ({chart.activeChannels.length})</h3>
              <div className="flex flex-wrap gap-2">
                {chart.activeChannels.map((channel) => (
                  <span
                    key={channel}
                    className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded text-xs sm:text-sm font-mono"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>

            {/* Variables */}
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Variables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(chart.variables).map(([key, value]) => (
                  <div key={key} className="bg-muted/50 rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1 capitalize">{key}</div>
                    <div className="text-sm text-foreground font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sun Interpretation */}
            {isLoadingInterpretation && (
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">Loading interpretation...</p>
                </div>
              </div>
            )}

            {sunInterpretation && !isLoadingInterpretation && (
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Your Conscious Sun (Life Purpose)
                </h3>
                
                <div className="mb-4 p-3 bg-background/50 rounded-lg border border-amber-500/20">
                  <p className="text-base text-amber-400 italic leading-relaxed">
                    "{sunInterpretation.sentence}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-background/30 rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Gate</div>
                    <div className="text-sm font-semibold text-foreground">{sunInterpretation.gate.name}</div>
                    <div className="text-xs text-amber-400">{sunInterpretation.gate.keynote}</div>
                  </div>
                  
                  <div className="bg-background/30 rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Line</div>
                    <div className="text-sm font-semibold text-foreground">{sunInterpretation.line.name}</div>
                  </div>
                  
                  <div className="bg-background/30 rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Color</div>
                    <div className="text-sm font-semibold text-foreground">{sunInterpretation.color.name}</div>
                  </div>
                  
                  <div className="bg-background/30 rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Tone</div>
                    <div className="text-sm font-semibold text-foreground">{sunInterpretation.tone.name}</div>
                  </div>
                  
                  <div className="bg-background/30 rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Base</div>
                    <div className="text-sm font-semibold text-foreground">{sunInterpretation.base.name}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!chart && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm sm:text-base">Enter your birth information above to calculate your Human Design chart</p>
          </div>
        )}
      </div>
    </div>
  );
}
