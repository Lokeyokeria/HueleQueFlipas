import React, { useState } from "react";
import { Product } from "../types";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
}

const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/Lokeyokeria/HueleQueFlipas/main/equivalencia-hqf.jpg";

const ProductCard: React.FC<Props> = ({ product, onAddToCart, onViewProduct }) => {
  const [imgSrc, setImgSrc] = useState(product.image || FALLBACK_IMAGE);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => onViewProduct?.(product)}
    >
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-bold text-sm tracking-tight text-gray-900 leading-snug">
            {product.name}
          </h3>

          <span className="font-bold text-sm text-gray-900 whitespace-nowrap">
            {product.price.toFixed(2)}€
          </span>
        </div>

        <p className="text-xs text-gray-500">
          Inspirado en {product.brand}
        </p>

        <p className="text-xs text-gray-400 mt-1 mb-4">
          {product.size}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full py-2 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest transition hover:bg-sky-600"
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
