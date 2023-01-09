import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Pokemon Rental Teams Search</h1>
      <ul>
        {tweets.map((tweet, i) => (
          <li key={i}>{JSON.stringify(tweet)}</li>
        ))}
      </ul>
    </div>
  );
}
