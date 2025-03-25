import React from 'react';
import { Key, Smartphone, Shield, RefreshCw } from 'lucide-react';

const SecurityTips: React.FC = () => {
  const tips = [
    {
      icon: <Key className="w-6 h-6" />,
      title: "Use Strong Passwords",
      description: "Create unique, complex passwords for each account using a mix of letters, numbers, and symbols."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Enable Two-Factor Authentication",
      description: "Add an extra layer of security by enabling 2FA on all your important accounts."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Regular Password Updates",
      description: "Change your passwords regularly, especially after a known breach."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Monitor Your Accounts",
      description: "Regularly check your accounts for any suspicious activity."
    }
  ];

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Security Recommendations</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-blue-600 bg-opacity-20 p-3 rounded-lg">
              {tip.icon}
            </div>
            <div>
              <h3 className="font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-400 text-sm">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityTips;