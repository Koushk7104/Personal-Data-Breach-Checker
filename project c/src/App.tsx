import React, { useState } from 'react';
import { Shield, AlertTriangle, Mail, Lock, Bell, Database, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import BreachResults from './components/BreachResults';
import SecurityTips from './components/SecurityTips';
import PasswordStrengthChecker from './components/PasswordStrengthChecker';
import PrivacyScore from './components/PrivacyScore';
import DarkWebMonitor from './components/DarkWebMonitor';
import { checkBreaches, type Breach } from './services/breachService';

function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [breaches, setBreaches] = useState<Breach[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleBreachCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const foundBreaches = await checkBreaches(email);
      setBreaches(foundBreaches);
      setShowResults(true);
      
      if (foundBreaches.length > 0) {
        toast.error(`Your email was found in ${foundBreaches.length} data ${foundBreaches.length === 1 ? 'breach' : 'breaches'}!`, {
          icon: '🚨',
          duration: 5000
        });
      } else {
        toast.success('Good news! No breaches found.', {
          icon: '✅',
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Error checking breaches:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage, {
        duration: 4000
      });
      setBreaches([]);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    toast.success('Successfully subscribed to breach notifications!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="pt-8 md:pt-16 pb-6 md:pb-8 text-center px-4">
        <div className="flex justify-center mb-4">
          <Shield className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Personal Data Breach Checker</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Check if your personal information has been exposed in data breaches. Stay informed and protect your digital identity.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl pb-8">
        {/* Search Form */}
        <div className="bg-gray-800 p-4 md:p-8 rounded-lg shadow-xl mb-6 md:mb-8">
          <form onSubmit={handleBreachCheck} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-base ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Checking...' : 'Check for Breaches'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            <BreachResults breaches={breaches} />
            <PrivacyScore email={email} breachCount={breaches.length} />
          </div>
        )}

        {/* Password Strength Checker */}
        <div className="my-6 md:my-8">
          <PasswordStrengthChecker />
        </div>

        {/* Dark Web Monitoring */}
        <div className="my-6 md:my-8">
          <DarkWebMonitor />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-8 md:my-12">
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <Lock className="w-8 h-8 text-blue-400 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-gray-400 text-sm md:text-base">Continuous scanning of databases for your personal information.</p>
          </div>
          
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <Bell className="w-8 h-8 text-blue-400 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Instant Alerts</h3>
            <p className="text-gray-400 text-sm md:text-base">Get notified immediately when your data appears in new breaches.</p>
          </div>
          
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <Database className="w-8 h-8 text-blue-400 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Extensive Database</h3>
            <p className="text-gray-400 text-sm md:text-base">Access to a comprehensive database of known data breaches.</p>
          </div>
        </div>

        {/* Security Tips Section */}
        <SecurityTips />

        {/* Newsletter Subscription */}
        <div className="bg-gray-800 p-4 md:p-8 rounded-lg text-center mt-8 md:mt-12">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Stay Protected</h3>
          <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Subscribe to receive alerts about future data breaches affecting your accounts.</p>
          <button
            onClick={handleSubscribe}
            className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-2 md:py-3 rounded-lg transition-colors text-base"
          >
            Subscribe to Alerts
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 md:mt-16 py-6 md:py-8 text-center text-gray-400 text-sm">
        <p>© 2024 Personal Data Breach Checker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;