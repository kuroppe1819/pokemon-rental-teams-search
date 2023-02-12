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
import LinkButton from "./components/LinkButton";
import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  lang: "ja",
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  title: "【ポケモンSV】レンタルチーム検索 - Pokemon Rental Teams Search",
  description:
    "Twitterに公開されているポケモンSVのレンタルチーム及びレンタルパーティを検索できるサイト",
  "og:url": "https://pokemon-rental-teams-search.pages.dev",
  "og:type": "website",
  "og:title": "【ポケモンSV】レンタルチーム検索",
  "og:description":
    "Twitterに公開されているポケモンSVのレンタルチーム及びレンタルパーティを検索できるサイト",
  "og:site_name": "Pokemon Rental Teams Search",
  "og:image": "https://pokemon-rental-teams-search.pages.dev/ogp.png",
  "twitter:card": "summary",
  "twitter:site": "@mys_x101",
});

export default function App() {
  return (
    <html lang="en">
      <head prefix="og:http://ogp.me/ns#">
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
            <p className="mt-4 mb-24 text-lg text-gray-900">
              予期せぬエラーが発生しました。
            </p>
            <div>
              <LinkButton text="トップに戻る" href="/" />
            </div>
          </main>
          <Footer />
        </div>

        <Scripts />
      </body>
    </html>
  );
}
