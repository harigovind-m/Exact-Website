// Testimonials.jsx
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Wellness Enthusiast",
    content: "Exact Lifestyle's products transformed my daily routine. The quality is unmatched!",
    rating: 2
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Wellness Enthusiast",
    content: "Exact Lifestyle's products transformed my daily routine. The quality is unmatched!",
    rating: 4
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Wellness Enthusiast",
    content: "Exact Lifestyle's products transformed my daily routine. The quality is unmatched!",
    rating: 3
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-gray-500 text-sm">{testimonial.role}</div>
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    {i < testimonial.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
