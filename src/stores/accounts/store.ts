import {useReducer} from 'react';
import {reducer} from './reducer';

export const createAccountsStore = () => {
    const [state, dispatch] = useReducer(reducer, [], (store) => store);

    return [state, dispatch];
}