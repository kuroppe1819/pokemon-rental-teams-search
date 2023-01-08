export interface Env {
  DB: D1Database;
  POKEMON_RENTAL_TEAMS_RECENT_SEARCH_API_URL: string;
  POKEMON_RENTAL_TEAMS_RECENT_SEARCH_API_KEY: string;
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
    console.log("cron trigger fired!");

    const res = await fetch(env.POKEMON_RENTAL_TEAMS_RECENT_SEARCH_API_URL, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": env.POKEMON_RENTAL_TEAMS_RECENT_SEARCH_API_KEY,
      },
    });
    const rentalTeams = await (
      await res.json<{ rentalTeams: RentalTeams[] }>()
    ).rentalTeams;

    console.log(JSON.stringify(rentalTeams));
    console.log(`Rental teams length: ${rentalTeams.length}`);

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

    console.log("data sync succeeded!");
  },
};
