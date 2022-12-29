import {createRegistry, MsgEditFilesUrl} from "./basic";
import {getTestnetChainInfo} from "./chainInfo";
import {SigningStargateClient} from "@cosmjs/stargate";

window.onload = async () => {
    document.getElementById("select-files-form").addEventListener("submit", sendEditFilesTx)
}


async function sendEditFilesTx(element) {
    element.preventDefault()
    const {keplr} = window
    if (!keplr) {
        alert("You need to install Keplr")
        return
    }
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
        typeUrl: MsgEditFilesUrl,
        value: {
            creator: account.address,
            documentId: getDocumentId(),
            files: getSelectedFiles()
        }
    }

    let sendResult = await signingClient.signAndBroadcast(account.address, [sendMsg,], {
        amount: [{denom: "stake", amount: "1"}],
        gas: "200000",
    },);
    alert(sendResult.height)
}

function getDocumentId(){
    return document.getElementById("document-id-data").innerText
}

//https://stackoverflow.com/questions/590018/getting-all-selected-checkboxes-in-an-array
function getSelectedFiles(){
    let array = []
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (let i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].id)
    }
    alert(array)
    return array
}