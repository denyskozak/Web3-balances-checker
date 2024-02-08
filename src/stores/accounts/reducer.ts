import {Accounts, AddAccountPayload, DeleteAccountPayload, IAccountsAction, UpdateAccountPayload} from './types';
import {ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNTS} from './actions.types';

const handlers = {
    [ADD_ACCOUNT]: (state: Accounts, action: IAccountsAction<AddAccountPayload>) => {
        const {balances, address} = action.payload;

        return {...state, [address]: balances};
    },
    [DELETE_ACCOUNT]: (state: Accounts, action: IAccountsAction<DeleteAccountPayload>) => {
        const { address } = action.payload;
        if (!state[address]) return {...state};

        const newState = {...state};
        delete newState[address];
        return newState;
    },
    [UPDATE_ACCOUNTS]: (state: Accounts, action: IAccountsAction<UpdateAccountPayload>) => {
        const {accounts} = action.payload;
        return {...accounts};
    },

}
export const accountsReducer = (state: Accounts, action: IAccountsAction<unknown>) => {
    return handlers[action.type] ? handlers[action.type](state, action) : {...state};
};