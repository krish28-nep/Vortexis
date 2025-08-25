import { LoaderCircle } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export type Variant = 'primary' | 'neutral' | 'outline' | 'ghost' | 'danger';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  text: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  external?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-secondary-500 hover:bg-secondary-200 text-neutral-light shadow-neutral shadow-sm',
  neutral: 'bg-neutral-light hover:bg-neutral text-neutral-darker shadow-neutral shadow-sm',
  outline: 'bg-transparent border border-neutral hover:bg-neutral/10 text-neutral-dark',
  ghost: 'bg-transparent hover:bg-neutral-dark/10',
  danger: 'bg-danger hover:bg-danger-dark text-neutral-light shadow-sm shadow-neutral',
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  text,
  icon,
  isLoading = false,
  loadingText,
  disabled = false,
  className,
  href,
  external = false,
  ...rest
}) => {
  const classes = `flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 font-medium transition-all duration-300 active:scale-95 ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <>
          {icon ? (
            <div className="flex gap-2">
              <span className="h-4 w-4">{icon}</span> <span>{text}</span>
            </div>
          ) : (
            <span>{loadingText ?? 'Loading...'}</span>
          )}
          <LoaderCircle className="h-4 w-4 animate-spin" />
        </>
      ) : icon ? (
        <div className="flex items-center gap-2">
          <span className="h-4 w-4">{icon}</span> <span>{text}</span>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </>
  );

  // 🔁 Decide between button, internal link, or external anchor
  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled || isLoading} className={classes} {...rest}>
      {content}
    </button>
  );
};

export { Button };
