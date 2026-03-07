import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white border-b border-gray-100 overflow-hidden">

      {/* fondo suave */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-sky-400/20 blur-[120px] rounded-full mt-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-16 text-center">

        <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
          Perfumes que flipan
        </span>

        <h1 className="font-syne text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mt-4 leading-tight">
          Huelen caro.
          <br />
          Cuestan muy poco.
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto mt-5 text-base">
          Perfumes de equivalencia con vibra premium, compra fácil y ayuda real
          para encontrar tu aroma.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          <a
            href="#productos"
            className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-sky-600 transition"
          >
            Ver perfumes
          </a>

          <a
            href="#about"
            className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition"
          >
            Te ayudamos a elegir
          </a>

        </div>

        <div className="mt-8 text-xs uppercase tracking-widest text-gray-400 flex justify-center gap-4">
          <span>Envío 24/48h</span>
          <span>•</span>
          <span>Pago por Bizum</span>
          <span>•</span>
          <span>San Martín de la Vega</span>
        </div>

      </div>
    </section>
  );
};

export default Hero;
