import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { PERFUMES } from './data';
import { Product, CartItem } from './types';
import { Star, MapPin, Award, Truck, ShieldCheck, Gift, Search, X } from 'lucide-react';

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
      <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />

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
                    Envío rápido
                  </p>
                  <p className="text-sm text-gray-500">1.50€ a toda España</p>
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
                Nuestra Colección
              </h2>

              <p className="text-gray-500 max-w-2xl mx-auto font-medium mb-8 text-base md:text-lg">
                Elige tu aroma, añádelo al carrito y huele increíble sin pagar de más.
              </p>

              <div className="max-w-xl mx-auto mb-8">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Busca por número, perfume o marca... ej: 060, Eros, Fantasy"
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

        <section id="about" className="bg-gray-950 py-24 md:py-32 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600080972464-8e5f35802d3e?auto=format&fit=crop&q=80&w=1920"
              className="w-full h-full object-cover"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4 block">
                  Fundadora & Experta
                </span>

                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-syne mb-8 leading-none">
                  Soy María,
                  <br />
                  tu guía olfativa.
                </h2>

                <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light">
                  Llevamos <span className="text-white font-bold">10 años</span> ayudando a elegir perfumes en
                  San Martín de la Vega. Mi objetivo es que encuentres un aroma que encaje contigo,
                  huela brutal y no te haga pagar de más.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                      <MapPin className="text-sky-400" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest">S.M. de la Vega</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                      <Star className="text-sky-400" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest">Calidad 1:1</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                      <Award className="text-sky-400" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest">10 Años TOP</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-sky-400/15 rounded-3xl blur-2xl group-hover:bg-sky-400/25 transition-all duration-700"></div>

                <img
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800"
                  alt="María, fundadora de Huele Que Flipas"
                  className="relative rounded-3xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 w-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-gray-950 via-sky-600 to-gray-950 overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee space-x-20">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-black text-white/15 uppercase tracking-tighter italic"
              >
                Huele que flipas • Huele que flipas • Huele que flipas • Huele que flipas
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white py-16 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black uppercase tracking-tighter font-syne">
              HUELE QUE FLIPAS
            </h3>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">
              By Lokeyokeria.es
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <a href="#" className="hover:text-sky-600 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Envío
            </a>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Bizum
            </a>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Contacto
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
