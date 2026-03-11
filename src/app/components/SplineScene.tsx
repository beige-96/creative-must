import React, { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'motion/react';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export const SplineScene: React.FC<SplineSceneProps> = ({ scene, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-10 flex items-center justify-center"
          >
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      <Suspense fallback={null}>
        <Spline 
          scene={scene} 
          onLoad={() => setIsLoaded(true)}
        />
      </Suspense>
    </div>
  );
};