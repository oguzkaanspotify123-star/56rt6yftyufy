import { Gamepad2, Star, ShoppingCart, CheckCircle, Zap, Play, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
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
            <Link
              to="/accounts"
              className="group bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Browse Accounts
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              to="/accounts"
              className="bg-white border-2 border-gray-300 hover:border-red-500 hover:shadow-lg text-gray-900 px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Learn More
            </Link>
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
              <Link
                to="/accounts"
                className="group bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: '50K+', label: 'Satisfied Customers', color: 'text-red-500' },
    { value: '100K+', label: 'Accounts Sold', color: 'text-gray-900' },
    { value: '5+', label: 'Years in Business', color: 'text-gray-900' },
    { value: '99.8%', label: 'Success Rate', color: 'text-red-500' },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose F2G?</h2>
          <p className="text-gray-600 text-lg">Trusted by gamers worldwide with proven results</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 animate-fadeInUp group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`text-5xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="text-gray-600 group-hover:text-gray-900 transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
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

function Testimonials() {
  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Verified Buyer',
      rating: 5,
      text: 'Best account marketplace I\'ve used. Fast delivery, great customer service, and the account was exactly as described. Highly recommend!',
    },
    {
      name: 'Sarah Chen',
      role: 'Verified Buyer',
      rating: 5,
      text: 'Super impressed with the quality. Bought a legendary account and got it within minutes. Everything was legitimate, they promised!',
    },
    {
      name: 'Marcus Williams',
      role: 'Verified Buyer',
      rating: 5,
      text: 'F2G is reliable and trustworthy. Been buying from them for over a year now and never had any issues. Great for all my gaming needs.',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Gamers Worldwide</h2>
          <p className="text-lg text-gray-600">Real reviews from real customers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 animate-fadeInUp group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-900 transition-colors">{testimonial.text}</p>

              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How long does it take to receive my account?',
      answer: 'Account delivery is instant! After completing your purchase, you will receive the account credentials via email and in your dashboard within minutes.',
    },
    {
      question: 'Is it safe to buy accounts from F2G?',
      answer: 'Yes, absolutely! We take security seriously and use secure payment methods. All our accounts are legitimate and come with a satisfaction guarantee.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and various cryptocurrency options to ensure a convenient checkout experience for everyone.',
    },
    {
      question: 'Can I change the email/password after purchase?',
      answer: 'Yes! Once you receive the account, you have full access and can change both the email and password to secure it as your own.',
    },
    {
      question: 'What if there\'s an issue with my account?',
      answer: 'We offer 24/7 customer support. If you experience any issues, contact our support team and we\'ll resolve it quickly or provide a replacement.',
    },
    {
      question: 'Are the accounts permanent or temporary?',
      answer: 'All accounts sold are permanent. Once purchased, the account is yours to keep forever with full ownership rights.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Everything you need to know about buying accounts at F2G</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 animate-fadeInUp">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Contact Our Support →
          </button>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 py-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fadeInUp">
          Ready to Level Up?
        </h2>
        <p className="text-xl text-red-50 mb-8 animate-fadeInUp delay-100">
          Join thousands of gamers enjoying premium accounts at F2G
        </p>
        <Link
          to="/accounts"
          className="group bg-white hover:bg-gray-100 text-red-500 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg inline-flex items-center gap-2 hover:shadow-2xl hover:scale-105 animate-fadeInUp delay-200"
        >
          Browse Our Collection
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}

function Footer() {
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
