import {Alert, CircularProgress, TextField,} from '@mui/material';
import {Form} from './address-form.styles';
import {Button} from '../../atoms';
import {useEffect, useState} from 'react';

interface IAccountFormProps {
    value: string;
    successMessage?: string;
    errorMessage?: string;
    loading?: boolean;
    onChange: (value: string) => void;
    onValidate: (value: string) => string;
    onSubmit: (value: string) => void;
}

export const AddressForm = (props: IAccountFormProps) => {
    const [value, setValue] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        onSubmit,
        onValidate,
    } = props;

    const handleSubmit = async (value) => {
        setError('');
        setSuccess('');

        const errorMessage = onValidate(value);

        if (errorMessage) {
            return Promise.reject(errorMessage);
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await onSubmit(value);
    };


    return (
        <Form autoComplete="off" onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(value)
                .then(() => {
                    setLoading(false);
                    setSuccess(`Address has added to table: ${value.slice(0, 8)}...`);
                    setValue('');
                })
                .catch((errorMessage) => {
                    setError(errorMessage || 'We encountered error while getting blockchain, try again');
                    setLoading(false);
                });
        }}>
            <TextField
                fullWidth
                error={Boolean(error)}
                helperText={error}
                value={value}
                label="Ethereum address"
                placeholder="0xc375393..."
                onChange={event => setValue(event.target.value)}
            />
            <Button type="submit" disabled={!value}>Start Observing</Button>
            {loading && (<CircularProgress color="primary"/>)}
            {success && (<Alert severity="success">{success}</Alert>)}
        </Form>
    );
}