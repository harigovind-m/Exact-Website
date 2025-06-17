import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import ProductCard from "./ProductCard";

export default function FilteredProductGrid({ title, products = [], selectedFilter }) {
  const [productsWithPrice, setProductsWithPrice] = useState([]);
  const [isLoadingPrices, setLoadingPrices] = useState(false);

  // Fetch prices for all products
  useEffect(() => {
    async function loadPrices() {
      setLoadingPrices(true);
      const updated = await Promise.all(products.map(async (p) => {
        try {
          const res = await axios.get(
            `/api/price?productUrl=${encodeURIComponent(p.ecomLink)}`
          );
          return { ...p, price: res.data.price ?? 0, rating: p.rating ?? 0 };
        } catch {
          return { ...p, price: 0, rating: p.rating ?? 0 };
        }
      }));
      setProductsWithPrice(updated);
      setLoadingPrices(false);
    }
    loadPrices();
  }, [products]);

  // Sort products based on selectedFilter
  const sorted = [...productsWithPrice].sort((a, b) => {
    switch (selectedFilter) {
      case "Price: Low to High": return a.price - b.price;
      case "Price: High to Low": return b.price - a.price;
      case "Rating": return (b.rating ?? 0) - (a.rating ?? 0);
      default: return 0; // Most Popular: original order
    }
  });

  return (
    <section className="py-6 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container px-6">
    
        {isLoadingPrices && <LoadingSpinner />}

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {sorted.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
