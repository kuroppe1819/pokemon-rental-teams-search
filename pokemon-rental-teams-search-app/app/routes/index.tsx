import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import SearchInput from "~/components/SearchInput";
import TweetCard from "~/components/TweetCard";

export const loader = async ({ context, request }: LoaderArgs) => {
  const keyword = new URL(request.url).searchParams.get("search");
  const db = context.DB as D1Database;

  if (keyword === null) {
    // 検索クエリが存在しない場合
    const { results: tweetResults } = await db
      .prepare(
        "SELECT * FROM tweets INNER JOIN users ON tweets.author_id = users.author_id ORDER BY created_at DESC;"
      )
      .all<Tweet>();
    return json({
      keyword,
      tweets: tweetResults ?? [],
    });
  } else {
    // 検索クエリが存在する場合
    const { results: pokemonNameResults } = await db
      .prepare("SELECT DISTINCT media_key FROM pokemon_name WHERE name = ?;")
      .bind(keyword)
      .all<{ media_key: string }>();

    // 検索クエリがヒットしなかった場合
    if (pokemonNameResults === undefined || pokemonNameResults.length === 0) {
      return json({
        keyword,
        tweets: [],
      });
    }

    const { results: tweetResults } = await db
      .prepare(
        `SELECT * FROM tweets INNER JOIN users ON tweets.author_id = users.author_id WHERE media_key IN (?${",?".repeat(
          pokemonNameResults.length - 1
        )}) ORDER BY created_at DESC;`
      )
      .bind(...pokemonNameResults.map((v) => v.media_key))
      .all<Tweet>();
    return json({
      keyword,
      tweets: tweetResults ?? [],
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
          <div className="flex justify-center">
            <p className="font-normal text-lg text-gray-900">{`「${keyword}」を含むレンタルチームは見つかりませんでした。`}</p>
          </div>
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
