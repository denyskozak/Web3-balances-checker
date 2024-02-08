import {useEffect, useMemo, useState} from 'react';
import {Button, Table} from '../../';
import {Accounts as IAccounts} from '../../../stores/accounts';
import {AddressForm} from '../';
import {Modal} from '../../atoms';
import {Accounts as AccountType} from '../../../types';
import {Alert, Box} from '@mui/material';

interface IAccountsProps {
    accounts: IAccounts,
    onAddAddress: (value) => Promise<void>,
    onDeleteAddress: (value) => void,
    isAddressValid: (value) => boolean,
    onAccountsUpdate: (accounts: AccountType) => Promise<void>,
}

let timerId = null;
export const Accounts = (props: IAccountsProps) => {
    const {accounts, onAddAddress, onDeleteAddress, isAddressValid, onAccountsUpdate} = props;

    const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
    const [error, setError] = useState('');
    const [modalState, setModalState] = useState(false);

    const headCells = [
        {title: 'Address', key: 'id'},
        {title: 'USDT', key: 'USDT'},
        {title: 'USDC', key: 'USDC'},
        {title: 'DAI', key: 'DAI'},
        {title: '', key: 'actions'}
    ];

    const validateFormHandler = (value: string) => {
        if (Object.keys(accounts).includes(value)) {
            return 'Current address already added';
        }

        if (!isAddressValid(value)) {
            return 'Your address is not valid';
        }

        return '';
    };
    const renderDeleteButton = address => <Button size="small" onClick={() => handleDelete(address)}>Delete</Button>;

    const list = useMemo(() =>
            Object.entries(accounts as IAccounts)
                .map(([address, balances]) => (
                    {
                        id: address,
                        actions: renderDeleteButton(address),
                        ...balances
                    })),
        [accounts]);

    // Refresh balances every 20 sec
    useEffect(() => {
        if (Object.keys(accounts).length === 0) return;
        const sec = 10;

        const startRefreshTimeout = () => setTimeout(() => {
            onAccountsUpdate(accounts)
                .then(() => {
                    setHasBeenUpdated(true);
                    timerId = startRefreshTimeout();
                })
                .catch(() => setError('Background accounts refresh error'));
        }, sec * 1000);

        timerId = startRefreshTimeout();
        return () => timerId ? clearTimeout(timerId) : null;
    }, [accounts])

    useEffect(() => {
        if (hasBeenUpdated) setTimeout(() => setHasBeenUpdated(!hasBeenUpdated), 4 * 1000);
    }, [hasBeenUpdated]);

    useEffect(() => {
        if (error) setTimeout(() => setError(''), 4 * 1000);
    }, [error]);

    const handleDelete = (address: string) => {
        const result = window.confirm(`Are you sure, with to delete: ${address}`);
        if (result) onDeleteAddress(address);
    };


    return (
        <Box display="flex" flexDirection="column" gap={4} justifyContent="center" alignItems="center">
            {/*Add button*/}
            <Button onClick={() => setModalState(true)}>Observe new Ethereum address</Button>
            {/*Table*/}
            {list.length > 0 ? <Table headCells={headCells} bodyCells={list}/> : null}
            {hasBeenUpdated && (<Alert severity="success">Balances has been updated</Alert>)}
            {error && (<Alert severity="error">{error}</Alert>)}

            <Modal
                open={modalState}
                onClose={() => setModalState(false)}
                title={'Add new address'}
                ariaLabelledby="Account adding modal"
                ariaDescribedby="In the modal you present your account to get coin prices"
            >
                <AddressForm
                    onValidate={validateFormHandler}
                    onSubmit={onAddAddress}
                />
            </Modal>
        </Box>
    );
}

