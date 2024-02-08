import {ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNTS} from './actions.types';

import {Accounts, Coins} from './types';
import {IWe3NetworkBasic, Web3NetworksType} from '../../types';
import {Web3Networks} from '../../consts';

const getMappersByNetwork = (web3Network: IWe3NetworkBasic) => ({
    mapGetContractProvider: ([coin, contact]) => ([
        coin,
        web3Network.getContractProvider(contact)
    ]),
    mapGetContactBalance: (address) => async ([coin, contract]) => ([
        coin,
        await web3Network.getContactBalance(address, contract)
    ]),
    mapFormatUnitsBalance: ([coin, balance]: [Coins, number]) => ([
        coin,
        web3Network.formatUnitsBalance(coin, balance)
    ])
});

export const addAddressAction = async (address: string, networkName: Web3NetworksType) => {
    console.log('networkName: ', networkName); 
    console.log('Web3Networks: ', Web3Networks); 
    const network = Web3Networks[networkName];
    const { coinContracts } = network;

    const {
        mapGetContractProvider,
        mapGetContactBalance,
        mapFormatUnitsBalance,
    } = getMappersByNetwork(network);

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

export const updateBalancesAction = async (accounts: Accounts, networkName: Web3NetworksType) => {
    const network = Web3Networks[networkName];
    const { coinContracts } = network;

    const {
        mapGetContractProvider,
        mapGetContactBalance,
        mapFormatUnitsBalance,
    } = getMappersByNetwork(network);

    const entries = Object.entries(accounts);
    const mapWithAddressIds = (balance, index) => [entries[index][0], Object.fromEntries(balance)];

    const accountsRequests = entries.map(
        ([address, balances]) => coinContracts
            .map(mapGetContractProvider)
            .map(mapGetContactBalance(address))
    );

    const balancesRequest = accountsRequests.map(items => Promise.all(items));
    const balances = await Promise.all(balancesRequest);

    const formatBalances = balances.map(item => item.map(mapFormatUnitsBalance));
    const newAccountsEntries  = formatBalances.map(mapWithAddressIds);

    return {
        type: UPDATE_ACCOUNTS,
        payload: {
            accounts:  Object.fromEntries(newAccountsEntries),
        }
    }
};

export const deleteAddressAction = (address: string) => ({
    type: DELETE_ACCOUNT,
    payload: {
        address,
    }
});