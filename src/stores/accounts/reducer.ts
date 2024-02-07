import {Accounts, IAccountsAction} from './types';
import {ADD_ACCOUNT_BALANCES_ACCOUNTS} from './actions.types';

export const reducer = (state: Accounts, action: IAccountsAction) => {
    switch (action.type) {
        case ADD_ACCOUNT_BALANCES_ACCOUNTS:
            const {address, balances} = action.payload;
            console.log('action: ', action);
            return {...state, [address]: balances};
        default:
            return {...state};
    }
};