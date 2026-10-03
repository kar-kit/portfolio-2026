import type { MetadataRoute } from "next";
import { getLastUpdated } from "@/lib/github";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updated = await getLastUpdated();
  return [
    {
      url: site.url,
      lastModified: updated ? new Date(updated) : new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
