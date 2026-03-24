import React from "react";
import { Product } from "../types";

interface Props {
  product: Product;
}

const SITE_URL = "https://huelequeflipas.es";
const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/Lokeyokeria/HueleQueFlipas/main/equivalencia-hqf.jpg";

const ProductSEO: React.FC<Props> = ({ product }) => {
  const title = `${product.name} equivalencia a ${product.brand} | Perfume que huele caro`;

  const description = `Compra ${product.name}, perfume de equivalencia inspirado en ${product.brand}. Aroma ${product.family.toLowerCase()}, larga duración y calidad top. Envío 24/48h desde España por solo 1,50€.`;

  const url = `${SITE_URL}/#${product.number}`;

  const image = product.image || DEFAULT_IMAGE;

  return (
    <>
      {/* SEO básico */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph (redes sociales) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Extra SEO */}
      <meta name="robots" content="index, follow" />
    </>
  );
};

export default ProductSEO;
