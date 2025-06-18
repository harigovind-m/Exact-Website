import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const categories = [
  "All Products",
  "Wellness",
  "Electronics",
  "New Arrivals",
  "Bundles"
];

const filters = [
  "Most Popular",         // default order (no sort)
  "Price: Low to High",   // ascending price
  "Price: High to Low",   // descending price
  "Rating"                // descending rating
];

export default function ProductFilters({ setSelectedCategory, setSelectedFilter }) {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [activeFilter, setActiveFilter] = useState("Most Popular");

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory, setSelectedCategory]);

  useEffect(() => {
    setSelectedFilter(activeFilter);
  }, [activeFilter, setSelectedFilter]);

  return (
    <div className="mb-12">
      {/* Category Filters */}
      <motion.div
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === category
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Sort Filters */}
      <motion.div
        className="flex items-center flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="text-gray-300">Sort by:</span>
        {filters.map((filter) => (
          <motion.button
            key={filter}
            className={`px-3 py-1 rounded-md text-sm transition ${
              activeFilter === filter
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
