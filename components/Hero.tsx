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
          Perfumes que flipan
        </span>

        <h1 className="font-syne text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mt-4 leading-tight">
          Huelen caro.
          <br />
          Cuestan muy poco.
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto mt-5 text-base md:text-lg leading-relaxed">
          Perfumes de equivalencia con vibra premium, compra fácil y ayuda real
          para encontrar tu aroma ideal.
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

        {/* dirección tienda */}
        <div className="mt-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-500 mb-2">
            Tienda física
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            C/ Fray Bartolomé de las Casas, Nº1 Local 3. 28330 — San Martín de la Vega — Madrid <br/>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
