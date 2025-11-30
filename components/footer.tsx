import { Twitter, Youtube, Github, Mail } from 'lucide-react';

export default function footer() {
  return (
    <footer className="bg-space-dark border-t border-space-purple/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-space-blue to-space-purple rounded-lg flex items-center justify-center">
                <div className="text-white text-sm font-bold">GPA</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Galaxy Pips Academy</h3>
                <p className="text-sm text-gray-400">Beyond the Horizon</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Master Forex trading through our comprehensive educational platform. 
              From absolute beginner to professional trader - your journey starts here.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-space-teal transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-space-teal transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-space-teal transition-colors">Trading Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-space-teal transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-space-teal transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-space-teal transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-space-teal transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-space-teal transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-space-purple/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Galaxy Pips Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-space-teal transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-space-teal transition-colors text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-space-teal transition-colors text-sm">Affiliates</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
