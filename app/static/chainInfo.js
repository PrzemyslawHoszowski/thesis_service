export const getTestnetChainInfo = () => {
    return {
    chainId: "thesis",
    chainName: "Thesis",
    rpc: "http://" + location.hostname + ":26657",
    rest: "http://" + location.hostname + ":1317",
    bip44: {
        coinType: 118,
    },
    nodeProvider: {
        name: "Przemysław Hoszowski",
        email: "przemyslaw.hoszowski@gmail.com"
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
        coinDenom: "stake",
        coinMinimalDenom: "stake",
        coinDecimals: 0,
        coinGeckoId: "cosmos",
        },
    ],
    feeCurrencies: [
        {
        coinDenom: "stake",
        coinMinimalDenom: "stake",
        coinDecimals: 0,
        coinGeckoId: "thesis",
        gasPriceStep: {
            low: 0.000005,
            average: 0.000005,
            high: 0.000005,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "stake",
        coinMinimalDenom: "stake",
        coinDecimals: 0,
        coinGeckoId: "thesis",
    },
}}
