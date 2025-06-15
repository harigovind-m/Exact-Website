import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const featureItems = [
  {
    icon: "🛡️",
    title: "Premium Quality",
    description: "All our products meet the highest industry standards"
  },
  {
    icon: "🔋",
    title: "Long Lasting",
    description: "Designed for durability and extended use"
  },
  {
    icon: "🚚",
    title: "Fast Shipping",
    description: "Free delivery on orders over $50"
  },
  {
    icon: "🔄",
    title: "Easy Returns",
    description: "30-day hassle-free return policy"
  }
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span style={{ color: 'red' }}>Exact</span>?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}