export default function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="min-w-min bg-white border border-gray-200 rounded-lg shadow-md">
      {/* TODO: alt にポケモンのタグを設定する */}
      <img
        className="rounded-t-lg"
        src={tweet.image_url}
        alt=""
        onClick={() => {
          console.log("aaa");
        }}
      />
      <div className="p-5">
        <div className="flex">
          <img
            className="w-12 h-12 rounded-full"
            src={tweet.profile_image_url}
          />
          <div className="ml-3">
            <a
              className="text-xl font-bold tracking-tight text-gray-900 hover:underline"
              href={`https://twitter.com/${tweet.username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tweet.name}
            </a>
            <p className="mb-3 font-normal text-gray-700">@{tweet.username}</p>
          </div>
        </div>
        {tweet.tweet_text !== undefined && (
          <p className="mb-3 font-normal text-gray-700">
            {tweet.tweet_text.replace(/(.*)\shttps:\/\/t.co\/.*$/, "$1")}
          </p>
        )}
      </div>
    </div>
  );
}
