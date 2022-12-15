import {
    SigningStargateClient,
    defaultRegistryTypes as defaultStargateTypes,
    createProtobufRpcClient, QueryClient
} from "@cosmjs/stargate";
import {getTestnetChainInfo} from "./chainInfo";
import {MsgCreateDocument, MsgClientImpl} from "./ts/tx";
import {EncodeObject, Registry} from "@cosmjs/proto-signing";
import {StdFee} from "@cosmjs/amino";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc/build/tendermint34/tendermint34client";

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

    const myRegistry = new Registry(defaultStargateTypes);
    myRegistry.register("/thesis.thesis.MsgCreateDocument", MsgCreateDocument);
    // Suggest the testnet chain to Keplr
    // await keplr.experimentalSuggestChain(this.getTestnetChainInfo())
    // Create the signing client
    const offlineSigner =
        window.getOfflineSigner(getTestnetChainInfo().chainId)
    const signingClient = await SigningStargateClient.connectWithSigner(
        getTestnetChainInfo().rpc,
        offlineSigner,
        { registry: myRegistry }
    )
    const tendermintClient = await Tendermint34Client.connect(getTestnetChainInfo().rpc)
    const queryClient = await QueryClient.withExtensions(tendermintClient)

    const rpc = createProtobufRpcClient(queryClient)
    let client = new MsgClientImpl(rpc)

    // Get the address and balance of your user
    const account = (await offlineSigner.getAccounts())[0]
    let encObj = {
        typeUrl:"/thesis.thesis.MsgCreateDocument",
        value: {
        creator: account.address, files:["file"]
    }
}
    let sendResult = await signingClient.signAndBroadcast(account.address, [encObj,],{
            amount: [{ denom: "token", amount: "1" }],
            gas: "200000",
        },);
    // Submit the transaction to send tokens to the faucet
    // let sendResult = await signingClient.sendTokens(
    //     account.address,
    //     "cosmos12afzfh2589l0lxrn83g525estj4s2lvr9pmzjk",
    //     [{ denom: "token", amount: "1" }],
    //     {
    //         amount: [{ denom: "token", amount: "1" }],
    //         gas: "200000",
    //     },
    // )


    // let sendResult = await client.CreateDocument({{creator: account.address, files: ["file"]}creator: account.address, files: ["file"]})
    // Print the result to the console
    alert(sendResult)
}

