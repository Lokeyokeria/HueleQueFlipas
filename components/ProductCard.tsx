import React, { useMemo, useState } from "react";
import { Product } from "../types";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
}

const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/Lokeyokeria/HueleQueFlipas/main/equivalencia-hqf.jpg";

const SITE_URL = "https://huelequeflipas.es";

const ProductCard: React.FC<Props> = ({ product, onAddToCart, onViewProduct }) => {
  const [imgSrc, setImgSrc] = useState(product.image || FALLBACK_IMAGE);

  const isNiche = product.line === "nicho";
  const isSelecta = product.line === "selecta";
  const isArabe = product.line === "arabe";

  const getLineLabel = () => {
    switch (product.line) {
      case "nicho":
        return "Colección nicho";
      case "selecta":
        return "Fragancia selecta";
      case "arabe":
        return "Perfume árabe";
      default:
        return "Equivalencia";
    }
  };

  const getBadgeText = () => {
    switch (product.line) {
      case "nicho":
        return "NICHO";
      case "selecta":
        return "SELECTA";
      case "arabe":
        return "ÁRABE";
      default:
        return null;
    }
  };

  const getBadgeStyle = () => {
    if (isNiche) return "bg-black text-white";
    if (isSelecta) return "bg-sky-700 text-white";
    if (isArabe) return "bg-slate-800 text-white";
    return "";
  };

  const getCategoryStyle = () => {
    switch (product.category) {
      case "MUJER":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "HOMBRE":
        return "bg-sky-50 text-sky-700 border border-sky-200";
      default:
        return "bg-violet-50 text-violet-700 border border-violet-200";
    }
  };

  const getSellingMessage = () => {
    const code = product.number.toUpperCase().trim();

    if (code === "7000" || code === "N7000") {
      return "🔥 Muy vendido · Se agota rápido";
    }

    if (code === "N35" || code === "35") {
      return "🔥 Muy vendido · Se agota rápido";
    }

    return null;
  };

  const productSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      sku: product.number,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      description: `${product.name} perfume de equivalencia premium`,
      image: [imgSrc || FALLBACK_IMAGE],
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: product.price.toFixed(2),
        availability: "https://schema.org/InStock",
        url: SITE_URL,
      },
    };
  }, [imgSrc, product]);

  const badgeText = getBadgeText();
  const sellingMessage = getSellingMessage();

  return (
    <article
      className="group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1"
      onClick={() => onViewProduct?.(product)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />

        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
          {badgeText && (
            <div
              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${getBadgeStyle()}`}
            >
              {badgeText}
            </div>
          )}

          <div
            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${getCategoryStyle()}`}
          >
            {product.category}
          </div>
        </div>

        <div className="absolute top-2.5 left-2.5 bg-white/90 px-2.5 py-1 rounded-full text-[10px] font-black">
          #{product.number}
        </div>
      </div>

      <div className="p-3.5 sm:p-4 space-y-2.5">
        {sellingMessage && (
          <p className="text-[10px] sm:text-[11px] font-black tracking-wide text-sky-700">
            {sellingMessage}
          </p>
        )}

        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm sm:text-[15px] font-bold leading-tight line-clamp-2">
            {product.name}
          </h3>

          <span className="font-black text-sm sm:text-[16px] whitespace-nowrap">
            {product.price.toFixed(2)}€
          </span>
        </div>

        <p className="text-[11px] uppercase tracking-widest text-gray-400">
          {getLineLabel()}
        </p>

        <p className="text-[13px] text-gray-600">
          Inspirado en {product.brand}
        </p>

        <p className="text-[12px] text-gray-500">
          {product.family}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-[12px] font-semibold">{product.size}</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase">
            Larga duración y simulitud.
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full py-2.5 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-sky-600 transition active:scale-[0.97]"
        >
          {product.price.toFixed(2)}€ · LO QUIERO
        </button>

        <p className="text-[10px] text-gray-400 text-center">
          🚚 24/48h · 🎁 Muestras gratis · 🇪🇸 España
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
