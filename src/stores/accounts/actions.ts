export const GET_ETH_BALANCE_ACCOUNTS = 'GET_ETH_BALANCE_ACCOUNTS';

const erc20Abi = [
    "function balanceOf(address owner) view returns (uint256)"
];

const CoinContracts = [
    ['USDC', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    ['USDT', '0xdac17f958d2ee523a2206206994597c13d831ec7'],
    ['DAI', 'x6b175474e89094c44da98b954eedeac495271d0f']
];


export const getETHBalanceAction = () => {

};
