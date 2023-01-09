export default function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={tweet.image_url} alt="" />
      </a>
      <div className="p-5">
        <div className="flex">
          <img
            className="w-12 h-12 rounded-full"
            src={tweet.profile_image_url}
          />
          <div className="ml-3">
            <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {tweet.name}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              @{tweet.username}
            </p>
          </div>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {tweet.tweet_text}
        </p>
      </div>
    </div>
  );
}
