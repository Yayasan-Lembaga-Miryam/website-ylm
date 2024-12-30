import { ReactNode } from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger';
    appearance?: 'filled' | 'outline';
    display?: 'text-only' | 'icon-only' | 'text-icon';
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export default function Button({
    variant,
    appearance = 'filled',
    display = 'text-only',
    icon,
    iconPosition = 'left',
    className = '',
    disabled,
    children,
    onClick,
    type = 'button',
    ...props
}: ButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center rounded-md text-xs font-semibold  tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
        primary: {
            filled: 'bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-700 focus:ring-indigo-500 active:bg-gray-900 border border-transparent',
            outline:
                'border border-gray-800 text-gray-800 hover:bg-gray-50 focus:ring-gray-500',
        },
        secondary: {
            filled: 'bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:ring-indigo-500',
            outline:
                'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        },
        danger: {
            filled: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 active:bg-red-700 border border-transparent',
            outline:
                'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
        },
    };

    const paddingStyles = display === 'icon-only' ? 'px-2 py-2' : 'px-4 py-2';

    const buttonStyles = `${baseStyles} ${
        variant ? variantStyles[variant][appearance] : ''
    } ${paddingStyles} ${
        disabled ? 'opacity-25 cursor-not-allowed' : ''
    } ${className}`;

    const iconWrapperStyles =
        display === 'text-icon' && children
            ? iconPosition === 'left'
                ? 'mr-2'
                : 'ml-2'
            : '';

    const iconElement = icon && display !== 'text-only' && (
        <span className={`inline-flex items-center ${iconWrapperStyles}`}>
            {icon}
        </span>
    );

    const textElement = display !== 'icon-only' && children;

    return (
        <button
            type={type}
            onClick={onClick}
            className={buttonStyles}
            disabled={disabled}
            {...props}
        >
            {iconPosition === 'left' && iconElement}
            {textElement}
            {iconPosition === 'right' && iconElement}
        </button>
    );
}
