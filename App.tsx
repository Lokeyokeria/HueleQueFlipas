{selectedProduct && (
  <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setSelectedProduct(null)}
    />

    <div className="relative w-full max-w-3xl bg-white rounded-[28px] shadow-2xl overflow-hidden z-10">
      <button
        type="button"
        onClick={() => setSelectedProduct(null)}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition"
        aria-label="Cerrar detalle de producto"
      >
        <X className="w-5 h-5 text-gray-700" />
      </button>

      <div className="grid md:grid-cols-2">
        <div className="bg-gray-50">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover min-h-[320px]"
          />
        </div>

        <div className="p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 mb-3">
            {selectedProduct.line === 'nicho' ? 'Colección nicho' : 'Equivalencia'}
          </p>

          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-3">
            {selectedProduct.name}
          </h3>

          <p className="text-sm text-gray-500 mb-2">
            Inspirado en <span className="font-semibold text-gray-700">{selectedProduct.brand}</span>
          </p>

          <p className="text-sm text-gray-500 mb-2">
            Familia olfativa: <span className="font-semibold text-gray-700">{selectedProduct.family}</span>
          </p>

          <p className="text-sm text-gray-500 mb-5">
            Tamaño: <span className="font-semibold text-gray-700">{selectedProduct.size}</span>
          </p>

          <p className="text-base text-gray-600 leading-relaxed mb-6">
            {selectedProduct.description}
          </p>

          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="text-2xl font-black text-gray-900">
              {getDisplayPrice(selectedProduct).toFixed(2)}€
            </span>

            <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-widest text-gray-600">
              #{selectedProduct.number}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              addToCart(selectedProduct);
              setSelectedProduct(null);
            }}
            className="w-full py-3 rounded-full bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-sky-600 transition"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
)}
