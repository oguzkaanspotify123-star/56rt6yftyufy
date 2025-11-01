import { Gamepad2, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-600 px-4 py-2 rounded-full text-sm mb-4 animate-fadeInUp">
            Premium Fortnite Accounts
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp delay-100">
            Level Up Your Gaming Experience
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fadeInUp delay-200">
            Get instant access to premium Fortnite accounts with rare skins, exclusive items, and high-level stats. Join thousands of satisfied gamers at F2G!
          </p>

          <div className="flex flex-wrap gap-4 mb-8 animate-fadeInUp delay-300">
            <button className="group bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2">
              Browse Accounts
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="bg-white border-2 border-gray-300 hover:border-red-500 hover:shadow-lg text-gray-900 px-8 py-3 rounded-lg font-medium transition-all duration-300">
              Learn More
            </button>
          </div>

          <div className="flex flex-wrap gap-8 text-sm animate-fadeInUp delay-400">
            {['100% Secure', 'Instant Delivery', 'Premium Quality'].map((feature) => (
              <div key={feature} className="flex items-center gap-2 group">
                <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-slideInRight delay-200">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-red-200/50">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse-slow">
                New
              </span>
              <span className="text-sm font-medium text-gray-700">Featured Account</span>
            </div>

            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-red-500 text-red-500 hover:scale-125 transition-transform cursor-pointer" />
              ))}
            </div>

            <div className="bg-white/70 rounded-2xl p-8 mb-6 flex items-center justify-center min-h-[200px] group">
              <Gamepad2 className="w-24 h-24 text-gray-300 group-hover:scale-110 group-hover:text-red-400 transition-all duration-300 animate-float" />
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Legendary Account</h3>
              <div className="flex gap-6 text-sm">
                {[{ label: 'Skins', value: '250+' }, { label: 'V-Bucks', value: '15,000' }, { label: 'Level', value: '200' }].map((stat) => (
                  <div key={stat.label} className="hover:scale-110 transition-transform cursor-pointer">
                    <div className="text-2xl font-bold text-red-500">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">$299</div>
              <button className="group bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
