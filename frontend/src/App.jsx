import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import ParticlesBackground from './components/ParticlesBackground';

export default function App() {
  const location = useLocation(); 

  return (
    <div className="text-white min-h-screen font-sans relative">
      <ParticlesBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
