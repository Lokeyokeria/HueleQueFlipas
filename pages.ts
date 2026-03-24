import { seoCategories } from "./seo-categories";

export function getPages() {
  return seoCategories.map((category) => ({
    slug: category.slug,
    title: category.title,
    description: category.description,
    url: `/${category.slug}`,

    // 🔥 NUEVO (no rompe nada)
    canonical: `https://huelequeflipas.es/${category.slug}`,
  }));
}

export function getPageBySlug(slug: string) {
  const category = seoCategories.find((c) => c.slug === slug);

  if (!category) return null;

  return {
    ...category,
    url: `/${category.slug}`,
    canonical: `https://huelequeflipas.es/${category.slug}`,
  };
}
