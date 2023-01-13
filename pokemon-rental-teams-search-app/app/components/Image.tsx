import { useRef } from "react";

type Props = {
  src: string | undefined;
  alt: string;
  fallbackSrc: string;
};

export default function Image({ src, alt, fallbackSrc }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const argSrc = src ?? fallbackSrc;

  const onError = () => {
    const el = ref.current;
    if (el) {
      el.onerror = null;
      el.src = fallbackSrc;
    }
  };
  return <img ref={ref} src={argSrc} onError={onError} alt={alt} />;
}
