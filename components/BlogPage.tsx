import React from "react";

export default function BlogPage() {
  const featuredPost = {
    category: "Inspiraciones famosas",
    title: "Equivalencia Baccarat Rouge: la alternativa que huele a lujo sin pagar una fortuna",
    excerpt:
      "Si te vuelve loca esa vibra elegante, adictiva y súper reconocible, aquí te contamos cómo huele, por qué gusta tanto y por qué su equivalencia se ha convertido en una de las más buscadas.",
    readTime: "6 min",
    slug: "/blog/equivalencia-baccarat-rouge",
  };

  const posts = [
    {
      category: "Inspiraciones famosas",
      title: "Equivalencia Baccarat Rouge: la alternativa que huele a lujo sin pagar una fortuna",
      excerpt:
        "Descubre cómo huele este perfume tan buscado, para quién encaja y por qué su equivalencia arrasa entre quienes quieren aroma premium a precio inteligente.",
      readTime: "6 min",
      slug: "/blog/equivalencia-baccarat-rouge",
    },
    {
      category: "Perfumes árabes",
      title: "Perfumes árabes que huelen caro y arrasan ahora mismo",
      excerpt:
        "Una selección con perfumes árabes y potentes que destacan por personalidad, presencia y ese efecto de perfume caro que engancha.",
      readTime: "7 min",
      slug: "/blog/perfumes-arabes-que-huelen-caro",
    },
  ];

  const categories = [
    "Perfumes de equivalencia",
    "Perfumes árabes",
    "Perfumes nicho",
    "Hombre",
    "Mujer",
    "Unisex",
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
            personalidad y conocer perfumes que merecen muchísimo la pena.
          </p>
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
                <h3 style={styles.infoTitle}>Contenido útil de verdad</h3>
                <p style={styles.infoText}>
                  Guías claras, directas y hechas para ayudarte a elegir mejor.
                </p>
              </div>

              <div style={styles.infoBlock}>
                <h3 style={styles.infoTitle}>Perfumes con personalidad</h3>
                <p style={styles.infoText}>
                  Selecciones reales con aromas que huelen increíble y tienen mucha presencia.
                </p>
              </div>

              <div style={styles.infoBlock}>
                <h3 style={styles.infoTitle}>Compra con confianza</h3>
                <p style={styles.infoText}>
                  Envío 24/48h, atención cercana, calidad top y más de 10 años de experiencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.eyebrow}>Artículos publicados</p>
          <h2 style={styles.sectionTitle}>
            Lo último en el blog
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
              equivalencia que vaya contigo. Fácil, rápido y con atención cercana de verdad.
            </p>

            <div style={styles.ctaButtons}>
              <a
                href="https://api.whatsapp.com/send?phone=34640834686&text=Hola%20Mar%C3%ADa,%20ay%C3%BAdame%20a%20elegir%20un%20perfume"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.ctaPrimary}
              >
                Hablar con María
              </a>
              <a href="/" style={styles.ctaSecondary}>
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
    gridTemplateColumns: "repeat(2, 1fr)",
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
