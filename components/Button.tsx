import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "tertiary";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}

interface ButtonAsButton extends BaseProps {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

interface ButtonAsLink extends BaseProps {
  as: "a";
  href?: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className = "",
    variant = "primary",
    disabled = false,
  } = props;

  const base =
    "px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase font-narrow inline-flex items-center justify-center transition-all duration-300 transform active:scale-95";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-200 text-white hover:brightness-125 shadow-lg shadow-blue-900/20",
    secondary:
      "bg-gradient-100 text-white hover:brightness-125 shadow-lg shadow-purple-900/20",
    outline: "border border-brand-blue25 text-white hover:bg-brand-blue25/10",
    tertiary: "border border-msblue text-msblue hover:bg-lilac-hover",
  };

  const disabledStyles =
    "opacity-40 cursor-not-allowed pointer-events-none active:scale-100";

  const classes = [
    base,
    variants[variant],
    disabled && disabledStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* ----------------------------
     Anchor version
  ----------------------------- */
  if (props.as === "a") {
    const { href, target, rel } = props;

    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-disabled={disabled}
        className={classes}
      >
        {children}
      </a>
    );
  }

  /* ----------------------------
     Button version (default)
  ----------------------------- */
  const { onClick, type = "button" } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
