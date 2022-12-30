import {
    SigningStargateClient,
    defaultRegistryTypes as defaultStargateTypes,
    createProtobufRpcClient, QueryClient
} from "@cosmjs/stargate";
import {getTestnetChainInfo} from "./chainInfo";
import {createRegistry, MsgAuthorizeUrl} from "./basic"


window.onload = async () => {
    let button = document.getElementById("blockchain-account-authorize")
    if(button) button.addEventListener("click", sendVerificationTx)
}

const sendVerificationTx = async () => {
    // Detect Keplr
    const { keplr } = window
    if (!keplr) {
        alert("You need to install Keplr")
        return
    }

    const userID = document.getElementById("user-id").textContent.trim()

    const myRegistry = createRegistry()
    const offlineSigner = window.getOfflineSigner(getTestnetChainInfo().chainId)
    const signingClient = await SigningStargateClient.connectWithSigner(
        getTestnetChainInfo().rpc,
        offlineSigner,
        { registry: myRegistry }
    )

    // Get the address and balance of your user
    const account = (await offlineSigner.getAccounts())[0]
    let sendMsg = {
        typeUrl: MsgAuthorizeUrl,
        value: {
            creator: account.address,
            accountId: userID
        }
    }

    let sendResult = await signingClient.signAndBroadcast(account.address, [sendMsg,],{
            amount: [{ denom: "stake", amount: "1" }],
            gas: "200000",
        },);
    alert(sendResult.height)
}

