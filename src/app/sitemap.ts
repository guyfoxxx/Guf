import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { areas } from "@/lib/areas-data";
import { blogPosts } from "@/lib/blog-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rahgosha.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "services", "emergency", "about", "projects", "blog", "faq", "contact", "invoice",
  ].map((p) => ({
    url: `${siteUrl}/${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const servicePages = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const areaPages = areas.map((a) => ({
    url: `${siteUrl}/areas/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...blogPages];
}
