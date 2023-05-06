import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    const script = document.createElement("script");

    if (process.env.NODE_ENV === "production") {
      script.setAttribute(
        "src",
        "https://static.cloudflareinsights.com/beacon.min.js"
      );
      script.setAttribute(
        "data-cf-beacon",
        '{"token": "09c7b88359c04fb9b48f7b0d044023ab"}'
      );
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => {
      if (process.env.NODE_ENV === "production") {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}
