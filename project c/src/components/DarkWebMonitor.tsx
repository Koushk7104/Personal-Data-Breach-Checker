import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Shield } from 'lucide-react';
import { SHA256 } from 'crypto-js';

interface Finding {
  date: string;
  source: string;
  type: string;
  risk: 'High' | 'Medium' | 'Low';
  details: string;
}

const DarkWebMonitor: React.FC = () => {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(false);
  const [monitoringEnabled, setMonitoringEnabled] = useState(false);

  const generateMockFindings = () => {
    const sources = [
      'Dark Web Forum',
      'Underground Marketplace',
      'Hacker Channel',
      'Data Leak Site',
      'Criminal Network'
    ];

    const types = [
      'Credentials',
      'Personal Info',
      'Financial Data',
      'Social Security',
      'Medical Records'
    ];

    const risks: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];

    const details = [
      'Credentials found in recent database dump',
      'Personal information being traded on marketplace',
      'Account details posted on hacking forum',
      'Data included in large-scale breach',
      'Information exposed in dark web listing'
    ];

    const randomDate = () => {
      const start = new Date(2024, 0, 1);
      const end = new Date();
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        .toISOString().split('T')[0];
    };

    const numFindings = Math.floor(Math.random() * 3) + 2; // 2-4 findings
    const newFindings: Finding[] = [];

    for (let i = 0; i < numFindings; i++) {
      newFindings.push({
        date: randomDate(),
        source: sources[Math.floor(Math.random() * sources.length)],
        type: types[Math.floor(Math.random() * types.length)],
        risk: risks[Math.floor(Math.random() * risks.length)],
        details: details[Math.floor(Math.random() * details.length)]
      });
    }

    return newFindings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const enableMonitoring = () => {
    setLoading(true);
    setTimeout(() => {
      setMonitoringEnabled(true);
      setFindings(generateMockFindings());
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <div className="flex items-center mb-6">
        <Search className="w-6 h-6 text-blue-400 mr-2" />
        <h2 className="text-2xl font-bold">Dark Web Monitoring</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-600 bg-opacity-20 p-4 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-1" />
          <p className="text-sm text-gray-300">
            Our advanced monitoring system continuously scans dark web forums and marketplaces for any mentions of your personal information.
          </p>
        </div>

        {!monitoringEnabled ? (
          <div className="text-center py-8">
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enable Dark Web Monitoring</h3>
            <p className="text-gray-400 mb-6">
              Start monitoring the dark web for your personal information and receive alerts when your data is found.
            </p>
            <button
              onClick={enableMonitoring}
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-colors ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Enabling Monitoring...' : 'Enable 24/7 Monitoring'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Findings</h3>
            <div className="space-y-4">
              {findings.map((finding, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-400">{finding.date}</p>
                      <p className="font-semibold">{finding.source}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      finding.risk === 'High' ? 'bg-red-500 bg-opacity-20 text-red-400' :
                      finding.risk === 'Medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                      'bg-green-500 bg-opacity-20 text-green-400'
                    }`}>
                      {finding.risk} Risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{finding.type}</p>
                  <p className="text-sm text-gray-400">{finding.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DarkWebMonitor;