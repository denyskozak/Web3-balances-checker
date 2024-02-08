import {ReactNode} from 'react';
import {Button as MaterialButton} from '@mui/material';

interface IButtonProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    size?: 'small' | 'medium';
    variant?: 'contained' | 'outlined';
    type?: 'button' | 'submit';
}

export const Button = (props: IButtonProps) => {
    const {
        children,
        onClick,
        className,
        type = 'button',
        size = 'medium',
        variant = 'outlined',
        disabled = false
    } = props;

    return <MaterialButton
        className={className || ''}
        disabled={disabled}
        variant={variant}
        size={size}
        type={type}
        onClick={onClick}>
        {children}
    </MaterialButton>;
};
