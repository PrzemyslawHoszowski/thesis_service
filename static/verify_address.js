import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import {Sign, Tendermint34Client} from "./CACHE/js/output.e115e2b2c779";


document.getElementById("blockchain-account-authorize").addEventListener("click", () => {alert("sth")})

async function sendVerificationTx(){
  const offlineSigner = window.keplr.getOfflineSigner(chainId);

  // You can get the address/public keys by `getAccounts` method.
  // It can return the array of address/public key.
  // But, currently, Keplr extension manages only one address/public key pair.
  // XXX: This line is needed to set the sender address for SigningCosmosClient.
  const accounts = await offlineSigner.getAccounts();

  // Initialize the gaia api with the offline signer that is injected by Keplr extension.
  const client = new SigningStargateClient(
      Tendermint34Client("localhost:26657"),
      accounts[0].address,
      offlineSigner,
  );

  const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
  const amount = {
    denom: "ucosm",
    amount: "1234567",
  };
  const result = await client.sendTokens(accounts[0].address, recipient, [amount], "Have fun with your star coins");
  assertIsBroadcastTxSuccess(result);
}


