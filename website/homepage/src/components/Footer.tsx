import { Gamepad2 } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: ['Accounts', 'Pricing', 'Security', 'Reviews'],
    Company: ['About Us', 'Terms of Service', 'Careers', 'Blog'],
    Support: ['Contact', 'FAQ', 'Help Center', 'Documentation'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-500 p-2 rounded-lg">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">F2G</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              The most trusted marketplace for premium gaming accounts. Buy, sell, and trade with confidence.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">𝕏</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">in</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="animate-fadeInUp" style={{ animationDelay: `${Object.keys(footerLinks).indexOf(category) * 100}ms` }}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white hover:translate-x-1 transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © F2G 2025. All rights reserved. Premium Fortnite Accounts Marketplace
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
              <a href="#" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
