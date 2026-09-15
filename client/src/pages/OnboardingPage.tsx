import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import {
  Sparkles,
  Search,
  Check,
  ArrowRight,
  ArrowLeft,
  Sliders,
  MapPin,
  Compass,
  Layers,
  ChevronRight,
  MoveUp,
  MoveDown
} from 'lucide-react';

const AVAILABLE_INTERESTS = [
  'AI / ML',
  'Software',
  'Cybersecurity',
  'Healthcare',
  'Education',
  'FinTech',
  'Climate & CleanTech',
  'Gaming',
  'E-commerce',
  'Fitness & Wellness',
  'Travel & Hospitality',
  'Real Estate',
  'Energy',
  'Mobility & EV',
  'Agriculture',
  'Logistics & Supply Chain',
  'Design & Creative',
  'Social Impact',
  'Manufacturing',
  'Business Ops',
  'Marketing Tech',
  'Robotics',
  'IoT & Hardware',
  'Media & Content',
  'Food & Beverage',
  'Tourism'
];

const PRESET_LOCATIONS = [
  { name: 'Bengaluru Innovation Corridor (Koramangala/HSR)', lat: 12.9352, lng: 77.6245 },
  { name: 'San Francisco SOMA & Mission District', lat: 37.7749, lng: -122.4194 },
  { name: 'London Tech City & Shoreditch', lat: 51.5237, lng: -0.0805 },
  { name: 'Mumbai BKC & Lower Parel Hub', lat: 19.0657, lng: 72.8687 },
  { name: 'New York Silicon Alley (Manhattan)', lat: 40.7418, lng: -73.9893 },
  { name: 'Berlin Silicon Allee (Mitte)', lat: 52.5200, lng: 13.4050 }
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1: Selected Interests (ordered)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'AI / ML',
    'Software',
    'Cybersecurity',
    'Healthcare'
  ]);

  // Step 2: Sliders (1 to 10)
  const [preferences, setPreferences] = useState({
    aiIntensity: 8,
    technicalComplexity: 8,
    riskAppetite: 7,
    investmentPreference: 4,
    scalabilityPreference: 9,
    mvpSpeed: 7,
    businessType: 7 // 1 = B2C, 10 = B2B
  });

  // Step 3: Location
  const [selectedLocation, setSelectedLocation] = useState(PRESET_LOCATIONS[0]);
  const [selectedRadius, setSelectedRadius] = useState<1 | 5 | 15 | 50>(5);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length >= 20) return;
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const movePriority = (index: number, direction: 'up' | 'down') => {
    const newItems = [...selectedInterests];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[target];
    newItems[target] = temp;
    setSelectedInterests(newItems);
  };

  const handleCompleteOnboarding = async () => {
    setIsProcessing(true);
    try {
      // 1. Update profile
      await api.updateProfile({
        interests: selectedInterests,
        preferences
      });

      // 2. Generate Founder DNA
      await api.generateFounderDNA({
        interests: selectedInterests,
        preferences
      });

      // 3. Scan Market for selected location
      await api.scanMarket({
        name: selectedLocation.name,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        radiusKm: selectedRadius,
        address: selectedLocation.name
      });

      // 4. Generate Opportunities
      await api.generateOpportunities();

      navigate('/dashboard');
    } catch (err) {
      console.error('Onboarding processing error:', err);
      navigate('/dashboard');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredInterests = AVAILABLE_INTERESTS.filter(i =>
    i.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 tech-grid">
      <div className="w-full max-w-3xl bg-dark-900 border border-slate-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-mono mb-3">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider">
              STEP {currentStep} OF 3: {
                currentStep === 1 ? 'SKILLS & PASSIONS' :
                currentStep === 2 ? 'OPERATIONAL PREFERENCES' : 'MARKET GROUND & RADIUS'
              }
            </span>
            <span className="text-slate-400 font-mono">
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-dark-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: What do you know or enjoy? */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              What do you know or enjoy building?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Select up to 20 domains. Reorder items to give top priorities stronger weight in Founder DNA.
            </p>

            {/* Search Bar */}
            <div className="relative mb-5">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search domains (e.g. AI, Healthcare, Cybersecurity)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Available Tags Grid */}
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1 mb-6">
              {filteredInterests.map(interest => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-semibold shadow-sm'
                        : 'bg-dark-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Weighted List */}
            {selectedInterests.length > 0 && (
              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800/80 mb-6">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 font-medium">
                  SELECTED ({selectedInterests.length}) — TOP ITEMS RECEIVE STRONGER WEIGHT:
                </span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {selectedInterests.map((item, idx) => (
                    <div
                      key={item}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 text-emerald-400 font-bold text-[10px]">#{idx + 1}</span>
                        <span className="text-slate-200 font-medium">{item}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => movePriority(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          title="Increase Priority"
                        >
                          <MoveUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => movePriority(idx, 'down')}
                          disabled={idx === selectedInterests.length - 1}
                          className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          title="Decrease Priority"
                        >
                          <MoveDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className="text-slate-500 hover:text-rose-400 ml-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={selectedInterests.length === 0}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all flex items-center gap-2"
              >
                <span>Continue to Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Founder Preferences Sliders */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              Calibrate Your Founder Preferences
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Adjust sliders to define your technical depth, execution tempo, and operational risk appetite.
            </p>

            <div className="space-y-5 mb-8">
              {/* AI Intensity */}
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300 font-semibold">AI Intensity:</span>
                  <span className="text-cyan-400 font-bold">
                    {preferences.aiIntensity <= 3 ? 'Simple Assistance' : preferences.aiIntensity <= 7 ? 'Deep Applied AI' : 'Autonomous Agentic AI'} ({preferences.aiIntensity}/10)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={preferences.aiIntensity}
                  onChange={e => setPreferences({ ...preferences, aiIntensity: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>Simple</span>
                  <span>Advanced</span>
                </div>
              </div>

              {/* Technical Complexity */}
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300 font-semibold">Technical Complexity:</span>
                  <span className="text-emerald-400 font-bold">
                    {preferences.technicalComplexity <= 3 ? 'Lightweight Frontend' : preferences.technicalComplexity <= 7 ? 'Full-Stack Architecture' : 'Deep Infrastructure / Systems'} ({preferences.technicalComplexity}/10)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={preferences.technicalComplexity}
                  onChange={e => setPreferences({ ...preferences, technicalComplexity: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>Simple</span>
                  <span>Deep</span>
                </div>
              </div>

              {/* Risk Appetite */}
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300 font-semibold">Risk Appetite:</span>
                  <span className="text-amber-400 font-bold">
                    {preferences.riskAppetite <= 3 ? 'Safe & Proven Market' : preferences.riskAppetite <= 7 ? 'Calculated Venture Risk' : 'High Asymmetric Experimental'} ({preferences.riskAppetite}/10)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={preferences.riskAppetite}
                  onChange={e => setPreferences({ ...preferences, riskAppetite: Number(e.target.value) })}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>Safe</span>
                  <span>Experimental</span>
                </div>
              </div>

              {/* Business Model B2C vs B2B */}
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300 font-semibold">Customer Orientation:</span>
                  <span className="text-indigo-400 font-bold">
                    {preferences.businessType <= 4 ? 'Consumer (B2C)' : preferences.businessType <= 6 ? 'Prosumer / Hybrid' : 'B2B Enterprise SaaS'} ({preferences.businessType}/10)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={preferences.businessType}
                  onChange={e => setPreferences({ ...preferences, businessType: Number(e.target.value) })}
                  className="w-full accent-indigo-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>B2C Consumer</span>
                  <span>B2B Enterprise</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl bg-dark-950 hover:bg-dark-800 text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all flex items-center gap-2"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Location Setup */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              Where do you want to build?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              AI COMPANY will scan real local competitors, public review signals, and structural market gaps within your selected radius.
            </p>

            {/* Preset Location Picker */}
            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-mono text-slate-400 block font-medium">
                SELECT INNOVATION CORRIDOR OR HUB:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_LOCATIONS.map(loc => {
                  const isSelected = selectedLocation.name === loc.name;
                  return (
                    <button
                      key={loc.name}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-3 rounded-xl text-left font-mono text-xs border transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-500/80 text-cyan-200 font-semibold shadow-md shadow-cyan-950/40'
                          : 'bg-dark-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                      <span className="truncate">{loc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Radius Picker (1KM, 5KM, 15KM, 50KM) */}
            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono font-semibold text-slate-300">
                  SCAN RADIUS:
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {selectedRadius} KM (Default: 5 KM)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {([1, 5, 15, 50] as const).map(radius => (
                  <button
                    key={radius}
                    type="button"
                    onClick={() => setSelectedRadius(radius)}
                    className={`py-2 rounded-lg font-mono text-xs font-semibold border transition-all ${
                      selectedRadius === radius
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold'
                        : 'bg-dark-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {radius} KM
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 rounded-xl bg-dark-950 hover:bg-dark-800 text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompleteOnboarding}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>GENERATING DECISION INTELLIGENCE...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>SCAN MARKET & GENERATE DNA</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
