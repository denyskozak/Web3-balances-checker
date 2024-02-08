import {ActionsTypes} from './actions.types';

export type Coins = 'USDT' | 'USDC' | 'DAI'
export type Balances = Record<Coins, number>;
export type Accounts = Record<string, Balances>;

// Actions payloads
export interface DeleteAccountPayload {
    address: string,
}

export interface AddAccountPayload {
    address: string,
    balances: Balances
}

export interface UpdateAccountPayload {
    accounts: Accounts
}

// Action
export interface IAccountsAction<T extends AddAccountPayload | DeleteAccountPayload | UpdateAccountPayload> {
    type: ActionsTypes;
    payload: T;
}

export type ICoinContact = [Coins, string];
