import {ActionsTypes} from './actions.types';

export type Coins = 'USDT' | 'USDC' | 'DAI'
export type Balances = Record<Coins, number>;
export type Accounts = Record<string, Balances>;

// Actions payloads
export interface IDeleteAccountPayload {
    address: string,
}

export interface IAddAccountPayload {
    address: string,
    balances: Balances
}

export interface IUpdateAccountPayload {
    accounts: Accounts
}

export type AccountsPayload = IAddAccountPayload | IDeleteAccountPayload | IUpdateAccountPayload;

// Action
export interface IAccountsAction<T extends AccountsPayload> {
    type: ActionsTypes;
    payload: T;
}

export type ICoinContact = [Coins, string];
