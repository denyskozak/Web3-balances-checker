export const getInfraProviderURL = () => {
    const INFURA_ID = import.meta.env.VITE_INFURA_ID;
    if (!INFURA_ID) throw new Error('VITE_INFURA_ID is not provide, check, please');
    return `https://mainnet.infura.io/v3/${INFURA_ID}`;
};
