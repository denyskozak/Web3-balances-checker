import MaterialButton from '@mui/material/Button';
import  {ReactNode}  from 'react';

interface IButtonProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
}

export const Button = (props: IButtonProps) => {
    const { children, onClick, className } = props;
    return <MaterialButton  className={className || ''} variant="contained" onClick={onClick}>{children}</MaterialButton>;
};
