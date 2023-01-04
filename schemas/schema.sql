DROP TABLE IF EXISTS tweet_info;
CREATE TABLE tweet_info (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL, author_id INTEGER NOT NULL, created_at TEXT NOT NULL, image_url TEXT NOT NULL, tweet_text TEXT);

DROP TABLE IF EXISTS pokemon_name;
CREATE TABLE pokemon_name (id INTEGER PRIMARY KEY AUTOINCREMENT, tweet_info_id INTEGER NOT NULL, name TEXT);
