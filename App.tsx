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
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
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
                  <p className="text-sm text-gray-500">1,50€ a toda España</p>
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
                  <p className="text-sm text-gray-500">Bizum seguro y directo</p>
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
                  <p className="text-sm text-gray-500">Te guiamos para acertar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
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
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 font-medium">
                  No hemos encontrado perfumes con esa búsqueda.
                </p>
              </div>
            )}
          </div>
        </section>

        <section id="about" className="bg-gray-950 py-10 md:py-12 text-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="group relative w-[230px] md:w-[250px]">
                  <div className="absolute -inset-2 rounded-[26px] bg-sky-400/10 blur-xl opacity-70 transition-all duration-700 group-hover:bg-sky-400/18 group-hover:-translate-y-1" />

                  <div className="relative overflow-hidden rounded-[26px] border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)] bg-white/5 transition-transform duration-700 group-hover:-translate-y-1">
                    <img
                      src={mariaPhoto}
                      alt="María perfumista"
                      className="w-full h-[300px] md:h-[330px] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-[26px]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-sky-400 font-bold uppercase tracking-[0.24em] text-[11px] md:text-xs mb-3 block">
                  Fundadora: Lokeyokeria.
                </span>

                <h2 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-black uppercase tracking-tighter font-syne leading-[0.9] mb-5">
                  Soy María,
                  <br />
                  tu guía
                  <br />
                  olfativa.
                </h2>

                <p className="text-[15px] md:text-[17px] text-gray-300 leading-relaxed max-w-2xl">
                  Llevo más de <span className="text-white font-bold">10 años</span> ayudando a encontrar perfumes
                  que encajan de verdad con cada persona. Si no sabes cuál elegir,
                  <span className="text-white font-bold"> yo te ayudo</span>. Cuéntame qué aromas te gustan — dulce,
                  fresco, intenso o elegante — y te recomendaré una equivalencia que vaya contigo.
                </p>

                <div className="mt-7">
                  <a
                    href="https://wa.me/34640834686?text=Hola%20Mar%C3%ADa,%20quiero%20que%20me%20ayudes%20a%20elegir%20un%20perfume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-white via-gray-100 to-white text-gray-950 text-[12px] font-black uppercase tracking-[0.18em] border border-white/60 shadow-[0_10px_24px_rgba(255,255,255,0.10)] hover:shadow-[0_14px_32px_rgba(56,189,248,0.20)] hover:from-sky-100 hover:via-white hover:to-sky-100 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    María, ayúdame a elegir
                  </a>
                </div>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                    <MapPin className="w-4 h-4 text-sky-400 mb-2.5" />
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                      San Martín de la Vega
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Atención cercana y real.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                    <Star className="w-4 h-4 text-sky-400 mb-2.5" />
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                      Calidad 100%
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Equivalencias muy logradas.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                    <Award className="w-4 h-4 text-sky-400 mb-2.5" />
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                      10 años top
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Experiencia recomendando aromas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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

          <div className="space-y-5 max-w-sm text-center md:text-left">
            <a href="#top" className="block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition">
              Ir arriba
            </a>

            <div>
              <p className="font-black uppercase text-xs tracking-widest mb-2 text-gray-700">
                Pago por Bizum
              </p>

              <p className="text-sm text-gray-500 leading-relaxed">
                Realiza tu pedido cómodamente desde la web.
                Cuando tengas tu perfume en el carrito, confirma la compra por Bizum.
              </p>

              <p className="text-sm text-gray-500 leading-relaxed mt-2">
                Al hacerlo, se abrirá nuestro WhatsApp directamente. Nos pondremos en contacto contigo
                lo antes posible para confirmar tu pedido y facilitarte el pago por Bizum de forma rápida y segura.
              </p>

              <p className="text-sm text-gray-500 leading-relaxed mt-2">
                Una vez recibido el pago, tu pedido se prepara y sale en un plazo aproximado de
                <strong> 24 horas</strong> rumbo a tu hogar.
              </p>

              <p className="text-sm text-gray-500 leading-relaxed mt-2">
                Desde que el paquete es enviado, lo recibirás normalmente en
                <strong> 24 horas</strong>, siempre que todo transcurra con normalidad durante el transporte.
              </p>
            </div>

            <a href="/contacto" className="block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition">
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

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full grid md:grid-cols-2 overflow-hidden relative">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gray-50">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover min-h-[320px]"
              />
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 mb-3">
                #{selectedProduct.number}
              </p>

              <h2 className="text-3xl md:text-4xl font-black tracking-tighter font-syne text-gray-900 mb-3">
                {selectedProduct.name}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                Inspirado en {selectedProduct.brand}
              </p>

              <p className="text-sm text-gray-500 mb-6">
                Familia olfativa: {selectedProduct.family}
              </p>

              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {selectedProduct.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-semibold text-gray-500">
                  {selectedProduct.size}
                </span>

                <span className="text-2xl font-black text-gray-900">
                  {selectedProduct.price.toFixed(2)}€
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full py-4 rounded-2xl bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-sky-600 transition"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 40s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
