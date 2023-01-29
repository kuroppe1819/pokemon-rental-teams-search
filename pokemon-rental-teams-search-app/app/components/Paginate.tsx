import { Link } from "@remix-run/react";

type Props = {
  keyword: string | null;
  page: number;
  pageCount: number;
};

export default function Paginate({ keyword, page, pageCount }: Props) {
  const addSearchParameter = keyword === null ? "" : `&search=${keyword}`;
  const previousDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  // https://dev.to/namirsab/comment/2050
  const range = (start: number, end: number, length = end - start + 1) =>
    Array.from({ length }, (_, i) => start + i);

  const siblingCount = 2;
  const sibling = range(
    Math.max(2, page - siblingCount),
    Math.min(pageCount - 1, page + siblingCount)
  );

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <Link
            className={`block px-3 py-2 ml-0 leading-tight  bg-white border border-gray-300 rounded-md sm:rounded-l-lg ${
              previousDisabled
                ? "text-gray-300 pointer-events-none"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
            to={`/?page=${page - 1}${addSearchParameter}`}
            tabIndex={previousDisabled ? -1 : 0}
            prefetch="intent"
            aria-disabled={previousDisabled}
          >
            <span className="sr-only">前</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </li>
        <li className="block sm:hidden px-3 py-2 text-center text-sm text-gray-700">{`${page}/${pageCount}ページ`}</li>
        <li className="hidden sm:block">
          <Link
            className={`block px-3 py-2 leading-tight  border border-gray-300 ${
              page === 1
                ? "text-white bg-cyan-500"
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
            }`}
            to={`/?page=1${addSearchParameter}`}
            prefetch="intent"
          >
            1
          </Link>
        </li>
        {page > 2 + siblingCount && (
          <li className="hidden sm:block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">
            ...
          </li>
        )}
        {sibling.map((i) => (
          <li key={`page_link${i}`} className="hidden sm:block">
            <Link
              className={`block px-3 py-2 leading-tight  border border-gray-300 ${
                page === i
                  ? "text-white bg-cyan-500"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
              }`}
              to={`/?page=${i}${addSearchParameter}`}
              prefetch="intent"
            >
              {i}
            </Link>
          </li>
        ))}
        {page < pageCount - 1 - siblingCount && (
          <li className="hidden sm:block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">
            ...
          </li>
        )}
        {pageCount > 1 && (
          <li className="hidden sm:block">
            <Link
              className={`block px-3 py-2 leading-tight  border border-gray-300 ${
                page === pageCount
                  ? "text-white bg-cyan-500"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
              }`}
              to={`/?page=${pageCount}${addSearchParameter}`}
              prefetch="intent"
            >
              {pageCount}
            </Link>
          </li>
        )}
        <li>
          <Link
            className={`block px-3 py-2 ml-0 leading-tight  bg-white border border-gray-300 rounded-md sm:rounded-r-lg ${
              nextDisabled
                ? "text-gray-300 pointer-events-none"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
            to={`/?page=${page + 1}${addSearchParameter}`}
            tabIndex={nextDisabled ? -1 : 0}
            prefetch="intent"
            aria-disabled={nextDisabled}
          >
            <span className="sr-only">次</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
