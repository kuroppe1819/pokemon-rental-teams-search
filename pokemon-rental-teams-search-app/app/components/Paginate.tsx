type Props = {
  currentPage: number;
  pageCount: number;
  onPageChange: (selected: number) => void;
};

export default function Paginate({
  currentPage,
  pageCount,
  onPageChange,
}: Props) {
  return (
    <div>
      <div>{currentPage}</div>
      <div>{pageCount}</div>
    </div>
  );
}
