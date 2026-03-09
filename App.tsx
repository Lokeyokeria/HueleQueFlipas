<section id="about" className="bg-gray-950 py-14 md:py-16 text-white relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-center">

      {/* FOTO IZQUIERDA */}
      <div className="flex justify-center lg:justify-start">
        <div className="group w-[260px] md:w-[290px]">
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src={mariaPhoto}
              alt="María perfumista"
              className="w-full h-[320px] md:h-[360px] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>

      {/* TEXTO DERECHA */}
      <div className="flex flex-col justify-center">
        <span className="text-sky-400 font-bold uppercase tracking-[0.22em] text-xs md:text-sm mb-4 block">
          Fundadora & Experta
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter font-syne leading-[0.92] mb-6">
          Soy María,
          <br />
          tu guía
          <br />
          olfativa.
        </h2>

        <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
          Llevo más de <span className="text-white font-bold">10 años</span> ayudando a encontrar perfumes
          que encajan de verdad con cada persona. Si no sabes cuál elegir,
          <span className="text-white font-bold"> yo te ayudo</span>. Cuéntame qué aromas te gustan — dulce,
          fresco, intenso o elegante — y te recomendaré una equivalencia que vaya contigo.
        </p>

        <div className="mt-8">
          <a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-gray-950 text-sm font-black uppercase tracking-[0.18em] hover:bg-sky-400 transition-all"
          >
            María, ayúdame a elegir
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <MapPin className="w-5 h-5 text-sky-400 mb-3" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              S. Martín de la Vega
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Atención cercana y real.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <Star className="w-5 h-5 text-sky-400 mb-3" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              Calidad 1:1
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Equivalencias muy logradas.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <Award className="w-5 h-5 text-sky-400 mb-3" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              10 años top
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Experiencia recomendando aromas.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
