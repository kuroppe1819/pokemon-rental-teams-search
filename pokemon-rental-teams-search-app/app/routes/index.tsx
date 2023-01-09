import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import SearchInput from "~/components/SearchInput";

type Tweet = {
  mediaKey: string;
  tweetId: string;
  authorId: string;
  createdAt: string;
  imageUrl: string;
  text: string | undefined;
  username: string;
  name: string;
  profileImageUrl: string | undefined;
};

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
    <main className="sm:container sm:mx-auto">
      <div className="my-16">
        <Heading />
      </div>
      <div className="mx-64 mb-8">
        <SearchInput />
      </div>
      <ul className="grid grid-cols-3 gap-8">
        {tweets.map((tweet) => (
          <Card key={tweet.mediaKey} />
        ))}
      </ul>
      <Footer />
    </main>
  );
}
