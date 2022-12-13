
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

import { SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc"
import {getTestnetChainInfo} from "./chainInfo";
import {Coin} from "cosmjs-types/cosmos/base/v1beta1/coin";

async function sendVerificationTx() {
  alert("sending tx");
  const {keplr} = window;

  await fun();
}
window.onload = async () => {
    document
        .getElementById("blockchain-account-authorize")
        .addEventListener("click", sendVerificationTx)
}


const fun = async () => {
    // Detect Keplr
    const { keplr } = window
    if (!keplr) {
        alert("You need to install Keplr")
        return
    }
    // Suggest the testnet chain to Keplr
    // await keplr.experimentalSuggestChain(this.getTestnetChainInfo())
    // Create the signing client
    const offlineSigner =
        window.getOfflineSigner(getTestnetChainInfo().chainId)
    const signingClient = await SigningStargateClient.connectWithSigner(
        getTestnetChainInfo().rpc,
        offlineSigner,
    )
    // Get the address and balance of your user
    const account = (await offlineSigner.getAccounts())[0]
    // Submit the transaction to send tokens to the faucet
    const sendResult = await signingClient.sendTokens(
        account.address,
        "cosmos12afzfh2589l0lxrn83g525estj4s2lvr9pmzjk",
        [{ denom: "token", amount: "1" }],
        {
            amount: [{ denom: "token", amount: "1" }],
            gas: "200000",
        },
    )
    // Print the result to the console
    alert(sendResult.rawLog)
}

