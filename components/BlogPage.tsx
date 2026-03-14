import React from "react";

export default function BlogPage() {
  const featuredPost = {
    category: "Guías de perfumes",
    title: "Top 10 perfumes de equivalencia para hombre que huelen a lujo",
    excerpt:
      "Una selección pensada para quienes quieren oler potente, elegante y actual sin dejarse un dineral. Descubre aromas versátiles, intensos y con ese efecto de huele caro que engancha.",
    readTime: "6 min",
    slug: "/blog/top-10-perfumes-equivalencia-hombre",
  };

  const posts = [
    {
      category: "Duración",
      title: "Perfumes de equivalencia que más duran: nuestros favoritos",
      excerpt:
        "Si buscas estela, fijación y cumplidos, aquí tienes una guía con perfumes que aguantan horas y dejan huella desde la mañana hasta la noche.",
      readTime: "5 min",
      slug: "/blog/perfumes-equivalencia-que-mas-duran",
    },
    {
      category: "Inspiraciones famosas",
      title: "Equivalencia Baccarat Rouge: alternativas premium que flipan",
      excerpt:
        "Ese aroma adictivo, elegante y reconocible que tanto se busca. Te contamos cómo es, para quién encaja y qué opción elegir si te vuelve loca este perfil olfativo.",
      readTime: "4 min",
      slug: "/blog/equivalencia-baccarat-rouge",
    },
    {
      category: "Perfumes árabes",
      title: "Perfumes árabes que huelen caro y arrasan ahora mismo",
      excerpt:
        "Intensos, envolventes y con personalidad. Una guía para descubrir perfumes árabes con vibra premium y precio mucho más inteligente.",
      readTime: "5 min",
      slug: "/blog/perfumes-arabes-que-huelen-caro",
    },
    {
      category: "Consejos",
      title: "Cómo elegir tu perfume de equivalencia sin fallar",
      excerpt:
        "Te ayudamos a encontrar un perfume que vaya contigo según estilo, ocasión, estación del año y tipo de aroma que más te representa.",
      readTime: "4 min",
      slug: "/blog/como-elegir-perfume-equivalencia",
    },
    {
      category: "Hombre",
      title: "Perfumes frescos de hombre para diario que siempre funcionan",
      excerpt:
        "Limpios, atractivos y fáciles de llevar. Ideales para oficina, universidad, reuniones o planes de día con un toque muy top.",
      readTime: "4 min",
      slug: "/blog/perfumes-frescos-hombre-diario",
    },
    {
      category: "Mujer",
      title: "Perfumes dulces de mujer con efecto wow",
      excerpt:
        "Si te gustan los aromas golosos, sensuales y con presencia, esta selección te va a encantar. Dulzura sí, pero con estilo.",
      readTime: "5 min",
      slug: "/blog/perfumes-dulces-mujer-efecto-wow",
    },
  ];

  const categories = [
    "Perfumes de equivalencia",
    "Perfumes árabes",
    "Perfumes nicho",
    "Hombre",
    "Mujer",
    "Unisex",
    "Duración",
    "Consejos",
  ];

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.badge}>Blog Huele Que Flipas</div>

          <h1 style={styles.mainTitle}>
            Consejos, guías y perfumes que huelen caro sin pagar de más
          </h1>

          <p style={styles.mainText}>
            Aquí encontrarás ideas para elegir mejor, descubrir aromas con
            personalidad y conocer perfumes de equivalencia, árabes y nicho que
            merecen muchísimo la pena.
          </p>

          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Busca artículos, perfumes o consejos..."
              style={styles.searchInput}
            />
            <button style={styles.searchButton}>Explorar artículos</button>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.categories}>
            {categories.map((category) => (
              <span key={category} style={styles.categoryTag}>
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.featuredCard}>
            <div style={styles.featuredLeft}>
              <p style={styles.eyebrow}>Artículo destacado</p>
              <h2 style={styles.featuredTitle}>{featuredPost.title}</h2>
              <p style={styles.featuredText}>{featuredPost.excerpt}</p>

              <div style={styles.metaRow}>
                <span style={styles.metaTag}>{featuredPost.category}</span>
                <span style={styles.metaTime}>{featuredPost.readTime}</span>
              </div>

              <a href={featuredPost.slug} style={styles.primaryButton}>
                Leer artículo
              </a>
            </div>

            <div style={styles.featuredRight}>
              <p style={styles.eyebrow}>Por qué leer nuestro blog</p>

              <div style={styles.infoBlock}>
                <h3 style={styles.infoTitle}>Consejos de verdad</h3>
                <p style={styles.infoText}>
                  Contenido pensado para ayudarte a elegir bien, no para
                  marearte con tecnicismos.
                </p>
              </div>

              <div style={styles.infoBlock}>
                <h3 style={styles.infoTitle}>Perfumes con estilo</h3>
                <p style={styles.infoText}>
                  Descubre aromas premium, equivalencias muy logradas y opciones
                  con calidad top.
                </p>
              </div>

              <div style={styles.infoBlock}>
                <h3 style={styles.infoTitle}>Compra con confianza</h3>
                <p style={styles.infoText}>
                  Envío 24/48h, fabricado en España, atención cercana y más de
                  10 años de experiencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.eyebrow}>Últimos artículos</p>
          <h2 style={styles.sectionTitle}>
            Ideas para oler increíble y elegir mejor
          </h2>

          <div style={styles.grid}>
            {posts.map((post) => (
              <article key={post.slug} style={styles.postCard}>
                <div style={styles.postMetaTop}>
                  <span style={styles.postCategory}>{post.category}</span>
                  <span style={styles.postTime}>{post.readTime}</span>
                </div>

                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postExcerpt}>{post.excerpt}</p>

                <a href={post.slug} style={styles.readMore}>
                  Leer más →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.ctaBox}>
            <p style={styles.ctaEyebrow}>¿No sabes por dónde empezar?</p>
            <h2 style={styles.ctaTitle}>
              María te ayuda a encontrar tu perfume ideal
            </h2>
            <p style={styles.ctaText}>
              Cuéntanos qué tipo de aroma te gusta y te ayudamos a elegir una
              equivalencia que vaya contigo. Fácil, rápido y con atención
              cercana de verdad.
            </p>

            <div style={styles.ctaButtons}>
              <a href="/maria" style={styles.ctaPrimary}>
                Hablar con María
              </a>
              <a href="/equivalencias" style={styles.ctaSecondary}>
                Ver perfumes
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontFamily: "Arial, sans-serif",
  },
  hero: {
    background: "linear-gradient(to bottom, #f0f9ff, #ffffff)",
    borderBottom: "1px solid #e2e8f0",
    padding: "70px 20px 50px 20px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#ffffff",
    border: "1px solid #bae6fd",
    color: "#0369a1",
    borderRadius: "999px",
    padding: "8px 14px",
    fontSize: "14px",
    fontWeight: 700,
    marginBottom: "18px",
  },
  mainTitle: {
    fontSize: "48px",
    lineHeight: 1.1,
    fontWeight: 900,
    margin: 0,
    maxWidth: "900px",
  },
  mainText: {
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#475569",
    maxWidth: "760px",
    marginTop: "20px",
  },
  searchBox: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  searchInput: {
    flex: 1,
    minWidth: "260px",
    padding: "14px 16px",
    borderRadius: "16px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
  },
  searchButton: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    borderRadius: "16px",
    padding: "14px 22px",
    fontWeight: 700,
    cursor: "pointer",
  },
  section: {
    padding: "30px 20px",
  },
  categories: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  categoryTag: {
    border: "1px solid #e2e8f0",
    borderRadius: "999px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#334155",
    backgroundColor: "#ffffff",
  },
  featuredCard: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "24px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "28px",
    padding: "32px",
  },
  featuredLeft: {},
  featuredRight: {
    backgroundColor: "#f8fafc",
    borderRadius: "24px",
    padding: "24px",
  },
  eyebrow: {
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "#0369a1",
    fontWeight: 800,
    margin: 0,
  },
  featuredTitle: {
    fontSize: "38px",
    lineHeight: 1.1,
    fontWeight: 900,
    marginTop: "14px",
    marginBottom: "16px",
  },
  featuredText: {
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#475569",
    marginBottom: "18px",
  },
  metaRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  metaTag: {
    backgroundColor: "#f1f5f9",
    color: "#334155",
    borderRadius: "999px",
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: 700,
  },
  metaTime: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: 600,
  },
  primaryButton: {
    display: "inline-block",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    padding: "14px 20px",
    borderRadius: "16px",
    textDecoration: "none",
    fontWeight: 700,
  },
  infoBlock: {
    marginTop: "22px",
  },
  infoTitle: {
    fontSize: "18px",
    margin: 0,
    marginBottom: "6px",
    fontWeight: 800,
    color: "#0f172a",
  },
  infoText: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.7,
    fontSize: "15px",
  },
  sectionTitle: {
    fontSize: "40px",
    lineHeight: 1.1,
    fontWeight: 900,
    marginTop: "10px",
    marginBottom: "28px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  postCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    padding: "24px",
    backgroundColor: "#ffffff",
  },
  postMetaTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  postCategory: {
    backgroundColor: "#f1f5f9",
    color: "#334155",
    borderRadius: "999px",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  postTime: {
    color: "#64748b",
    fontSize: "14px",
    fontWeight: 600,
  },
  postTitle: {
    fontSize: "28px",
    lineHeight: 1.2,
    fontWeight: 900,
    marginTop: "18px",
    marginBottom: "14px",
  },
  postExcerpt: {
    fontSize: "15px",
    lineHeight: 1.8,
    color: "#475569",
    marginBottom: "20px",
  },
  readMore: {
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: "15px",
  },
  ctaBox: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    borderRadius: "28px",
    padding: "40px",
  },
  ctaEyebrow: {
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "#7dd3fc",
    fontWeight: 800,
    margin: 0,
  },
  ctaTitle: {
    fontSize: "40px",
    lineHeight: 1.1,
    fontWeight: 900,
    marginTop: "14px",
    marginBottom: "14px",
  },
  ctaText: {
    fontSize: "17px",
    lineHeight: 1.8,
    color: "#cbd5e1",
    maxWidth: "760px",
  },
  ctaButtons: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "24px",
  },
  ctaPrimary: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    textDecoration: "none",
    padding: "14px 20px",
    borderRadius: "16px",
    fontWeight: 800,
  },
  ctaSecondary: {
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 20px",
    borderRadius: "16px",
    fontWeight: 800,
  },
};
