const categoryBanners = {
  "All Products": "/images/banners/default.jpg",
  "Wellness": "/images/banners/wellness.jpg",
  "Electronics": "/images/banners/electronics.jpg",
  "New Arrivals": "/images/banners/new-arrivals.jpg",
  "Bundles": "/images/banners/bundles.jpg",
};

const features = [
  { icon: "🔁", text: "14 Days Hassle-Free Refund" },
  { icon: "⚡", text: "Fast Charging" },
  { icon: "✅", text: "Passed 30+ Quality Tests" },
  { icon: "📞", text: "24/7 Customer Support" },
  { icon: "🌿", text: "Eco-Friendly Packaging" },
  { icon: "🚚", text: "Free Shipping in Qatar" },
];

export default function CategoryBanner({ selectedCategory }) {
  return (
      <div className="relative w-full h-[380px] mb-10 rounded-xl overflow-hidden">
          {/* Banner image */}
          <img
              src={categoryBanners[selectedCategory] || categoryBanners["All Products"]}
              alt={`${selectedCategory} banner`}
              className="w-full h-full object-cover"
          />

          {/* Scrolling feature strip (desktop only) */}
          <div className="hidden md:flex absolute bottom-0 left-0 w-full h-14 bg-yellow-100/10 backdrop-blur-md overflow-hidden">
              <div className="scroll-strip flex w-max animate-strip gap-12 px-6 whitespace-nowrap">
                  {[...features, ...features].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm font-semibold">
                          <span className="text-xl">{feature.icon}</span>
                          <span className="text-orange-500">{feature.text}</span>
                      </div>
                  ))}
              </div>
          </div>



          <style>{`
            @keyframes strip {
                0% {
                transform: translateX(0%);
                }
                100% {
                transform: translateX(-50%);
                }
            }

            .animate-strip {
                animation: strip 30s linear infinite;
            }
         `}</style>
         
        </div>
  );
}
