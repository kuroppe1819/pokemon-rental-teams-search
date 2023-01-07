DROP TABLE IF EXISTS tweet_info;
CREATE TABLE tweet_info (media_key TEXT PRIMARY KEY NOT NULL, tweet_id TEXT NOT NULL, author_id TEXT NOT NULL, created_at TEXT NOT NULL, image_url TEXT NOT NULL, tweet_text TEXT);

DROP TABLE IF EXISTS pokemon_name;
CREATE TABLE pokemon_name (media_key TEXT PRIMARY KEY NOT NULL, tweet_info_id TEXT NOT NULL, name TEXT);
