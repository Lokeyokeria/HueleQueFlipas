import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-white text-center">
      <div className="max-w-4xl mx-auto">
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
            className="px-8 py-3 rounded-full border border-gray-200 text-gray-800 text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition"
          >
            María te ayuda
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
