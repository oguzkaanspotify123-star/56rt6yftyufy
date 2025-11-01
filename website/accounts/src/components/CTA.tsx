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
        <button className="bg-white text-red-500 hover:bg-gray-100 px-10 py-4 rounded-md font-semibold text-lg transition-all transform hover:scale-105 animate-fadeInUp animation-delay-200 shadow-lg">
          Browse Our Collection
        </button>
      </div>
    </section>
  );
}

export default CTA;
