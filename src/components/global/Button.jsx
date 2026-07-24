"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const baseStyles =
  "flex flex-row py-2 px-4 justify-center items-center rounded-full select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue text-xs lg:text-sm transition-transform active:scale-[0.95]";

const variants = {
  primary:
    "bg-lilac text-dark-blue hover:bg-lilac-hover transition-colors gap-2",
  dark:
    "bg-dark-blue text-white hover:bg-msblue transition-colors gap-2",
  secondary:
    "bg-transparent text-lilac border-2 border-lilac-hover hover:bg-lilac-hover hover:text-dark-blue ",
  "primary-light":
    "bg-msblue text-lilac hover:bg-dark-blue transition-colors gap-2",
  "secondary-light":
    "bg-white text-dark-blue border border-dark-blue hover:bg-lilac-hover",
  ghost: "bg-transparent text-lilac hover:text-lilac-hover",
  // Flush ghosts drop the left padding so the label sits flush with the
  // container edge — keeps a ghost button vertically aligned with the
  // content above it. Right padding is retained. pl-0 orders after px-4.
  "ghost-flush": "bg-transparent text-lilac hover:text-lilac-hover pl-0",
  "ghost-light": "bg-transparent text-dark-blue/80 hover:text-dark-blue/60",
  "ghost-light-flush":
    "bg-transparent text-dark-blue/80 hover:text-dark-blue/60 pl-0",
  underline: "bg-transparent underline text-lilac hover:text-lilac-hover",
  "underline-light":
    "bg-transparent underline text-dark-blue hover:text-msblue",
  reveal: "text-lilac-hover hover:text-warning hover:bg-lilac-hover lg:text-sm",
  "reveal-light":
    "text-dark-blue hover:text-msblue hover:bg-msblue/10 lg:text-sm",
  vvip: "gradient-100 text-white shadow-lg shadow-warning/20 gap-2",
  premium: "gradient-200 text-white shadow-lg shadow-msaccent/20 gap-2 max-w-[18.75rem]",
};

export default function Button({
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  iconLeft: IconLeft,
  iconRight: IconRight,
  to, // existing internal prop (kept)
  href, // new prop (external support)
  loading = false,
  target,
  rel,
}) {
  const router = useRouter();

  const destination = href || to;
  const isExternal =
    destination &&
    (destination.startsWith("http://") || destination.startsWith("https://"));

  useEffect(() => {
    if (to && !isExternal) {
      router.prefetch(to);
    }
  }, [to, isExternal, router]);

  const styles = `${baseStyles} ${variants[variant]} ${
    disabled
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "cursor-pointer"
  } ${className}`;

  const leftIcon = loading ? (
    <Loader2 className="w-4 h-4 animate-spin text-current" />
  ) : (
    IconLeft && <IconLeft className="w-4 h-4 text-current" />
  );

  // 🔹 If we have a destination (href or to)
  if (destination && !disabled) {
    // ✅ External link
    if (isExternal) {
      return (
        <a
          href={destination}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          className={styles}
          onClick={onClick}
        >
          {leftIcon}
          {children}
          {IconRight && <IconRight className="w-4 h-4 text-current" />}
        </a>
      );
    }

    // ✅ Internal link
    return (
      <Link
        href={destination}
        className={styles}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
      >
        {leftIcon}
        {children}
        {IconRight && <IconRight className="w-4 h-4 text-current" />}
      </Link>
    );
  }

  // 🔹 Default button
  return (
    <button
      type={type}
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon}
      {children}
      {IconRight && <IconRight className="w-4 h-4 text-current" />}
    </button>
  );
}
