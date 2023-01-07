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
      const res = await fetch(
        "https://stgb62i3bvdqyn4mblrdq7apha0xebpl.lambda-url.ap-northeast-1.on.aws/"
      );
      const rentalTeams = await (
        await res.json<{ rentalTeams: RentalTeams[] }>()
      ).rentalTeams;

      for (let i = rentalTeams.length - 1; i >= 0; i--) {
        const rentalTeam = rentalTeams[i];
        console.log(JSON.stringify(rentalTeam));

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
