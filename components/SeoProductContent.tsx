import React from "react";
import { Product } from "../types";

interface Props {
  products: Product[];
}

const SeoProductContent: React.FC<Props> = ({ products }) => {
  return (
    <section aria-label="Contenido SEO de perfumes" className="bg-white px-4 py-16 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <p className="text-sky-600 text-xs font-black uppercase tracking-[0.22em] mb-4">
            Guía de perfumes
          </p>

          <h2 className="text-3xl md:text-5xl font-black tracking-tighter font-syne mb-6 text-gray-900">
            Perfumes de equivalencia, nicho y árabes
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-8 mb-10">
            En Huele Que Flipas puedes encontrar perfumes de equivalencia premium inspirados en
            fragancias famosas, perfumes nicho con personalidad propia y perfumes árabes intensos,
            elegantes y con mucha presencia. Aquí tienes una selección con información útil para
            descubrir mejor cada aroma.
          </p>
        </div>

        <div className="grid gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              id={`perfume-${product.number.toLowerCase()}`}
              className="rounded-3xl border border-gray-100 bg-white p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 mb-3">
                Perfume #{product.number}
              </p>

              <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 mb-3">
                {product.name}
              </h3>

              <div className="space-y-3 text-gray-600 leading-7 text-[15px] md:text-base">
                <p>
                  <strong className="text-gray-900">{product.name}</strong> es un perfume de{" "}
                  <strong className="text-gray-900">
                    {product.line === "nicho"
                      ? "colección nicho"
                      : product.line === "selecta"
                      ? "colección selecta"
                      : product.line === "arabe"
                      ? "perfumería árabe"
                      : "equivalencia premium"}
                  </strong>{" "}
                  inspirado en <strong className="text-gray-900">{product.brand}</strong>.
                </p>

                <p>
                  Pertenece a la familia olfativa{" "}
                  <strong className="text-gray-900">{product.family}</strong>, está disponible en{" "}
                  <strong className="text-gray-900">{product.size}</strong> y encaja dentro de la
                  categoría <strong className="text-gray-900">{product.category.toLowerCase()}</strong>.
                </p>

                <p>
                  Es una opción ideal si buscas un perfume con personalidad, buena presencia y un
                  precio accesible. Ahora mismo puedes encontrarlo en Huele Que Flipas por{" "}
                  <strong className="text-gray-900">{product.price.toFixed(2)}€</strong>.
                </p>

                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoProductContent;
