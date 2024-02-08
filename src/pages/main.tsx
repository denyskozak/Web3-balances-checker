import {useWeb3} from '../hooks';
import {Accounts} from '../components';
import {Container} from './main.styles';
import {EthereumNetwork} from '../utilities/ethereumNetwork';
import {useCallback} from 'react';

const MainComponent = () => {
    const {accounts, addAddress, deleteAddress, updateAccounts} = useWeb3();

    const handleUpdateAccounts = useCallback((list) => updateAccounts(list), []);

    return (
        <Container>
            <Accounts
                accounts={accounts}
                onAddAddress={addAddress}
                onDeleteAddress={deleteAddress}
                onAccountsUpdate={handleUpdateAccounts}
                isAddressValid={EthereumNetwork.isAddressValid}
            />
        </Container>
    );
}

export const MainPage = MainComponent;
