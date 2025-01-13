"use client";

import { useState } from "react";
import { useWallet } from "@meshsdk/react";
import { BlockfrostProvider, deserializeAddress, Transaction, TransactionOptions } from "@meshsdk/core";
import { Button, TextField, Box, Typography, Container, Alert } from "@mui/material";


export const TransactionButton = () => {
  const [message, setMessage] = useState("");
  const [unsignedTransaction, setUnsignedTransaction] = useState("");

  const { wallet, connected, name, connect, disconnect, error } = useWallet();

  // const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_PREVIEW_API||'');
  const blockchainProvider = new BlockfrostProvider('')

  const buildAndSubmitTransaction = async () => {

    // Get change address from connected wallet
    // extract payment and stake credentials from change address
    const changeAddress = await wallet.getChangeAddress();
    const paymentCred = deserializeAddress(changeAddress).pubKeyHash;
    console.log("Connected wallet payment credential:", paymentCred);

    const stakeCred = deserializeAddress(changeAddress).stakeCredentialHash;
    console.log("Connected wallet stake credential:", stakeCred);

    const network = await wallet.getNetworkId();
    console.log("Connected wallet network ID:", network);

    // Try to take the transaction input and pass to wallet to sign
    try {

      // take the unsigned tx
      // const unsignedTx = new Transaction({})
      
      // display the unsigned tx

      // validate the unsigned tx

      // pass the tx to the wallet to sign

      console.log("Signing Tx");
      // const signedTx = await wallet.signTx(unsignedTx, true);

      // console.log("Tx built successfully:", signedTx);

    } catch (error) {
      console.error("Error signing transaction:", error);
      setMessage("Transaction signing failed. Check the console for more details.");
    }
  }

  return (

    <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Box component="form" noValidate autoComplete="off" sx={{ mb: 3 }}>
        <TextField
          type="string"
          label="Enter hex encoded transaction"
          variant="outlined"
          fullWidth
          value={unsignedTransaction}
          onChange={(e) => setUnsignedTransaction(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={buildAndSubmitTransaction}
        >
          Pass transaction to wallet to sign
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

