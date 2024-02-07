import {ADD_ACCOUNT, DELETE_ACCOUNT} from './actions.types';

import {Coins} from './types';
import {EthereumNetwork} from '../../utilities/ethereumNetwork';
import {IWe3NetworkBasic} from '../../types';

const {
    getContractProvider,
    getContactBalance,
    formatUnitsBalance,
    coinContracts
} = EthereumNetwork as IWe3NetworkBasic;

// create provider
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
        type: ADD_ACCOUNT,
        payload: {
            address,
            balances: Object.fromEntries(formatBalances)
        }
    }
};

export const deleteAddressAction = (address: string) => ({
    type: DELETE_ACCOUNT,
    payload: {
        address,
    }
});