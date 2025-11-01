import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
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
