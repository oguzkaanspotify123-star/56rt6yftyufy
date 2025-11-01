import { ShoppingCart, CheckCircle, Zap, Play } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: ShoppingCart,
      title: 'Browse & Select',
      description: 'Explore our collection of premium gaming accounts and choose the one that fits your needs.',
    },
    {
      number: 2,
      icon: CheckCircle,
      title: 'Quick Checkout',
      description: 'Complete your purchase through our secure payment system in just a few clicks.',
    },
    {
      number: 3,
      icon: Zap,
      title: 'Instant Delivery',
      description: 'Receive your account credentials instantly via email and our dashboard.',
    },
    {
      number: 4,
      icon: Play,
      title: 'Start Playing',
      description: 'Change the password, log in, and dive into your premium gaming experience!',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Get your premium account in just 4 simple steps</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, stepIndex) => (
            <div
              key={step.number}
              className="text-center animate-fadeInUp"
              style={{ animationDelay: `${stepIndex * 150}ms` }}
            >
              <div className="relative inline-block mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg absolute -top-2 -right-2 z-10 transition-transform duration-300 group-hover:scale-125">
                  {step.number}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-200 group-hover:border-red-300">
                  <step.icon className="w-8 h-8 text-red-500 mx-auto group-hover:scale-125 group-hover:text-red-600 transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-500 transition-colors">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
