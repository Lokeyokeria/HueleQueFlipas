import React, { useMemo, useState } from "react";
import { Eye } from "lucide-react";
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

  const getInspiredText = () => {
    return `Inspirada en ${product.brand}`;
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

  const getCardStyle = () => {
    if (isNiche) {
      return "bg-white border border-sky-100 shadow-[0_10px_24px_rgba(14,165,233,0.06)] hover:shadow-[0_16px_34px_rgba(14,165,233,0.12)] hover:-translate-y-1";
    }

    if (isSelecta || isArabe) {
      return "bg-white border border-sky-100 shadow-[0_10px_24px_rgba(59,130,246,0.06)] hover:shadow-[0_16px_34px_rgba(59,130,246,0.12)] hover:-translate-y-1";
    }

    return "bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1";
  };

  const getLineColor = () => {
    if (isNiche) return "text-sky-700";
    if (isSelecta) return "text-sky-700";
    if (isArabe) return "text-slate-600";
    return "text-gray-400";
  };

  const getBadgeStyle = () => {
    if (isNiche) return "bg-black/90 text-white";
    if (isSelecta) return "bg-sky-700/90 text-white";
    if (isArabe) return "bg-slate-800/90 text-white";
    return "bg-black/90 text-white";
  };

  const getCategoryStyle = () => {
    switch (product.category) {
      case "MUJER":
        return "bg-rose-50/95 text-rose-700 border border-rose-200";
      case "HOMBRE":
        return "bg-sky-50/95 text-sky-700 border border-sky-200";
      default:
        return "bg-violet-50/95 text-violet-700 border border-violet-200";
    }
  };

  const getSeoDescription = () => {
    return `${product.name} es un perfume de equivalencia premium inspirada en ${product.brand}, con familia olfativa ${product.family.toLowerCase()} y formato de ${product.size}.`;
  };

  const badgeText = getBadgeText();

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
      category: `${product.category} - ${getLineLabel()}`,
      description: getSeoDescription(),
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

  return (
    <article
      className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
        onViewProduct ? "cursor-pointer" : ""
      } ${getCardStyle()}`}
      onClick={() => onViewProduct?.(product)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* IMAGEN */}
      <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />

        <div className="absolute top-2.5 left-2.5 bg-white/90 px-2.5 py-1 rounded-full border text-[10px] font-black">
          #{product.number}
        </div>

        <div className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase md:uppercase ${getCategoryStyle()}`}>
          {product.category}
        </div>

        {badgeText && (
          <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase md:uppercase ${getBadgeStyle()}`}>
            {badgeText}
          </div>
        )}

        {onViewProduct && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="absolute bottom-2.5 right-2.5 bg-white/90 px-2.5 py-1.5 rounded-full text-[10px] font-black uppercase md:uppercase flex items-center gap-1"
          >
            <Eye className="w-3 h-3" /> Ver
          </button>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="p-3.5 sm:p-4 space-y-2.5">

        {/* URGENCIA */}
        <span className="text-[9px] sm:text-[10px] text-sky-600 font-bold uppercase md:uppercase tracking-widest">
          🔥 Muy vendido esta semana
        </span>

        {/* NOMBRE + PRECIO */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm sm:text-[15px] font-bold leading-tight line-clamp-2">
            {product.name}
          </h3>

          <span className="font-black text-sm sm:text-[16px]">
            {product.price.toFixed(2)}€
          </span>
        </div>

        <p className={`text-[10px] sm:text-[11px] uppercase md:uppercase tracking-widest ${getLineColor()}`}>
          {getLineLabel()}
        </p>

        <p className="text-[12px] sm:text-[13px] text-gray-600">
          {getInspiredText()}
        </p>

        <p className="text-[12px] sm:text-[13px] text-gray-500">
          {product.family}
        </p>

        {/* CTA */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full py-2.5 rounded-full bg-black text-white text-[11px] font-black uppercase md:uppercase tracking-widest hover:bg-sky-600 transition active:scale-[0.97]"
        >
          {product.price.toFixed(2)}€ · LO QUIERO
        </button>

        {/* CONFIANZA */}
        <p className="text-[10px] text-gray-400 text-center">
          🚚 24/48h · 🎁 Muestras de regalo · España
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
