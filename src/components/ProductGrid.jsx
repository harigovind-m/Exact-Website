import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import products from "../data/products";

export default function ProductGrid({ title }) {
  const isLoading = false;
  const error = null;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        {title && (
          <motion.h2
            className="text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        )}

        {isLoading && <LoadingSpinner />}

        {error && (
          <motion.div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>{error}</p>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
