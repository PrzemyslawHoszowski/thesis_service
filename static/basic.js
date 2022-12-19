import {SigningStargateClient} from "@cosmjs/stargate";
import { ChainInfo, Window as KeplrWindow } from "@keplr-wallet/types"
import {getTestnetChainInfo} from "./chainInfo";

window.onload = async () => {
    if (!keplr) {
        alert("Please install keplr extension");
    } else {

        await window.keplr.experimentalSuggestChain(getTestnetChainInfo())
        const chainId = "thesis";
        const {keplr} = window
        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        await keplr.enable(chainId);
        // await keplr.experimentalSuggestChain(getTestnetChainInfo())
        const offlineSigner = keplr.getOfflineSigner(chainId);

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts();




        // // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        // const cosmJS = new SigningStargateClient(
        //     "https://lcd-cosmoshub.keplr.app",
        //     accounts[0].address,
        //     offlineSigner,
        // );
    }
}
