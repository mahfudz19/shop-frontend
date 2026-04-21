"use client";

import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { twMerge } from "tailwind-merge";

export type PopoverPosition =
  | "bottom"
  | "top"
  | "left"
  | "right"
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

interface PopoverProps {
  /**
   * Elemen pemicu. Bisa berupa node React atau fungsi yang menyediakan state `isOpen`.
   */
  trigger: ReactNode | ((isOpen: boolean) => ReactNode);
  /**
   * Konten popover. Bisa berupa node React atau fungsi yang menyediakan fungsi `close`.
   */
  children: ReactNode | ((close: () => void) => ReactNode);
  position?: PopoverPosition;
  className?: string; // Kustomisasi kelas container dropdown
  classNameTrigger?: string; // Kustomisasi kelas pembungkus trigger
  lockScroll?: boolean; // Mencegah scrolling pada body saat terbuka
}

export default function Popover({
  trigger,
  children,
  position = "bottom-right",
  className = "",
  classNameTrigger = "cursor-pointer inline-block",
  lockScroll = false,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});

  const triggerContainerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerContainerRef.current) return;

    const triggerRect = triggerContainerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const bodyWidth = document.body.clientWidth;

    const style: React.CSSProperties = {
      position: "absolute",
      margin: 0,
      inset: "auto",
    };

    // 1. Vertical Positioning
    if (position.includes("bottom")) {
      style.top = `${triggerRect.bottom + scrollY + 8}px`;
    } else if (position.includes("top")) {
      style.bottom = `${window.innerHeight - (triggerRect.top + scrollY) + 8}px`;
    } else {
      style.top = `${triggerRect.top + scrollY + triggerRect.height / 2}px`;
      style.transform = "translateY(-50%)";
    }

    // 2. Horizontal Positioning
    if (position === "bottom" || position === "top") {
      style.left = `${triggerRect.left + triggerRect.width / 2}px`;
      style.transform = (style.transform || "") + " translateX(-50%)";
    } else if (position.includes("right")) {
      if (position === "right") {
        style.left = `${triggerRect.right + 8}px`;
      } else {
        style.right = `${bodyWidth - triggerRect.right}px`;
      }
    } else if (position.includes("left")) {
      if (position === "left") {
        style.right = `${bodyWidth - triggerRect.left + 8}px`;
      } else {
        style.left = `${triggerRect.left}px`;
      }
    }

    setPositionStyle(style);
  }, [position]);

  // Handle Lock Scroll
  useEffect(() => {
    if (lockScroll && isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [lockScroll, isOpen]);

  // Click outside listener & Scroll tracker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerContainerRef.current &&
        !triggerContainerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    const handleScrollOrResize = () => {
      if (isOpen) calculatePosition();
    };

    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("scroll", handleScrollOrResize, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleScrollOrResize);
      window.addEventListener("scroll", handleScrollOrResize, true);
    };
  }, [isOpen, calculatePosition]);

  // Handle animation exiting & entering
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let frame1: number;
    let frame2: number;

    if (isOpen) {
      setIsMounted(true);
      frame1 = requestAnimationFrame(() => {
        calculatePosition();
        if (popoverRef.current) {
          try {
            (popoverRef.current as any).showPopover();
          } catch (e) {}
        }
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
          } catch (e) {}
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

  const animationMap = {
    bottom: {
      origin: "origin-top",
      enter: "translate-y-0 opacity-100 scale-100",
      exit: "-translate-y-2 opacity-0 scale-95",
    },
    top: {
      origin: "origin-bottom",
      enter: "translate-y-0 opacity-100 scale-100",
      exit: "translate-y-2 opacity-0 scale-95",
    },
    left: {
      origin: "origin-right",
      enter: "translate-x-0 opacity-100 scale-100",
      exit: "translate-x-2 opacity-0 scale-95",
    },
    right: {
      origin: "origin-left",
      enter: "translate-x-0 opacity-100 scale-100",
      exit: "-translate-x-2 opacity-0 scale-95",
    },
    "bottom-right": {
      origin: "origin-top-right",
      enter: "translate-y-0 opacity-100 scale-100",
      exit: "-translate-y-2 opacity-0 scale-95",
    },
    "bottom-left": {
      origin: "origin-top-left",
      enter: "translate-y-0 opacity-100 scale-100",
      exit: "-translate-y-2 opacity-0 scale-95",
    },
    "top-right": {
      origin: "origin-bottom-right",
      enter: "translate-y-0 opacity-100 scale-100",
      exit: "translate-y-2 opacity-0 scale-95",
    },
    "top-left": {
      origin: "origin-bottom-left",
      enter: "translate-y-0 opacity-100 scale-100",
      exit: "translate-y-2 opacity-0 scale-95",
    },
  }[position];

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={classNameTrigger}
        ref={triggerContainerRef}
      >
        {typeof trigger === "function" ? trigger(isOpen) : trigger}
      </div>

      {isMounted && (
        <div
          ref={popoverRef}
          popover="manual"
          style={positionStyle}
          className="z-[9999] m-0 p-0 border-none block max-w-none max-h-none overflow-visible bg-transparent shadow-none"
        >
          <div
            className={twMerge(
              "transition-all duration-200 ease-out shadow-2xl",
              animationMap.origin,
              isAnimatingIn ? animationMap.enter : animationMap.exit,
              className,
            )}
          >
            {typeof children === "function" ? children(close) : children}
          </div>
        </div>
      )}
    </>
  );
}
