import React from 'react';
import { ShoppingCart, Menu, Search } from 'lucide-react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  onSearchClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount, onSearchClick }) => {
  const goToTop = () => {
    const topSection = document.getElementById('top');

    if (topSection) {
      topSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          <div className="flex items-center space-x-2 cursor-pointer">
            <button
              type="button"
              onClick={goToTop}
              className="text-xl sm:text-2xl font-bold tracking-tighter text-black uppercase font-syne"
            >
              Huele <span className="text-sky-600">Que</span> Flipas
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold uppercase tracking-widest">
            <button
              type="button"
              onClick={goToTop}
              className="hover:text-sky-800 transition-colors"
            >
              Inicio
            </button>

            <a href="#productos" className="hover:text-sky-800 transition-colors">
              Equivalencias
            </a>

            <a href="#about" className="hover:text-sky-800 transition-colors">
              María
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onSearchClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Ir al buscador"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
