import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import SearchInput from "~/components/SearchInput";
import TweetCard from "~/components/TweetCard";

export const loader = async ({ context, request }: LoaderArgs) => {
  const keyword = new URL(request.url).searchParams.get("search");

  if (keyword === null) {
    const db = context.DB as D1Database;
    const { results } = await db
      .prepare(
        "SELECT * FROM tweets INNER JOIN users ON tweets.author_id = users.author_id ORDER BY created_at DESC;"
      )
      .all<Tweet>();
    return json({
      keyword,
      tweets: results ?? [],
    });
  } else {
    return json({
      keyword,
      tweets: [],
    });
  }
};

export default function Index() {
  const { keyword, tweets } = useLoaderData<typeof loader>();

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="mb-16 mt-32">
        <Heading text="Pokemon Rental Teams Search" />
      </div>
      <main className="container px-4 sm:px-20 grow">
        <div className="xl:mx-24 2xl:mx-48 mb-16">
          <SearchInput defaultValue={keyword} />
        </div>
        {tweets.length === 0 ? (
          <p className="text-center font-medium">{`「${keyword}」を含むレンタルチームは見つかりませんでした。`}</p>
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {tweets.map((tweet) => (
              <TweetCard key={tweet.media_key} tweet={tweet as Tweet} />
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
