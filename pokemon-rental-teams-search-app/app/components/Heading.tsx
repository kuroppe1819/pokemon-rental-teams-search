type Props = {
  text: string;
};

export default function Heading({ text }: Props) {
  return (
    <h1 className="text-center text-cyan-500 mb-4 text-4xl px-6 sm:px-0 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold">
      {text}
    </h1>
  );
}
