import {createContext, Dispatch, ReducerState, useEffect, useReducer} from 'react';
import * as PropsType from 'prop-types';
import {Accounts, accountsReducer, IAccounts, IAccountsAction} from '../stores/accounts';
import {getItemLocalStore, setItemLocalStore} from '../utilities/persistInStore';
import {accountsLocalStoreName} from '../consts';

export interface IWeb3Context {
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

    const initializer = initValue => (getItemLocalStore(accountsLocalStoreName) as Accounts) || initValue;

    const [accounts, dispatch] = useReducer(accountsReducer as ReducerState<Accounts>, {}, initializer);

    useEffect(
        () => {
            setItemLocalStore(accountsLocalStoreName, accounts);
        },
        [accounts]
    );

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