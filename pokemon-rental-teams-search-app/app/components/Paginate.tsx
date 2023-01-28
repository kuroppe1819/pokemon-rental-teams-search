import { Link } from "@remix-run/react";

type Props = {
  keyword: string | null;
  defaultPage: number;
  pageCount: number;
};

export default function Paginate({ keyword, defaultPage, pageCount }: Props) {
  const addSearchParameter = keyword === null ? "" : `&search=${keyword}`;
  const previousDisabled = defaultPage <= 1;
  const nextDisabled = defaultPage >= pageCount;

  return (
    <div>
      <Link
        to={`/?page=${defaultPage - 1}${addSearchParameter}`}
        tabIndex={previousDisabled ? -1 : 0}
        prefetch="intent"
      >
        前
      </Link>
      <div>{defaultPage}</div>
      <div>{pageCount}</div>
      <Link
        to={`/?page=${defaultPage + 1}${addSearchParameter}`}
        tabIndex={nextDisabled ? -1 : 0}
        prefetch="intent"
      >
        次
      </Link>
    </div>
  );
}
