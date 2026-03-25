import React from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col animate-[fadeIn_.25s_ease]">
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <button
          type="button"
          onClick={() => {
            window.location.href = '/';
            onClose();
          }}
          className="text-lg font-black tracking-tighter text-black uppercase font-syne"
          aria-label="Ir al inicio"
        >
          Huele <span className="text-sky-600">Que</span> Flipas
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Cerrar menú"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="space-y-5">
          <a
            href="/"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">Inicio</p>
            <p className="text-sm text-gray-500 mt-1">Vuelve a la home principal</p>
          </a>

          <a
            href="/#productos"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">Equivalencias</p>
            <p className="text-sm text-gray-500 mt-1">Descubre todas las colecciones</p>
          </a>

          <a
            href="/perfumes-hombre"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">Hombre</p>
            <p className="text-sm text-gray-500 mt-1">Perfumes masculinos con presencia</p>
          </a>

          <a
            href="/perfumes-mujer"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">Mujer</p>
            <p className="text-sm text-gray-500 mt-1">Fragancias elegantes y adictivas</p>
          </a>

          <a
            href="/perfumes-unisex"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">Unisex</p>
            <p className="text-sm text-gray-500 mt-1">Aromas sin etiquetas</p>
          </a>

          <a
            href="/perfumes-arabes"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">Árabes</p>
            <p className="text-sm text-gray-500 mt-1">Perfumes intensos y con personalidad</p>
          </a>

          <a
            href="/perfumes-nicho"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">Nicho</p>
            <p className="text-sm text-gray-500 mt-1">Aromas que no son para todos</p>
          </a>

          <a
            href="/perfumes-que-mas-duran"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-sky-600">Top duración</p>
            <p className="text-sm text-gray-500 mt-1">Los perfumes que más duran</p>
          </a>

          <a
            href="/#maria"
            onClick={onClose}
            className="block border-b border-gray-100 pb-4"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">María</p>
            <p className="text-sm text-gray-500 mt-1">Tu guía olfativa</p>
          </a>

          <a
            href="/blog"
            onClick={onClose}
            className="block pb-2"
          >
            <p className="text-lg font-black tracking-tight text-gray-900">Blog</p>
            <p className="text-sm text-gray-500 mt-1">Consejos, ideas y perfumes top</p>
          </a>
        </div>
      </div>

      <div className="px-5 pb-6 pt-3 border-t border-gray-100 bg-white">
        <a
          href="https://api.whatsapp.com/send?phone=34640834686&text=Hola%20Mar%C3%ADa,%20ay%C3%BAdame%20a%20elegir%20un%20perfume"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-4 rounded-full bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-sky-600 transition"
        >
          María, ayúdame a elegir
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
