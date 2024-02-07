import {useState, useContext, createContext} from 'react';
import * as PropsType from 'prop-types';
import {createAccountsStore} from '../stores/accounts';

interface IWeb3Context {
    network: string;
}

export const Web3Context = createContext<IWeb3Context>({
    network: ''
});

// Hook
export const useWeb3 = () => {
    const context = useContext(Web3Context);

    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Context.Provider')
    }

    const {network} = context;

    return [network];
};

// Component
const Web3Component = (props) => {
    const {
        children,
    } = props;

    const [network, setNetwork] = useState('ETH');
    const [accounts, dispatch] = createAccountsStore();

    return (
        <Web3Context.Provider value={{
            network,
        }}>
            {children}
        </Web3Context.Provider>
    );
};

Web3Component.propTypes = {
    children: PropsType.object.isRequired,
};

export const Web3ContextWrapper = Web3Component;