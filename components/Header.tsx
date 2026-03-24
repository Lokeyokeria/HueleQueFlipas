import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      padding: "20px 40px",
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      
      {/* LOGO */}
      <Link href="/" style={{ fontWeight: "bold", fontSize: "20px" }}>
        HUELE QUE FLIPAS
      </Link>

      {/* MENU */}
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link href="/">Inicio</Link>
        <Link href="/perfumes-hombre">Hombre</Link>
        <Link href="/perfumes-mujer">Mujer</Link>
        <Link href="/perfumes-unisex">Unisex</Link>
        <Link href="/perfumes-que-mas-duran">Top duración</Link>

        {/* 👇 CLAVE: SCROLL A MARÍA */}
        <Link href="/#maria">María</Link>
      </nav>

    </header>
  );
}
