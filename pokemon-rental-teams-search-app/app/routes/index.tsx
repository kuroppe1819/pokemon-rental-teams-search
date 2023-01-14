import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import SearchInput from "~/components/SearchInput";
import TweetCard from "~/components/TweetCard";

export const loader = async ({ context, request, params }: LoaderArgs) => {
  console.log(`search ${JSON.stringify(params)}`);
  console.log(`request${JSON.stringify(request)}`);

  const db = context.DB as D1Database;
  const { results } = await db
    .prepare(
      "SELECT * FROM tweets INNER JOIN users ON tweets.author_id = users.author_id ORDER BY created_at DESC;"
    )
    .all<Tweet>();
  const tweets = results ?? [];
  return json(tweets);
};

export default function Index() {
  const tweets = useLoaderData<typeof loader>();

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="mb-16 mt-32">
        <Heading text="Pokemon Rental Teams Search" />
      </div>
      <main className="container px-4 sm:px-20 grow">
        <div className="xl:mx-24 2xl:mx-48 mb-16">
          <SearchInput />
        </div>
        <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {tweets.map((tweet) => (
            <TweetCard key={tweet.media_key} tweet={tweet as Tweet} />
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
