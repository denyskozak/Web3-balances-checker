import {AccountBalances} from '../components';
import {useWeb3} from '../hooks';
import {useState} from 'react';

const MainComponent = () => {
    const [accounts, addAddress] = useWeb3();

    const [address, setAddress] = useState('');

    const handleAddAddress = () => {
        addAddress(address)
    }

    return (
        <div>
            <AccountBalances address={address} onAddressChange={setAddress} onAddressSubmit={handleAddAddress}/>
            {JSON.stringify(accounts)}
        </div>
    );
}

export const MainPage = MainComponent;
