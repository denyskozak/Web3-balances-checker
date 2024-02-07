import {ethers} from 'ethers';

export const getEtherProvider = (url: string) => new ethers.JsonRpcProvider(url);
