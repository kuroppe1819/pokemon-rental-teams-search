import { useEffect, useState } from "react";

export default function Analytics() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated) {
    return (
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "09c7b88359c04fb9b48f7b0d044023ab"}'
      ></script>
    );
  } else {
    return null;
  }
}
