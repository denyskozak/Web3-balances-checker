import {ethers} from 'ethers';
import {ContractInterface} from 'ethers/src.ts/contract/types';
import {Coins, ICoinContact} from '../stores/accounts';
import {erc20Abi} from '../abi';
import {getInfraProviderURL} from './getInfraProviderURL';
import {IWe3NetworkBasic} from '../types';

const coinDecimal: Record<Coins, number> = {
    'USDT': 6,
    'USDC': 6,
    'DAI': 18,
};

const coinContracts: ICoinContact[] = [
    ['USDT', '0xdac17f958d2ee523a2206206994597c13d831ec7'],
    ['USDC', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    ['DAI', '0x6b175474e89094c44da98b954eedeac495271d0f']
];

const provider = new ethers.JsonRpcProvider(getInfraProviderURL());
const getContractProvider = (contact: string) => new ethers.Contract(contact, erc20Abi, provider);
const getContactBalance = (address: string, contact: ContractInterface) => (
    contact.balanceOf(address)
);
const formatUnitsBalance = (coinName: Coins, value: number) => Number(ethers.formatUnits(value, coinDecimal[coinName])).toFixed(2);
const isAddressValid = (address: string) => ethers.isAddress(address);

export const EthereumNetwork: IWe3NetworkBasic = {
    provider,
    getContractProvider,
    getContactBalance,
    formatUnitsBalance,
    isAddressValid,
    coinContracts
};
