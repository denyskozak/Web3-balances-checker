import {createContext, Dispatch} from 'react';
import * as PropsType from 'prop-types';
import {createAccountsStore, IAccounts, IAccountsAction} from '../stores/accounts';

interface IWeb3Context {
    accounts: IAccounts;
    dispatch: Dispatch<IAccountsAction>
}

export const Web3Context = createContext<IWeb3Context>({
    accounts: {},
    dispatch: () => {
    }
});

// Component
const Web3Component = (props) => {
    const {
        children,
    } = props;

    const [accounts, dispatch] = createAccountsStore();

    return (
        <Web3Context.Provider value={{
            accounts,
            dispatch
        }}>
            {children}
        </Web3Context.Provider>
    );
};

Web3Component.propTypes = {
    children: PropsType.object.isRequired,
};

export const Web3ContextWrapper = Web3Component;