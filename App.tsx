import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { PERFUMES } from './data';
import { Product, CartItem } from './types';
import { Star, MapPin, Award, Truck, ShieldCheck, Gift, Search, X } from 'lucide-react';
import mariaPhoto from './maria-photo.jpg';

const App: React.FC = () => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'TODOS' | 'MUJER' | 'HOMBRE' | 'UNISEX'>('TODOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = useCallback((product: Product) => {

    setCartItems(prev => {

      const existing = prev.find(i => i.id === product.id);

      if (existing) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...product, quantity: 1 }];

    });

    setIsCartOpen(true);

  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {

    setCartItems(prev =>
      prev.map(i => {

        if (i.id === id) {

          const newQty = Math.max(1, i.quantity + delta);

          return { ...i, quantity: newQty };

        }

        return i;

      })
    );

  }, []);

  const filteredProducts = useMemo(() => {

    const byCategory =
      activeCategory === 'TODOS'
        ? PERFUMES
        : PERFUMES.filter(p => p.category === activeCategory);

    const term = searchTerm.trim().toLowerCase();

    if (!term) return byCategory;

    return byCategory.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.family.toLowerCase().includes(term) ||
      product.number.toLowerCase().includes(term)
    );

  }, [activeCategory, searchTerm]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return (

    <div className="min-h-screen bg-white text-gray-900">

      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onSearchClick={() => {

          const section = document.getElementById('productos');

          section?.scrollIntoView({ behavior: 'smooth' });

          setTimeout(() => {

            const input = document.getElementById('product-search') as HTMLInputElement | null;

            input?.focus();

          }, 400);

        }}
      />

      <main>

        <Hero />

        {/* BARRA BENEFICIOS */}

        <section className="border-y border-gray-100 bg-white">

          <div className="max-w-7xl mx-auto px-4 py-6">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">

              <div className="flex items-center justify-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-sky-600" />
                </div>

                <div className="text-left">

                  <p className="text-xs font-black uppercase tracking-widest text-gray-900">
                    Envío 24/48h
                  </p>

                  <p className="text-sm text-gray-500">
                    1,50€ a toda España
                  </p>

                </div>

              </div>

              <div className="flex items-center justify-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-sky-600" />
                </div>

                <div className="text-left">

                  <p className="text-xs font-black uppercase tracking-widest text-gray-900">
                    Pago fácil
                  </p>

                  <p className="text-sm text-gray-500">
                    Bizum rápido y seguro
                  </p>

                </div>

              </div>

              <div className="flex items-center justify-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-sky-600" />
                </div>

                <div className="text-left">

                  <p className="text-xs font-black uppercase tracking-widest text-gray-900">
                    Compra con ayuda
                  </p>

                  <p className="text-sm text-gray-500">
                    Te guiamos para acertar
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* PRODUCTOS */}

        <section id="productos" className="py-24 px-4 bg-white">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">

              <span className="inline-block text-sky-600 text-xs font-black uppercase tracking-[0.25em] mb-4">
                Colección destacada
              </span>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-syne mb-6">
                Nuestra colección
              </h2>

              <p className="text-gray-500 max-w-2xl mx-auto font-medium mb-8 text-base md:text-lg">
                Elige tu aroma, añádelo al carrito y huele increíble sin pagar de más.
              </p>

              <div className="max-w-xl mx-auto mb-8">

                <div className="relative">

                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

                  <input
                    id="product-search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Busca por número, perfume o marca..."
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-sky-500"
                  />

                </div>

              </div>

              <div className="flex flex-wrap justify-center gap-4">

                {['TODOS', 'MUJER', 'HOMBRE', 'UNISEX'].map(cat => (

                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat as 'TODOS' | 'MUJER' | 'HOMBRE' | 'UNISEX')}
                    className={`px-6 py-3 rounded-full text-sm font-black tracking-widest uppercase transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-black text-white shadow-xl scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>

                ))}

              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {filteredProducts.map(product => (

                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewProduct={setSelectedProduct}
                />

              ))}

            </div>

          </div>

        </section>

        {/* MARQUEE */}

        <section className="py-8 md:py-10 bg-gradient-to-r from-gray-950 via-sky-600 to-gray-950 overflow-hidden whitespace-nowrap">

          <div className="flex animate-marquee space-x-16">

            {[...Array(6)].map((_, i) => (

              <span
                key={i}
                className="text-5xl md:text-7xl font-black text-white/25 uppercase tracking-tighter italic"
              >
                Huele que flipas • Huele que flipas • Huele que flipas
              </span>

            ))}

          </div>

        </section>

      </main>

      {/* FOOTER */}

      <footer className="bg-white py-16 px-4 border-t border-gray-100">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

          <div className="text-center md:text-left">

            <h3 className="text-2xl font-black uppercase tracking-tighter font-syne">
              HUELE QUE FLIPAS
            </h3>

            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">
              By Lokeyokeria.es
            </p>

          </div>

          <div className="space-y-5 max-w-sm text-left">

            <a href="#top" className="block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition">
              Ir arriba
            </a>

            <div>

              <p className="font-black uppercase text-xs tracking-widest mb-2 text-gray-700">
                Pago por Bizum
              </p>

              <p className="text-sm text-gray-400 leading-relaxed">
                Realiza tu pedido cómodamente desde la web. Cuando tengas tu perfume en el carrito, confirma la compra a traves del boton: "PAGAR CON BIZUM".
              </p>

              <p className="text-sm text-gray-400 leading-relaxed mt-2">
                Al hacerlo se abrirá nuestro WhatsApp para confirmar el pedido. Nos pondremos en contacto contigo y facilitarte el pago por Bizum de forma rápida y segura.
              </p>

              <p className="text-sm text-gray-400 leading-relaxed mt-2">
                Una vez recibido el pago, tu pedido se prepara y sale en un plazo de <strong>24 horas</strong>.
              </p>

              <p className="text-sm text-gray-400 leading-relaxed mt-2">
                Desde que el paquete es enviado, lo recibirás normalmente en <strong>24 horas</strong>, siempre que el transporte funcione con normalidad.
              </p>

            </div>

            <a
              href="https://wa.me/34640834686?text=Hola,%20quiero%20contactar%20con%20vosotros"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition"
            >
              Contáctanos
            </a>

          </div>

          <div className="text-center md:text-right text-xs font-bold text-gray-400">

            © 2026 - San Martín de la Vega, Madrid.
            <br />
            Hecho con ❤️ para ti.

          </div>

        </div>

      </footer>

    </div>

  );
};

export default App;
