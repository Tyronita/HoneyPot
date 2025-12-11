import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Lightbulb, Phone } from 'lucide-react';
import type { ScamCall } from '../types/database';

interface ScamCardProps {
  scam: ScamCall;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Bank Fraud': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  'HMRC/Government': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  'Utility/Telecom': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
};

const riskColors: Record<string, { bg: string; text: string }> = {
  'Low Risk': { bg: 'bg-green-100', text: 'text-green-800' },
  'Medium Risk': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'High Risk': { bg: 'bg-red-100', text: 'text-red-800' },
};

export function ScamCard({ scam }: ScamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const categoryColor = categoryColors[scam.scam_category] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
  };

  const riskColor = riskColors[scam.vulnerability_type] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-orange-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 ${categoryColor.bg} ${categoryColor.text} ${categoryColor.border}`}
              >
                {scam.scam_category}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${riskColor.bg} ${riskColor.text}`}>
                {scam.vulnerability_type}
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(scam.call_duration_seconds)}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="font-semibold">Detected:</span> {formatDate(scam.call_date)}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Scam Summary</h3>
          <p className="text-gray-700 leading-relaxed">{scam.summary}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            Manipulation Techniques Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {scam.techniques.map((technique, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-900 rounded-lg text-xs font-semibold border border-orange-200 shadow-sm"
              >
                {technique}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 mb-4 border-2 border-yellow-200">
          <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            Why This Was Unique
          </h4>
          <p className="text-amber-900 text-sm leading-relaxed">{scam.unique_aspect}</p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span className="flex items-center gap-2">
            {isExpanded ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Hide Transcript
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                View Full Transcript
              </>
            )}
          </span>
          <span className="text-sm opacity-90">(Anonymized)</span>
        </button>

        {isExpanded && (
          <div className="mt-4 bg-gray-50 rounded-lg p-5 border-2 border-gray-200 animate-fadeIn">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call Transcript (Anonymized)
            </h4>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-mono bg-white p-4 rounded border border-gray-300 max-h-96 overflow-y-auto">
              {scam.transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
