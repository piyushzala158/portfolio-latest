import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Piyush Zala — Frontend Software Engineer",
    short_name: "Piyush Zala",
    description: "Portfolio of Piyush Zala — Frontend Software Engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
