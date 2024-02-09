import {useWeb3} from '../hooks';
import {Accounts} from '../components';
import {Container} from './main.styles';
import {useCallback, useState} from 'react';
import {Web3Networks} from '../consts';
import {Web3NetworksType} from '../types';

const MainComponent = () => {
    const [networkName] = useState<Web3NetworksType>('ethereum')
    const {accounts, addAddress, deleteAddress, updateAccounts} = useWeb3(networkName);

    const handleUpdateAccounts = useCallback((list) => updateAccounts(list), [updateAccounts]);

    return (
        <Container>
            <Accounts
                accounts={accounts}
                onAddAddress={addAddress}
                onDeleteAddress={deleteAddress}
                onAccountsUpdate={handleUpdateAccounts}
                isAddressValid={Web3Networks[networkName].isAddressValid}
            />
        </Container>
    );
}

export const MainPage = MainComponent;
