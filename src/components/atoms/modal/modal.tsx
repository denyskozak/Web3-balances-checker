import {ReactNode} from 'react';
import {Modal as MaterialModal} from '@mui/material';
import {ModalContainer} from './modal.styles';

interface IModalProps {
    open: boolean,
    onClose: () => {},
    children: ReactNode,
    ariaLabelledby?: string;
    ariaDescribedby?: string;
}

export const Modal = (props: IModalProps) => {
    const { open, onClose, children, ariaLabelledby, ariaDescribedby} = props;

    return (
        <MaterialModal
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
        >
            <ModalContainer>
                {children}
            </ModalContainer>
        </MaterialModal>
    );
}

