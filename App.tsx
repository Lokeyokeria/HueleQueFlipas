<section
  id="about"
  className="bg-gray-950 py-24 md:py-28 text-white relative overflow-hidden"
>
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-[-10%] top-20 w-[420px] h-[420px] bg-sky-500/10 blur-[120px] rounded-full" />
    <div className="absolute right-[10%] top-10 w-[260px] h-[260px] bg-sky-400/10 blur-[90px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-14 lg:gap-20 items-center">
      <div className="max-w-2xl">
        <span className="text-sky-400 font-bold uppercase tracking-[0.22em] text-sm mb-5 block">
          Fundadora & Experta
        </span>

        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter font-syne leading-[0.92] mb-8">
          Soy María,
          <br />
          tu guía
          <br />
          olfativa.
        </h2>

        <p className="text-lg md:text-[1.35rem] text-gray-300 leading-relaxed font-light max-w-xl">
          Llevo más de <span className="text-white font-bold">10 años</span> ayudando a encontrar perfumes
          que encajan de verdad con cada persona. Si no sabes cuál elegir,
          <span className="text-white font-bold"> yo te ayudo</span>. Cuéntame qué aromas te gustan — dulce,
          fresco, intenso o elegante — y te recomendaré una equivalencia que vaya contigo.
          Fácil, rápido y sin complicarte.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://wa.me/34600000000?text=Hola%20Mar%C3%ADa,%20quiero%20que%20me%20ayudes%20a%20elegir%20un%20perfume"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-950 text-sm font-black uppercase tracking-[0.18em] hover:bg-sky-400 hover:text-gray-950 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
          >
            María, ayúdame a elegir
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-sm">
            <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-sky-400" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              S. M. de la Vega
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Atención cercana y real.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-sm">
            <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
              <Star className="w-5 h-5 text-sky-400" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              Calidad 1:1
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Equivalencias muy logradas.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-sm">
            <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-sky-400" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              10 años top
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Experiencia recomendando aromas.
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end">
        <div className="relative w-full max-w-[320px] md:max-w-[360px] group">
          <div className="absolute -inset-5 bg-sky-400/12 rounded-[2rem] blur-3xl opacity-90 transition-all duration-700 group-hover:bg-sky-400/20" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.45)] bg-white/5">
            <img
              src={mariaPhoto}
              alt="María, fundadora de Huele Que Flipas"
              className="w-full h-[460px] md:h-[520px] object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
              decoding="async"
            />

            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-[2rem]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
