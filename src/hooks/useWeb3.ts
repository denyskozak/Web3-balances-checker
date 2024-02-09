import { useContext, useState} from 'react';
import {IWeb3Context, Web3Context} from '../contexts';
import {Web3Networks} from '../consts';
import {Web3NetworksType} from '../types';

import {
    Accounts,
    addAddressAction,
    deleteAddressAction,
    IAccounts,
    updateBalancesAction
} from '../stores/accounts';

interface IWeb3Hook {
    accounts: IAccounts;
    addAddress: (value: string) => Promise<void>;
    deleteAddress: (value: string) => void;
    updateAccounts: (accounts: Accounts) => Promise<void>;
}

export const useWeb3 = (networkName: Web3NetworksType) => {
    const context = useContext<IWeb3Context>(Web3Context);
    // Could be used for change network, in future
    const [network,] = useState(Web3Networks[networkName]);

    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Context.Provider')
    }

    const {accounts, dispatch} = context;

    const addAddress = async (value: string) => {
        dispatch(await addAddressAction(value, network))
    };

    const deleteAddress = (value: string) => {
        dispatch(deleteAddressAction(value))
    };

    const updateAccounts = async (list: Accounts) => {
        dispatch(await updateBalancesAction(list, network))
    };

    return <IWeb3Hook>{accounts, addAddress, deleteAddress, updateAccounts};
};