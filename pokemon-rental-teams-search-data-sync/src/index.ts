export interface Env {
  DB: D1Database;
}

type RentalTeams = {
  mediaKey: string;
  tweetId: string;
  authorId: string;
  createdAt: string;
  imageUrl: string;
  text: string | undefined;
};

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const sync = async () => {
      // TODO: URL を環境変数から渡す
      const res = await fetch(
        "https://stgb62i3bvdqyn4mblrdq7apha0xebpl.lambda-url.ap-northeast-1.on.aws/"
      );
      const rentalTeams = await (
        await res.json<{ rentalTeams: RentalTeams[] }>()
      ).rentalTeams;

      for (const rentalTeam of rentalTeams) {
        const { results } = await env.DB.prepare(
          "SELECT media_key FROM tweet_info WHERE media_key = ?"
        )
          .bind(rentalTeam.mediaKey)
          .all<{ media_key: string }>();

        if (results === undefined) {
          throw new Error("Error: results is undefined");
        }

        if (results.length > 0) {
          continue;
        }

        await env.DB.prepare(
          "INSERT INTO tweet_info (media_key, tweet_id, author_id, created_at, image_url, tweet_text) VALUES (?, ?, ?, ?, ?, ?);"
        )
          .bind(
            rentalTeam.mediaKey,
            rentalTeam.tweetId,
            rentalTeam.authorId,
            rentalTeam.createdAt,
            rentalTeam.imageUrl,
            rentalTeam.text ?? null
          )
          .run();
      }
    };

    ctx.waitUntil(sync());
    console.log("Data sync succeeded!");
  },
};
