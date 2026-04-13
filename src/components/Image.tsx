"use client";

import { useState } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

// Tipe properti gabungan
type SmartImageProps = {
  src?: string; // Dibuat opsional karena dummy tidak butuh src
  alt?: string; // Dibuat opsional
  useNextImage?: boolean;
  containerClassName?: string;
  className?: string;
  dummy?: boolean; // 👈 Properti baru untuk mode placeholder
} & Omit<NextImageProps, "src" | "alt">;

export default function Image({
  src = "",
  alt = "image",
  useNextImage = true,
  containerClassName = "",
  className = "",
  dummy = false, // Default adalah false
  ...props
}: SmartImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 1. RENDER MODE DUMMY (Bypass semua logic Next.js Image)
  if (dummy) {
    return (
      <div
        className={twMerge(
          "relative flex flex-col items-center justify-center bg-gray-100 text-gray-400 overflow-hidden",
          containerClassName,
        )}
      >
        <svg
          className="w-10 h-10 mb-2 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
          <line
            x1="4"
            y1="4"
            x2="20"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
          Dummy Image
        </span>
      </div>
    );
  }

  // 2. SVG Default ketika gambar gagal dimuat (Broken Image Icon)
  const FallbackIcon = () => (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center w-full h-full bg-gray-100 text-red-400",
        containerClassName,
      )}
    >
      <svg
        className="w-10 h-10 mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-xs font-medium text-gray-500">Failed to load</span>
    </div>
  );

  return (
    <div className={twMerge("relative overflow-hidden", containerClassName)}>
      {/* SKELETON EFFECT */}
      {isLoading && !isError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10 flex items-center justify-center" />
      )}

      {/* ERROR FALLBACK */}
      {isError ? (
        <FallbackIcon />
      ) : /* RENDER GAMBAR NORMAL */
      useNextImage ? (
        <NextImage
          src={src}
          alt={alt}
          className={twMerge(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className,
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsError(true);
          }}
          {...props}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          className={twMerge(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className,
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsError(true);
          }}
          width={props.width}
          height={props.height}
          loading={props.priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
}
