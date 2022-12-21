import {
    SigningStargateClient,
    defaultRegistryTypes as defaultStargateTypes,
    createProtobufRpcClient, QueryClient
} from "@cosmjs/stargate";
import {getTestnetChainInfo} from "./chainInfo";
import {MsgCreateDocument, MsgClientImpl, MsgAuthorize} from "./ts/tx";
import {EncodeObject, Registry} from "@cosmjs/proto-signing";
import {StdFee} from "@cosmjs/amino";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc/build/tendermint34/tendermint34client";

window.onload = async () => {
    document
        .getElementById("blockchain-account-authorize")
        .addEventListener("click", sendVerificationTx)
}

const sendVerificationTx = async () => {
    // Detect Keplr
    const { keplr } = window
    if (!keplr) {
        alert("You need to install Keplr")
        return
    }

    const userID = document.getElementById("user-id").textContent.trim()

    const myRegistry = new Registry(defaultStargateTypes);
    myRegistry.register("/thesis.thesis.MsgCreateDocument", MsgCreateDocument);
    myRegistry.register("/thesis.thesis.MsgAuthorize", MsgAuthorize);
    const offlineSigner = window.getOfflineSigner(getTestnetChainInfo().chainId)
    const signingClient = await SigningStargateClient.connectWithSigner(
        getTestnetChainInfo().rpc,
        offlineSigner,
        { registry: myRegistry }
    )

    // Get the address and balance of your user
    const account = (await offlineSigner.getAccounts())[0]
    let sendMsg = {
        typeUrl: "/thesis.thesis.MsgAuthorize",
        value: {
            creator: account.address,
            accountId: userID
        }
    }

    let sendResult = await signingClient.signAndBroadcast(account.address, [sendMsg,],{
            amount: [{ denom: "stake", amount: "1" }],
            gas: "200000",
        },);
    alert(sendResult)
}

