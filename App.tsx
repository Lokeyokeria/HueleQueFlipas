import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ChatBot from './components/ChatBot';
import Cart from './components/Cart';
import { PERFUMES } from './data';
import { Product, CartItem } from './types';
import { Star, MapPin, Award } from 'lucide-react';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'TODOS' | 'MUJER' | 'HOMBRE'>('TODOS');

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
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

  const filteredProducts =
    activeCategory === 'TODOS' ? PERFUMES : PERFUMES.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
      />

      <main>
        <Hero />

        {/* Categories Section */}
        <section id="productos" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-syne mb-6">
              Nuestra Colección
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium mb-10">
              Inspirados en los grandes éxitos del mercado, con un toque "Lokeyokería" que marca la diferencia.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {['TODOS', 'MUJER', 'HOMBRE'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-8 py-3 rounded-full text-sm font-black tracking-widest uppercase transition-all duration-300 ${
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
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="about" className="bg-gray-950 py-32 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600080972464-8e5f35802d3e?auto=format&fit=crop&q=80&w=1920"
              className="w-full h-full object-cover"
              alt=""
              loading="lazy"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4 block">
                  Fundadora & Experta
                </span>

                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-syne mb-8 leading-none">
                  Soy María,<br />
                  tu guía olfativa.
                </h2>

                <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
                  Llevamos <span className="text-white font-bold">10 años</span> transformando el mundo
                  de la perfumería en San Martín de la Vega, Madrid. Mi pasión es que encuentres ese
                  aroma que te defina sin que tu bolsillo sufra. Calidad máxima, duración brutal y un
                  trato cercano que te dejará flipando.
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
                  className="relative rounded-3xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Banner */}
        <section className="py-20 bg-gradient-to-r from-gray-950 via-sky-600 to-gray-950 overflow-hidden whitespace-nowrap">
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
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black uppercase tracking-tighter font-syne">
              HUELE QUE FLIPAS
            </h3>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">
              By Lokeyokeria.es
            </p>
          </div>

          <div className="flex space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <a href="#" className="hover:text-sky-600">Privacidad</a>
            <a href="#" className="hover:text-sky-600">Envío</a>
            <a href="#" className="hover:text-sky-600">Bizum</a>
            <a href="#" className="hover:text-sky-600">Contacto</a>
          </div>

          <div className="text-center md:text-right text-xs font-bold text-gray-400">
            © 2026 - San Martín de la Vega, Madrid.
            <br />
            Hecho con ❤️ para ti.
          </div>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      {/* <ChatBot /> */}

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
