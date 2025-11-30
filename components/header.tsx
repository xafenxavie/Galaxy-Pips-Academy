'use client';
import { BookOpen, Users, BarChart3, Rocket } from 'lucide-react';

export default function header() {
  return (
    <header className="bg-space-navy/80 backdrop-blur-md border-b border-space-purple/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-space-blue to-space-purple rounded-lg flex items-center justify-center glow-effect">
              <Rocket className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-space-teal to-space-purple bg-clip-text text-transparent">
                Galaxy Pips Academy
              </h1>
              <p className="text-xs text-gray-400">Beyond the Horizon</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="flex items-center space-x-2 text-gray-300 hover:text-space-teal transition-colors">
              <BookOpen size={16} />
              <span>Courses</span>
            </a>
            <a href="#community" className="flex items-center space-x-2 text-gray-300 hover:text-space-teal transition-colors">
              <Users size={16} />
              <span>Community</span>
            </a>
            <a href="#tools" className="flex items-center space-x-2 text-gray-300 hover:text-space-teal transition-colors">
              <BarChart3 size={16} />
              <span>Tools</span>
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-space-teal transition-colors">
              Login
            </button>
            <button className="bg-gradient-to-r from-space-blue to-space-purple text-white px-6 py-2 rounded-lg glow-effect-purple hover:glow-effect transition-all">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
