export class Query {
  #db: D1Database;

  constructor(db: D1Database) {
    this.#db = db;
  }

  getTotalCount = async () => {
    const { total } = await this.#db
      .prepare("SELECT COUNT(*) AS total FROM tweets;")
      .first<{ total: number }>();
    return total;
  };

  getTweets = async ({
    perPage,
    offset,
  }: {
    perPage: number;
    offset: number;
  }) => {
    const { results } = await this.#db
      .prepare(
        "SELECT * FROM tweets INNER JOIN users ON tweets.author_id = users.author_id ORDER BY created_at DESC LIMIT ? OFFSET ?;"
      )
      .bind(perPage, offset)
      .all<Tweet>();
    return results;
  };

  getTweetsWithMediaKeys = async ({
    mediaKeys,
    perPage,
    offset,
  }: {
    mediaKeys: string[];
    perPage: number;
    offset: number;
  }) => {
    const { results } = await this.#db
      .prepare(
        `SELECT * FROM tweets INNER JOIN users ON tweets.author_id = users.author_id WHERE media_key IN (?${",?".repeat(
          mediaKeys.length - 1
        )}) ORDER BY created_at DESC LIMIT ? OFFSET ?;`
      )
      .bind(...mediaKeys, perPage, offset)
      .all<Tweet>();
    return results;
  };

  getMediaKeysWithPokemonName = async ({ keyword }: { keyword: string }) => {
    const { results } = await this.#db
      .prepare("SELECT DISTINCT media_key FROM pokemon_name WHERE name = ?;")
      .bind(keyword)
      .all<{ media_key: string }>();

    const mediaKeys = results?.map((v) => v.media_key);
    return mediaKeys;
  };
}
