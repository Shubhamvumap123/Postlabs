import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-postlabs-black text-postlabs-white">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Brand */}
            <div>
              <div className="mb-8">
                <div className="text-postlabs-white font-bold text-xl mb-4">
                  &lt;/&gt;PostLabs
                </div>
              </div>
              
              {/* Navigation Links */}
              <nav className="space-y-4">
                <a href="#" className="story-link block text-postlabs-white hover:text-postlabs-yellow transition-colors">
                  About
                </a>
                <a href="#" className="story-link block text-postlabs-white hover:text-postlabs-yellow transition-colors">
                  Contact
                </a>
                <a href="#" className="story-link block text-postlabs-white hover:text-postlabs-yellow transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="story-link block text-postlabs-white hover:text-postlabs-yellow transition-colors">
                  Cookie Policy
                </a>
              </nav>
            </div>

            {/* Right Column - Newsletter */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-postlabs-white">
                Sign Up for Our Newsletter
              </h3>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-postlabs-white/30 text-postlabs-white placeholder:text-postlabs-white/60 pr-12 py-3 rounded-none border-t-0 border-l-0 border-r-0 border-b-2 focus:border-postlabs-yellow focus:ring-0"
                  />
                  <Button 
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-postlabs-white hover:text-postlabs-yellow p-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-postlabs-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-postlabs-white/60 text-sm">
              © 2025 Post Labs, Inc. All rights reserved.
            </p>
            <p className="text-postlabs-white/60 text-sm">
              Designed by{' '}
              <a href="#" className="story-link text-postlabs-white hover:text-postlabs-yellow">
                HRVST.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;