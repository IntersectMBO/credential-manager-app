"use client";

import { useState } from "react";
import { useWallet } from "@meshsdk/react";
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";

export const TransactionButton = () => {
  const [message, setMessage] = useState("");

  const { wallet, connected, name, connect, disconnect, error } = useWallet();

  const blockchainProvider = new BlockfrostProvider('xx');

  const txBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider,
    evaluator: blockchainProvider,
    verbose: true,
  });

  const handleClick = () => {
    setMessage("Transaction Submitted!");
  };

  const buildAndSubmitTransaction = async () => {
    console.log("Getting UTxOs");
    const utxos = await wallet.getUtxos();
    // console.log("UTxOs:", utxos.toString());
    const changeAddress = await wallet.getChangeAddress();

    console.log("Building Tx");
    const unsignedTx = await txBuilder
      .changeAddress(changeAddress)
      .selectUtxosFrom(utxos)
      .complete();

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