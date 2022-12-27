import {createRegistry, MsgAddUsersUrl, MsgRemoveUsersUrl, MsgSignDocumentUrl} from "./basic";
import {getTestnetChainInfo} from "./chainInfo";
import {SigningStargateClient} from "@cosmjs/stargate";
import {fromBech32} from "@cosmjs/encoding";

window.onload = async () => {
    if(canChangeRole()) {
        let addElementButtons = document.getElementsByClassName("expand-role");
        for (let i = 0; i < addElementButtons.length; i++) {
            addElementButtons[i].addEventListener('click', expandRoles, false);
        }

        let addToRoleButtons = document.getElementsByClassName("add-to-role");
        for (let i = 0; i < addToRoleButtons.length; i++) {
            addToRoleButtons[i].addEventListener('click', SendAddToRoleTx, false);
        }

        let existingRoles = document.getElementsByClassName("existing-role")
        for (let i = 0; i < existingRoles.length; i++){
            existingRoles[i].addEventListener('click', markToDelete, false)
        }

        let removeUsersButtons = document.getElementsByClassName("remove-from-role")
        for (let i = 0; i < removeUsersButtons.length; i++){
            removeUsersButtons[i].addEventListener('click', sendRemoveUserTx, false)
        }

    }
    let signButton = document.getElementById("sign-button")
    if (signButton){
        signButton.addEventListener('click', sendSignDocumentTx, false);
    }
}

function createInputField(roleName){
    let newRow = document.createElement("tr")
    newRow.setAttribute("class", "new-role")
    newRow.innerHTML = "<td><input class=\"address-input\" name=\"" + roleName + "-input\" maxlength=\"45\">" +
        "<button class=\"expand-role\" name=\""+ roleName + "\">+</button></td>"
    newRow.getElementsByClassName("expand-role")[0].addEventListener('click', expandRoles)
    return newRow
}
function expandRoles(element){
    let name = element.target.name;
    element.target.remove();
    document.getElementById("role-table-body-" + name)
        .appendChild(createInputField(name))
}

async function SendAddToRoleTx(element) {
    let name = element.target.name;
    let input = document.getElementsByName(name + "-input");
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
        typeUrl: MsgAddUsersUrl,
        value: {
            creator: account.address,
            documentId: getDocumentId(),
            role: name[0].toUpperCase() + name.substring(1) + "s",
            addresses: getAddresses(input)
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

function getAddresses(input){
    return Array.from(input).map(htmlElement => htmlElement.value).filter(address => address.length == 45).map(validateAddress)
}

function getAddressesToDelete(target){
    let tmp = Array.from(target.parentElement.getElementsByClassName("to-delete"))
            .map(tdEl => filterAddresses(tdEl.getElementsByTagName("span"))[0].innerHTML)
    alert(tmp[0])
    return tmp
}

function filterAddresses(htmlList){
    return Array.from(htmlList).filter(el => el.getAttribute("name") == "blockchain-address")
}

function validateAddress(address){
    fromBech32(address)
    alert(address)
    return address
}

function getLastEditHeight(){
    return document.getElementById("height-data").innerText
}

function canChangeRole(){
    return document.getElementById("can-change-role") != null
}

function markToDelete(el){
    el.currentTarget.classList.toggle("to-delete")
}

async function sendRemoveUserTx(element) {
    let name = element.target.name;
    let input = document.getElementsByName(name + "-input");
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
        typeUrl: MsgRemoveUsersUrl,
        value: {
            creator: account.address,
            documentId: getDocumentId(),
            role: name[0].toUpperCase() + name.substring(1) + "s",
            addresses: getAddressesToDelete(element.target)
        }
    }

    let sendResult = await signingClient.signAndBroadcast(account.address, [sendMsg,], {
        amount: [{denom: "stake", amount: "1"}],
        gas: "200000",
    },);
    alert(sendResult.height)
}

async function sendSignDocumentTx() {
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
        typeUrl: MsgSignDocumentUrl,
        value: {
            creator: account.address,
            documentId: getDocumentId(),
            lastEditHeight: getLastEditHeight()
        }
    }

    let sendResult = await signingClient.signAndBroadcast(account.address, [sendMsg,], {
        amount: [{denom: "stake", amount: "1"}],
        gas: "200000",
    },);
    alert(sendResult.height)
}

