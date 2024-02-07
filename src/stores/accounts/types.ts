export type Coins = 'USDT' | 'USDC' | 'DAI'
export type Balances = Record<Coins, number>;
export type Accounts = Record<string, Balances>;

export interface IAccountsAction {
    type: string;
    payload: {
        address: string,
        balances: Balances
    }
}

export type ICoinContact = [Coins, string];
