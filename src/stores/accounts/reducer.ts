import {Accounts, IAccountsAction} from './types';
import {ADD_ACCOUNT, DELETE_ACCOUNT} from './actions.types';

export const reducer = (state: Accounts, action: IAccountsAction) => {
    const {address} = action.payload;

    switch (action.type) {
        case ADD_ACCOUNT:
            const { balances} = action.payload;
            return {...state, [address]: balances};
        case DELETE_ACCOUNT:
            console.log('newState: ', state, address);

            if (!state.hasOwnProperty(address)) return { ...state };
            const newState =  {...state};
            delete newState[address];
            return newState;
        default:
            return {...state};
    }
};