DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets (media_key TEXT PRIMARY KEY NOT NULL, tweet_id TEXT NOT NULL, author_id TEXT NOT NULL, created_at TEXT NOT NULL, image_url TEXT NOT NULL, tweet_text TEXT);

DROP TABLE IF EXISTS pokemon_name;
CREATE TABLE pokemon_name (media_key TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL);

DROP TABLE IF EXISTS users;
CREATE TABLE users(author_id TEXT PRIMARY KEY NOT NULL, username TEXT NOT NULL, name TEXT NOT NULL, profile_image_url TEXT);
