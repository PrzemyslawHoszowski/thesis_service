 import {
    createRegistry,
    MsgAddUsersUrl,
    MsgRejectDocumentUrl,
    MsgRejectSignatureUrl,
    MsgRemoveUsersUrl,
    MsgSignDocumentUrl
} from "./basic";
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

        let rejectDocumentButton = document.getElementById("reject-document-button")
        if(rejectDocumentButton){
            rejectDocumentButton.addEventListener("click", sendRejectDocumentTx, false)
        }

        let addressInputs = document.getElementsByClassName("address-input")
        for (let i = 0; i< addressInputs.length; i++){
            addressInputs[i].addEventListener("change", validateAddressInput, false);
        }
    }
    let signButton = document.getElementById("sign-button")
    if (signButton){
        signButton.addEventListener('click', sendSignDocumentTx, false);
    }
    let rejectButton = document.getElementById("reject-button")
    if (rejectButton){
        rejectButton.addEventListener('click', sendRejectSignatureTx, false);
    }
}

function createInputField(roleName){
    let newRow = document.createElement("tr")
    newRow.setAttribute("class", "new-role")
    newRow.innerHTML = "<tr class=\"new-role\"><td class=\"input-group mb-3\"><input class=\"address-input form-control\" name=\"" + roleName + "-input\" maxlength=\"50\"><button class=\"expand-role btn btn-outline-secondary\" name=\"" + roleName + "\">+</button></td></tr>"
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
    } catch (error) {
        alert(error)
    }
}

function getDocumentId(){
    return document.getElementById("document-id-data").innerText
}

function getAddresses(input){
    return Array.from(input).map(htmlElement => htmlElement.value).filter(address => address.length >= 10).map(validateAddress)
}

function getAddressesToDelete(target){
    return Array.from(target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("to-delete"))
            .map(tdEl => filterAddresses(tdEl.getElementsByTagName("span"))[0].innerHTML)
}

function filterAddresses(htmlList){
    return Array.from(htmlList).filter(el => el.getAttribute("name") == "blockchain-address")
}

function validateAddress(address){

    address = address.trim()
    fromBech32(address)
    return address
}

function validateAddressInput(e){
    try{
        if(e.target.value.trim() != "") {
            validateAddress(e.target.value)
        }
        e.target.classList.remove("is-invalid")
    } catch(ex) {
        e.target.classList.add("is-invalid")
    }
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
    const {keplr} = window
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
    } catch (error) {
        alert(error)
    }
}

async function sendSignDocumentTx() {
    const {keplr} = window
    if (!keplr) {
        alert("You need to install Keplr")
        return
    }
    // try {
        const myRegistry = createRegistry()
        const offlineSigner = window.getOfflineSigner(getTestnetChainInfo().chainId)
        const signingClient = await SigningStargateClient.connectWithSigner(
            getTestnetChainInfo().rpc,
            offlineSigner,
            {registry: myRegistry}
        )

        // Get the address and balance of your user
        const account = (await offlineSigner.getAccounts())[0]
        alert(account.address)
        alert(getLastEditHeight())
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
    // } catch (error) {
    //     alert(error)
    // }
}

async function sendRejectSignatureTx() {
    const {keplr} = window
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
            typeUrl: MsgRejectSignatureUrl,
            value: {
                creator: account.address,
                documentId: getDocumentId()
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


async function sendRejectDocumentTx() {
    const {keplr} = window
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
            typeUrl: MsgRejectDocumentUrl,
            value: {
                creator: account.address,
                documentId: getDocumentId(),
                reason: ""
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
