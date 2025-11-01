import { Star } from 'lucide-react';

export default function Testimonials() {
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
