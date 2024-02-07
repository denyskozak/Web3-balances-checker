import {useMemo, useState} from 'react';

import {useWeb3} from '../hooks';
import {Modal, AccountForm, AccountCard, Button} from '../components';
import {Accounts} from '../stores/accounts';
import {Box} from '@mui/material';

const MainComponent = () => {
    const {accounts, addAddress, deleteAddress} = useWeb3();
    const [address, setAddress] = useState('');
    const [modalState, setModalState] = useState(false);

    const list = useMemo(() => Object.entries(accounts as Accounts), [accounts])
    const handleAddAddress = async () => {
        if (address) {
            await addAddress(address.trim())
        }
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box>
                <Button onClick={() => setModalState(true)}>Observe new Ethereum address</Button>
            </Box>

            {list.map(
                ([address, balances]) =>
                    <AccountCard
                        key={address}
                        address={address}
                        list={Object.entries(balances)}
                        actions={<Button onClick={() => deleteAddress(address)} size="small">Delete</Button>}
                    />
            )}

            <Modal
                open={modalState}
                onClose={() => setModalState(false)}
                ariaLabelledby="Account adding modal"
                ariaDescribedby="In the modal you present your account to get coin prices"
            >
                <AccountForm address={address} onAddressChange={setAddress} onAddressSubmit={handleAddAddress}/>
            </Modal>
        </Box>
    );
}

export const MainPage = MainComponent;
