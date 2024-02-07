export const getInfraProviderURL = () => {
    const INFURA_ID = import.meta.env.INFURA_ID;
    return `https://mainnet.infura.io/v3/${INFURA_ID}`;
};
