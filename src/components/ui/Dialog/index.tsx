import React, { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./styles.module.css";

// Define a type for polymorphic components
type PolymorphicProps<T extends ElementType, Props = {}> = {
  as?: T;
} & Props &
  Omit<ComponentPropsWithoutRef<T>, keyof Props | "as">;

export function DialogTrigger<T extends ElementType = "button">({
  as,
  id,
  children,
  className,
  ...props
}: PolymorphicProps<
  T,
  {
    id: string;
    children: ReactNode;
    className?: string;
  }
>) {
  const Component = as || "button";
  // @ts-ignore - popoverTarget is a new HTML attribute
  return (
    <Component
      popoverTarget={id}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export default function Dialog<T extends ElementType = "div">({
  as,
  id,
  children,
  className,
  ...props
}: PolymorphicProps<
  T,
  {
    id: string;
    children: ReactNode;
    className?: string;
  }
>) {
  const Component = as || "div";
  return (
    <Component
      id={id}
      // @ts-ignore - popover is a new HTML attribute
      popover="auto"
      className={`${styles.dialog} ${className || ""}`}
      {...props}
    >
      <button
        // @ts-ignore
        popoverTarget={id}
        popoverTargetAction="hide"
        className={styles.closeButton}
      >
        ✕
      </button>
      <div className={styles.content}>{children}</div>
    </Component>
  );
}
