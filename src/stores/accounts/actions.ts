import {ethers} from 'ethers';
import {ContractInterface} from 'ethers/src.ts/contract/types';

import {erc20Abi} from '../../abi';
import {getInfraProviderURL} from '../../utilities/getInfraProviderURL';
import {ADD_ACCOUNT_BALANCES_ACCOUNTS} from './actions.types';
import {getEtherProvider} from '../../utilities/getEtherProvider';

import {Coins, ICoinContact} from './types';

const coinContracts: ICoinContact[] = [
    ['USDT', '0xdac17f958d2ee523a2206206994597c13d831ec7'],
    ['USDC', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    ['DAI', '0x6b175474e89094c44da98b954eedeac495271d0f']
];

const coinDecimal: Record<Coins, number> = {
    'USDT': 6,
    'USDC': 6,
    'DAI': 18,
};

// create provider
const provider = getEtherProvider(getInfraProviderURL());

// Functions
const getContractProvider = (contact: string) => new ethers.Contract(contact, erc20Abi, provider);
const getContactBalance = (address: string, contact: ContractInterface) => (
    contact.balanceOf(address)
);
const formatUnitsBalance = (coinName: Coins, value: number) => ethers.formatUnits(value, coinDecimal[coinName]);

const mapGetContractProvider = ([coin, contact]) => ([
    coin,
    getContractProvider(contact)
]);

// Mappers
const mapGetContactBalance = (address) => async ([coin, contract]) => ([
    coin,
    await getContactBalance(address, contract)
])

const mapFormatUnitsBalance = ([coin, balance]: [Coins, number]) => ([
    coin,
    formatUnitsBalance(coin, balance)
])

export const addAddressAction = async (address: string) => {
    const balanceRequests = coinContracts
        .map(mapGetContractProvider)
        .map(mapGetContactBalance(address))

    const balances = await Promise.all(balanceRequests);
    const formatBalances = balances.map(mapFormatUnitsBalance)

    return {
        type: ADD_ACCOUNT_BALANCES_ACCOUNTS,
        payload: {
            address,
            balances: Object.fromEntries(formatBalances)
        }
    }
};
