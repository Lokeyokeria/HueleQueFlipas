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
  const isNiche = product.line === "nicho";

  const getLineLabel = () => {
    switch (product.line) {
      case "nicho":
        return "Colección nicho";
      case "arabe":
        return "Perfume árabe";
      case "selecta":
        return "Edición selecta";
      case "normal":
      default:
        return "Inspirado en";
    }
  };

  const getSecondaryText = () => {
    switch (product.line) {
      case "nicho":
        return `Inspirado en ${product.brand}`;
      case "arabe":
        return `Inspirado en ${product.brand}`;
      case "selecta":
        return `Inspirado en ${product.brand}`;
      case "normal":
      default:
        return `Inspirado en ${product.brand}`;
    }
  };

  const getBadgeText = () => {
    switch (product.line) {
      case "nicho":
        return "NICHO";
      case "arabe":
        return "ÁRABE";
      case "selecta":
        return "SELECTA";
      default:
        return null;
    }
  };

  const aromaText = `Familia olfativa: ${product.family}`;
  const badgeText = getBadgeText();

  return (
    <article
      className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
        onViewProduct ? "cursor-pointer" : ""
      } ${
        isNiche
          ? "bg-white border border-sky-100 shadow-[0_12px_30px_rgba(14,165,233,0.08)] hover:shadow-[0_18px_38px_rgba(14,165,233,0.14)] hover:-translate-y-1"
          : "bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1"
      }`}
      onClick={() => onViewProduct?.(product)}
    >
      <div className="aspect-square overflow-hidden bg-gray-50 relative">
        <img
          src={imgSrc}
          alt={`${product.name}, inspirado en ${product.brand}`}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-gray-200 shadow-sm">
          <span className="text-[11px] font-black tracking-widest text-gray-900">
            #{product.number}
          </span>
        </div>

        {badgeText && (
          <div className="absolute bottom-3 left-3 bg-black/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              {badgeText}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-bold text-[15px] tracking-tight text-gray-900 leading-snug">
            {product.name}
          </h3>

          <span className="font-bold text-[15px] text-gray-900 whitespace-nowrap">
            {product.price.toFixed(2)}€
          </span>
        </div>

        <p className={`text-xs uppercase tracking-widest mb-1 ${isNiche ? "text-sky-700" : "text-gray-400"}`}>
          {getLineLabel()}
        </p>

        <p className="text-[13px] text-gray-600 leading-relaxed">
          {getSecondaryText()}
        </p>

        <p className="text-[13px] text-gray-500 mt-3">
          {aromaText}
        </p>

        <p className="text-[15px] text-gray-700 font-semibold mt-1 mb-4">
          {product.size}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full py-2.5 rounded-full bg-black text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest transition hover:bg-sky-600"
        >
          Añadir al carrito
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
