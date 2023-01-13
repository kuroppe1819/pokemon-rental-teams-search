type Props = {
  text: string;
};

export default function Heading({ text }: Props) {
  return (
    <h1 className="text-center mb-4 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {text}
      </span>
    </h1>
  );
}
