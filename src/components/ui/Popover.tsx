"use client";

import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { twMerge } from "tailwind-merge";

export type PopoverPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

interface PopoverProps {
  /**
   * The trigger handle. Can be a React node or a function providing the current `isOpen` state.
   */
  trigger: ReactNode | ((isOpen: boolean) => ReactNode);
  /**
   * The actual popover content. Can be a React node or a function providing a `close` bound function.
   */
  children: ReactNode | ((close: () => void) => ReactNode);
  position?: PopoverPosition;
  className?: string; // Optional class overriding for the dropdown container
}

export default function Popover({
  trigger,
  children,
  position = "bottom-right",
  className = "",
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});

  const triggerContainerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerContainerRef.current) return;

    // Kalkulasi posisi patokan asal menu
    const triggerRect = triggerContainerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const bodyWidth = document.body.clientWidth;

    const style: React.CSSProperties = {
      position: "absolute",
      margin: 0, // Menimpa browser default margin
      inset: "auto", // Menghapus inset:0 bawaan dari native dialog/popover
    };

    // Calculate Vertical Position (+8px jarak margin ke bawah/atas)
    if (position.includes("bottom")) {
      style.top = `${triggerRect.bottom + scrollY + 8}px`;
    } else {
      style.bottom = `${window.innerHeight - triggerRect.top - scrollY + 8}px`;
    }

    // Calculate Horizontal Position
    if (position.includes("right")) {
      style.right = `${bodyWidth - triggerRect.right}px`;
    } else {
      style.left = `${triggerRect.left}px`;
    }

    setPositionStyle(style);
  }, [position]);

  // Click outside listener & Scroll tracker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Berhubung sekarang dua elemen ini letaknya terpisah (satu di React DOM flow, satu di #top-layer),
      // kita harus mengecek dua ref tersebut.
      if (
        triggerContainerRef.current &&
        !triggerContainerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Otomatis menyeimbangkan jika sedang dibuka dan browser di scroll
    const handleScrollOrResize = () => {
      if (isOpen) calculatePosition();
    };

    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("scroll", handleScrollOrResize, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("scroll", handleScrollOrResize, true);
    };
  }, [isOpen, calculatePosition]);

  // Handle animation exiting & entering (Native + CSS)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let frame1: number;
    let frame2: number;

    const popoverNode = popoverRef.current as any;

    if (isOpen) {
      setIsMounted(true);
      // Mulai sinkronisasi DOM di layar virtual browser
      frame1 = requestAnimationFrame(() => {
        calculatePosition();

        // Panggil spesifikasi native HTML
        if (popoverRef.current) {
          try {
            (popoverRef.current as any).showPopover();
          } catch (e) {
            // diamkan error bila state tidak sesuai browser requirement
          }
        }

        // Jalankan Transition
        frame2 = requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    } else if (isMounted) {
      setIsAnimatingIn(false);
      timer = setTimeout(() => {
        if (popoverRef.current) {
          try {
            (popoverRef.current as any).hidePopover();
          } catch (e) {
            // ignore
          }
        }
        setIsMounted(false);
      }, 200);
    }

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [isOpen, isMounted, calculatePosition]);

  const close = () => setIsOpen(false);

  // Origins for animation
  const originClasses = {
    "bottom-right": "origin-top-right",
    "bottom-left": "origin-top-left",
    "top-right": "origin-bottom-right",
    "top-left": "origin-bottom-left",
  }[position];

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-block"
        ref={triggerContainerRef}
      >
        {typeof trigger === "function" ? trigger(isOpen) : trigger}
      </div>

      {isMounted && (
        <div
          ref={popoverRef}
          popover="manual"
          style={positionStyle}
          className={twMerge(
            "z-[9999] transition-all duration-200 ease-in-out shadow-lg m-0 p-0 border-none block max-w-none max-h-none",
            originClasses,
            isAnimatingIn ? "scale-100 opacity-100" : "scale-95 opacity-0",
            className,
          )}
        >
          {typeof children === "function" ? children(close) : children}
        </div>
      )}
    </>
  );
}
