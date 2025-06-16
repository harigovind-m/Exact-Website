import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductFilters from '../components/ProductFilters';
import CategoryBanner from '../components/CategoryBanner';
import ProductGrid from '../components/ProductGrid';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow text-center container mx-auto px-6 py-12 pt-20">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-8">{selectedCategory}</h1>

        {/* Filters */}
        <ProductFilters setSelectedCategory={setSelectedCategory} />

        {/* Banner */}
        <CategoryBanner selectedCategory={selectedCategory} />

        {/* Product Grid */}
        <ProductGrid category={selectedCategory} />
      </main>

      <Footer />
    </div>
  );
}
