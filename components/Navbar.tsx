import React, { useEffect, useMemo, useState } from 'react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  onSearchClick?: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  onCartClick,
  cartCount,
  onSearchClick,
  onNavigate,
  currentPath = '/',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: 'Inicio', path: '/' },
      { label: 'Hombre', path: '/hombre' },
      { label: 'Mujer', path: '/mujer' },
      { label: 'Unisex', path: '/unisex' },
      { label: 'Árabes', path: '/arabes' },
      { label: 'Nicho', path: '/nicho', strong: true },
      { label: 'Top duración', path: '/top-duracion', accent: true },
      { label: 'María', path: '/maria' },
      { label: 'Blog', path: '/blog' },
    ],
    []
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleNavigate = (path: string) => {
    closeMenu();

    if (onNavigate) {
      onNavigate(path);
      return;
    }

    window.location.href = path;
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path;
  };

  const getItemClassName = (
    path: string,
    options?: { strong?: boolean; accent?: boolean }
  ) => {
    const base =
      'transition hover:text-sky-600';
    const active = isActive(path) ? ' text-sky-600 font-black' : ' text-slate-900';
    const extra = options?.accent
      ? ' text-sky-600 font-black'
      : options?.strong
      ? ' font-black'
      : '';

    return `${base}${active}${extra}`;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-20">
            <button
              type="button"
              onClick={() => handleNavigate('/')}
              className="flex flex-col items-start leading-none"
              aria-label="Ir a inicio"
            >
              <span className="font-syne text-xl font-bold uppercase tracking-tighter text-black sm:text-2xl">
                Huele <span className="text-sky-600">Que</span> Flipas
              </span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.28em] text-gray-500 sm:text-[9px]">
                Equivalencias
              </span>
            </button>

            <div className="hidden items-center space-x-6 text-[11px] font-semibold uppercase tracking-widest md:flex lg:space-x-8 lg:text-sm">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                  className={getItemClassName(item.path, {
                    strong: item.strong,
                    accent: item.accent,
                  })}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={() => onSearchClick?.()}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={onCartClick}
                className="relative rounded-full p-2 hover:bg-gray-100"
                aria-label="Carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-sky-600 px-1.5 py-0.5 text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="rounded-full p-2 hover:bg-gray-100 md:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[999] flex md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          <div className="relative flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <span className="text-lg font-black">Menú</span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                <X />
              </button>
            </div>

            <div className="flex flex-col space-y-5 p-5 text-lg font-semibold">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                  className={`text-left ${getItemClassName(item.path, {
                    strong: item.strong,
                    accent: item.accent,
                  })}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
