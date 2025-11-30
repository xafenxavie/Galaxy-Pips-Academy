export default function Hero() {
  return (
    <section className="galaxy-bg star-field min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Logo/Title */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-space-blue to-space-purple rounded-2xl flex items-center justify-center glow-effect mx-auto mb-6">
            <div className="text-white text-2xl font-bold">GPA</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-space-teal via-space-blue to-space-purple bg-clip-text text-transparent">
              Galaxy Pips Academy
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">Beyond the Horizon</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Master Forex Trading from Novice to Professional. Explore the universe of currency trading with our structured learning path.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button className="bg-gradient-to-r from-space-blue to-space-purple text-white px-8 py-4 rounded-xl glow-effect-purple hover:glow-effect transition-all text-lg font-semibold">
            Launch Your Journey
          </button>
          <button className="border border-space-teal text-space-teal px-8 py-4 rounded-xl hover:bg-space-teal/10 transition-all text-lg font-semibold">
            Explore Courses
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-space-teal">9</div>
            <div className="text-gray-400">Comprehensive Modules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-space-purple">50+</div>
            <div className="text-gray-400">Interactive Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-space-blue">Free</div>
            <div className="text-gray-400">Forever Access</div>
          </div>
        </div>
      </div>
    </section>
  );
}