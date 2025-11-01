import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Are the accounts safe to use?',
    answer: 'Yes, all our accounts are 100% safe and verified. We ensure that every account meets strict quality standards and comes with a lifetime warranty. Our accounts are sourced legitimately and have never been involved in any suspicious activities.',
  },
  {
    question: 'How quickly will I receive my account?',
    answer: 'You will receive your account details instantly after your payment is confirmed. The entire process typically takes less than 5 minutes. You\'ll get an email with login credentials and access instructions immediately.',
  },
  {
    question: 'Can I change the email and password?',
    answer: 'Absolutely! Once you purchase an account, you have full ownership. You can change the email, password, and any other account details. We provide step-by-step instructions on how to secure your new account.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, cryptocurrency (Bitcoin, Ethereum), and various other secure payment methods. All transactions are encrypted and secure.',
  },
  {
    question: 'What if I have issues with my account?',
    answer: 'Our 24/7 customer support team is always ready to assist you. Every account comes with a lifetime warranty, so if you encounter any issues, we\'ll either fix the problem or provide a replacement account at no additional cost.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase for any reason, contact our support team within 30 days and we\'ll process your refund promptly.',
  },
  {
    question: 'Are these accounts legal?',
    answer: 'Yes, all our accounts are obtained through legitimate means. We comply with all applicable laws and platform terms of service. However, we recommend reviewing Epic Games\' terms of service regarding account transfers.',
  },
  {
    question: 'Can I sell my account back to you?',
    answer: 'Yes, we have a buyback program for high-value accounts. If you\'re looking to sell your Fortnite account, contact our team and we\'ll provide you with a fair quote based on the account\'s skins, level, and V-Bucks.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 animate-fadeInUp animation-delay-100">
            Got questions? We've got answers. If you don't find what you're looking for,
            contact our support team.
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

        <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to help you with any concerns.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md transition-all transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
