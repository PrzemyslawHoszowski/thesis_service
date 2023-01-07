import {createRegistry, MsgCreateDocumentUrl} from "./basic";
import {getTestnetChainInfo} from "./chainInfo";
import {SigningStargateClient} from "@cosmjs/stargate";

window.onload = async () => {
    document
        .getElementById("create-document")
        .addEventListener("click", sendCreateDocTx)
}

async function sendCreateDocTx(){
    // Detect Keplr
    const { keplr } = window
    if (!keplr) {
        alert("You need to install Keplr")
        return
    }
    try {
        const myRegistry = createRegistry()
        const offlineSigner = window.getOfflineSigner(getTestnetChainInfo().chainId)
        const signingClient = await SigningStargateClient.connectWithSigner(
            getTestnetChainInfo().rpc,
            offlineSigner,
            {registry: myRegistry}
        )

        // Get the address and balance of your user
        const account = (await offlineSigner.getAccounts())[0]
        let sendMsg = {
            typeUrl: MsgCreateDocumentUrl,
            value: {
                creator: account.address,
                files: []
            }
        }

        let sendResult = await signingClient.signAndBroadcast(account.address, [sendMsg,], {
            amount: [{denom: "stake", amount: "1"}],
            gas: "200000",
        },);
        alert(sendResult.height)
    } catch (error) {
        alert(error)
    }
}