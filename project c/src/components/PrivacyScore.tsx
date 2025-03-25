import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface PrivacyScoreProps {
  email: string;
  breachCount: number;
}

const PrivacyScore: React.FC<PrivacyScoreProps> = ({ email, breachCount }) => {
  const calculateScore = () => {
    // Basic score calculation based on breach count
    const baseScore = 100;
    const deductionPerBreach = 20;
    const score = Math.max(0, baseScore - (breachCount * deductionPerBreach));
    return score;
  };

  const score = calculateScore();

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreRing = () => {
    if (score >= 80) return 'border-green-400';
    if (score >= 60) return 'border-yellow-400';
    if (score >= 40) return 'border-orange-400';
    return 'border-red-400';
  };

  const recommendations = [
    {
      title: 'Two-Factor Authentication',
      enabled: true,
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    },
    {
      title: 'Strong Password',
      enabled: score > 60,
      icon: score > 60 ? 
        <CheckCircle className="w-5 h-5 text-green-400" /> : 
        <XCircle className="w-5 h-5 text-red-400" />,
    },
    {
      title: 'Regular Monitoring',
      enabled: true,
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    },
    {
      title: 'Data Exposure',
      enabled: breachCount === 0,
      icon: breachCount === 0 ? 
        <CheckCircle className="w-5 h-5 text-green-400" /> : 
        <AlertTriangle className="w-5 h-5 text-red-400" />,
    },
  ];

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-blue-400 mr-2" />
        <h2 className="text-2xl font-bold">Privacy Score</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className={`w-32 h-32 rounded-full border-8 ${getScoreRing()} flex items-center justify-center mb-4`}>
            <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
          </div>
          <p className="text-gray-400 text-center">
            {score >= 80 ? 'Excellent privacy practices!' :
             score >= 60 ? 'Good, but room for improvement' :
             score >= 40 ? 'Significant privacy risks detected' :
             'Critical privacy issues found'}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Security Checklist</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <span className="text-gray-300">{rec.title}</span>
                {rec.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyScore;