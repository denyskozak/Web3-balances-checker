import {useContext, useState} from 'react';
import {Web3Context} from '../contexts';
import {Accounts, addAddressAction, deleteAddressAction, IAccounts, updateBalancesAction} from '../stores/accounts';
import {Web3NetworksType} from '../types';

interface IWeb3Hook {
    network: string,
    accounts: IAccounts,
    addAddress: (value: string) => Promise<void>;
    deleteAddress: (value: string) => void;
    updateAccounts: (accounts: Accounts) => Promise<void>;
}

export const useWeb3 = (): IWeb3Hook  => {
    const context = useContext(Web3Context);
    // Could be used for change network, in future
    const [network,] = useState<Web3NetworksType>('ethereum');

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

    return {accounts, addAddress, deleteAddress, updateAccounts, network};
};