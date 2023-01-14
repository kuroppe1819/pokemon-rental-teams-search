import { Form } from "@remix-run/react";
import { useRef } from "react";

type Props = {
  defaultValue: string | null;
};

export default function SearchInput({ defaultValue }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current === null) {
      return;
    }
    location.href = `/index?search=${inputRef.current.value}`;
  };

  return (
    <Form onSubmit={onSubmit}>
      <label
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
        htmlFor="pokemon-search"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="search"
          id="pokemon-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Pokemon..."
          defaultValue={defaultValue ?? undefined}
          required
        />
      </div>
    </Form>
  );
}
