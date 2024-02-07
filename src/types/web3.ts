import {AbstractProvider, Contract, ContractTransactionResponse} from 'ethers';
import {ContractInterface} from 'ethers/src.ts/contract/types';
import {Coins, ICoinContact} from '../stores/accounts';

// In the future, we can implement other network from this interface.
export interface IWe3NetworkBasic {
    provider: AbstractProvider;
    getContractProvider: (address: string) => Contract;
    getContactBalance: (address: string, contact: ContractInterface) =>  Promise<ContractTransactionResponse>;
    formatUnitsBalance: (coinName: Coins, value: number) => string;
    coinContracts: ICoinContact;
}