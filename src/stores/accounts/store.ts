import {ReducerState, useEffect, useReducer} from 'react';
import {reducer} from './reducer';
import {Accounts} from './types';
import {getItemLocalStore, setItemLocalStore} from '../../utilities/persistInStore';
import {accountsLocalStoreName} from '../../consts';

const initializer = initValue => (getItemLocalStore(accountsLocalStoreName) as Accounts) || initValue;

export const createAccountsStore = () => {
    const [state, dispatch] = useReducer(reducer as ReducerState<Accounts>, {}, initializer);
    
    useEffect(
        () => {
            setItemLocalStore(accountsLocalStoreName, state);
        },
        [state]
    );

    return [state, dispatch];
}