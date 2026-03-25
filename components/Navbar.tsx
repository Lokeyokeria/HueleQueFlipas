import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  onSearchClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount, onSearchClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = () => {
    window.location.href = '/';
  };

  // 🔒 BLOQUEAR SCROLL CUANDO MENU ABIERTO
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* LOGO */}
            <button
              onClick={goHome}
              className="text-xl sm:text-2xl font-bold tracking-tighter text-black uppercase font-syne"
            >
              Huele <span className="text-sky-600">Que</span> Flipas
            </button>

            {/* MENU DESKTOP */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] lg:text-sm font-semibold uppercase tracking-widest">
              <button onClick={goHome}>Inicio</button>
              <a href="/#productos">Equivalencias</a>
              <a href="/#maria">María</a>
              <a href="/perfumes-hombre">Hombre</a>
              <a href="/perfumes-mujer">Mujer</a>
              <a href="/perfumes-unisex">Unisex</a>
              <a href="/perfumes-arabes">Árabes</a>
              <a href="/perfumes-nicho">Nicho</a>
              <a href="/perfumes-que-mas-duran" className="text-sky-600 font-black">
                Top duración
              </a>
              <a href="/blog">Blog</a>
            </div>

            {/* ICONOS */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button onClick={() => onSearchClick?.()} className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="w-5 h-5" />
              </button>

              <button onClick={onCartClick} className="relative p-2 hover:bg-gray-100 rounded-full">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* 🍔 BOTÓN HAMBURGUESA */}
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔥 MENU MOBILE PRO */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] flex">

          {/* FONDO OSCURO */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* PANEL DESLIZANTE */}
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl animate-slideInLeft flex flex-col">

            {/* HEADER */}
            <div className="flex justify-between items-center p-5 border-b">
              <span className="font-black text-lg">Menú</span>
              <button onClick={closeMenu}>
                <X />
              </button>
            </div>

            {/* LINKS */}
            <div className="flex flex-col p-5 space-y-5 text-lg font-semibold">

              <a href="/" onClick={closeMenu}>Inicio</a>
              <a href="/#productos" onClick={closeMenu}>Equivalencias</a>
              <a href="/#maria" onClick={closeMenu}>María</a>
              <a href="/perfumes-hombre" onClick={closeMenu}>Hombre</a>
              <a href="/perfumes-mujer" onClick={closeMenu}>Mujer</a>
              <a href="/perfumes-unisex" onClick={closeMenu}>Unisex</a>
              <a href="/perfumes-arabes" onClick={closeMenu}>Árabes</a>
              <a href="/perfumes-nicho" onClick={closeMenu}>Nicho</a>

              <a
                href="/perfumes-que-mas-duran"
                onClick={closeMenu}
                className="text-sky-600 font-black"
              >
                🔥 Top duración
              </a>

              <a href="/blog" onClick={closeMenu}>Blog</a>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
