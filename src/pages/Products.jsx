import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Product Range</h1>
        <ProductFilters />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
