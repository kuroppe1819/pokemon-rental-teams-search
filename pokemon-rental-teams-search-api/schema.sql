DROP TABLE IF EXISTS tweet_info;
CREATE TABLE tweet_info (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL, author_id INTEGER NOT NULL, created_at TEXT NOT NULL, image_url TEXT NOT NULL, tweet_text TEXT);
INSERT INTO tweet_info (post_id, author_id, created_at, image_url, tweet_text) VALUES (1608074878175019014, 759031295309586432, '2022-12-28T12:18:22.000Z', 'https://pbs.twimg.com/media/FlEG2LWaEAcHV1v.jpg', '動画公開しました。\n【ポケモン対戦】すなかきハカドッグ＆光の粉ガブリアス【ポケモンSV/ポケモンスカーレットバイオレット】 https://t.co/IP8FqYaOav @YouTubeより 　#ポケモンSV　#レンタルパーティー　＃レンタルパーティ https://t.co/4ir7kYlXmb');

DROP TABLE IF EXISTS pokemon_name;
CREATE TABLE pokemon_name (id INTEGER PRIMARY KEY AUTOINCREMENT, tweet_info_id INTEGER NOT NULL, name TEXT);
INSERT INTO pokemon_name (tweet_info_id, name) VALUES (1, 'ガブリアス'), (1, 'ロトム'), (1, 'ドドゲザン'), (1, 'コノヨザル'), (1, 'サダイジャ'), (1, 'ハカドッグ');
