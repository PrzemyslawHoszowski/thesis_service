
export const getTestnetChainInfo = () => ({
    chainId: "thesis",
    chainName: "thesis",
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmos" + "pub",
        bech32PrefixValAddr: "cosmos" + "valoper",
        bech32PrefixValPub: "cosmos" + "valoperpub",
        bech32PrefixConsAddr: "cosmos" + "valcons",
        bech32PrefixConsPub: "cosmos" + "valconspub",
    },
    currencies: [
        {
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
            coinDecimals: 0,
        },
        {
            coinDenom: "TOKEN",
            coinMinimalDenom: "mtoken",
            coinDecimals: 3,
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "TOKEN",
            coinMinimalDenom: "mtoken",
            coinDecimals: 3,
        },
    ],
    stakeCurrency: {
        coinDenom: "STAKE",
        coinMinimalDenom: "stake",
        coinDecimals: 0,
    },
    coinType: 118,
    gasPriceStep: {
        low: 1,
        average: 2,
        high: 3,
    },
    features: ["stargate",  "no-legacy-stdTx"],
})
