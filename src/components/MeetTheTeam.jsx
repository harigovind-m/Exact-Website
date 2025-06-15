import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const team = [
  { id: 1, name: "Alex Johnson", role: "Founder & CEO", image: "/images/team/alex.png", bio: "Passionate about wellness and technology." },
  { id: 2, name: "Sarah Lee", role: "Product Designer", image: "/images/team/sarah.png", bio: "Designs intuitive experiences." },
  { id: 3, name: "Steve Jobs", role: "Tech Lead", image: "/images/team/steve.png", bio: "Drives innovation at scale." },
  { id: 4, name: "Nina Patel", role: "Marketing Head", image: "/images/team/nina.png", bio: "Crafts stories that connect." },
  { id: 5, name: "Liam Chen", role: "Operations", image: "/images/team/jimmy.png", bio: "Keeps everything running smoothly." },
  { id: 6, name: "Liam", role: "Operations", image: "/images/team/alex.png", bio: "Keeps everything running smoothly." },
  { id: 7, name: "Lee", role: "Operations", image: "/images/team/steve.png", bio: "Keeps everything running smoothly." },
];

export default function MeetTheTeam() {
  const containerRef = useRef(null);
  const [isPaused, setPaused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollPosRef = useRef(0);
  const animationRef = useRef();

  // Card dimensions including margins
  const cardWidth = 240 + 40; // width + margin (20px each side)
  const scrollSpeed = 1;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animateScroll = () => {
      if (!isPaused) {
        scrollPosRef.current += scrollSpeed;
        
        // Handle infinite looping
        if (scrollPosRef.current >= team.length * cardWidth) {
          scrollPosRef.current = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = scrollPosRef.current;
        }

        // Calculate focused index
        const scrollCenter = scrollPosRef.current + container.offsetWidth / 2;
        const centerIdx = Math.floor(scrollCenter / cardWidth) % team.length;
        setFocusedIndex(centerIdx);
      }

      animationRef.current = requestAnimationFrame(animateScroll);
    };

    animationRef.current = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  return (
    <section className="bg-white text-black py-16">
      <h2 className="text-3xl font-bold text-center mb-16">Meet The Team</h2>
      <div
        ref={containerRef}
        className="overflow-hidden mx-auto relative"
        style={{ width: "100%", height: 700 }} // Increased height
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex w-max items-center h-full py-8"> {/* Added padding */}
          {[...team, ...team].map((member, idx) => {
            const realIdx = idx % team.length;
            const isFocused = realIdx === focusedIndex;

            return (
              <motion.div
                key={`${member.id}-${idx}`}
                className="flex-shrink-0 flex flex-col items-center text-center"
                style={{
                  width: 240,
                  margin: "0 20px",
                  zIndex: isFocused ? 10 : 1,
                }}
                animate={{
                  scale: isFocused ? 1.15 : 1,
                  y: isFocused ? -30 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  mass: 0.5
                }}
              >
                <div className="relative">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="object-cover rounded-lg shadow-lg"
                    style={{ 
                      width: "100%", 
                      height: 320,
                      filter: isFocused ? "none" : "brightness(0.95)"
                    }}
                    animate={{
                      height: isFocused ? 380 : 320,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  />
                </div>
                <div className="mt-6 w-full">
                  <h3 className={`text-lg font-semibold ${isFocused ? "text-red-600 scale-110" : "text-black"}`}>
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-900 mt-1">{member.role}</p>
                  <motion.p
                    className="text-xs text-red-600 mt-2 max-w-xs mx-auto"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: isFocused ? 1 : 0,
                      height: isFocused ? "auto" : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.bio}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
