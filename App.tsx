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

        {/* BENEFICIOS */}

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
                    onClick={() => setActiveCategory(cat as any)}
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

        {/* MARÍA */}

        <section id="about" className="bg-gray-950 py-24 md:py-28 text-white relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-4">

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">

              {/* TEXTO */}

              <div>

                <span className="text-sky-400 font-bold uppercase tracking-[0.22em] text-sm mb-5 block">
                  Fundadora & Experta
                </span>

                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter font-syne leading-[0.92] mb-8">
                  Soy María,
                  <br />
                  tu guía
                  <br />
                  olfativa.
                </h2>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                  Llevo más de <span className="text-white font-bold">10 años</span> ayudando a encontrar perfumes
                  que encajan de verdad con cada persona. Si no sabes cuál elegir,
                  <span className="text-white font-bold"> yo te ayudo</span>. Cuéntame qué aromas te gustan — dulce,
                  fresco, intenso o elegante — y te recomendaré una equivalencia que vaya contigo.
                </p>

                <div className="mt-10">

                  <a
                    href="https://wa.me/34600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-950 text-sm font-black uppercase tracking-[0.18em] hover:bg-sky-400 transition-all"
                  >
                    María, ayúdame a elegir
                  </a>

                </div>

                <div className="mt-12 grid grid-cols-3 gap-6">

                  <div className="text-center">
                    <MapPin className="mx-auto text-sky-400 mb-2" />
                    <p className="text-xs uppercase font-bold tracking-widest">
                      S.M. de la Vega
                    </p>
                  </div>

                  <div className="text-center">
                    <Star className="mx-auto text-sky-400 mb-2" />
                    <p className="text-xs uppercase font-bold tracking-widest">
                      Calidad 1:1
                    </p>
                  </div>

                  <div className="text-center">
                    <Award className="mx-auto text-sky-400 mb-2" />
                    <p className="text-xs uppercase font-bold tracking-widest">
                      10 años top
                    </p>
                  </div>

                </div>

              </div>

              {/* FOTO */}

              <div className="flex justify-center lg:justify-end">

                <div className="group w-[320px]">

                  <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">

                    <img
                      src={mariaPhoto}
                      alt="María perfumista"
                      className="w-full h-[420px] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* BANDA */}

        <section className="py-8 bg-gradient-to-r from-gray-950 via-sky-600 to-gray-950 overflow-hidden whitespace-nowrap">

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

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

    </div>
  );
};

export default App;
