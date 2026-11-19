
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.typingmeter.net/sitemap.xml",
    host: "https://www.typingmeter.net",
  };
}
