import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [isQuickOpen, setQuickOpen] = useState(false);
  const [isSupportOpen, setSupportOpen] = useState(false);

  const toggleQuick = () => setQuickOpen((prev) => !prev);
  const toggleSupport = () => setSupportOpen((prev) => !prev);

  const navItems = {
    quickLinks: ['Home', 'Products', 'About Us', 'Contact'],
    support: ['FAQ', 'Shipping', 'Returns', 'Warranty'],
  };

  return (
    <motion.footer
      className="text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
     >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.1 }}
            >
            <img
              src="/images/white-logo.png"
              alt="Exact Lifestyle"
              className="h-12 mb-4"
            />
            <p className="text-gray-400 mb-4">
              Enhancing lives through innovative wellness and technology solutions.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-white text-xl"
                  whileHover={{ y: -3 }}
                  >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between md:block">
              <h3 className="text-lg font-semibold mb-4 md:mb-2">Quick Links</h3>
              <button
                onClick={toggleQuick}
                className="md:hidden text-white"
               >
                {isQuickOpen ? <FiMinus /> : <FiPlus />}
              </button>
            </div>

            {/* Desktop Static List */}
            <ul className="hidden md:block space-y-2">
              {navItems.quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Animated Collapse */}
            <AnimatePresence initial={false}>
              {isQuickOpen && (
                <motion.div
                  key="quick-mobile"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden"
                >
                  <ul className="space-y-2 mt-2">
                    {navItems.quickLinks.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between md:block">
              <h3 className="text-lg font-semibold mb-4 md:mb-2">Support</h3>
              <button
                onClick={toggleSupport}
                className="md:hidden text-white"
              >
                {isSupportOpen ? <FiMinus /> : <FiPlus />}
              </button>
            </div>

            {/* Desktop Static List */}
            <ul className="hidden md:block space-y-2">
              {navItems.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Animated Collapse */}
            <AnimatePresence initial={false}>
              {isSupportOpen && (
                <motion.div
                  key="support-mobile"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden"
                >
                  <ul className="space-y-2 mt-2">
                    {navItems.support.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe for updates and exclusive offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r transition"
              >
                Join
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} Exact Lifestyle. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
