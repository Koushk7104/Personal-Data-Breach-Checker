import React from 'react';
import { AlertTriangle, Calendar, Globe, Shield, AlertCircle } from 'lucide-react';
import type { Breach } from '../services/breachService';

interface BreachResultsProps {
  breaches: Breach[];
}

const BreachResults: React.FC<BreachResultsProps> = ({ breaches }) => {
  if (!breaches || breaches.length === 0) {
    return (
      <div className="bg-green-600 bg-opacity-20 p-4 md:p-8 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <Shield className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-green-400 mb-2">Good News!</h3>
        <p className="text-gray-300 text-sm md:text-base">Your email address was not found in any known data breaches.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-red-600 bg-opacity-20 p-4 md:p-6 rounded-lg">
        <div className="flex items-center mb-3 md:mb-4">
          <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400 mr-2" />
          <h3 className="text-lg md:text-xl font-bold text-red-400">
            Found in {breaches.length} Data {breaches.length === 1 ? 'Breach' : 'Breaches'}
          </h3>
        </div>
        <p className="text-gray-300 text-sm md:text-base">
          Your email address was found in the following data breaches. We recommend taking immediate action to secure your accounts.
        </p>
      </div>

      <div className="space-y-4">
        {breaches.map((breach, index) => (
          <div key={index} className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg md:text-xl font-bold mb-2">{breach.Title}</h4>
                <div className="flex items-center text-xs md:text-sm text-gray-400">
                  <Globe className="w-4 h-4 mr-1" />
                  <a 
                    href={`https://${breach.Domain}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    {breach.Domain}
                  </a>
                </div>
              </div>
              {breach.LogoPath && (
                <img 
                  src={breach.LogoPath} 
                  alt={`${breach.Title} logo`} 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              )}
            </div>

            <div className="flex items-center mb-4 text-xs md:text-sm text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Breach occurred on {new Date(breach.BreachDate).toLocaleDateString()}</span>
            </div>

            <div className="mb-4">
              <h5 className="text-xs md:text-sm font-semibold text-gray-400 mb-2">Compromised Data:</h5>
              <div className="flex flex-wrap gap-2">
                {breach.DataClasses.map((dataClass, i) => (
                  <span
                    key={i}
                    className="px-2 md:px-3 py-1 bg-gray-700 rounded-full text-xs md:text-sm text-gray-300"
                  >
                    {dataClass}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs md:text-sm text-gray-400">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <p dangerouslySetInnerHTML={{ __html: breach.Description }} />
              </div>
            </div>

            {breach.IsSensitive && (
              <div className="mt-4 bg-red-500 bg-opacity-10 text-red-400 p-3 rounded-lg text-xs md:text-sm">
                <strong>Warning:</strong> This breach contains sensitive data.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreachResults;