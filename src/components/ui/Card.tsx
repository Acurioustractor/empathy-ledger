import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', children, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-lg bg-white';

    const variants = {
      default: 'shadow-sm',
      elevated: 'shadow-md',
      outlined: 'border border-gray-200',
    };

    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
