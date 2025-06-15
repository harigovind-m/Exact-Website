import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], // triggers as user scrolls down
  });

  // Scroll progress transforms (start hidden, fade in + move up)
  const headingY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const subTextY = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);
  const subTextOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  const buttonY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] relative bg-black font-hero"
    >
      {/* Background image stays full screen */}
      <div className="sticky top-0 h-screen w-full">
        <img
          src="/images/hero-bg.jpg" // Replace with your image path
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Bottom gradient blur overlay
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f172a]/80 to-transparent backdrop-blur-sm z-20 pointer-events-none" /> */}


        {/* Scroll-triggered text container */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center max-w-2xl px-4">
            <motion.h1
              style={{ y: headingY, opacity: headingOpacity }}
              className="text-5xl md:text-6xl font-bold text-white"
            >
              Elevate Your <span className="text-red-600">Lifestyle</span>
            </motion.h1>

            <motion.p
              style={{ y: subTextY, opacity: subTextOpacity }}
              className="text-lg md:text-xl text-white/80 mt-6 font-bold"
            >
              Discover premium wellness products and smart tech tailored for modern living.
            </motion.p>

            {/* <motion.div style={{ y: buttonY, opacity: buttonOpacity }}>
              <button className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg font-medium shadow-xl transition-all">
                Explore Now
              </button>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
