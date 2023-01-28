import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  lang: "ja",
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  title: "Pokemon Rental Teams Search",
  description: "ポケモンSV レンタルチーム,レンタルパーティ検索サイト",
  "og:image": "/assets/ogp.svg",
  "og:title": "Pokemon Rental Teams Search",
  "og:description": "ポケモンSV レンタルチーム,レンタルパーティ検索サイト",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html>
      <head>
        <title>Error Page | Pokemon Rental Teams Search</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="h-screen flex flex-col items-center">
          <div className="mt-32">
            <Heading text="Error!" />
          </div>
          <main className="container px-4 sm:px-20 flex items-center flex-col grow">
            <p className="mt-4 text-lg text-gray-900">
              予期せぬエラーが発生しました
            </p>
          </main>
          <Footer />
        </div>

        <Scripts />
      </body>
    </html>
  );
}
