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
      case "normal":
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
      return "bg-white border border-sky-100 shadow-[0_12px_30px_rgba(14,165,233,0.08)] hover:shadow-[0_18px_38px_rgba(14,165,233,0.14)] hover:-translate-y-1";
    }

    if (isSelecta || isArabe) {
      return "bg-white border border-sky-100 shadow-[0_10px_24px_rgba(59,130,246,0.06)] hover:shadow-[0_16px_34px_rgba(59,130,246,0.12)] hover:-translate-y-1";
    }

    return "bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1";
  };

  const getLineColor = () => {
    if (isNiche) return "text-sky-700";
    if (isSelecta) return "text-sky-700";
    if (isArabe) return "text-slate-600";
    return "text-gray-400";
  };

  const getBadgeStyle = () => {
    if (isNiche) {
      return "bg-black/90 text-white";
    }

    if (isSelecta) {
      return "bg-sky-700/90 text-white";
    }

    if (isArabe) {
      return "bg-slate-800/90 text-white";
    }

    return "bg-black/90 text-white";
  };

  const getCategoryStyle = () => {
    switch (product.category) {
      case "MUJER":
        return "bg-rose-50/95 text-rose-700 border border-rose-200";
      case "HOMBRE":
        return "bg-sky-50/95 text-sky-700 border border-sky-200";
      case "UNISEX":
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
      mpn: product.number,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      category: `${product.category} - ${getLineLabel()}`,
      description: getSeoDescription(),
      image: [imgSrc || FALLBACK_IMAGE],
      itemCondition: "https://schema.org/NewCondition",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: product.price.toFixed(2),
        availability: "https://schema.org/InStock",
        url: SITE_URL,
        seller: {
          "@type": "Organization",
          name: "Huele Que Flipas",
        },
      },
    };
  }, [imgSrc, product]);

  return (
    <article
      className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
        onViewProduct ? "cursor-pointer" : ""
      } ${getCardStyle()}`}
      onClick={() => onViewProduct?.(product)}
      aria-label={`${product.name}, perfume de equivalencia inspirado en ${product.brand}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="aspect-square overflow-hidden bg-gray-50 relative">
        <img
          src={imgSrc}
          alt={`${product.name}, perfume de equivalencia inspirado en ${product.brand}`}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-gray-200 shadow-sm">
          <span className="text-[11px] font-black tracking-widest text-gray-900">
            #{product.number}
          </span>
        </div>

        <div
          className={`absolute top-3 right-3 backdrop-blur px-3 py-1 rounded-full shadow-sm ${getCategoryStyle()}`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest">
            {product.category}
          </span>
        </div>

        {badgeText && (
          <div
            className={`absolute bottom-3 left-3 backdrop-blur px-3 py-1 rounded-full shadow-sm ${getBadgeStyle()}`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest">
              {badgeText}
            </span>
          </div>
        )}

        {onViewProduct && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-full border border-gray-200 shadow-sm text-[11px] font-black uppercase tracking-widest text-gray-900 hover:bg-white transition"
            aria-label={`Ver detalle de ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            Ver
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-bold text-[15px] tracking-tight text-gray-900 leading-snug">
            {product.name}
          </h3>

          <span className="font-black text-[16px] text-gray-900 whitespace-nowrap">
            {product.price.toFixed(2)}€
          </span>
        </div>

        <p className={`text-[11px] uppercase tracking-widest mb-2 ${getLineColor()}`}>
          {getLineLabel()}
        </p>

        <p className="text-[13px] text-gray-600 leading-relaxed">
          {getInspiredText()}
        </p>

        <p className="text-[13px] text-gray-500 mt-2">
          Familia olfativa: {product.family}
        </p>

        <div className="flex items-center justify-between mt-3 mb-4">
          <p className="text-[14px] text-gray-700 font-semibold">
            {product.size}
          </p>

          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
            Larga duración
          </span>
        </div>

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
