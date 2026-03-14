import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import BlogPage from "./components/BlogPage";
import BlogPostBaccaratRouge from "./components/BlogPostBaccaratRouge";
import BlogPostPerfumesArabes from "./components/BlogPostPerfumesArabes";
import { PERFUMES } from './data';
import { Product, CartItem } from './types';
import { Star, MapPin, Award, Truck, ShieldCheck, Gift, Search, X } from 'lucide-react';
import mariaPhoto from './maria-photo.jpg';

type CategoryFilter = 'TODOS' | 'MUJER' | 'HOMBRE' | 'UNISEX';

const getDisplayPrice = (product: Product | CartItem) => {
  if (product.line === 'nicho') return 25.0;
  return product.price;
};

const PRODUCT_MODAL_IMAGE =
  'https://raw.githubusercontent.com/Lokeyokeria/HueleQueFlipas/main/equivalencia-hqf.jpg';

const CART_STORAGE_KEY = 'hqf-cart';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('TODOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart) as CartItem[];

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error al recuperar el carrito:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }, [cartItems]);

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

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
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

  const equivalenceProducts = useMemo(() => {
    return filteredProducts.filter(product => product.line === 'normal');
  }, [filteredProducts]);

  const selectaProducts = useMemo(() => {
    return filteredProducts.filter(
      product => product.line === 'selecta' || product.line === 'arabe'
    );
  }, [filteredProducts]);

  const nicheProducts = useMemo(() => {
    return filteredProducts.filter(product => product.line === 'nicho');
  }, [filteredProducts]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const getModalLabel = (product: Product) => {
    switch (product.line) {
      case 'nicho':
        return 'Colección nicho';
      case 'selecta':
        return 'Fragancia selecta';
      case 'arabe':
        return 'Perfume árabe';
      default:
        return 'Equivalencia';
    }
  };

  const currentPath =
    typeof window !== 'undefined'
      ? window.location.pathname
      : '';

  const currentHash =
    typeof window !== 'undefined'
      ? window.location.hash
      : '';

  const isBlogPage =
    currentPath === '/blog' ||
    currentHash === '#/blog' ||
    currentHash === '#blog';

  const isBaccaratRougePost =
    currentPath === '/blog/equivalencia-baccarat-rouge' ||
    currentHash === '#/blog/equivalencia-baccarat-rouge';

  const isPerfumesArabesPost =
    currentPath === '/blog/perfumes-arabes-que-huelen-caro' ||
    currentHash === '#/blog/perfumes-arabes-que-huelen-caro';

  if (isPerfumesArabesPost) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
          onSearchClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <main>
          <BlogPostPerfumesArabes />
        </main>

        <footer className="bg-white py-16 px-4 border-t border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-10 items-start">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter font-syne">
                Huele Que Flipas
              </h3>

              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">
                By Lokeyokeria.es
              </p>

              <p className="text-sm text-gray-500 mt-4 leading-6 max-w-[240px]">
                Si quieres conocer nuestra web principal puedes visitar{' '}
                <a
                  href="https://lokeyokeria.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-700 underline underline-offset-4 hover:text-sky-600 transition"
                >
                  Lokeyokeria.es
                </a>.
              </p>
            </div>

            <div className="max-w-xl">
              <a
                href="/blog"
                className="inline-block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition"
              >
                Volver al blog
              </a>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-4">
                  Pago por Bizum
                </p>

                <div className="space-y-4 text-[15px] leading-8 text-gray-500">
                  <p>
                    Realiza tu pedido cómodamente desde la web. Cuando tengas tu perfume en el carrito,
                    confirma la compra dando al botón <strong className="text-gray-800">“Pagar con Bizum”</strong>.
                  </p>

                  <p>
                    Al hacerlo se abrirá nuestro WhatsApp. Envía tu consulta y nos pondremos
                    en contacto contigo para confirmar el pedido. Te facilitaremos el pago por Bizum de forma
                    rápida y segura.
                  </p>

                  <p>
                    Una vez recibido el pago, tu pedido se prepara y sale en un plazo aproximado de 24 horas.
                  </p>

                  <p>
                    Desde que el paquete es enviado, lo recibirás normalmente en 24/48 horas, siempre que
                    el transporte funcione con normalidad.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-3">
                  Contáctanos
                </p>

                <a
                  href="https://api.whatsapp.com/send?phone=34640834686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[15px] text-gray-600 hover:text-sky-600 transition"
                >
                  WhatsApp: 640 83 46 86
                </a>

                <p className="text-[15px] text-gray-500 mt-2">
                  San Martín de la Vega, Madrid
                </p>
              </div>
            </div>

            <div className="text-xs font-bold text-gray-400 md:text-right">
              © 2026 — San Martín de la Vega, Madrid
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
          onClearCart={clearCart}
        />
      </div>
    );
  }

  if (isBaccaratRougePost) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
          onSearchClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <main>
          <BlogPostBaccaratRouge />
        </main>

        <footer className="bg-white py-16 px-4 border-t border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-10 items-start">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter font-syne">
                Huele Que Flipas
              </h3>

              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">
                By Lokeyokeria.es
              </p>

              <p className="text-sm text-gray-500 mt-4 leading-6 max-w-[240px]">
                Si quieres conocer nuestra web principal puedes visitar{' '}
                <a
                  href="https://lokeyokeria.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-700 underline underline-offset-4 hover:text-sky-600 transition"
                >
                  Lokeyokeria.es
                </a>.
              </p>
            </div>

            <div className="max-w-xl">
              <a
                href="/blog"
                className="inline-block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition"
              >
                Volver al blog
              </a>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-4">
                  Pago por Bizum
                </p>

                <div className="space-y-4 text-[15px] leading-8 text-gray-500">
                  <p>
                    Realiza tu pedido cómodamente desde la web. Cuando tengas tu perfume en el carrito,
                    confirma la compra dando al botón <strong className="text-gray-800">“Pagar con Bizum”</strong>.
                  </p>

                  <p>
                    Al hacerlo se abrirá nuestro WhatsApp. Envía tu consulta y nos pondremos
                    en contacto contigo para confirmar el pedido. Te facilitaremos el pago por Bizum de forma
                    rápida y segura.
                  </p>

                  <p>
                    Una vez recibido el pago, tu pedido se prepara y sale en un plazo aproximado de 24 horas.
                  </p>

                  <p>
                    Desde que el paquete es enviado, lo recibirás normalmente en 24/48 horas, siempre que
                    el transporte funcione con normalidad.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-3">
                  Contáctanos
                </p>

                <a
                  href="https://api.whatsapp.com/send?phone=34640834686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[15px] text-gray-600 hover:text-sky-600 transition"
                >
                  WhatsApp: 640 83 46 86
                </a>

                <p className="text-[15px] text-gray-500 mt-2">
                  San Martín de la Vega, Madrid
                </p>
              </div>
            </div>

            <div className="text-xs font-bold text-gray-400 md:text-right">
              © 2026 — San Martín de la Vega, Madrid
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
          onClearCart={clearCart}
        />
      </div>
    );
  }

  if (isBlogPage) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
          onSearchClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <main>
          <BlogPage />
        </main>

        <footer className="bg-white py-16 px-4 border-t border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-10 items-start">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter font-syne">
                Huele Que Flipas
              </h3>

              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">
                By Lokeyokeria.es
              </p>

              <p className="text-sm text-gray-500 mt-4 leading-6 max-w-[240px]">
                Si quieres conocer nuestra web principal puedes visitar{' '}
                <a
                  href="https://lokeyokeria.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-700 underline underline-offset-4 hover:text-sky-600 transition"
                >
                  Lokeyokeria.es
                </a>.
              </p>
            </div>

            <div className="max-w-xl">
              <a
                href="/"
                className="inline-block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition"
              >
                Volver al inicio
              </a>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-4">
                  Pago por Bizum
                </p>

                <div className="space-y-4 text-[15px] leading-8 text-gray-500">
                  <p>
                    Realiza tu pedido cómodamente desde la web. Cuando tengas tu perfume en el carrito,
                    confirma la compra dando al botón <strong className="text-gray-800">“Pagar con Bizum”</strong>.
                  </p>

                  <p>
                    Al hacerlo se abrirá nuestro WhatsApp. Envía tu consulta y nos pondremos
                    en contacto contigo para confirmar el pedido. Te facilitaremos el pago por Bizum de forma
                    rápida y segura.
                  </p>

                  <p>
                    Una vez recibido el pago, tu pedido se prepara y sale en un plazo aproximado de 24 horas.
                  </p>

                  <p>
                    Desde que el paquete es enviado, lo recibirás normalmente en 24/48 horas, siempre que
                    el transporte funcione con normalidad.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-3">
                  Contáctanos
                </p>

                <a
                  href="https://api.whatsapp.com/send?phone=34640834686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[15px] text-gray-600 hover:text-sky-600 transition"
                >
                  WhatsApp: 640 83 46 86
                </a>

                <p className="text-[15px] text-gray-500 mt-2">
                  San Martín de la Vega, Madrid
                </p>
              </div>
            </div>

            <div className="text-xs font-bold text-gray-400 md:text-right">
              © 2026 — San Martín de la Vega, Madrid
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
          onClearCart={clearCart}
        />
      </div>
    );
  }

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

        <section className="bg-white py-16 md:py-20 px-4 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl">
              <p className="text-sky-600 text-xs font-black uppercase tracking-[0.22em] mb-4">
                Perfumes de equivalencia premium
              </p>

              <h2 className="text-3xl md:text-5xl font-black tracking-tighter font-syne mb-6 text-gray-900">
                Perfumes que huelen caro sin pagar de más
              </h2>

              <div className="space-y-5 text-gray-600 text-base md:text-lg leading-8">
                <p>
                  En <strong className="text-gray-900">Huele Que Flipas</strong> trabajamos con
                  perfumes de equivalencia premium pensados para quienes quieren oler increíble sin
                  pagar el precio de un perfume de lujo. Aquí puedes encontrar aromas inspirados en
                  fragancias famosas, con una calidad muy cuidada, larga duración y un precio mucho
                  más fácil de asumir.
                </p>

                <p>
                  Nuestra colección reúne <strong className="text-gray-900">perfumes para hombre</strong>,
                  <strong className="text-gray-900"> perfumes para mujer</strong> y
                  <strong className="text-gray-900"> perfumes unisex</strong>, además de una selección
                  más especial de <strong className="text-gray-900">perfumes nicho</strong> y
                  <strong className="text-gray-900"> perfumes árabes</strong>. La idea es muy simple:
                  ayudarte a encontrar un aroma que encaje contigo de verdad.
                </p>

                <p>
                  Si te gustan los perfumes frescos, dulces, elegantes, intensos o con más personalidad,
                  aquí tienes opciones para descubrir tu favorito. Y si no sabes por dónde empezar,
                  María te ayuda a elegir el perfume que mejor vaya contigo.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                    Compra con mi ayuda
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
              <div className="mb-4">
                <span className="inline-block text-sky-600 text-xs font-black uppercase tracking-[0.25em]">
                  Colección destacada
                </span>

                <p className="text-[11px] sm:text-xs text-gray-500 font-semibold uppercase tracking-[0.18em] mt-2">
                  Incluye equivalencias, fragancias selectas y colección nicho
                </p>
              </div>

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
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-500">
                {filteredProducts.length} perfumes disponibles ahora mismo
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

                  <p className="text-sm sm:text-base text-gray-500">
                    {equivalenceProducts.length} resultado{equivalenceProducts.length === 1 ? '' : 's'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {equivalenceProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={normalizeProductPrice(product)}
                      onAddToCart={addToCart}
                      onViewProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              </div>
            )}

            {selectaProducts.length > 0 && (
              <div className="mb-20 rounded-[32px] bg-gradient-to-br from-[#f8fbff] via-[#eef6ff] to-[#e8f3ff] px-5 py-8 md:px-10 md:py-12 border border-sky-100 shadow-[0_18px_50px_rgba(59,130,246,0.08)]">
                <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
                  <div className="max-w-4xl">
                    <p className="text-sky-700 text-xs font-black uppercase tracking-[0.22em] mb-2">
                      Fragancias selectas
                    </p>

                    <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight text-slate-900">
                      Selección especial con perfumes premium y árabes destacados
                    </h3>

                    <p className="text-sm md:text-base text-slate-600 mt-3 leading-7">
                      Aromas con un punto más exclusivo, perfiles más especiales y propuestas que destacan por personalidad y estilo.
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-500">
                    {selectaProducts.length} resultado{selectaProducts.length === 1 ? '' : 's'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {selectaProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={normalizeProductPrice(product)}
                      onAddToCart={addToCart}
                      onViewProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              </div>
            )}

            {nicheProducts.length > 0 && (
              <div className="rounded-[32px] bg-gradient-to-br from-[#020817] via-[#031426] to-[#071e36] text-white px-5 py-8 md:px-10 md:py-12 shadow-[0_24px_60px_rgba(2,8,23,0.35)] border border-white/10">
                <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
                  <div className="max-w-4xl">
                    <p className="text-sky-300 text-xs font-black uppercase tracking-[0.22em] mb-2">
                      Colección nicho
                    </p>

                    <h3 className="font-sans text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug text-white">
                      Fragancias especiales para quienes quieren algo más exclusivo
                    </h3>

                    <p className="text-[12px] sm:text-[13px] md:text-sm text-gray-200 mt-3 leading-6 max-w-none">
                      Aromas con personalidad, más selectos y con un punto más premium dentro de <span className="whitespace-nowrap">Huele Que Flipas.</span>
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-gray-300">
                    {nicheProducts.length} resultado{nicheProducts.length === 1 ? '' : 's'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {nicheProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={normalizeProductPrice(product)}
                      onAddToCart={addToCart}
                      onViewProduct={setSelectedProduct}
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
                <p className="text-gray-500 max-w-xl mx-auto text-base">
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

              <div className="flex flex-col justify-center">
                <p className="text-sky-400 text-xs font-black uppercase tracking-[0.22em] mb-3">
                  Fundadora de Lokeyokeria - Huele Que Flipas
                </p>

                <h2 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-black uppercase tracking-tighter font-syne leading-[0.9] mb-5">
                  Soy María,
                  <br />
                  tu guía
                  <br />
                  olfativa.
                </h2>

                <p className="text-[16px] md:text-[17px] text-gray-300 leading-relaxed max-w-2xl">
                  Llevo más de <span className="text-white font-bold">10 años</span> ayudando a encontrar perfumes
                  que encajan de verdad con cada persona. Si no sabes cuál elegir, <span className="text-white font-bold">yo te ayudo</span>.
                  Cuéntame qué aromas te gustan — dulce, fresco, intenso o elegante — y te recomendaré una equivalencia que vaya contigo.
                </p>

                <div className="mt-6">
                  <a
                    href="https://api.whatsapp.com/send?phone=34640834686&text=Hola%20Mar%C3%ADa,%20ay%C3%BAdame%20a%20elegir%20un%20perfume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold uppercase tracking-widest text-sm hover:bg-sky-100 transition"
                  >
                    María sí, ayúdame a elegir
                  </a>
                </div>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <MapPin className="w-4 h-4 text-sky-400 mb-2" />

                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white">
                      San Martín de la Vega
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      Atención cercana y real.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <Star className="w-4 h-4 text-sky-400 mb-2" />

                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white">
                      Calidad 100%
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      Equivalencias muy logradas.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <Award className="w-4 h-4 text-sky-400 mb-2" />

                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white">
                      10 años contigo.
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      Feliz recomendando aromas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#071e36] border-y border-sky-400/10">
          <div className="py-6 md:py-8">
            <div
              className="flex w-max whitespace-nowrap"
              style={{ animation: 'hqfMarquee 100s linear infinite' }}
            >
              <span className="mx-6 text-[36px] md:text-[66px] font-black uppercase tracking-tighter font-syne text-sky-600/50">
                HUELE QUE FLIPAS • HUELE QUE FLIPAS • HUELE QUE FLIPAS • HUELE QUE FLIPAS •
              </span>
              <span className="mx-6 text-[36px] md:text-[66px] font-black uppercase tracking-tighter font-syne text-sky-600/50">
                HUELE QUE FLIPAS • HUELE QUE FLIPAS • HUELE QUE FLIPAS • HUELE QUE FLIPAS •
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-16 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-10 items-start">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter font-syne">
              Huele Que Flipas
            </h3>

            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">
              By Lokeyokeria.es
            </p>

            <p className="text-sm text-gray-500 mt-4 leading-6 max-w-[240px]">
              Si quieres conocer nuestra web principal puedes visitar{' '}
              <a
                href="https://lokeyokeria.es"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-700 underline underline-offset-4 hover:text-sky-600 transition"
              >
                Lokeyokeria.es
              </a>.
            </p>
          </div>

          <div className="max-w-xl">
            <a
              href="#top"
              className="inline-block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition"
            >
              Ir arriba
            </a>

            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-4">
                Pago por Bizum
              </p>

              <div className="space-y-4 text-[15px] leading-8 text-gray-500">
                <p>
                  Realiza tu pedido cómodamente desde la web. Cuando tengas tu perfume en el carrito,
                  confirma la compra dando al botón <strong className="text-gray-800">“Pagar con Bizum”</strong>.
                </p>

                <p>
                  Al hacerlo se abrirá nuestro WhatsApp. Envía tu consulta y nos pondremos
                  en contacto contigo para confirmar el pedido. Te facilitaremos el pago por Bizum de forma
                  rápida y segura.
                </p>

                <p>
                  Una vez recibido el pago, tu pedido se prepara y sale en un plazo aproximado de 24 horas.
                </p>

                <p>
                  Desde que el paquete es enviado, lo recibirás normalmente en 24/48 horas, siempre que
                  el transporte funcione con normalidad.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-3">
                Contáctanos
              </p>

              <a
                href="https://api.whatsapp.com/send?phone=34640834686"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[15px] text-gray-600 hover:text-sky-600 transition"
              >
                WhatsApp: 640 83 46 86
              </a>

              <p className="text-[15px] text-gray-500 mt-2">
                San Martín de la Vega, Madrid
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-gray-400 md:text-right">
            © 2026 — San Martín de la Vega, Madrid
            <br />
            Hecho con ❤️ para ti.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes hqfMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition"
              aria-label="Cerrar detalle de producto"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="bg-gray-50">
                <img
                  src={PRODUCT_MODAL_IMAGE}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover min-h-[320px]"
                />
              </div>

              <div className="p-6 md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 mb-3">
                  {getModalLabel(selectedProduct)}
                </p>

                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-3">
                  {selectedProduct.name}
                </h3>

                <p className="text-[15px] text-gray-500 mb-2">
                  Inspirada en <span className="font-semibold text-gray-700">{selectedProduct.brand}</span>
                </p>

                <p className="text-[15px] text-gray-500 mb-2">
                  Familia olfativa: <span className="font-semibold text-gray-700">{selectedProduct.family}</span>
                </p>

                <p className="text-[15px] text-gray-500 mb-5">
                  Tamaño: <span className="font-semibold text-gray-700">{selectedProduct.size}</span>
                </p>

                <p className="text-base text-gray-600 leading-7 mb-6">
                  {selectedProduct.description}
                </p>

                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-2xl font-black text-gray-900">
                    {getDisplayPrice(selectedProduct).toFixed(2)}€
                  </span>

                  <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-widest text-gray-600">
                    #{selectedProduct.number}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3 rounded-full bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-sky-600 transition"
                >
                  Añadir al carrito
                </button>
              </div>
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
        onClearCart={clearCart}
      />
    </div>
  );
};

export default App;
