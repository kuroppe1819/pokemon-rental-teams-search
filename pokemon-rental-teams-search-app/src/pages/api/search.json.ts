import type { APIRoute } from "astro";

export const get: APIRoute = ({ params, request }) => {
  return {
    body: JSON.stringify({
      name: "Astro",
      url: "https://astro.build/",
    }),
  };
};
