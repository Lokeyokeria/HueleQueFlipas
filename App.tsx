import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { PERFUMES } from './data';
import type { Product, CartItem } from './types';
import {
  Award,
  Gift,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import mariaPhoto from './maria-photo.jpg';
import fallbackImage from './equivalencia-hqf.jpg';

type View =
  | 'home'
  | 'hombre'
  | 'mujer'
  | 'unisex'
  | 'arabes'
  | 'nicho'
  | 'top-duracion'
  | 'maria'
  | 'blog';

const CART_STORAGE_KEY = 'hqf-cart';

const linkClasses =
  'font-bold text-sky-600 underline underline-offset-4 hover:text-sky-700 transition';

const getDisplayPrice = (product: Product | CartItem) => {
  if (product.line === 'nicho') return 25;
  return product.price;
};

const normalizeProduct = (product: Product): Product => ({
  ...product,
  price: getDisplayPrice(product),
});

const getLineLabel = (line: Product['line']) => {
  switch (line) {
    case 'nicho':
      return 'Nicho';
    case 'arabe':
      return 'Árabe';
    case 'selecta':
      return 'Selecta';
    default:
      return 'Equivalencia';
  }
};

const getViewFromPath = (pathname: string): View => {
  const clean = pathname.replace(/\/+$/, '') || '/';

 const getViewFromPath = (pathname: string): View => {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/hombre' || clean === '/perfumes-hombre') return 'hombre';
  if (clean === '/mujer' || clean === '/perfumes-mujer') return 'mujer';
  if (clean === '/unisex' || clean === '/perfumes-unisex') return 'unisex';
  if (clean === '/arabes' || clean === '/perfumes-arabes') return 'arabes';
  if (clean === '/nicho' || clean === '/perfumes-nicho') return 'nicho';

  if (clean === '/top-duracion' || clean === '/perfumes-que-mas-duran') {
    return 'maria';
  }

  if (clean === '/maria') return 'maria';
  if (clean === '/blog') return 'blog';

  return 'home';
};

const matchesSearch = (product: Product, query: string) => {
  const haystack = [
    product.name,
    product.brand,
    product.number,
    product.family,
    product.description,
    ...(product.keywords ?? []),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query.toLowerCase().trim());
};

const Footer = ({
  blogBack = false,
  onNavigate,
}: {
  blogBack?: boolean;
  onNavigate: (path: string) => void;
}) => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#020817] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-300">
              Huele Que Flipas
            </p>

            <h3 className="mt-3 text-3xl font-black uppercase tracking-tight text-white">
              Perfumes de equivalencia premium
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Fragancias que huelen a lujo sin pagar de más. Calidad top, larga
              duración, envío 24/48h y atención cercana desde San Martín de la
              Vega, Madrid.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-sky-200">
                Envío 24/48h
              </span>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-sky-200">
                Fabricado en España
              </span>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-sky-200">
                Equivalencias muy logradas
              </span>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onNavigate(blogBack ? '/blog' : '/')}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition hover:bg-sky-100"
              >
                {blogBack ? 'Volver al blog' : 'Volver al inicio'}
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-300">
              Pago por Bizum
            </p>

            <h4 className="mt-3 text-xl font-black text-white">
              Compra fácil y rápida
            </h4>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Añade tu perfume al carrito y pulsa el botón de compra. Al hacerlo
              se abrirá WhatsApp para confirmar tu pedido de forma sencilla y
              segura.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Una vez recibido el pago, preparamos tu pedido y normalmente sale
              en unas 24 horas. Después, lo habitual es recibirlo en 24/48h.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-300">
              Contacto
            </p>

            <h4 className="mt-3 text-xl font-black text-white">
              Estamos para ayudarte
            </h4>

            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <p>
                WhatsApp:{' '}
                <a
                  href="https://api.whatsapp.com/send?phone=34640834686"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClasses}
                >
                  640 83 46 86
                </a>
              </p>

              <p>San Martín de la Vega, Madrid</p>

              <p className="leading-7">
                ¿No sabes cuál elegir? Escríbenos y te ayudamos a encontrar el
                perfume que mejor encaja contigo.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Huele Que Flipas — San Martín de la Vega, Madrid</p>
          <p>Hecho con ❤️ para que huelas increíble.</p>
        </div>
      </div>
    </footer>
  );
};

const SectionHeader = ({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) => (
  <div className="max-w-3xl">
    <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-600">
      {eyebrow}
    </p>
    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-slate-600">{text}</p>
  </div>
);

const App = () => {
  const [view, setView] = useState<View>(() =>
    getViewFromPath(window.location.pathname)
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const products = useMemo(() => PERFUMES.map(normalizeProduct), []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const onPopState = () => {
      setView(getViewFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProduct(null);
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedProduct]);

  const goTo = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setView(getViewFromPath(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = useCallback(() => {
    window.open(
      'https://api.whatsapp.com/send?phone=34640834686&text=Hola%20Mar%C3%ADa,%20quiero%20que%20me%20ayudes%20a%20elegir%20perfume',
      '_blank',
      'noreferrer'
    );
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, price: getDisplayPrice(product), quantity: 1 }];
    });

    setCartOpen(true);
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalCartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const searchResults = useMemo(() => {
    const q = search.trim();
    if (!q) return [];
    return products.filter((product) => matchesSearch(product, q));
  }, [products, search]);

  const womenProducts = useMemo(
    () => products.filter((product) => product.category === 'MUJER'),
    [products]
  );

  const menProducts = useMemo(
    () => products.filter((product) => product.category === 'HOMBRE'),
    [products]
  );

  const unisexProducts = useMemo(
    () => products.filter((product) => product.category === 'UNISEX'),
    [products]
  );

  const nicheProducts = useMemo(
    () => products.filter((product) => product.line === 'nicho'),
    [products]
  );

  const arabicProducts = useMemo(
    () => products.filter((product) => product.line === 'arabe'),
    [products]
  );

  const selectedList = useMemo(() => {
    switch (view) {
      case 'mujer':
        return womenProducts;
      case 'hombre':
        return menProducts;
      case 'unisex':
        return unisexProducts;
      case 'nicho':
        return nicheProducts;
      case 'arabes':
        return arabicProducts;
      default:
        return products;
    }
  }, [
    view,
    womenProducts,
    menProducts,
    unisexProducts,
    nicheProducts,
    arabicProducts,
    products,
  ]);

  const visibleProducts = useMemo(() => {
    const q = search.trim();
    if (!q) return selectedList;
    return selectedList.filter((product) => matchesSearch(product, q));
  }, [selectedList, search]);

  const renderGrid = (items: Product[]) => {
    if (items.length === 0) {
      return (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-black text-slate-900">
            Ahora mismo esta selección está vaciándose y rellenándose.
          </p>
          <p className="mt-3 text-slate-600">
            Escríbenos por WhatsApp y María te recomienda una opción muy lograda
            según tu estilo.
          </p>
          <button
            type="button"
            onClick={openWhatsApp}
            className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-sky-700"
          >
            Hablar con María
          </button>
        </div>
      );
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onViewProduct={setSelectedProduct}
          />
        ))}
      </div>
    );
  };

  const homeBlocks = (
    <>
      <Hero />

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-sky-100 bg-gradient-to-br from-white via-sky-50 to-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-600">
                Encuentra tu perfume
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Busca por nombre, código, marca o familia olfativa
              </h2>
              <p className="mt-4 text-slate-600">
                Rápido, limpio y pensado para encontrar ese aroma que te encaja
                de verdad.
              </p>
            </div>

            <div className="w-full max-w-xl">
              <label
                htmlFor="buscador-principal"
                className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-slate-500"
              >
                Buscador
              </label>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  id="buscador-principal"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ejemplo: Baccarat, N35, vainilla, árabe..."
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {search.trim() && (
            <div className="mt-8">
              <p className="mb-4 text-sm font-bold text-slate-500">
                {searchResults.length} resultado{searchResults.length === 1 ? '' : 's'} para “{search}”
              </p>
              {renderGrid(searchResults.slice(0, 9))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <Sparkles className="h-6 w-6 text-sky-600" />
            <h3 className="mt-4 text-xl font-black text-slate-900">
              Huelen muy, muy bien
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Equivalencias muy logradas para oler a perfume caro pagando mucho
              menos.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <Truck className="h-6 w-6 text-sky-600" />
            <h3 className="mt-4 text-xl font-black text-slate-900">
              Envío 24/48h
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Pedido rápido, envío barato y una experiencia mucho más fácil.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <Gift className="h-6 w-6 text-sky-600" />
            <h3 className="mt-4 text-xl font-black text-slate-900">
              Regalo de muestras
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              En muchos pedidos van detalles extra para que pruebes más aromas.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="h-6 w-6 text-sky-600" />
            <h3 className="mt-4 text-xl font-black text-slate-900">
              Más de 10 años
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Experiencia real ayudando a elegir perfumes que encajan de verdad.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Mujer"
          title="Perfumes de equivalencia para mujer"
          text="Aromas femeninos con personalidad, elegancia y ese efecto de 'qué bien hueles' que engancha."
        />
        <div className="mt-8">{renderGrid(womenProducts.slice(0, 6))}</div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Hombre"
          title="Perfumes de equivalencia para hombre"
          text="Fragancias con presencia, carácter y salida limpia para diario, noche o plan importante."
        />
        <div className="mt-8">{renderGrid(menProducts.slice(0, 6))}</div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Unisex"
          title="Perfumes unisex que no pasan desapercibidos"
          text="Opciones modernas, versátiles y adictivas para quienes no quieren oler como todo el mundo."
        />
        <div className="mt-8">{renderGrid(unisexProducts.slice(0, 6))}</div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] bg-[#020817] p-8 text-white shadow-[0_24px_60px_rgba(2,8,23,0.35)]">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-300">
              Colección nicho
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Perfumes nicho inspirados en bestias del perfume
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Para quien quiere subir nivel y llevar algo con más huella,
              personalidad y efecto wow.
            </p>
            <button
              type="button"
              onClick={() => goTo('/nicho')}
              className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition hover:bg-sky-100"
            >
              Ver nicho
            </button>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-600">
              Colección árabe
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
              Perfumes árabes con presencia y rollazo
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Intensidad, carácter y una vibra más envolvente para quien quiere
              dejar recuerdo.
            </p>
            <button
              type="button"
              onClick={() => goTo('/arabes')}
              className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-sky-700"
            >
              Ver árabes
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 shadow-sm">
          <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-600">
                María te ayuda
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                ¿No sabes cuál elegir? Te lo ponemos fácil
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Cuéntale a María cómo te gusta oler y te recomienda perfumes que
                vayan contigo, sin marearte y sin hacerte perder tiempo.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-sky-700"
                >
                  Escribir a María
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/maria')}
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition hover:border-sky-300 hover:text-sky-700"
                >
                  Ver ayuda personalizada
                </button>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/60 bg-white/80 p-4 backdrop-blur">
              <img
                src={mariaPhoto}
                alt="María, experta perfumera de Huele Que Flipas"
                className="h-[420px] w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const listingPageMap: Record<
    Exclude<View, 'home' | 'maria' | 'blog' | 'top-duracion'>,
    { eyebrow: string; title: string; text: string }
  > = {
    mujer: {
      eyebrow: 'Mujer',
      title: 'Perfumes de equivalencia para mujer',
      text: 'Fragancias femeninas, modernas, elegantes y muy disfrutables para diario o para momentos especiales.',
    },
    hombre: {
      eyebrow: 'Hombre',
      title: 'Perfumes de equivalencia para hombre',
      text: 'Aromas masculinos con presencia, frescura o intensidad, según tu estilo y tu momento.',
    },
    unisex: {
      eyebrow: 'Unisex',
      title: 'Perfumes unisex',
      text: 'Perfumes versátiles y con personalidad para quienes prefieren salirse de lo típico.',
    },
    arabes: {
      eyebrow: 'Árabes',
      title: 'Perfumes árabes de equivalencia',
      text: 'Fragancias con carácter, fondo más envolvente y una firma olfativa que suele dejar huella.',
    },
    nicho: {
      eyebrow: 'Nicho',
      title: 'Perfumes nicho de equivalencia',
      text: 'Una selección para quienes buscan sensaciones más especiales y perfumes con más personalidad.',
    },
  };

  const listingPage =
    view === 'mujer' ||
    view === 'hombre' ||
    view === 'unisex' ||
    view === 'arabes' ||
    view === 'nicho';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar
  onCartClick={() => setCartOpen(true)}
  cartCount={totalCartCount}
  onSearchClick={() => {
    const target =
      document.getElementById('buscador-principal') ||
      document.getElementById('buscador-categoria');

    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const input = target as HTMLInputElement | null;
      input?.focus?.();
    }, 250);
  }}
  onNavigate={goTo}
  currentPath={window.location.pathname}
/>

      <main className="pb-12">
        {view === 'home' && homeBlocks}

        {listingPage && (
          <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={listingPageMap[view].eyebrow}
              title={listingPageMap[view].title}
              text={listingPageMap[view].text}
            />

            <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <label
                htmlFor="buscador-categoria"
                className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-slate-500"
              >
                Buscar dentro de esta sección
              </label>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 px-5 py-4">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  id="buscador-categoria"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Busca por nombre, código, marca o familia olfativa"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="mt-8">{renderGrid(visibleProducts)}</div>
          </section>
        )}

        {view === 'top-duracion' && (
          <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Top duración"
              title="Estamos afinando esta selección"
              text="Para no inventar ni prometer lo que no toca, esta página se está reorganizando. Mientras tanto, María te puede recomendar opciones con muy buena presencia según lo que te guste."
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <Award className="mt-1 h-6 w-6 text-sky-600" />
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Mejor hacerlo bien que inventarlo
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      Aquí vamos a dejar una selección top cuando la tengas
                      cerrada con criterio real. De momento, lo más útil es que
                      nos digas si buscas algo limpio, intenso, dulce, elegante
                      o de noche.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={openWhatsApp}
                        className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-sky-700"
                      >
                        Pedir recomendación
                      </button>

                      <button
                        type="button"
                        onClick={() => goTo('/nicho')}
                        className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition hover:border-sky-300 hover:text-sky-700"
                      >
                        Ver perfumes nicho
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] bg-[#020817] p-8 text-white shadow-[0_24px_60px_rgba(2,8,23,0.35)]">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-300">
                  Consejo rápido
                </p>
                <h3 className="mt-3 text-2xl font-black">
                  Si quieres durar más, cuéntanos esto
                </h3>
                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                  <p>• Si te van más los perfumes limpios o intensos.</p>
                  <p>• Si lo quieres para diario, noche o eventos.</p>
                  <p>• Si prefieres algo dulce, fresco, sexy o elegante.</p>
                  <p>• Qué perfume te gusta ahora mismo.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'maria' && (
          <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="rounded-[36px] border border-slate-200 bg-white p-4 shadow-sm">
                <img
                  src={mariaPhoto}
                  alt="María, experta perfumera"
                  className="h-[520px] w-full rounded-[28px] object-cover"
                />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-600">
                  María, experta perfumera
                </p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                  Te ayudo a encontrar un perfume que vaya contigo
                </h1>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Si estás entre varios perfumes, no sabes por dónde empezar o
                  quieres acertar sin perder tiempo, escríbeme. Te recomiendo
                  opciones según tu estilo, tus gustos y el tipo de aroma que te
                  hace sentir tú.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                    <MessageCircle className="h-5 w-5 text-sky-600" />
                    <h3 className="mt-3 text-lg font-black text-slate-900">
                      Atención cercana
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Respuesta directa, sin robots y con consejo real.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                    <MapPin className="h-5 w-5 text-sky-600" />
                    <h3 className="mt-3 text-lg font-black text-slate-900">
                      Desde Madrid
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Atención desde San Martín de la Vega, con mimo y rapidez.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="inline-flex items-center rounded-full bg-slate-900 px-7 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-sky-700"
                  >
                    Hablar ahora con María
                  </button>

                  <button
                    type="button"
                    onClick={() => goTo('/')}
                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition hover:border-sky-300 hover:text-sky-700"
                  >
                    Volver a inicio
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'blog' && (
          <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Blog"
              title="Blog de perfumes Huele Que Flipas"
              text="Estamos dejando esta parte más fina para que quede potente a nivel SEO y útil de verdad para quien busca perfume."
            />

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-600">
                  Próximamente
                </p>
                <h3 className="mt-3 text-2xl font-black text-slate-900">
                  Qué perfume se parece a Baccarat Rouge 540
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Una guía clara para quien busca ese efecto adictivo, elegante
                  y con aura de perfume caro.
                </p>
              </article>

              <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-600">
                  Próximamente
                </p>
                <h3 className="mt-3 text-2xl font-black text-slate-900">
                  Perfumes árabes que merecen la pena
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Para entender cuáles merecen atención y cuál puede ir mejor
                  contigo.
                </p>
              </article>

              <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-600">
                  Próximamente
                </p>
                <h3 className="mt-3 text-2xl font-black text-slate-900">
                  Perfumes que duran más
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Sin postureo y sin humo: cómo elegir mejor según lo que buscas
                  de verdad.
                </p>
              </article>
            </div>
          </section>
        )}
      </main>

      <Footer blogBack={view === 'blog'} onNavigate={goTo} />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {selectedProduct && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
              aria-label="Cerrar detalle de producto"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
                <img
                  src={selectedProduct.image || fallbackImage}
                  alt={`${selectedProduct.name} inspirado en ${selectedProduct.brand}`}
                  className="h-full min-h-[320px] w-full object-cover"
                />
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-sky-700">
                    #{selectedProduct.number}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">
                    {selectedProduct.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">
                    {getLineLabel(selectedProduct.line)}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                  {selectedProduct.name}
                </h2>

                <p className="mt-2 text-lg font-semibold text-slate-500">
                  Inspirado en {selectedProduct.brand}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
                      Familia olfativa
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {selectedProduct.family}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
                      Formato
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {selectedProduct.size}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
                    Cómo se siente
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {selectedProduct.description ||
                      'Un perfume muy logrado, pensado para quienes quieren oler increíble sin pagar de más.'}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
                      Precio
                    </p>
                    <p className="mt-1 text-3xl font-black text-slate-900">
                      {selectedProduct.price.toFixed(2)}€
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="inline-flex items-center rounded-full bg-slate-900 px-7 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-sky-700"
                    >
                      Añadir a la cesta
                    </button>

                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="inline-flex items-center rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition hover:border-sky-300 hover:text-sky-700"
                    >
                      Consultar por WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
