import {AccountBalances} from '../components';
import {useWeb3} from '../contexts/web3.context';

const MainComponent = () => {
    const [network] = useWeb3();

    return (
        <AccountBalances network={network} />
    );
}

export const MainPage = MainComponent;
