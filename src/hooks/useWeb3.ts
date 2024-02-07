import {useContext} from 'react';
import {Web3Context} from '../contexts';
import {addAddressAction, IAccounts} from '../stores/accounts';

interface IWeb3Hook {
    accounts: IAccounts,
    addAddress: (value: string) => void;
}

export const useWeb3 = () => {
    const context = useContext(Web3Context);

    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Context.Provider')
    }

    const {accounts, dispatch} = context;

    const addAddress = async (value: string) => {
        dispatch(addAddressAction(value))
    };


    return [accounts, addAddress];
};