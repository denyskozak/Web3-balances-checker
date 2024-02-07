import {useState, useContext, createContext, DispatchWithoutAction, Dispatch} from 'react';
import * as PropsType from 'prop-types';
import {addAddressAction, createAccountsStore, IAccounts, IAccountsAction} from '../stores/accounts';

interface IWeb3Context {
    accounts: IAccounts;
    dispatch: Dispatch<IAccountsAction>
}

export const Web3Context = createContext<IWeb3Context>({
    accounts: {},
    dispatch: () => {}
});

// Component
const Web3Component = (props) => {
    const {
        children,
    } = props;

    const [network, setNetwork] = useState('ETH');
    const [accounts, dispatch] = createAccountsStore();

    const dispatchWithPromise = (actionResult: IAccountsAction | Promise<IAccountsAction>) => {
        if (actionResult instanceof Promise<IAccountsAction>) {
            actionResult.then(dispatch).catch(() => console.error('Action promise rejected'));
            return;
        }
        dispatch(actionResult);
    };

    return (
        <Web3Context.Provider value={{
            accounts,
            dispatch: dispatchWithPromise
        }}>
            {children}
        </Web3Context.Provider>
    );
};

Web3Component.propTypes = {
    children: PropsType.object.isRequired,
};

export const Web3ContextWrapper = Web3Component;