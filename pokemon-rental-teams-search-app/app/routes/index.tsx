import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import SearchInput from "~/components/SearchInput";
import TweetCard from "~/components/TweetCard";
import { Query } from "~/functions/query";

export const loader = async ({ context, request }: LoaderArgs) => {
  const perPage = 3;
  const pageParams = new URL(request.url).searchParams.get("page");
  const pageParamsInt = parseInt(pageParams ?? "");
  const page = isNaN(pageParamsInt) ? 1 : pageParamsInt;
  const offset = (page - 1) * perPage;

  if (offset < 0 || offset > Number.MAX_SAFE_INTEGER) {
    // TODO: エラーを出す
    return json({
      keyword: null,
      tweets: [],
      options: {
        pageCount: null,
      },
    });
  }

  const keyword = new URL(request.url).searchParams.get("search");
  const WORD_LIMIT = 12;

  const query = new Query(context.DB as D1Database);

  if (keyword === null) {
    // 検索クエリが存在しない場合

    const total = await query.getTotalCount();

    if (total === undefined) {
      // TODO: エラーを出す
      return json({
        keyword: null,
        tweets: [],
        options: {
          pageCount: null,
        },
      });
    }

    const tweets = await query.getTweets({ perPage, offset });

    return json({
      keyword,
      tweets: tweets ?? [],
      options: {
        pageCount: Math.ceil(total / perPage),
      },
    });
  }

  if (keyword.length > WORD_LIMIT) {
    // TODO: エラーを出す
    return json({
      keyword: null,
      tweets: [],
      options: {
        pageCount: null,
      },
    });
  }

  // 検索クエリが存在する場合

  const mediaKeys = await query.getMediaKeysWithPokemonName({ keyword });

  // 検索クエリがヒットしなかった場合
  if (mediaKeys === undefined || mediaKeys.length === 0) {
    return json({
      keyword,
      tweets: [],
      options: {
        pageCount: null,
      },
    });
  }

  const tweets = await query.getTweetsWithMediaKeys({
    mediaKeys,
    perPage,
    offset,
  });

  return json({
    keyword,
    tweets: tweets ?? [],
  });
};

export default function Index() {
  const { keyword, tweets } = useLoaderData<typeof loader>();

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="mb-16 mt-32">
        <Heading text="Pokemon Rental Teams Search" />
      </div>
      <main className="container px-4 sm:px-20 grow">
        <div className="xl:mx-24 2xl:mx-48 mb-16">
          <SearchInput defaultValue={keyword} />
        </div>
        {tweets.length === 0 ? (
          <div className="flex justify-center">
            <p className="font-normal text-lg text-gray-900">
              {keyword === null
                ? "レンタルチームが見つかりませんでした"
                : `「${keyword}」を含むレンタルチームが見つかりませんでした。`}
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {tweets.map((tweet) => (
              <TweetCard key={tweet.media_key} tweet={tweet as Tweet} />
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
