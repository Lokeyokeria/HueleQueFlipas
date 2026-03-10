import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { PERFUMES } from './data';
import { Product, CartItem } from './types';
import { Truck, ShieldCheck, Gift, Search } from 'lucide-react';
import mariaPhoto from './maria-photo.jpg';

type CategoryFilter = 'TODOS' | 'MUJER' | 'HOMBRE' | 'UNISEX';

const getDisplayPrice = (product: Product | CartItem) => {
  if (product.line === 'nicho') return 25.0;
  return product.price;
};

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('TODOS');
  const [searchTerm, setSearchTerm] = useState('');

  const normalizeProductPrice = useCallback((product: Product): Product => {
    return {
      ...product,
      price: getDisplayPrice(product),
    };
  }, []);

  const addToCart = useCallback((product: Product) => {
    const productWithCorrectPrice = {
      ...product,
      price: getDisplayPrice(product),
    };

    setCartItems(prev => {
      const existing = prev.find(i => i.id === productWithCorrectPrice.id);

      if (existing) {
        return prev.map(i =>
          i.id === productWithCorrectPrice.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...productWithCorrectPrice, quantity: 1 }];
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

  const nicheProducts = useMemo(() => {
    return filteredProducts.filter(product => product.line === 'nicho');
  }, [filteredProducts]);

  const equivalenceProducts = useMemo(() => {
    return filteredProducts.filter(product => product.line !== 'nicho');
  }, [filteredProducts]);

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
                    Bizum seguro y directo
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

              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {(['TODOS', 'MUJER', 'HOMBRE', 'UNISEX'] as CategoryFilter[]).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
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

              <p className="text-sm text-gray-500">
                Mostrando {filteredProducts.length} perfume{filteredProducts.length === 1 ? '' : 's'}
              </p>
            </div>

            {equivalenceProducts.length > 0 && (
              <div className="mb-20">
                <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
                  <div>
                    <p className="text-sky-600 text-xs font-black uppercase tracking-[0.22em] mb-2">
                      Equivalencias
                    </p>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                      Perfumes para el día a día
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500">
                    {equivalenceProducts.length} resultado{equivalenceProducts.length === 1 ? '' : 's'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {equivalenceProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={normalizeProductPrice(product)}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            {nicheProducts.length > 0 && (
              <div className="rounded-[32px] bg-gray-950 text-white px-6 py-10 md:px-10 md:py-12 shadow-2xl">
                <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
                  <div>
                    <p className="text-sky-400 text-xs font-black uppercase tracking-[0.22em] mb-2">
                      Colección nicho
                    </p>
                    <h3 className="text-2xl md:text-4xl font-black tracking-tight">
                      Fragancias especiales para quienes quieren algo más exclusivo
                    </h3>
                    <p className="text-gray-300 mt-3 max-w-2xl">
                      Aromas con personalidad, más selectos y con un punto más premium dentro de Huele Que Flipas.
                    </p>
                  </div>

                  <p className="text-sm text-gray-400">
                    {nicheProducts.length} resultado{nicheProducts.length === 1 ? '' : 's'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {nicheProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={normalizeProductPrice(product)}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 border border-dashed border-gray-200 rounded-3xl">
                <h3 className="text-2xl font-black mb-3">
                  No hemos encontrado perfumes con esa búsqueda
                </h3>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Prueba con el número, la marca, la familia olfativa o cambia el filtro para ver más opciones.
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
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-black leading-tight mb-6 font-syne">
                  Soy María,
                  <br />
                  tu guía olfativa.
                </h2>

                <p className="text-gray-300 leading-relaxed max-w-xl">
                  Llevo más de <strong>10 años</strong> ayudando a encontrar perfumes
                  que encajan con cada persona. Si no sabes cuál elegir,
                  yo te ayudo.
                </p>
              </div>
            </div>
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
