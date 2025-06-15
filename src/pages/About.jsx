import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MeetTheTeam from "../components/MeetTheTeam";

export default function About() {
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && containerRef.current) {
        setScrollX((prev) => {
          const next = prev + 1;
          containerRef.current.scrollLeft = next;
          return next;
        });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen text-white">
      <Header />
      <div className="pt-16" />

      {/* Roadmap & Mission */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {roadmapData.map((step, index) => (
          <div
            key={index}
            className="snap-start h-screen flex flex-col items-center justify-center px-6 text-center relative"
          >
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
              <div className="bg-red-600 w-4 h-4 rounded-full shadow-lg mb-2 animate-bounce" />
              {index < roadmapData.length - 0 && (
                <div className="w-1 h-32 bg-red-400 rounded-full" />
              )}
            </div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {step.title}
            </motion.h2>
            <motion.p
              className="text-lg text-white max-w-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {step.description}
            </motion.p>
          </div>
        ))}

        {/* Our Mission */}
        <div className="snap-start h-screen bg-white text-black flex items-center justify-center px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-red-600">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                We believe in creating products that seamlessly integrate into your lifestyle,
                enhancing both your wellness and technological experience.
              </p>
              <p className="text-gray-600">
                Our team of experts carefully curates and develops each product to meet our
                high standards of quality and innovation.
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/about-mission.jpg"
                alt="Our Mission"
                className="rounded-xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <MeetTheTeam />

      <Footer />
    </div>
  );
}

const roadmapData = [
  {
    title: "2020 – Our Vision Begins",
    description: "Founded with a goal to bring wellness and technology together.",
  },
  {
    title: "2021 – First Product Launch",
    description: "We released our first line of lifestyle-enhancing gadgets.",
  },
  {
    title: "2025 – Community First",
    description: "Built a strong community around balance, health, and tech.",
  },
];
