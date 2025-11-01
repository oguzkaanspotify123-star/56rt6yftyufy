import { Shield, Zap, Lock, HeadphonesIcon, CheckCircle, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Accounts',
    description: 'All accounts are thoroughly verified and guaranteed to be 100% authentic with no risk of bans.',
  },
  {
    icon: Zap,
    title: 'Instant Delivery',
    description: 'Get immediate access to your account details right after purchase. No waiting required.',
  },
  {
    icon: Lock,
    title: 'Secure Transactions',
    description: 'Your payment information is protected with bank-level encryption and secure payment gateways.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our dedicated support team is always available to help you with any questions or concerns.',
  },
  {
    icon: CheckCircle,
    title: 'Lifetime Warranty',
    description: 'Every account comes with a lifetime warranty. If anything goes wrong, we\'ll make it right.',
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'We offer the most competitive prices in the market without compromising on quality.',
  },
];

function WhyChooseUs() {
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
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-red-500 rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Join 50,000+ Happy Gamers</h3>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Start your journey with a premium Fortnite account today and experience the game like never before.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="text-center">
                <p className="text-4xl font-bold">50K+</p>
                <p className="text-red-100">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">98%</p>
                <p className="text-red-100">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">24/7</p>
                <p className="text-red-100">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
