import {getTestnetChainInfo} from "./chainInfo";

window.onload = async () => {
    const {keplr} = window
    if (!keplr) {
        alert("You need to install Keplr")
        return
    }

    await window.keplr.experimentalSuggestChain(getTestnetChainInfo())
    const chainId = "thesis";
    await keplr.enable(chainId);

    const offlineSigner = window.getOfflineSigner(getTestnetChainInfo().chainId)
    const account = (await offlineSigner.getAccounts())[0]

    document.getElementById("blockchain-address").value=account.address
    document.getElementById("submit-blockchain-address").disabled = false
}
