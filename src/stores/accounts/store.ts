import {ReducerState, useReducer} from 'react';
import {reducer} from './reducer';
import {Accounts} from './types';

export const createAccountsStore = () => {
    const [state, dispatch] = useReducer(reducer, {} as ReducerState<Accounts>);
    return [state, dispatch];
}