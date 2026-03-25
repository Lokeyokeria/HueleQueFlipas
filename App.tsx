import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import BlogPage from './components/BlogPage';
import BlogPostBaccaratRouge from './components/BlogPostBaccaratRouge';
import BlogPostPerfumesArabes from './components/BlogPostPerfumesArabes';
import BlogPostPerfumesDuraderos from './components/BlogPostPerfumesDuraderos';
import { PERFUMES } from './data';
import { Product, CartItem } from './types';
import { Star, MapPin, Award, Truck, ShieldCheck, Gift, X } from 'lucide-react';
import mariaPhoto from './maria-photo.jpg';

type CategoryFilter = 'TODOS' | 'MUJER' | 'HOMBRE' | 'UNISEX';

const getDisplayPrice = (product: Product | CartItem) => {
  if (product.line === 'nicho') return 25.0;
  return product.price;
};

const PRODUCT_MODAL_IMAGE =
  'https://raw.githubusercontent.com/Lokeyokeria/HueleQueFlipas/main/equivalencia-hqf.jpg';

const CART_STORAGE_KEY = 'hqf-cart';

type SeoPageConfig = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  sectionLabel: string;
  sectionTitle: string;
  emptyTitle: string;
  emptyText: string;
};

const linkClasses =
  'font-bold text-sky-600 underline underline-offset-4 hover:text-sky-700 transition';

const Footer: React.FC<{ blogBack?: boolean }> = ({ blogBack = false }) => {
  return (
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
            </a>
            .
          </p>
        </div>

        <div className="max-w-xl">
          <a
            href={blogBack ? '/blog' : '/'}
            className="inline-block font-black uppercase text-xs tracking-widest text-gray-700 hover:text-sky-600 transition"
          >
            {blogBack ? 'Volver al blog' : 'Volver al inicio'}
          </a>

          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-900 mb-4">
              Pago por Bizum
            </p>

            <div className="space-y-4 text-[15px] leading-8 text-gray-500">
              <p>
                Realiza tu pedido cómodamente desde la web. Cuando tengas tu perfume en el carrito,
                confirma la compra dando al botón{' '}
                <strong className="text-gray-800">“Pagar con Bizum”</strong>.
              </p>

              <p>
                Al hacerlo se abrirá nuestro WhatsApp. Envía tu consulta y nos pondremos en
                contacto contigo para confirmar el pedido. Te facilitaremos el pago por Bizum de
                forma rápida y segura.
              </p>

              <p>
                Una vez recibido el pago, tu pedido se prepara y sale en un plazo aproximado de 24
                horas.
              </p>

              <p>
                Desde que el paquete es enviado, lo recibirás normalmente en 24/48 horas, siempre
                que el transporte funcione con normalidad.
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

            <p className="text-[15px] text-gray-500 mt-2">San Martín de la Vega, Madrid</p>
          </div>
        </div>

        <div className="text-xs font-bold text-gray-400 md:text-right">
          © 2026 — San Martín de la Vega, Madrid
          <br />
          Hecho con ❤️ para ti.
        </div>
      </div>
    </footer>
  );
};

type HomeCollectionSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  href: string;
  buttonLabel: string;
  dark?: boolean;
  softBlue?: boolean;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
};

const HomeCollectionSection: React.FC<HomeCollectionSectionProps> = ({
  id,
  eyebrow,
  title,
  description,
  products,
  href,
  buttonLabel,
  dark = false,
  softBlue = false,
  onAddToCart,
  onViewProduct,
}) => {
  if (products.length === 0) return null;

  const sectionClasses = dark
    ? 'rounded-[32px] bg-gradient-to-br from-[#020817] via-[#031426] to-[#071e36] text-white px-5 py-8 md:px-10 md:py-12 shadow-[0_24px_60px_rgba(2,8,23,0.35)] border border-white/10'
    : softBlue
      ? 'rounded-[32px] bg-gradient-to-br from-[#f8fbff] via-[#eef6ff] to-[#e8f3ff] px-5 py-8 md:px-10 md:py-12 border border-sky-100 shadow-[0_18px_50px_rgba(59,130,246,0.08)]'
      : 'rounded-[32px] bg-white px-5 py-8 md:px-10 md:py-12 border border-gray-100 shadow-sm';

  const eyebrowClasses = dark
    ? 'text-sky-300'
    : softBlue
      ? 'text-sky-700'
      : 'text-sky-600';

  const titleClasses = dark ? 'text-white' : 'text-gray-900';

  const descriptionClasses = dark ? 'text-gray-200' : 'text-gray-600';

  const countClasses = dark ? 'text-gray-300' : 'text-gray-500';

  const buttonClasses = dark
    ? 'inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-900 font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-sky-100 transition'
    : 'inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-sky-600 transition';

  return (
    <section id={id} className="mb-10 md:mb-14">
      <div className={sectionClasses}>
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div className="max-w-4xl">
            <p className={`${eyebrowClasses} text-xs font-black uppercase tracking-[0.22em] mb-2`}>
              {eyebrow}
            </p>

            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight ${titleClasses}`}
            >
              {title}
            </h2>

            <p className={`text-sm md:text-base mt-3 leading-7 max-w-3xl ${descriptionClasses}`}>
              {description}
            </p>
          </div>

          <p className={`text-sm sm:text-base ${countClasses}`}>
            {products.length} resultado{products.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href={href} className={buttonClasses}>
            {buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('TODOS');
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

  useEffect(() => {
    const scrollToHashSection = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const target = document.getElementById(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

    scrollToHashSection();
    window.addEventListener('hashchange', scrollToHashSection);

    return () => {
      window.removeEventListener('hashchange', scrollToHashSection);
    };
  }, []);

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
          i.id === productWithCorrectPrice.id ? { ...i, quantity: i.quantity + 1 } : i
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

  const equivalenceProducts = useMemo(() => {
    return PERFUMES.filter(product => product.line === 'normal').map(normalizeProductPrice);
  }, [normalizeProductPrice]);

  const selectaProducts = useMemo(() => {
    return PERFUMES.filter(product => product.line === 'selecta' || product.line === 'arabe').map(
      normalizeProductPrice
    );
  }, [normalizeProductPrice]);

  const nicheProducts = useMemo(() => {
    return PERFUMES.filter(product => product.line === 'nicho').map(normalizeProductPrice);
  }, [normalizeProductPrice]);

  const hombreProducts = useMemo(() => {
    return PERFUMES.filter(product => product.category === 'HOMBRE').map(normalizeProductPrice);
  }, [normalizeProductPrice]);

  const mujerProducts = useMemo(() => {
    return PERFUMES.filter(product => product.category === 'MUJER').map(normalizeProductPrice);
  }, [normalizeProductPrice]);

  const unisexProducts = useMemo(() => {
    return PERFUMES.filter(product => product.category === 'UNISEX').map(normalizeProductPrice);
  }, [normalizeProductPrice]);

  const arabesProducts = useMemo(() => {
    return PERFUMES.filter(product => product.line === 'arabe').map(normalizeProductPrice);
  }, [normalizeProductPrice]);

  const nichoProducts = useMemo(() => {
    return PERFUMES.filter(product => product.line === 'nicho').map(normalizeProductPrice);
  }, [normalizeProductPrice]);

  const homeHombreProducts = useMemo(() => hombreProducts.slice(0, 4), [hombreProducts]);
  const homeMujerProducts = useMemo(() => mujerProducts.slice(0, 4), [mujerProducts]);
  const homeUnisexProducts = useMemo(() => unisexProducts.slice(0, 4), [unisexProducts]);
  const homeArabesProducts = useMemo(() => arabesProducts.slice(0, 4), [arabesProducts]);
  const homeNichoProducts = useMemo(() => nichoProducts.slice(0, 4), [nichoProducts]);

  const duraderosProducts = useMemo(() => {
    const preferredNumbers = ['8015', '8016', '8017', '7000', '7006', '015', '147', '234'];

    const preferred = preferredNumbers
      .map(number => PERFUMES.find(product => product.number === number))
      .filter(Boolean) as Product[];

    const uniquePreferred = preferred.filter(
      (product, index, self) => self.findIndex(item => item.id === product.id) === index
    );

    const fallback = PERFUMES.filter(product => {
      const family = product.family.toLowerCase();

      return (
        product.line === 'arabe' ||
        product.line === 'nicho' ||
        family.includes('oriental') ||
        family.includes('ámbar') ||
        family.includes('amaderad')
      );
    }).filter(product => !uniquePreferred.some(item => item.id === product.id));

    return [...uniquePreferred, ...fallback].slice(0, 4).map(normalizeProductPrice);
  }, [normalizeProductPrice]);

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

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

  const isBlogPage =
    currentPath === '/blog' || currentHash === '#/blog' || currentHash === '#blog';

  const isBaccaratRougePost =
    currentPath === '/blog/equivalencia-baccarat-rouge' ||
    currentHash === '#/blog/equivalencia-baccarat-rouge';

  const isPerfumesArabesPost =
    currentPath === '/blog/perfumes-arabes-que-huelen-caro' ||
    currentHash === '#/blog/perfumes-arabes-que-huelen-caro';

  const isPerfumesDuraderosPost =
    currentPath === '/blog/perfumes-que-mas-duran' ||
    currentHash === '#/blog/perfumes-que-mas-duran';

  const isPerfumesHombrePage =
    currentPath === '/perfumes-hombre' || currentHash === '#/perfumes-hombre';

  const isPerfumesMujerPage =
    currentPath === '/perfumes-mujer' || currentHash === '#/perfumes-mujer';

  const isPerfumesUnisexPage =
    currentPath === '/perfumes-unisex' || currentHash === '#/perfumes-unisex';

  const isPerfumesArabesPage =
    currentPath === '/perfumes-arabes' || currentHash === '#/perfumes-arabes';

  const isPerfumesNichoPage =
    currentPath === '/perfumes-nicho' || currentHash === '#/perfumes-nicho';

  const isPerfumesDuraderosPage =
    currentPath === '/perfumes-que-mas-duran' || currentHash === '#/perfumes-que-mas-duran';

  const renderSeoCategoryPage = (
    config: SeoPageConfig,
    products: Product[],
    showProducts: boolean = true
  ) => {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
          onSearchClick={() => {
            window.location.href = '/#productos';
          }}
        />

        <main>
          <section className="bg-white min-h-screen pt-32 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mb-14">
                <p className="text-sky-600 text-xs font-black uppercase tracking-[0.22em] mb-4">
                  {config.eyebrow}
                </p>

                <h1 className="text-4xl md:text-6xl font-black tracking-tighter font-syne text-gray-900 mb-6">
                  {config.title}
                </h1>

                <div className="max-w-3xl space-y-5 text-gray-600 text-base md:text-lg leading-8">
                  {config.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sky-600 text-xs font-black uppercase tracking-[0.22em] mb-2">
                    {config.sectionLabel}
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
                    {config.sectionTitle}
                  </h2>
                </div>

                {showProducts && (
                  <p className="text-sm sm:text-base text-gray-500">
                    {products.length} resultado{products.length === 1 ? '' : 's'}
                  </p>
                )}
              </div>

              {showProducts ? (
                products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        onViewProduct={setSelectedProduct}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 border border-dashed border-gray-200 rounded-3xl">
                    <h3 className="text-2xl font-black mb-3 text-gray-900">
                      {config.emptyTitle}
                    </h3>

                    <p className="text-gray-500 max-w-xl mx-auto text-base">{config.emptyText}</p>
                  </div>
                )
              ) : null}
            </div>
          </section>
        </main>

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

  if (isPerfumesHombrePage) {
    return renderSeoCategoryPage(
      {
        eyebrow: 'Perfumes de equivalencia hombre',
        title: 'Perfumes de equivalencia para hombre que huelen caro',
        paragraphs: [
          'Descubre perfumes de equivalencia para hombre con aroma elegante, intenso y duradero. Fragancias que transmiten seguridad, presencia y estilo sin pagar el precio de un perfume de lujo.',
          'En Huele Que Flipas seleccionamos equivalencias muy logradas, fabricadas en España, con larga duración, envío 24/48h y precio accesible para que oler bien no sea un capricho imposible.',
          'Aquí encontrarás perfumes masculinos frescos, amaderados, dulces, potentes y versátiles para el día a día o para momentos más especiales.',
        ],
        sectionLabel: 'Colección hombre',
        sectionTitle: 'Perfumes para hombre disponibles',
        emptyTitle: 'Ahora mismo no hay perfumes de hombre disponibles',
        emptyText: 'En cuanto subamos más referencias, aparecerán aquí.',
      },
      hombreProducts
    );
  }

  if (isPerfumesMujerPage) {
    return renderSeoCategoryPage(
      {
        eyebrow: 'Perfumes de equivalencia mujer',
        title: 'Perfumes de equivalencia para mujer que huelen caro',
        paragraphs: [
          'Descubre perfumes de equivalencia para mujer con aroma elegante, femenino y adictivo. Fragancias que dejan huella, elevan tu presencia y te hacen sentir increíble sin pagar de más.',
          'En Huele Que Flipas reunimos equivalencias premium fabricadas en España, con larga duración, precio accesible, envío 24/48h y una selección pensada para quienes quieren calidad top sin complicarse.',
          'Aquí encontrarás perfumes dulces, florales, frescos, intensos y sofisticados para cada momento: diario, salida especial o ese día en el que quieres oler brutal.',
        ],
        sectionLabel: 'Colección mujer',
        sectionTitle: 'Perfumes para mujer disponibles',
        emptyTitle: 'Ahora mismo no hay perfumes de mujer disponibles',
        emptyText: 'En cuanto subamos más referencias, aparecerán aquí.',
      },
      mujerProducts
    );
  }

  if (isPerfumesUnisexPage) {
    return renderSeoCategoryPage(
      {
        eyebrow: 'Perfumes de equivalencia unisex',
        title: 'Perfumes de equivalencia unisex que huelen diferente y enganchan',
        paragraphs: [
          'Los perfumes unisex son perfectos para quienes no quieren encasillarse en lo típico. Son aromas versátiles, modernos y con personalidad, pensados para disfrutar del perfume sin etiquetas.',
          'En Huele Que Flipas reunimos perfumes unisex con calidad top, larga duración y precio accesible para que encuentres fragancias elegantes, limpias, intensas o adictivas que encajen contigo.',
          'Aquí descubrirás perfumes unisex equilibrados, originales y muy fáciles de llevar tanto a diario como en momentos especiales.',
        ],
        sectionLabel: 'Colección unisex',
        sectionTitle: 'Perfumes unisex disponibles',
        emptyTitle: 'Ahora mismo no hay perfumes unisex disponibles',
        emptyText: 'En cuanto subamos más referencias, aparecerán aquí.',
      },
      unisexProducts
    );
  }

  if (isPerfumesArabesPage) {
    return renderSeoCategoryPage(
      {
        eyebrow: 'Perfumes árabes de equivalencia',
        title: 'Perfumes árabes que huelen caro y duran muchísimo',
        paragraphs: [
          'Los perfumes árabes tienen ese punto intenso, adictivo y con personalidad que no pasa desapercibido. Son aromas con presencia, ideales para quienes quieren oler diferente y dejar huella.',
          'En Huele Que Flipas seleccionamos perfumes árabes con calidad top, muy logrados y con una sensación más envolvente para quienes buscan algo especial sin pagar una fortuna.',
          'Aquí encontrarás fragancias árabes potentes, elegantes y con un estilo más exclusivo para salir de lo típico y apostar por aromas con carácter.',
        ],
        sectionLabel: 'Colección árabe',
        sectionTitle: 'Perfumes árabes disponibles',
        emptyTitle: 'Ahora mismo no hay perfumes árabes disponibles',
        emptyText: 'En cuanto subamos más referencias, aparecerán aquí.',
      },
      arabesProducts
    );
  }

  if (isPerfumesNichoPage) {
    return renderSeoCategoryPage(
      {
        eyebrow: 'Perfumes nicho de equivalencia',
        title: 'Perfumes nicho de equivalencia con personalidad propia',
        paragraphs: [
          'Los perfumes nicho no están hechos para pasar desapercibidos. Son aromas con identidad, carácter y una sensación más exclusiva para quienes quieren oler diferente de verdad.',
          'En Huele Que Flipas reunimos una selección nicho más especial, pensada para quien busca perfumes originales, con presencia y un punto más premium sin entrar en precios imposibles.',
          'Aquí encontrarás fragancias más selectas, menos vistas y con un estilo único para salir de lo de siempre y llevar un aroma con más personalidad.',
        ],
        sectionLabel: 'Colección nicho',
        sectionTitle: 'Perfumes nicho disponibles',
        emptyTitle: 'Ahora mismo no hay perfumes nicho disponibles',
        emptyText: 'En cuanto subamos más referencias, aparecerán aquí.',
      },
      nichoProducts
    );
  }

  if (isPerfumesDuraderosPage) {
    return renderSeoCategoryPage(
      {
        eyebrow: 'Perfumes de equivalencia que más duran',
        title: 'Perfumes de equivalencia que más duran y mejor proyectan',
        paragraphs: [
          'Cuando buscas un perfume que dure de verdad, no quieres reaplicar cada dos horas. Quieres un aroma que te acompañe, se note y deje sensación de perfume caro durante más tiempo.',
          'En Huele Que Flipas trabajamos equivalencias con muy buena duración, fabricadas en España y pensadas para que disfrutes de aromas intensos, elegantes y accesibles sin pagar una locura.',
          'Aquí reunimos una selección con perfumes más intensos, envolventes y con mejor presencia para quienes priorizan fijación y rendimiento sin renunciar a oler brutal.',
        ],
        sectionLabel: 'Duración top',
        sectionTitle: 'Selección de perfumes duraderos',
        emptyTitle: 'Selección no disponible',
        emptyText: 'En cuanto tengamos más referencias marcadas, las verás aquí.',
      },
      duraderosProducts,
      true
    );
  }

  if (isPerfumesArabesPost) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
          onSearchClick={() => {
            window.location.href = '/#productos';
          }}
        />

        <main>
          <BlogPostPerfumesArabes />
        </main>

        <Footer blogBack />

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

  if (isPerfumesDuraderosPost) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
          onSearchClick={() => {
            window.location.href = '/#productos';
          }}
        />

        <main>
          <BlogPostPerfumesDuraderos />
        </main>

        <Footer blogBack />

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
            window.location.href = '/#productos';
          }}
        />

        <main>
          <BlogPostBaccaratRouge />
        </main>

        <Footer blogBack />

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
            window.location.href = '/#productos';
          }}
        />

        <main>
          <BlogPage />
        </main>

        <Footer />

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
                  Nuestra colección reúne{' '}
                  <a href="/perfumes-hombre" className={linkClasses}>
                    perfumes para hombre
                  </a>
                  ,{' '}
                  <a href="/perfumes-mujer" className={linkClasses}>
                    perfumes para mujer
                  </a>
                  ,{' '}
                  <a href="/perfumes-unisex" className={linkClasses}>
                    perfumes unisex
                  </a>
                  , además de una selección más especial de{' '}
                  <a href="/perfumes-nicho" className={linkClasses}>
                    perfumes nicho
                  </a>{' '}
                  y{' '}
                  <a href="/perfumes-arabes" className={linkClasses}>
                    perfumes árabes
                  </a>
                  .
                </p>

                <p>
                  También tienes una selección especial de{' '}
                  <a href="/perfumes-que-mas-duran" className={linkClasses}>
                    perfumes que más duran
                  </a>{' '}
                  para quienes buscan más fijación, más presencia y un aroma que acompañe durante
                  horas.
                </p>

                <p>
                  La idea es muy simple: ayudarte a encontrar un aroma que encaje contigo de verdad.
                  Y si no sabes por dónde empezar, María te ayuda a elegir el perfume que mejor vaya
                  contigo.
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
                    Compra con mi ayuda
                  </p>
                  <p className="text-sm text-gray-500">Te guiamos para acertar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="productos" className="py-20 md:py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block text-sky-600 text-xs font-black uppercase tracking-[0.25em]">
                Colecciones destacadas
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight font-syne mt-4 mb-5 leading-[1.1] text-gray-900">
                Descubre tu aroma
              </h2>

              <p className="text-gray-500 max-w-2xl mx-auto font-medium text-base md:text-lg">
                En la home te enseñamos solo una selección para que todo se vea más limpio. Dentro
                de cada categoría podrás ver todos los perfumes disponibles.
              </p>
            </div>

            <HomeCollectionSection
              eyebrow="Top duración"
              title="Perfumes que más duran y mejor proyectan"
              description="Una selección para quienes quieren más fijación, más presencia y un aroma que se note de verdad durante horas."
              products={duraderosProducts}
              href="/perfumes-que-mas-duran"
              buttonLabel="Ver perfumes de larga duración"
              softBlue
              onAddToCart={addToCart}
              onViewProduct={setSelectedProduct}
            />

            <HomeCollectionSection
              eyebrow="Colección hombre"
              title="Perfumes para hombre que huelen caro"
              description="Cuatro perfumes para empezar a descubrir aromas masculinos con presencia, estilo y muy buena duración."
              products={homeHombreProducts}
              href="/perfumes-hombre"
              buttonLabel="Ver perfumes de hombre"
              onAddToCart={addToCart}
              onViewProduct={setSelectedProduct}
            />

            <HomeCollectionSection
              eyebrow="Colección mujer"
              title="Perfumes para mujer que enganchan"
              description="Una selección pensada para quienes buscan fragancias femeninas con elegancia, personalidad y ese punto adictivo que deja huella."
              products={homeMujerProducts}
              href="/perfumes-mujer"
              buttonLabel="Ver perfumes de mujer"
              onAddToCart={addToCart}
              onViewProduct={setSelectedProduct}
            />

            <HomeCollectionSection
              eyebrow="Colección unisex"
              title="Perfumes unisex diferentes y adictivos"
              description="Aromas versátiles, modernos y con personalidad para quienes quieren salirse de lo típico y oler distinto."
              products={homeUnisexProducts}
              href="/perfumes-unisex"
              buttonLabel="Ver perfumes unisex"
              onAddToCart={addToCart}
              onViewProduct={setSelectedProduct}
            />

            <HomeCollectionSection
              eyebrow="Colección árabe"
              title="Perfumes árabes intensos y con personalidad"
              description="Fragancias con presencia, carácter y un estilo más envolvente para quienes buscan algo especial."
              products={homeArabesProducts}
              href="/perfumes-arabes"
              buttonLabel="Ver perfumes árabes"
              softBlue
              onAddToCart={addToCart}
              onViewProduct={setSelectedProduct}
            />

            <HomeCollectionSection
              eyebrow="Colección nicho"
              title="Aromas que no son para todos"
              description="Una selección más exclusiva, con personalidad propia y ese punto especial para quienes no quieren llevar lo de siempre."
              products={homeNichoProducts}
              href="/perfumes-nicho"
              buttonLabel="Ver perfumes nicho"
              dark
              onAddToCart={addToCart}
              onViewProduct={setSelectedProduct}
            />
          </div>
        </section>

        <section id="maria" className="bg-gray-950 py-10 md:py-12 text-white relative overflow-hidden">
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
                  Llevo más de <span className="text-white font-bold">10 años</span> ayudando a
                  encontrar perfumes que encajan de verdad con cada persona. Si no sabes cuál
                  elegir, <span className="text-white font-bold">yo te ayudo</span>. Cuéntame qué
                  aromas te gustan — dulce, fresco, intenso o elegante — y te recomendaré una
                  equivalencia que vaya contigo.
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
                    <p className="text-sm text-gray-400 mt-2">Atención cercana y real.</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <Star className="w-4 h-4 text-sky-400 mb-2" />
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white">
                      Calidad 100%
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Equivalencias muy logradas.</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <Award className="w-4 h-4 text-sky-400 mb-2" />
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white">
                      10 años contigo.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Feliz recomendando aromas.</p>
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

      <Footer />

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
                  Inspirada en{' '}
                  <span className="font-semibold text-gray-700">{selectedProduct.brand}</span>
                </p>

                <p className="text-[15px] text-gray-500 mb-2">
                  Familia olfativa:{' '}
                  <span className="font-semibold text-gray-700">{selectedProduct.family}</span>
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
