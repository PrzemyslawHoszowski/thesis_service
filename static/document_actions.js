import {createRegistry, MsgAddUsersUrl, MsgCreateDocumentUrl} from "./basic";
import {getTestnetChainInfo} from "./chainInfo";
import {SigningStargateClient} from "@cosmjs/stargate";
import {fromBech32} from "@cosmjs/encoding"

window.onload = async () => {
    let addElementButtons = document.getElementsByClassName("expand-role");
    for (let i = 0; i < addElementButtons.length; i++) {
        addElementButtons[i].addEventListener('click', expandRoles, false);
    }

    let addToRoleButtons = document.getElementsByClassName("add-to-role");
    for (let i = 0; i < addToRoleButtons.length; i++) {
        addToRoleButtons[i].addEventListener('click', SendAddToRoleTx, false)
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
    let innerMsg = {
            creator: account.address,
            documentId: getDocumentId(),
            role: name[0].toUpperCase() + name.substring(1) + "s",
            addresses: getAddresses(input)
        }
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

function validateAddress(address){
    fromBech32(address)
    alert(address)
    return address
}
