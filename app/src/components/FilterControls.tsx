import { Filter } from 'lucide-react';

interface FilterControlsProps {
  selectedCategory: string;
  selectedVulnerability: string;
  onCategoryChange: (category: string) => void;
  onVulnerabilityChange: (vulnerability: string) => void;
  categories: string[];
  vulnerabilities: string[];
}

export function FilterControls({
  selectedCategory,
  selectedVulnerability,
  onCategoryChange,
  onVulnerabilityChange,
  categories,
  vulnerabilities,
}: FilterControlsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-orange-600" />
        <h2 className="text-lg font-bold text-gray-900">Filter Intelligence Data</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Scam Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium text-gray-900"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Risk Level
          </label>
          <select
            value={selectedVulnerability}
            onChange={(e) => onVulnerabilityChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-900"
          >
            <option value="">All Risk Levels</option>
            {vulnerabilities.map((vuln) => (
              <option key={vuln} value={vuln}>
                {vuln}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
