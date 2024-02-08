import {ReactNode} from 'react';
import {Button as MaterialButton} from '@mui/material';
import {ButtonProps} from '@mui/material/Button/Button';

interface IButtonProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
    type?: ButtonProps['type'];
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
