import React from 'react';
import { Menu, X, Globe, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        <div 
          className="cursor-pointer flex items-center"
          onClick={scrollToTop}
        >
          <img src="/main_logo.png" alt="AI STUDIO 48" className="w-[120px] md:w-[160px] h-auto object-contain" />
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-base font-normal text-gray-400">
          <div className="flex items-center space-x-8">
            <a href="#features" className="hover:text-white transition-colors">{t('navbar.features')}</a>
            <a href="#portfolio" className="hover:text-white transition-colors">{t('navbar.portfolio')}</a>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href="/company_brochure.pdf" 
              download 
              className="flex items-center justify-center gap-2 text-white px-5 h-[42px] rounded-full border border-white/20 hover:bg-white/10 transition-colors font-semibold"
            >
              {t('navbar.download_brochure')}
              <Download className="h-4 w-4" />
            </a>

            <a 
              href="#apply" 
              className="flex items-center justify-center bg-[#FF7C2B] text-white px-5 h-[42px] rounded-full hover:bg-[#E0651A] transition-colors font-semibold shadow-md shadow-orange-900/20"
            >
              {t('navbar.apply')}
            </a>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black border-white/10 text-white">
              <DropdownMenuItem onClick={() => changeLanguage('ko')} className="hover:bg-white/10 cursor-pointer">
                한국어
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className="hover:bg-white/10 cursor-pointer">
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('zh')} className="hover:bg-white/10 cursor-pointer">
                中文
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('ja')} className="hover:bg-white/10 cursor-pointer">
                日本語
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:hidden flex items-center gap-4">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black border-white/10 text-white">
              <DropdownMenuItem onClick={() => changeLanguage('ko')} className="hover:bg-white/10 cursor-pointer">
                한국어
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className="hover:bg-white/10 cursor-pointer">
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('zh')} className="hover:bg-white/10 cursor-pointer">
                中文
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('ja')} className="hover:bg-white/10 cursor-pointer">
                日本語
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

            <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 font-normal text-base text-gray-400">
              <a href="#features" onClick={() => setIsOpen(false)} className="hover:text-white">{t('navbar.features')}</a>
              <a href="#portfolio" onClick={() => setIsOpen(false)} className="hover:text-white">{t('navbar.portfolio')}</a>
              <a 
                href="/company_brochure.pdf" 
                download 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-white hover:text-white transition-colors"
              >
                {t('navbar.download_brochure')}
                <Download className="h-4 w-4" />
              </a>
              <a href="#apply" onClick={() => setIsOpen(false)} className="text-[#FF7C2B] font-semibold">{t('navbar.apply')}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
