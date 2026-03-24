import React from "react";
import { Product } from "../types";

interface Props {
  products: Product[];
}

const SeoProductContent: React.FC<Props> = ({ products }) => {
  const visibleProducts = products.slice(0, 12);

  const getLineLabel = (line: Product["line"]) => {
    switch (line) {
      case "nicho":
        return "colección nicho";
      case "selecta":
        return "colección selecta";
      case "arabe":
        return "perfumería árabe";
      default:
        return "equivalencia premium";
    }
  };

  const getCategoryLabel = (category: Product["category"]) => {
    switch (category) {
      case "HOMBRE":
        return "hombre";
      case "MUJER":
        return "mujer";
      case "UNISEX":
      default:
        return "unisex";
    }
  };

  return (
    <section
      aria-label="Contenido SEO de perfumes"
      className="bg-white px-4 py-16 border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mb-12">
          <p className="text-sky-600 text-xs font-black uppercase tracking-[0.22em] mb-4">
            Guía de perfumes
          </p>

          <h2 className="text-3xl md:text-5xl font-black tracking-tighter font-syne mb-6 text-gray-900">
            Perfumes de equivalencia, nicho y árabes que huelen brutal
          </h2>

          <div className="space-y-5 text-gray-600 text-base md:text-lg leading-8">
            <p>
              En Huele Que Flipas puedes descubrir perfumes de equivalencia premium,
              perfumes nicho con más personalidad y perfumes árabes intensos, elegantes
              y con mucha presencia. Trabajamos aromas inspirados en fragancias famosas
              para que puedas oler increíble sin pagar el precio de un perfume de lujo.
            </p>

            <p>
              Aquí tienes una selección con información útil sobre varios perfumes del
              catálogo: en qué se inspiran, qué familia olfativa tienen y qué tipo de
              aroma puedes esperar. Todo con la idea de ayudarte a elegir mejor.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              id={`perfume-${product.number.toLowerCase()}`}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
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
                  <strong className="text-gray-900">{getLineLabel(product.line)}</strong>{" "}
                  inspirado en <strong className="text-gray-900">{product.brand}</strong>.
                </p>

                <p>
                  Pertenece a la familia olfativa{" "}
                  <strong className="text-gray-900">{product.family}</strong>, está disponible
                  en formato de <strong className="text-gray-900">{product.size}</strong> y
                  encaja muy bien si buscas un perfume{" "}
                  <strong className="text-gray-900">{getCategoryLabel(product.category)}</strong>{" "}
                  con buena presencia y precio accesible.
                </p>

                <p>
                  Ahora mismo puedes encontrarlo por{" "}
                  <strong className="text-gray-900">{product.price.toFixed(2)}€</strong>,
                  una opción muy interesante si quieres un aroma logrado, con calidad top
                  y larga duración.
                </p>

                {product.description && (
                  <p>{product.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {products.length > visibleProducts.length && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Mostrando una selección de {visibleProducts.length} perfumes para mantener una experiencia más limpia y útil.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeoProductContent;
