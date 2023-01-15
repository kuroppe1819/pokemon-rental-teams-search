import { useState } from "react";
import Image from "~/components/Image";

type Props = {
  src: string;
  alt: string;
  fallbackSrc: string;
};

export default function ImageModal({ src, alt, fallbackSrc }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const handleClose = () => {
    document.body.style.overflow = "visible";
    setIsOpen(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleOpen} tabIndex={0}>
        <Image src={src} alt={alt} fallbackSrc={fallbackSrc} />
      </div>
      {isOpen && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-10"
          onClick={handleClose}
        >
          <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <Image src={src} alt={alt} fallbackSrc={fallbackSrc} />
          </div>
          <button className="absolute top-0.5 right-0.5 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
            <svg
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
