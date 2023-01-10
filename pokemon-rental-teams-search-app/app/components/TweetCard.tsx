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
      <a
        className="inline-block p-5 h-64 hover:bg-gray-100"
        href={`https://twitter.com/${tweet.author_id}/status/${tweet.tweet_id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
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
          <p className="mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden">
            {tweet.tweet_text.replace(/(.*)\shttps:\/\/t.co\/.*$/, "$1")}
          </p>
        )}
      </a>
    </div>
  );
}
