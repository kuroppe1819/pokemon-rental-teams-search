type Props = {
  text: string;
};

export default function Heading({ text }: Props) {
  return (
    <h1 className="text-center mb-4 text-4xl px-6 sm:px-0 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold">
      <span className="text-transparent bg-clip-text text-cyan-500">
        {text}
      </span>
    </h1>
  );
}
