"use client";

import { useState } from "react";
import { useWallet } from "@meshsdk/react";
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";
import { Button, TextField, Box, Typography, Container, Alert } from "@mui/material";


export const TransactionButton = () => {
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const { wallet, connected, name, connect, disconnect, error } = useWallet();

  // const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_PREVIEW_API||'');
  const blockchainProvider = new BlockfrostProvider('')


  const txBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider,
    evaluator: blockchainProvider,
    submitter: blockchainProvider,
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

    try {
      if (!amount || parseFloat(amount) <= 0) {
        setMessage("Please enter a valid ADA amount.");
        return;
      }

      console.log("Building Tx");
      const unsignedTx = await txBuilder
        .txOut(recipientAddress, [{ unit: "lovelace", quantity: amount.concat("000000") }]) //convert ada to lovelace
        //  .txOut(changeAddress, [{ unit: "lovelace", quantity: "1000000" }])
        .changeAddress(changeAddress)
        .selectUtxosFrom(utxos)
        .complete();
      //sometimes we don't need to specify the output and it will be input - transaction fee and go to the change address 
      console.log("Signing Tx");
      const signedTx = await wallet.signTx(unsignedTx);

      console.log("Tx built successfully:", signedTx);

      console.log("Submitting Tx");
      const txHash = await txBuilder.submitTx(signedTx);

      console.log("Transaction submitted successfully:", txHash);
    } catch (error) {
      console.error("Error building or submitting transaction:", error);
      setMessage("Transaction failed. Check the console for more details.");
    }
  }

  return (
    // <div>
    //   <input
    //     type="number"
    //     placeholder="Enter ADA amount"
    //     value={amount}
    //     onChange={(e) => setAmount(e.target.value)}
    //   />
    //   <input
    //     type="string"
    //     placeholder="Enter address"
    //     value={recipientAddress}
    //     onChange={(e) => setRecipientAddress(e.target.value)}
    //   />
    //   <button onClick={() => buildAndSubmitTransaction()}>BUILD AND SUBMIT TX</button>
    //   {message && <p>{message}</p>}
    // </div>
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        ADA Transaction
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mb: 3 }}>
        <TextField
          type="number"
          label="Enter ADA Amount"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          type="text"
          label="Enter Recipient Address"
          variant="outlined"
          fullWidth
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={buildAndSubmitTransaction}
        >
          BUILD AND SUBMIT TX
        </Button>
      </Box>

      {message && (
        <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

