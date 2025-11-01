import { useState } from 'react';
import { Gamepad2, Star, CheckCircle } from 'lucide-react';

const marketplaceAccounts = [
  { seller: 'F2G', verified: true, tier: 'Legendary', skins: '300+', vBucks: '20,000', level: '250', price: 399, rating: 5 },
  { seller: 'F2G', verified: true, tier: 'Epic', skins: '220+', vBucks: '15,000', level: '180', price: 249, rating: 4 },
  { seller: 'F2G', verified: true, tier: 'Epic', skins: '190+', vBucks: '12,000', level: '160', price: 219, rating: 5 },
  { seller: 'F2G', verified: true, tier: 'Rare', skins: '150+', vBucks: '8,000', level: '120', price: 159, rating: 4 },
  { seller: 'F2G', verified: true, tier: 'Rare', skins: '140+', vBucks: '7,500', level: '110', price: 149, rating: 5 },
  { seller: 'F2G', verified: true, tier: 'Premium', skins: '100+', vBucks: '6,000', level: '85', price: 99, rating: 4 },
  { seller: 'F2G', verified: true, tier: 'Premium', skins: '90+', vBucks: '4,500', level: '80', price: 89, rating: 5 },
  { seller: 'F2G', verified: true, tier: 'Standard', skins: '60+', vBucks: '3,000', level: '60', price: 59, rating: 4 },
];

function Marketplace() {
  const [filter, setFilter] = useState('All Tiers');
  const [sortBy, setSortBy] = useState('Price: Low to High');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Account Marketplace</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of verified F2G premium accounts. All accounts are
            100% secure with instant delivery.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex space-x-4">
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All Tiers</option>
              <option>Legendary</option>
              <option>Epic</option>
              <option>Rare</option>
              <option>Premium</option>
            </select>

            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>

          <p className="text-gray-600">8 accounts available</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceAccounts.map((account, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-red-500 p-1 rounded-full">
                    <Gamepad2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-semibold">{account.seller}</span>
                  {account.verified && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < account.rating ? 'text-red-500 fill-red-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-right mb-3">
                <span className="text-xs text-gray-500">{account.tier}</span>
              </div>

              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <Gamepad2 className="w-12 h-12 text-gray-400" />
                </div>
              </div>

              <div className="flex justify-around mb-6 text-center">
                <div>
                  <p className="text-gray-900 font-bold text-sm">{account.skins}</p>
                  <p className="text-gray-500 text-xs">Skins</p>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">{account.vBucks}</p>
                  <p className="text-gray-500 text-xs">V-Bucks</p>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">{account.level}</p>
                  <p className="text-gray-500 text-xs">Level</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">${account.price}</span>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition-all transform hover:scale-105">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-3 rounded-md transition-all transform hover:scale-105">
            Load More Accounts
          </button>
        </div>
      </div>
    </section>
  );
}

export default Marketplace;
