type Props = {
  src: string | undefined;
  alt: string;
  fallbackSrc: string;
};

export default function Image({ src, alt, fallbackSrc }: Props) {
  return (
    <img
      src={src ?? fallbackSrc}
      onError={(e) => ((e.target as HTMLImageElement).src = fallbackSrc)}
      alt={alt}
    />
  );
}
