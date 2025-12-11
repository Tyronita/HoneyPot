import { useEffect, useState } from 'react';
import { Shield, Activity } from 'lucide-react';
import { supabase } from './lib/supabase';
import type { ScamCall } from './types/database';
import { FilterControls } from './components/FilterControls';
import { StatisticsOverview } from './components/StatisticsOverview';
import { ScamCard } from './components/ScamCard';

function App() {
  const [scamCalls, setScamCalls] = useState<ScamCall[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<ScamCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVulnerability, setSelectedVulnerability] = useState('');

  const [categories, setCategories] = useState<string[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<string[]>([]);

  useEffect(() => {
    fetchScamCalls();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [scamCalls, selectedCategory, selectedVulnerability]);

  const fetchScamCalls = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scam_calls')
        .select('*')
        .order('call_date', { ascending: false });

      if (error) throw error;

      if (data) {
        setScamCalls(data);

        const uniqueCategories = Array.from(new Set(data.map((call) => call.scam_category)));
        const uniqueVulnerabilities = Array.from(
          new Set(data.map((call) => call.vulnerability_type))
        );
        setCategories(uniqueCategories);
        setVulnerabilities(uniqueVulnerabilities);
      }
    } catch (error) {
      console.error('Error fetching scam calls:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...scamCalls];

    if (selectedCategory) {
      filtered = filtered.filter((call) => call.scam_category === selectedCategory);
    }

    if (selectedVulnerability) {
      filtered = filtered.filter((call) => call.vulnerability_type === selectedVulnerability);
    }

    setFilteredCalls(filtered);
  };

  const calculateStatistics = () => {
    const totalCalls = filteredCalls.length;
    const avgDuration =
      totalCalls > 0
        ? Math.round(
            filteredCalls.reduce((sum, call) => sum + call.call_duration_seconds, 0) / totalCalls
          )
        : 0;

    const categoryCount: Record<string, number> = {};
    filteredCalls.forEach((call) => {
      categoryCount[call.scam_category] = (categoryCount[call.scam_category] || 0) + 1;
    });
    const topCategory =
      Object.keys(categoryCount).length > 0
        ? Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]
        : 'N/A';

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const lastWeekCalls = scamCalls.filter((call) => new Date(call.call_date) >= sevenDaysAgo);
    const previousWeekCalls = scamCalls.filter(
      (call) => new Date(call.call_date) >= fourteenDaysAgo && new Date(call.call_date) < sevenDaysAgo
    );

    const recentTrend =
      previousWeekCalls.length > 0
        ? Math.round(((lastWeekCalls.length - previousWeekCalls.length) / previousWeekCalls.length) * 100)
        : 0;

    return { totalCalls, avgDuration, topCategory, recentTrend };
  };

  const stats = calculateStatistics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-orange-600 animate-pulse mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-800">Loading Scam Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100">
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Shield className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                UK Scam Intelligence Dashboard
              </h1>
              <p className="text-orange-100 text-lg mt-1 font-medium">
                Real-time fraud analysis powered by AI voice agents
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 mt-4">
            <p className="text-sm leading-relaxed">
              This dashboard displays anonymized data from scam calls detected and analyzed by AI
              agents. Our mission is to protect vulnerable individuals by sharing insights about
              fraud techniques and raising public awareness.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <StatisticsOverview
          totalCalls={stats.totalCalls}
          avgDuration={stats.avgDuration}
          topCategory={stats.topCategory}
          recentTrend={stats.recentTrend}
        />

        <FilterControls
          selectedCategory={selectedCategory}
          selectedVulnerability={selectedVulnerability}
          onCategoryChange={setSelectedCategory}
          onVulnerabilityChange={setSelectedVulnerability}
          categories={categories}
          vulnerabilities={vulnerabilities}
        />

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Activity className="w-6 h-6 text-orange-600" />
            Scam Call Records
            <span className="text-lg font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              {filteredCalls.length} detected
            </span>
          </h2>
          <p className="text-gray-600">
            Detailed analysis of scam attempts intercepted by our AI protection system
          </p>
        </div>

        {filteredCalls.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No scam calls match your filters</h3>
            <p className="text-gray-500">Try adjusting your filter criteria to see more results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCalls.map((scam) => (
              <ScamCard key={scam.id} scam={scam} />
            ))}
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-sm text-gray-400">
            Protected by AI • All data anonymized • Helping safeguard vulnerable communities from fraud
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This is a public intelligence platform. Report suspicious calls to Action Fraud.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
