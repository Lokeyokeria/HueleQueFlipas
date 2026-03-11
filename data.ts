{nicheProducts.length > 0 && (
  <div className="rounded-[32px] bg-gradient-to-br from-[#020817] via-[#031426] to-[#071e36] text-white px-5 py-8 md:px-10 md:py-12 shadow-[0_24px_60px_rgba(2,8,23,0.35)] border border-white/10">
    <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
      <div className="max-w-4xl">
        <p className="text-sky-300 text-xs font-black uppercase tracking-[0.22em] mb-2">
          Colección nicho
        </p>

        <h3 className="font-sans text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug text-white">
          Fragancias especiales para quienes quieren algo más exclusivo
        </h3>

        <p className="text-[12px] sm:text-[13px] md:text-sm text-gray-200 mt-3 leading-6 max-w-none lg:whitespace-nowrap">
          Aromas con personalidad, más selectos y con un punto más premium dentro de <span className="whitespace-nowrap">Huele Que Flipas.</span>
        </p>
      </div>

      <p className="text-sm sm:text-base text-gray-300">
        {nicheProducts.length} resultado{nicheProducts.length === 1 ? '' : 's'}
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {nicheProducts.map(product => (
        <ProductCard
          key={product.id}
          product={normalizeProductPrice(product)}
          onAddToCart={addToCart}
          onViewProduct={setSelectedProduct}
        />
      ))}
    </div>
  </div>
)}
