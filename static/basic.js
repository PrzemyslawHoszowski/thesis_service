import {getTestnetChainInfo} from "./chainInfo";
import {Registry} from "@cosmjs/proto-signing";
import {defaultRegistryTypes as defaultStargateTypes} from "@cosmjs/stargate/build/signingstargateclient";
import {MsgAddUsers, MsgAuthorize, MsgCreateDocument, MsgSignDocument, MsgRemoveUsers, MsgRejectSignature, MsgEditFiles} from "./ts/tx";

window.onload = async () => {
    if (!keplr) {
        alert("Please install keplr extension");
    } else {
        await window.keplr.experimentalSuggestChain(getTestnetChainInfo())
        const chainId = "thesis";
        const {keplr} = window
        await keplr.enable(chainId);
    }
}

export function createRegistry() {
    const myRegistry = new Registry(defaultStargateTypes);
    myRegistry.register(MsgCreateDocumentUrl, MsgCreateDocument);
    myRegistry.register(MsgAuthorizeUrl, MsgAuthorize);
    myRegistry.register(MsgAddUsersUrl, MsgAddUsers);
    myRegistry.register(MsgSignDocumentUrl, MsgSignDocument); // todo
    myRegistry.register(MsgRemoveUsersUrl, MsgRemoveUsers); // todo
    myRegistry.register(MsgEditFilesUrl, MsgEditFiles); // todo
    myRegistry.register(MsgRejectSignatureUrl, MsgRejectSignature); // todo
    return myRegistry
}

export const MsgAuthorizeUrl = "/thesis.thesis.MsgAuthorize"
export const MsgCreateDocumentUrl = "/thesis.thesis.MsgCreateDocument"
export const MsgAddUsersUrl = "/thesis.thesis.MsgAddUsers"

export const MsgSignDocumentUrl = "/thesis.thesis.MsgSignDocument"
export const MsgRemoveUsersUrl = "/thesis.thesis.MsgRemoveUsers"
export const MsgEditFilesUrl = "/thesis.thesis.MsgEditFiles"
export const MsgRejectSignatureUrl = "/thesis.thesis.MsgRejectSignature"