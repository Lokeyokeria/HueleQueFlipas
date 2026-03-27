import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 px-4 text-center bg-gradient-to-b from-[#f7fbff] via-[#fcfeff] to-[#f2f7fc]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[280px] w-[280px] rounded-full bg-sky-100 blur-3xl opacity-40" />
        <div className="absolute top-12 right-[10%] h-[240px] w-[240px] rounded-full bg-cyan-100 blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-[8%] h-[220px] w-[220px] rounded-full bg-blue-50 blur-3xl opacity-35" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <p className="text-sky-600 text-xs font-black uppercase tracking-[0.25em] mb-4">
          Perfumes de equivalencia premium
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-syne text-gray-900 leading-[1.05]">
          Huelen caro.
          <br />
          Cuestan poco.
        </h1>

        <p className="mt-6 text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-7">
          Fragancias con larga duración, calidad top y ese efecto de “qué bien hueles”
          sin pagar el precio de un perfume de lujo.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#productos"
            className="px-8 py-3 rounded-full bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-sky-600 transition"
          >
            Ver perfumes
          </a>

          <a
            href="#maria"
            className="px-8 py-3 rounded-full border border-sky-100 bg-white/80 text-gray-800 text-sm font-black uppercase tracking-widest hover:bg-sky-50 transition"
          >
            María te ayuda
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
