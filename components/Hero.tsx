
import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Background con imagen de perfume de alta gama y humo sutil */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=1920"
          alt="Perfume premium con iluminación dramática"
          className="h-full w-full object-cover opacity-80"
          loading="eager"
        />
        {/* Overlay para efecto Negro Mate y contraste extremo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 pt-24 pb-10 sm:px-8 sm:pt-28">
        <div className="w-full text-center">
          {/* Kicker con brillo sutil */}
          <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-400/90 backdrop-blur-md">
            <span className="animate-pulse">Equivalencias premium</span>
            <span className="opacity-30">•</span>
            <span className="text-white/70">Máxima duración</span>
            <span className="opacity-30">•</span>
            <span className="text-white/70">Pago por Bizum</span>
          </div>

          {/* Headline - Enfoque en Lujo e Intensidad */}
          <h1 className="mt-6 font-syne font-black uppercase tracking-tighter text-white leading-[0.95]
                         text-[clamp(34px,8.5vw,72px)]">
            Huelen a{" "}
            <span className="text-sky-500 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">lujo</span>
            <br />
            sin pagar lujo.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm sm:text-lg text-white/60 font-medium tracking-wide">
            Fragancias intensas que te acompañan todo el día. <br className="hidden sm:block" /> 
            Diseñadas para los que no quieren pasar desapercibidos.
          </p>

          {/* Trust bullets con estética minimalista */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-sky-500 rounded-full"></span> Calidad 1:1
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-sky-500 rounded-full"></span> Duración 24h+
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-sky-500 rounded-full"></span> S.M. de la Vega
            </span>
          </div>

          {/* CTAs de alto contraste */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#productos"
              className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-white px-10 py-5 text-black font-black uppercase tracking-[0.15em] transition-all duration-300 hover:bg-sky-500 hover:text-white"
            >
              <span className="relative z-10">Ver perfumes</span>
              <div className="absolute inset-0 -translate-x-full bg-sky-600 transition-transform duration-300 group-hover:translate-x-0"></div>
            </a>

            <a
              href="#about"
              className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-10 py-5 text-white font-black uppercase tracking-[0.15em] backdrop-blur-sm
                         hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              María te ayuda
            </a>
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 animate-pulse">
            Colección limitada • 10 años flipando
          </p>
        </div>
      </div>

      {/* Scroll indicator estilizado */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="h-12 w-6 rounded-full border-2 border-white/10 flex justify-center p-1">
          <div className="h-2 w-1.5 rounded-full bg-sky-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
