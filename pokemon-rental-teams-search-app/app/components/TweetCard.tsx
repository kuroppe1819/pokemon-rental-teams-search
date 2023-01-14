import Image from "~/components/Image";
import ImageModal from "./ImageModal";

export default function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md">
      {/* TODO: alt にポケモンのタグを設定する */}
      <div className="rounded-t-lg overflow-hidden border-b">
        <ImageModal
          src={tweet.image_url}
          alt={`Pokemon rental teams of ${tweet.username}`}
          fallbackSrc="/assets/no_image.svg"
        />
      </div>
      <a
        className="inline-block p-5 w-full hover:bg-gray-100"
        href={`https://twitter.com/${tweet.author_id}/status/${tweet.tweet_id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={tweet.profile_image_url}
              alt={`${tweet.username} profile image`}
              fallbackSrc="/assets/no_avatar.svg"
            />
          </div>
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
          <p className="lg:h-36 mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden">
            {tweet.tweet_text.replace(/(.*)\shttps:\/\/t.co\/.*$/, "$1")}
          </p>
        )}
      </a>
    </div>
  );
}
