import React from "react";
import { Product } from "../types";

interface Props {
  product: Product;
}

const ProductSEO: React.FC<Props> = ({ product }) => {
  const title = `${product.name} - Perfume de equivalencia premium | Huele Que Flipas`;

  const description = `Descubre ${product.name}, perfume de equivalencia premium inspirado en fragancias de alta perfumería. Envío rápido desde España.`;

  return (
    <>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="og:type" content="product" />
    </>
  );
};

export default ProductSEO;
