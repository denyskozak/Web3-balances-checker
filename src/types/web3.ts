import {AbstractProvider, Contract, ContractTransactionResponse} from 'ethers';
import {ContractInterface} from 'ethers/src.ts/contract/types';
import {Coins, ICoinContact} from '../stores/accounts';

// Basic type for Web3 network, for replace to other if it's needed
export interface IWe3NetworkBasic {
    provider: AbstractProvider;
    getContractProvider: (address: string) => Contract;
    getContactBalance: (address: string, contact: ContractInterface) =>  Promise<ContractTransactionResponse>;
    formatUnitsBalance: (coinName: Coins, value: number) => string;
    isAddressValid: (address: string) => boolean;
    coinContracts: ICoinContact;
}

export type Web3NetworksType = 'ethereum';
