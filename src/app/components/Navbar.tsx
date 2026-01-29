import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-extrabold text-2xl tracking-tighter text-white">AI STUDIO 48</div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-400">
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#apply" className="bg-[#FF7C2B] text-white px-6 py-2.5 rounded-full hover:bg-[#E0651A] transition-colors font-semibold shadow-md shadow-orange-900/20">
            무료 제작 신청하기
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 font-semibold text-gray-400">
              <a href="#portfolio" onClick={() => setIsOpen(false)} className="hover:text-white">Portfolio</a>
              <a href="#solutions" onClick={() => setIsOpen(false)} className="hover:text-white">Solutions</a>
              <a href="#features" onClick={() => setIsOpen(false)} className="hover:text-white">Features</a>
              <a href="#apply" onClick={() => setIsOpen(false)} className="text-[#FF7C2B] font-bold">무료 제작 신청하기</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
