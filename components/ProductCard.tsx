import React from "react";
import { Product } from "../types";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">

      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-4">

        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-sm tracking-tight text-gray-900">
            {product.name}
          </h3>

          <span className="font-bold text-sm text-gray-900">
            {product.price}€
          </span>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          Inspirado en {product.inspiredBy}
        </p>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-2 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-sky-600 transition"
        >
          Añadir
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
