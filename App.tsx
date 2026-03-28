const Footer: React.FC<{ blogBack?: boolean }> = ({ blogBack = false }) => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#020817] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-300">
              Huele Que Flipas
            </p>
            <h3 className="mt-3 text-3xl font-black uppercase tracking-tight text-white">
              Perfumes de equivalencia premium
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Fragancias que huelen a lujo sin pagar de más. Calidad top,
              larga duración, envío 24/48h y atención cercana desde San Martín
              de la Vega, Madrid.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-sky-200">
                Envío 24/48h
              </span>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-sky-200">
                Fabricado en España
              </span>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-sky-200">
                Equivalencias muy logradas
              </span>
            </div>

            <div className="mt-6">
              <a
                href={blogBack ? "/blog" : "/"}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition hover:bg-sky-100"
              >
                {blogBack ? "Volver al blog" : "Volver al inicio"}
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-300">
              Pago por Bizum
            </p>
            <h4 className="mt-3 text-xl font-black text-white">
              Compra fácil y rápida
            </h4>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Añade tu perfume al carrito y pulsa el botón de compra. Al hacerlo
              se abrirá WhatsApp para confirmar tu pedido de forma sencilla y
              segura.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Una vez recibido el pago, preparamos tu pedido y normalmente sale
              en unas 24 horas. Después, lo habitual es recibirlo en 24/48h.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-300">
              Contacto
            </p>
            <h4 className="mt-3 text-xl font-black text-white">
              Estamos para ayudarte
            </h4>

            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <p>
                WhatsApp:{' '}
                <a
                  href="https://api.whatsapp.com/send?phone=34640834686"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClasses}
                >
                  640 83 46 86
                </a>
              </p>

              <p>San Martín de la Vega, Madrid</p>

              <p className="leading-7">
                ¿No sabes cuál elegir? Escríbenos y te ayudamos a encontrar el
                perfume que mejor encaja contigo.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Huele Que Flipas — San Martín de la Vega, Madrid</p>
          <p>Hecho con ❤️ para que huelas increíble.</p>
        </div>
      </div>
    </footer>
  );
};
