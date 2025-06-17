import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductFilters from "../components/ProductFilters";
import FilteredProductGrid from "../components/FilteredProductGrid";
import productsData from "../data/products";
import CategoryBanner from "../components/CategoryBanner";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedFilter, setSelectedFilter] = useState("Most Popular");
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === "All Products") {
      setFilteredProducts(productsData);
    } else {
      const filtered = productsData.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />

      <main className="flex-1 pt-24">
        <div className="w-full py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center tracking-tight text-white sm:text-4xl transition-all duration-200">
              {selectedCategory === "All Products" 
                ? "Explore Our Collection" 
                : selectedCategory}
            </h1>
          </div>
        </div>

        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 py-8">
{/* Category Banner */}
        <CategoryBanner selectedCategory={selectedCategory} />
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductFilters
            setSelectedCategory={setSelectedCategory}
            setSelectedFilter={setSelectedFilter}
          />

          {/* Products Grid */}
          <FilteredProductGrid
            products={filteredProducts}
            selectedFilter={selectedFilter}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}