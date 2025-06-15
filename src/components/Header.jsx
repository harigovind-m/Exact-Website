import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiOutlineX } from 'react-icons/hi';

const navItems = [
  { name: 'Products', to: '/products' },
  { name: 'Wellness', to: '/about' },
  { name: 'Electronics', to: '/products' },
  { name: 'Support', to: '/about' }
];

const navLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 }
  }),
  hover: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 300 }
  }
};

const menuItemVariants = {
  hover: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 300 }
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            <Link to="/">
              <img
                src={scrolled ? '/images/exact-logo.png' : '/images/white-logo.png'}
                alt="Exact Lifestyle Logo"
                className="h-10 w-auto transition-opacity duration-300"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Crect width='120' height='40' fill='%23243763'/%3E%3Ctext x='60' y='25' font-family='Arial, sans-serif' font-size='14' font-weight='bold' text-anchor='middle' fill='white'%3EExact Lifestyle%3C/text%3E%3C/svg%3E";
                }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className="relative text-gray-700 hover:text-red-600 font-medium text-sm lg:text-base transition-colors duration-200 cursor-pointer group"
                >
                  {item.name}
                  <motion.span
                    className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center z-50">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
              {isMenuOpen ? <HiOutlineX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center z-40 md:hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center py-4 px-6 text-gray-700 text-xl font-semibold hover:text-red-600 transition-colors duration-200 cursor-pointer group relative rounded-lg hover:bg-white/50"
              >
                <motion.div
                  variants={menuItemVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <motion.span
                    className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 rounded-full"
                  />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
