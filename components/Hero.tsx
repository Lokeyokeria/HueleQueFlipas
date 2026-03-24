import React from "react";

const Hero: React.FC = () => {
  return (
    <section id="top" className="relative bg-white border-b border-gray-100 overflow-hidden">
      {/* fondo suave */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-sky-400/20 blur-[120px] rounded-full mt-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-16 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
          Perfumes de equivalencia premium
        </span>

        <h1 className="font-syne text-4xl md:text-6xl font-black tracking-tighter text-gray-800 mt-4 leading-tight">
          Huelen caro.
          <br />
          Cuestan poco.
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto mt-5 text-base md:text-lg leading-relaxed">
          Descubre perfumes de equivalencia con larga duración, calidad top y ese
          efecto de “qué bien hueles” sin pagar el precio de un perfume de lujo.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/#productos"
            className="group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 rounded-full bg-black text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000" />
            <span className="relative z-10">Ver perfumes</span>
          </a>

          <a
            href="/#maria"
            className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition"
          >
            María te ayuda
          </a>
        </div>

        {/* beneficios rápidos */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] text-gray-500">
          <span>Envío 24/48h</span>
          <span>Envío 1,50€</span>
          <span>Fabricado en España</span>
          <span>Muestras de regalo</span>
          <span>Más de 10 años</span>
        </div>

        {/* dirección tienda */}
        <div className="mt-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-2">
            Tienda física
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            C/ Fray Bartolomé de las Casas, Nº 1 Local 3 — 28330 — San Martín de la Vega, Madrid
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
