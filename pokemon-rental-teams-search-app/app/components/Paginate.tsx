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
    <div>
      <Link
        to={`/?page=${page - 1}${addSearchParameter}`}
        tabIndex={previousDisabled ? -1 : 0}
        prefetch="intent"
      >
        前
      </Link>
      <Link to={`/?page=1${addSearchParameter}`} prefetch="intent">
        1
      </Link>
      {page > 2 + siblingCount && <span>...</span>}
      {sibling.map((i) => (
        <Link
          key={`page_link${i}`}
          to={`/?page=${i}${addSearchParameter}`}
          prefetch="intent"
        >
          {i}
        </Link>
      ))}
      {page < pageCount - 1 - siblingCount && <span>...</span>}
      <Link to={`/?page=${pageCount}${addSearchParameter}`} prefetch="intent">
        {pageCount}
      </Link>
      <Link
        to={`/?page=${page + 1}${addSearchParameter}`}
        tabIndex={nextDisabled ? -1 : 0}
        prefetch="intent"
      >
        次
      </Link>
    </div>
  );
}
