import {EthereumNetwork} from '../utilities/ethereumNetwork';
import {IWe3NetworkBasic, Web3NetworksType} from '../types';

export const Web3Networks: Record<Web3NetworksType, IWe3NetworkBasic> = {
    ethereum: EthereumNetwork
};