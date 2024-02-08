import {ReactNode} from 'react';
import {Box, IconButton, Modal as MaterialModal, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {ModalContainer} from './modal.styles';

interface IModalProps {
    open: boolean,
    onClose: () => void,
    children: ReactNode,
    title?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
}

export const Modal = (props: IModalProps) => {
    const {open, onClose, title, children, ariaLabelledby, ariaDescribedby} = props;

    return (
        <MaterialModal
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
        >
            <ModalContainer>
                <Box display="flex" justifyContent="center" paddingBottom={2}>
                    {title && (
                        <Typography gutterBottom variant="h5">
                            {title}
                        </Typography>
                    )}
                    <IconButton sx={{marginLeft: 'auto'}} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                {children}
            </ModalContainer>
        </MaterialModal>
    );
}

