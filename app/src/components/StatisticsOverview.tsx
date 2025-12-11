import { AlertTriangle, Clock, Shield, TrendingUp } from 'lucide-react';

interface StatisticsOverviewProps {
  totalCalls: number;
  avgDuration: number;
  topCategory: string;
  recentTrend: number;
}

export function StatisticsOverview({
  totalCalls,
  avgDuration,
  topCategory,
  recentTrend,
}: StatisticsOverviewProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="text-3xl font-bold">{totalCalls}</div>
        </div>
        <div className="text-sm font-semibold opacity-90">Total Scam Calls Detected</div>
        <div className="text-xs mt-1 opacity-75">Analyzed by AI agents</div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <Clock className="w-7 h-7" />
          </div>
          <div className="text-3xl font-bold">{formatDuration(avgDuration)}</div>
        </div>
        <div className="text-sm font-semibold opacity-90">Average Call Duration</div>
        <div className="text-xs mt-1 opacity-75">Time to identify threat</div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <Shield className="w-7 h-7" />
          </div>
          <div className="text-lg font-bold truncate">{topCategory}</div>
        </div>
        <div className="text-sm font-semibold opacity-90">Most Common Threat</div>
        <div className="text-xs mt-1 opacity-75">Primary attack vector</div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="text-3xl font-bold">{recentTrend > 0 ? '+' : ''}{recentTrend}%</div>
        </div>
        <div className="text-sm font-semibold opacity-90">7-Day Trend</div>
        <div className="text-xs mt-1 opacity-75">Compared to previous week</div>
      </div>
    </div>
  );
}
