import ProductCard from '../components/ProductCard';
import { Product } from '../types';

type PerfumesHombreProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
};

export default function PerfumesHombre({
  products,
  onAddToCart,
  onViewProduct,
}: PerfumesHombreProps) {
  return (
    <section className="bg-white min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-14">
          <p className="text-sky-600 text-xs font-black uppercase tracking-[0.22em] mb-4">
            Perfumes de equivalencia hombre
          </p>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter font-syne text-gray-900 mb-6">
            Perfumes de equivalencia para hombre que huelen caro
          </h1>

          <div className="max-w-3xl space-y-5 text-gray-600 text-base md:text-lg leading-8">
            <p>
              Descubre perfumes de equivalencia para hombre con aromas elegantes,
              intensos, frescos o amaderados, pensados para quienes quieren oler
              bien, durar horas y transmitir presencia sin pagar el precio de un
              perfume de lujo.
            </p>

            <p>
              En Huele Que Flipas seleccionamos fragancias masculinas con muy
              buena relación calidad precio, fabricadas en España, con larga
              duración, envío 24/48h y una selección enfocada a perfumes que de
              verdad gustan y se disfrutan.
            </p>

            <p>
              Aquí encontrarás perfumes para hombre para diario, oficina, citas,
              noche o momentos especiales, con estilos que van desde lo limpio y
              versátil hasta lo intenso, seductor y con mucha personalidad.
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sky-600 text-xs font-black uppercase tracking-[0.22em] mb-2">
              Colección hombre
            </p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
              Perfumes para hombre disponibles
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-500">
            {products.length} resultado{products.length === 1 ? '' : 's'}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-3xl">
            <h3 className="text-2xl font-black mb-3 text-gray-900">
              Ahora mismo no hay perfumes de hombre disponibles
            </h3>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              En cuanto subamos más referencias, aparecerán aquí.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
