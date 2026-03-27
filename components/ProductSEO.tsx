import React, { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  robots?: string;
};

const DEFAULT_IMAGE =
  "https://huelequeflipas.es/equivalencia-hqf.jpg";

const SITE_NAME = "Huele Que Flipas";

const ProductSEO: React.FC<Props> = ({
  title,
  description,
  url,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index,follow",
}) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (
      attribute: "name" | "property",
      key: string,
      content: string
    ) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      ) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const setCanonical = (href: string) => {
      let canonical = document.head.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;

      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }

      canonical.setAttribute("href", href);
    };

    setMeta("name", "description", description);
    setMeta("name", "robots", robots);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", SITE_NAME);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    setCanonical(url);
  }, [title, description, url, image, type, robots]);

  return null;
};

export default ProductSEO;
