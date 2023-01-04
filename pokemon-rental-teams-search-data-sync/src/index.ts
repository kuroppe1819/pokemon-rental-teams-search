export interface Env {
  DB: D1Database;
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const sync = async () => {
      env.DB.prepare(
        "INSERT INTO tweet_info (post_id, author_id, created_at, image_url, tweet_text) VALUES (?, ?, ?, ?, ?);"
      )
        .bind(
          "1608074878175019014",
          "759031295309586432",
          "2022-12-28T12:18:22.000Z",
          "https://pbs.twimg.com/media/FlEG2LWaEAcHV1v.jpg",
          "piyo"
        )
        .run();
    };

    ctx.waitUntil(sync());
    console.log("Data sync succeeded!");
  },
};
