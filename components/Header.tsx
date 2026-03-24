import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        padding: "18px 40px",
        borderBottom: "1px solid #f1f5f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}
    >
      {/* LOGO */}
      <Link
        href="/"
        style={{
          fontWeight: "900",
          fontSize: "20px",
          letterSpacing: "-0.5px",
          textTransform: "uppercase"
        }}
      >
        Huele <span style={{ color: "#0284c7" }}>Que</span> Flipas
      </Link>

      {/* MENU */}
      <nav
        style={{
          display: "flex",
          gap: "22px",
          fontSize: "13px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}
      >
        <Link href="/">Inicio</Link>

        <Link href="/perfumes-hombre">Hombre</Link>

        <Link href="/perfumes-mujer">Mujer</Link>

        <Link href="/perfumes-unisex">Unisex</Link>

        <Link href="/perfumes-arabes">Árabes</Link>

        <Link href="/perfumes-nicho">Nicho</Link>

        <Link href="/perfumes-que-mas-duran">Duración</Link>

        <Link href="/blog">Blog</Link>

        {/* SCROLL A MARÍA */}
        <Link href="/#about">María</Link>
      </nav>
    </header>
  );
}
