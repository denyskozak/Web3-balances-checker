import {ActionsTypes} from './actions.types';

export type Coins = 'USDT' | 'USDC' | 'DAI'
export type Balances = Record<Coins, number>;
export type Accounts = Record<string, Balances>;

// Actions payloads
export interface BasicAccountPayload {
    address: string,
}

export interface AddAccountPayload extends BasicAccountPayload {
    balances: Balances
}

// Action
export interface IAccountsAction {
    type: ActionsTypes;
    payload: AddAccountPayload | BasicAccountPayload;
}

export type ICoinContact = [Coins, string];
