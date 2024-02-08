import {useWeb3} from '../hooks';
import {Accounts} from '../components';
import {Container} from './main.styles';
import {useCallback} from 'react';
import {Web3Networks} from '../consts';

const MainComponent = () => {
    const {accounts, addAddress, deleteAddress, updateAccounts, network} = useWeb3();

    const handleUpdateAccounts = useCallback((list) => updateAccounts(list), []);

    return (
        <Container>
            <Accounts
                accounts={accounts}
                onAddAddress={addAddress}
                onDeleteAddress={deleteAddress}
                onAccountsUpdate={handleUpdateAccounts}
                isAddressValid={Web3Networks[network].isAddressValid}
            />
        </Container>
    );
}

export const MainPage = MainComponent;
