export default function Stats() {
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
