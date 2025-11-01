import { Gamepad2, Star } from 'lucide-react';

const accounts = [
  {
    badge: 'TOP',
    rating: 5,
    name: 'Legendary Account',
    stats: { skins: '250+', vBucks: '15,000', level: '200' },
    price: 299,
  },
  {
    badge: 'TOP',
    rating: 5,
    name: 'Epic Account',
    stats: { skins: '180+', vBucks: '10,000', level: '150' },
    price: 199,
  },
  {
    badge: 'TOP',
    rating: 4,
    name: 'Rare Account',
    stats: { skins: '120+', vBucks: '6,500', level: '100' },
    price: 129,
  },
  {
    badge: 'TOP',
    rating: 5,
    name: 'Premium Account',
    stats: { skins: '80+', vBucks: '4,000', level: '75' },
    price: 79,
  },
];

function FeaturedAccounts() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accounts.map((account, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {account.badge}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < account.rating ? 'text-red-500 fill-red-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-8 rounded-lg">
                  <Gamepad2 className="w-16 h-16 text-gray-400" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{account.name}</h3>

              <div className="flex justify-around mb-6 text-center">
                <div>
                  <p className="text-red-500 font-bold text-lg">{account.stats.skins}</p>
                  <p className="text-gray-500 text-xs">Skins</p>
                </div>
                <div>
                  <p className="text-red-500 font-bold text-lg">{account.stats.vBucks}</p>
                  <p className="text-gray-500 text-xs">V-Bucks</p>
                </div>
                <div>
                  <p className="text-red-500 font-bold text-lg">{account.stats.level}</p>
                  <p className="text-gray-500 text-xs">Level</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">${account.price}</span>
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-all transform hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md transition-all transform hover:scale-105 inline-flex items-center">
            Browse Marketplace
            <span className="ml-2">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedAccounts;
