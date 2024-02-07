import {Box, TextField} from '@mui/material';
import {Button} from '../../';

interface IAccountFormProps {
    address: string;
    onAddressChange: (value: string) => void;
    onAddressSubmit: () => void;
}

export const AccountForm = (props: IAccountFormProps) => {
    const {
        address,
        onAddressChange,
        onAddressSubmit,
    } = props;

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
            }}
            autoComplete="off"
        >
            <TextField value={address} placeholder="Your etherium address ..." onChange={event => onAddressChange(event.target.value)} />
            <Button onClick={onAddressSubmit}>Check address</Button>
        </Box>

    );
}