import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <article className="group relative flex flex-col bg-white overflow-hidden rounded-2xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Tag (unisex) */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-white/80 backdrop-blur border border-gray-200 text-gray-700">
          {product.category}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Quick add (visible on desktop hover, but we also add button below for mobile) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onAddToCart(product)}
            className="bg-white text-black p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-sky-600 hover:text-white"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-3xl font-black text-gray-200 group-hover:text-sky-500/20 transition-colors duration-500">
            #{product.number}
          </span>
          <span className="text-lg font-bold text-gray-900">{product.price.toFixed(2)}€</span>
        </div>

        {/* Título más premium y menos conflictivo */}
        <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-sky-700 transition-colors">
          {product.name}
        </h3>

        {/* Marca / inspiración (más suave) */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Inspirado en {product.brand}
        </p>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow italic">
          “{product.description}”
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            {product.family}
          </span>

          {/* CTA visible SIEMPRE (clave para móvil) */}
          <button
            onClick={() => onAddToCart(product)}
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-sky-600 transition-colors"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <Plus className="w-4 h-4" />
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
