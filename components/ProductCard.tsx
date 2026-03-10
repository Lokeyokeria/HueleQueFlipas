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

  const getLineLabel = () => {
    switch (product.line) {
      case "nicho":
        return "Equivalencia nicho";
      case "arabe":
        return "Equivalencia árabe de alta calidad";
      case "selecta":
        return "Edición selecta";
      default:
        return "Inspirado en";
    }
  };

  const getSecondaryText = () => {
    switch (product.line) {
      case "nicho":
        return `Inspirado en ${product.brand}`;
      case "arabe":
        return "Aroma intenso y envolvente";
      case "selecta":
        return "Inspiración premium";
      default:
        return `Inspirado en ${product.brand}`;
    }
  };

  const getAromaText = () => {
    return `Aroma ${product.family}`;
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => onViewProduct?.(product)}
    >
      <div className="aspect-square overflow-hidden bg-gray-50 relative">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-gray-200">
          <span className="text-[11px] font-black tracking-widest text-gray-900">
            #{product.number}
          </span>
        </div>

        {product.line !== "normal" && (
          <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur px-3 py-1 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              {product.line}
            </span>
          </div>
        )}
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

        <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
          {getLineLabel()}
        </p>

        <p className="text-xs text-gray-600 leading-relaxed">
          {getSecondaryText()}
        </p>

        <p className="text-xs text-gray-500 mt-3">
          {getAromaText()}
        </p>

        <p className="text-sm text-gray-700 font-semibold mt-1 mb-4">
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
