export default function CTA() {
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
        <button className="group bg-white hover:bg-gray-100 text-red-500 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg inline-flex items-center gap-2 hover:shadow-2xl hover:scale-105 animate-fadeInUp delay-200">
          Browse Our Collection
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
}
