export interface Env {
  DB: D1Database;
  POKEMON_RENTAL_TEAMS_RECENT_SEARCH_API_URL: string;
  POKEMON_RENTAL_TEAMS_RECENT_SEARCH_API_KEY: string;
}

type RentalTeam = {
  tweet: {
    mediaKey: string;
    tweetId: string;
    authorId: string;
    createdAt: string;
    imageUrl: string;
    text: string | undefined;
  };
  user: {
    authorId: string;
    username: string;
    name: string;
    profileImageUrl: string | undefined;
  };
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
      await res.json<{ rentalTeams: RentalTeam[] }>()
    ).rentalTeams;

    console.log(JSON.stringify(rentalTeams));
    console.log(`Rental teams length: ${rentalTeams.length}`);

    for (const rentalTeam of rentalTeams) {
      // 画像が登録済みか確認する
      const { results: selectMediaKeyResults } = await env.DB.prepare(
        "SELECT media_key FROM tweets WHERE media_key = ?"
      )
        .bind(rentalTeam.tweet.mediaKey)
        .all<{ media_key: string }>();

      if (selectMediaKeyResults === undefined) {
        throw new Error("Error: selectMediaKeyResults is undefined");
      }

      if (selectMediaKeyResults.length > 0) {
        continue;
      }

      await env.DB.prepare(
        "INSERT INTO tweets (media_key, tweet_id, author_id, created_at, image_url, tweet_text) VALUES (?, ?, ?, ?, ?, ?);"
      )
        .bind(
          rentalTeam.tweet.mediaKey,
          rentalTeam.tweet.tweetId,
          rentalTeam.tweet.authorId,
          rentalTeam.tweet.createdAt,
          rentalTeam.tweet.imageUrl,
          rentalTeam.tweet.text ?? null
        )
        .run();

      // ユーザーが登録済みか確認する
      const { results: selectAuthorIdResults } = await env.DB.prepare(
        "SELECT DISTINCT author_id FROM users WHERE author_id = ?"
      )
        .bind(rentalTeam.user.authorId)
        .all<{ author_id: string }>();

      if (selectAuthorIdResults === undefined) {
        throw new Error("Error: selectAuthorIdResults is undefined");
      }

      if (selectAuthorIdResults.length > 0) {
        // users テーブルにユーザー情報が登録されている場合は更新
        await env.DB.prepare(
          "UPDATE users SET username = ?, name = ?, profile_image_url = ? WHERE author_id = ?;"
        )
          .bind(
            rentalTeam.user.username,
            rentalTeam.user.name,
            rentalTeam.user.profileImageUrl ?? null,
            rentalTeam.user.authorId
          )
          .run();
      } else {
        // users テーブルにユーザー情報が登録されていない場合は追加
        await env.DB.prepare(
          "INSERT INTO users (author_id, username, name, profile_image_url) VALUES (?, ?, ?, ?);"
        )
          .bind(
            rentalTeam.user.authorId,
            rentalTeam.user.username,
            rentalTeam.user.name,
            rentalTeam.user.profileImageUrl ?? null
          )
          .run();
      }
    }

    console.log("data sync succeeded!");
  },
};
