"use client";

import { useState } from "react";
import { useWallet } from "@meshsdk/react";
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";
import dotenv from 'dotenv';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

//dotenv.config({ path: './src/.env' });



export const TransactionButton = () => {
  const [message, setMessage] = useState("");

  const { wallet, connected, name, connect, disconnect, error } = useWallet();

  const blockchainProvider = new BlockfrostProvider('');
  console.log('BLOCKFROST API',process.env.BLOCKFROST_PREVIEW_API);
  
  console.log(blockchainProvider);

  const txBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider,
    evaluator: blockchainProvider,
    verbose: true,
  });

  txBuilder.setNetwork("preview");

  const handleClick = () => {
    setMessage("Transaction Submitted!");
  };

  const buildAndSubmitTransaction = async () => {
    console.log("Getting UTxOs");
    const utxos = await wallet.getUtxos();
    // console.log("UTxOs:", utxos.toString());
    const changeAddress = await wallet.getChangeAddress();

    const network = await wallet.getNetworkId();
    console.log("Network ID:", network); 

    console.log("Building Tx");
    const unsignedTx = await txBuilder
      .changeAddress(changeAddress)
      .selectUtxosFrom(utxos)
      .complete();
//sometimes we don't need to specify the output and it will be input - transaction fee and go to the change address 
    console.log("Signing Tx");
    const signedTx = await wallet.signTx(unsignedTx);
    
    console.log("Submitting Tx");
    const txHash = await txBuilder.submitTx(signedTx);

    console.log("Transaction submitted successfully:", txHash);
  }

  return (
    <div>
      <button onClick={() => buildAndSubmitTransaction()}>BUILD AND SUBMIT TX</button>
      {message && <p>{message}</p>}
    </div>
  );
};