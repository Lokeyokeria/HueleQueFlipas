import { seoCategories } from "./seo-categories";

export function getPages() {
  return seoCategories.map((category) => ({
    slug: category.slug,
    title: category.title,
    description: category.description,
    url: `/${category.slug}`,
  }));
}

export function getPageBySlug(slug: string) {
  return seoCategories.find((category) => category.slug === slug);
}
