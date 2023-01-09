/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

type Tweet = {
  media_key: string;
  tweet_id: string;
  author_id: string;
  created_at: string;
  image_url: string;
  tweet_text: string | undefined;
  username: string;
  name: string;
  profile_image_url: string | undefined;
};
