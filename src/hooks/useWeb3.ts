import {useContext, useState} from 'react';
import {Web3Context} from '../contexts';
import {addAddressAction, deleteAddressAction, IAccounts} from '../stores/accounts';

interface IWeb3Hook {
    accounts: IAccounts,
    addAddress: (value: string) => Promise<void>;
    deleteAddress: (value: string) => void;
}

export const useWeb3 = (): IWeb3Hook  => {
    const context = useContext(Web3Context);
    const [network, setNetwork] = useState('ETH');

    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Context.Provider')
    }

    const {accounts, dispatch} = context;

    const addAddress = async (value: string) => {
        dispatch(await addAddressAction(value))
    };

    const deleteAddress = (value: string) => {
        dispatch(deleteAddressAction(value))
    };


    return {accounts, addAddress, deleteAddress};
};