import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import TweetCard from "~/components/TweetCard";
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import SearchInput from "~/components/SearchInput";

export const loader = async ({ context, params }: LoaderArgs) => {
  const db = context.DB as D1Database;
  const { results } = await db
    .prepare(
      "SELECT * FROM tweets INNER JOIN users ON tweets.author_id = users.author_id;"
    )
    .all<Tweet>();
  const tweets = results ?? [];
  return json(tweets);
};

export default function Index() {
  const tweets = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto px-20">
      <div className="mt-32 mb-16">
        <Heading />
      </div>
      <div className="mx-48 mb-16">
        <SearchInput />
      </div>
      <ul className="grid grid-cols-3 gap-8">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.media_key} tweet={tweet as Tweet} />
        ))}
      </ul>
      <Footer />
    </main>
  );
}
