import { motion } from "framer-motion";
import useProductPrice from "../hooks/useProductPrices";

export default function ProductCard({ product, index }) {
  const {
    price,
    currency,
    isLoading,
    error
  } = useProductPrice(product.ecomLink);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.07,
        duration: 0.3
      }
    }
  };

  return (
    <a
      href={product.ecomLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-md overflow-hidden hover:shadow-xl transition-all duration-150 flex flex-col max-w-xs h-[430px]"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Image */}
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "/placeholder-product.jpg";
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-semibold text-sm text-white mb-1 truncate">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-gray-400 text-xs mb-3 line-clamp-2 min-h-[32px]">
                {product.description}
              </p>
            )}
          </div>

          <div className="mt-auto">
            <div className="text-center mb-2">
              {isLoading ? (
                <div className="h-4 w-20 mx-auto bg-gray-600 animate-pulse rounded"></div>
              ) : price ? (
                <span className="text-sm font-bold text-white">
                  {price.toLocaleString()} {currency}
                </span>
              ) : (
                <span className="text-xs text-gray-400">Price unavailable</span>
              )}
            </div>

            <div
              className={`block w-full text-center py-2 text-xs font-semibold rounded transition duration-200 ${price
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-400 text-white cursor-pointer"
              }`}
            >
              {price ? "Buy Now" : "Check Price"}
            </div>

            {error && !isLoading && (
              <p className="text-red-500 text-[10px] mt-2 text-center">{error}</p>
            )}
          </div>
        </div>
      </motion.div>
    </a>
  );
}
