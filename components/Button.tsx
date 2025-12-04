
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-dark';
  to?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  title?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  to, 
  href,
  onClick, 
  className = '',
  type = 'button',
  fullWidth = false,
  title,
  disabled
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-jalwa-black focus:ring-jalwa-gold disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-jalwa-gold text-black hover:bg-white hover:text-black shadow-lg shadow-amber-900/20",
    secondary: "bg-neutral-800 text-white hover:bg-neutral-700",
    outline: "border border-jalwa-gold text-jalwa-gold hover:bg-jalwa-gold hover:text-black",
    'outline-dark': "border border-black text-black hover:bg-black hover:text-white",
  };

  const sizes = "py-3 px-8 text-sm md:text-base";
  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseStyles} ${variants[variant]} ${sizes} ${widthClass} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} title={title} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} title={title} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} title={title} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
