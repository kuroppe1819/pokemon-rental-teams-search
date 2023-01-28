import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import Paginate from "~/components/Paginate";
import SearchInput from "~/components/SearchInput";
import TweetCard from "~/components/TweetCard";
import { Query } from "~/functions/query";

export const loader = async ({ context, request }: LoaderArgs) => {
  const perPage = 30;
  const pageParams = new URL(request.url).searchParams.get("page");
  const pageParamsInt = parseInt(pageParams ?? "");
  const currentPage = isNaN(pageParamsInt) ? 1 : pageParamsInt;
  const offset = (currentPage - 1) * perPage;

  if (offset < 0 || offset > Number.MAX_SAFE_INTEGER) {
    throw new Error("offset exceeds threshold value.");
  }

  const keyword = new URL(request.url).searchParams.get("search");
  const wordLimit = 12;
  const query = new Query(context.DB as D1Database);

  if (keyword === null) {
    // 検索クエリが存在しない場合

    const total = await query.getTotalCount();
    const pageCount = Math.ceil(total / perPage);
    const tweets = await query.getTweets({ perPage, offset });

    return json({
      tweets: tweets ?? [],
      options: {
        keyword,
        currentPage,
        pageCount,
      },
    });
  } else {
    // 検索クエリが存在する場合

    if (keyword.length > wordLimit) {
      throw new Error("keyword length exceeds threshold value.");
    }

    // 検索クエリがヒットしなかった場合
    const mediaKeys = await query.getMediaKeysWithPokemonName({ keyword });
    if (mediaKeys === undefined || mediaKeys.length === 0) {
      return json({
        tweets: [],
        options: {
          keyword,
          currentPage: 1,
          pageCount: 1,
        },
      });
    }

    const total = await query.getTotalCountWithMediaKeys({ mediaKeys });
    const pageCount = Math.ceil(total / perPage);

    const tweets = await query.getTweetsWithMediaKeys({
      mediaKeys,
      perPage,
      offset,
    });

    return json({
      tweets: tweets ?? [],
      options: {
        keyword,
        currentPage,
        pageCount,
      },
    });
  }
};

export default function Index() {
  const { tweets, options } = useLoaderData<typeof loader>();
  const { keyword, currentPage, pageCount } = options;

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
          <>
            <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {tweets.map((tweet) => (
                <TweetCard key={tweet.media_key} tweet={tweet as Tweet} />
              ))}
            </ul>
            <div className="flex justify-center mt-12">
              <Paginate
                keyword={keyword}
                page={currentPage}
                pageCount={pageCount}
              />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
