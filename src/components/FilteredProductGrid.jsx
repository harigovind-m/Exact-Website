import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import ProductCard from "./ProductCard";

export default function FilteredProductGrid({ products = [], selectedFilter }) {
  const [productsWithPrices, setProductsWithPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch prices for all products before rendering
  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      const fetched = await Promise.all(
        products.map(async (product) => {
          try {
            const res = await axios.get(
              `http://localhost:4001/api/price?productUrl=${encodeURIComponent(product.ecomLink)}`
            );

            return {
              ...product,
              price: res.data.price ?? 0,
              displayPrice: res.data.price ?? 0,
              rating: product.rating ?? 0,
              popularity: product.popularity ?? 0
            };
          } catch (error) {
            return {
              ...product,
              price: 0,
              displayPrice: 0,
              rating: product.rating ?? 0,
              popularity: product.popularity ?? 0
            };
          }
        })
      );
      setProductsWithPrices(fetched);
      setIsLoading(false);
    };

    if (products.length > 0) {
      fetchPrices();
    } else {
      setProductsWithPrices([]);
      setIsLoading(false);
    }
  }, [products]);

  // Sort by selected filter after price fetch
  const sortedProducts = [...productsWithPrices].sort((a, b) => {
    switch (selectedFilter) {
      case "Price: Low to High":
        return (a.price || 0) - (b.price || 0);
      case "Price: High to Low":
        return (b.price || 0) - (a.price || 0);
      case "Rating":
        return (b.rating || 0) - (a.rating || 0);
      case "Most Popular":
        return (b.popularity || 0) - (a.popularity || 0);
      default:
        return 0;
    }
  });

  return (
    <section className="py-6 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container px-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
          >
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
