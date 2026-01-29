import React from 'react';

export const Footer = () => {
  return (
    <footer className="relative z-50 bg-black py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <div className="mb-4 md:mb-0">
          <h4 className="font-bold text-white mb-2">AI STUDIO 48</h4>
          <p>© 2026 AI STUDIO 48. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};
