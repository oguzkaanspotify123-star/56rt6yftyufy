import { useState } from 'react';
import { Gamepad2, Star, CheckCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

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

function WhyChooseUs() {
  const features = [
    {
      icon: '🛡️',
      title: 'Verified Accounts',
      description: 'All accounts are thoroughly verified and guaranteed to be 100% authentic with no risk of bans.',
    },
    {
      icon: '⚡',
      title: 'Instant Delivery',
      description: 'Get immediate access to your account details right after purchase. No waiting required.',
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Your payment information is protected with bank-level encryption and secure payment gateways.',
    },
    {
      icon: '🎧',
      title: '24/7 Support',
      description: 'Our dedicated support team is always available to help you with any questions or concerns.',
    },
    {
      icon: '✓',
      title: 'Lifetime Warranty',
      description: 'Every account comes with a lifetime warranty. If anything goes wrong, we\'ll make it right.',
    },
    {
      icon: '🏆',
      title: 'Best Prices',
      description: 'We offer the most competitive prices in the market without compromising on quality.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">Why Choose F2G?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
            We're the most trusted marketplace for premium Fortnite accounts, serving thousands of
            satisfied gamers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Are the accounts safe to use?',
      answer: 'Yes, all our accounts are 100% safe and verified. We ensure that every account meets strict quality standards and comes with a lifetime warranty.',
    },
    {
      question: 'How quickly will I receive my account?',
      answer: 'You will receive your account details instantly after your payment is confirmed. The entire process typically takes less than 5 minutes.',
    },
    {
      question: 'Can I change the email and password?',
      answer: 'Absolutely! Once you purchase an account, you have full ownership. You can change the email, password, and any other account details.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, cryptocurrency, and various other secure payment methods.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 animate-fadeInUp animation-delay-100">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-red-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-red-500 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-50"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeInUp">
          Ready to Level Up?
        </h2>
        <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
          Join thousands of gamers enjoying premium accounts at F2G
        </p>
        <Link
          to="/dashboard"
          className="bg-white text-red-500 hover:bg-gray-100 px-10 py-4 rounded-md font-semibold text-lg transition-all transform hover:scale-105 animate-fadeInUp animation-delay-200 shadow-lg inline-block"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
}

export default function AccountsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-sm font-semibold tracking-wide uppercase mb-4 animate-fadeIn">
            PREMIUM FORTNITE ACCOUNTS
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fadeInUp">
            Featured Company Accounts
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
            Get instant access to premium Fortnite accounts with rare skins, exclusive items, and high-level
            stats. Join thousands of satisfied gamers at F2G!
          </p>
        </div>
      </section>
      <FeaturedAccounts />
      <Marketplace />
      <WhyChooseUs />
      <FAQ />
      <CTA />
    </div>
  );
}
