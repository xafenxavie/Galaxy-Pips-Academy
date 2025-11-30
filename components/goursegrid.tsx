'use client';
import { BookOpen, Target, Brain, Rocket, Star, Zap, TrendingUp, Shield, Globe } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: "The Absolute Foundations",
    icon: Globe,
    lessons: 10,
    color: "from-blue-500 to-cyan-500",
    description: "Master the basics of Forex trading"
  },
  {
    id: 2,
    title: "Trading Platform & Order Execution",
    icon: Zap,
    lessons: 6,
    color: "from-purple-500 to-pink-500",
    description: "Learn to navigate trading platforms"
  },
  {
    id: 3,
    title: "Market Analysis - The Three Pillars",
    icon: Target,
    lessons: 8,
    color: "from-green-500 to-teal-500",
    description: "Technical, Fundamental & Price Action"
  },
  {
    id: 4,
    title: "Core Trading Strategies & Systems",
    icon: TrendingUp,
    lessons: 8,
    color: "from-orange-500 to-red-500",
    description: "Build your trading methodology"
  },
  {
    id: 5,
    title: "Risk & Psychology - The Professional's Edge",
    icon: Brain,
    lessons: 7,
    color: "from-indigo-500 to-purple-500",
    description: "Master your mindset and risk management"
  },
  {
    id: 6,
    title: "Advanced Technical Concepts",
    icon: Rocket,
    lessons: 6,
    color: "from-yellow-500 to-orange-500",
    description: "Deep dive into advanced techniques"
  },
  {
    id: 7,
    title: "Building & Optimizing Your Trading System",
    icon: Star,
    lessons: 6,
    color: "from-cyan-500 to-blue-500",
    description: "Create and refine your edge"
  },
  {
    id: 8,
    title: "Specialized Strategies & Instruments",
    icon: Shield,
    lessons: 5,
    color: "from-pink-500 to-rose-500",
    description: "Explore advanced trading approaches"
  },
  {
    id: 9,
    title: "The Professional Trader's Routine",
    icon: BookOpen,
    lessons: 6,
    color: "from-teal-500 to-green-500",
    description: "Develop winning habits and routines"
  }
];

export default function CourseGrid() {
  return (
    <section id="courses" className="galaxy-bg py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-space-teal to-space-purple bg-clip-text text-transparent">
              The Complete Forex Trader Blueprint
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your journey from trading novice to professional through 9 comprehensive modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className="bg-space-navy/50 backdrop-blur-sm border border-space-purple/20 rounded-xl p-6 hover:glow-effect-purple transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center mb-4 group-hover:glow-effect transition-all`}>
                <module.icon className="text-white" size={24} />
              </div>
              
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-space-teal transition-colors">
                  {module.title}
                </h3>
                <span className="text-xs bg-space-blue/30 text-space-teal px-2 py-1 rounded-full">
                  {module.lessons} lessons
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                {module.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Module {module.id}</span>
                <div className="w-20 h-1 bg-space-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-space-teal to-space-blue rounded-full"
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
