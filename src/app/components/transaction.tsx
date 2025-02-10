"use client";

import { useState,useEffect } from "react";
import { useWallet } from "@meshsdk/react";
import { deserializeAddress } from "@meshsdk/core";
import { Button, TextField, Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Link } from "@mui/material";
import * as CLS from "@emurgo/cardano-serialization-lib-browser";
import ReactJsonPretty from 'react-json-pretty';
import * as txValidationUtils from "../utils/txValidationUtils";
import { TransactionChecks } from "./validationChecks";
import { decodeHextoTx,convertGAToBech,getCardanoScanURL} from "../utils/txUtils";
import { VotingDetails } from "./votingDetails";


export const TransactionButton = () => {
  const [message, setMessage] = useState("");
  const [unsignedTransactionHex, setUnsignedTransactionHex] = useState("");
  const [unsignedTransaction, setUnsignedTransaction] = useState<CLS.Transaction | null>(null);
  const { wallet, connected, name, connect, disconnect } = useWallet();
  const [signature, setsignature] = useState<string>("");
  const [voteChoice, setvoteChoice] = useState<string>("");
  const [govActionID, setgovActionID] = useState<string>("");
  const [cardanoscan, setCardanoscan] = useState<string>("");
  const [metadataAnchorURL, setmetadataAnchorURL] = useState<string>("");
  const [metadataAnchorHash, setMetadataAnchorHash] = useState<string>("");
  const [validationState, setValidationState] = useState({
    isPartOfSigners: false,
    isOneVote: false,
    hasCertificates: true,
    isSameNetwork: false,
    hasICCCredentials: false,
    isInOutputPlutusData: false,
  });
  const resetValidationState = () => {
    setValidationState((prev) => ({
      ...prev,
      isPartOfSigners: false,
      isOneVote: false,
      hasCertificates: true,
      isSameNetwork: false,
      hasICCCredentials: false,
      isInOutputPlutusData: false,
    }));
  };

  const resetAllStates = () => {
    setMessage("");
    setUnsignedTransactionHex("");
    setUnsignedTransaction(null);
    setsignature("");
    setvoteChoice("");
    setgovActionID("");
    setCardanoscan("");
    setmetadataAnchorURL("");
    setMetadataAnchorHash("");
    resetValidationState();
  };

  useEffect(() => {
    if (!connected) {
      resetAllStates();
    }
  }, [connected]);

  const checkTransaction = async () => {
    if (!connected) {
      resetValidationState();
      setvoteChoice("");
      setgovActionID("");
      return setMessage("Please connect your wallet first.");
    }
    try{
      const network = await wallet.getNetworkId();
      const unsignedTransaction = decodeHextoTx(unsignedTransactionHex);
      setUnsignedTransaction(unsignedTransaction);
      if (!unsignedTransaction) throw new Error("Invalid transaction format.");

      const changeAddress = await wallet.getChangeAddress();
      const stakeCred = deserializeAddress(changeAddress).stakeCredentialHash;

      console.log("Connected wallet network ID:", network);
      console.log("unsignedTransaction:", unsignedTransaction);
      console.log("Stake Credential:", stakeCred);

      //**************************************Transaction Validation Checks****************************************

      const transactionBody = unsignedTransaction.body();
      if (!transactionBody) throw new Error("Transaction body is null.");
      const voting_procedures= transactionBody.to_js_value().voting_procedures;
      if (!voting_procedures) throw new Error("Transaction has no voting procedures.");
      const votes=voting_procedures[0].votes;
      const hasOneVote = txValidationUtils.hasOneVoteOnTransaction(transactionBody);
      const vote = voting_procedures[0].votes[0].voting_procedure.vote;

      setValidationState({
        isPartOfSigners: await txValidationUtils.isPartOfSigners(transactionBody, stakeCred),
        isOneVote: hasOneVote,
        hasCertificates: txValidationUtils.hasCertificates(transactionBody),
        isSameNetwork: txValidationUtils.isSameNetwork(transactionBody, network),
        hasICCCredentials: txValidationUtils.hasValidICCCredentials(transactionBody, network),
        isInOutputPlutusData: txValidationUtils.isSignerInPlutusData(transactionBody, stakeCred),
      });
  
      //********************************************Voting Details *********************************************************************/
      const transactionNetworkID = transactionBody.outputs().get(0).address().to_bech32().startsWith("addr_test1") ? 0 : 1;
      
      
      if (votes && hasOneVote) {
        
        const govActionID = convertGAToBech(votes[0].action_id.transaction_id, votes[0].action_id.index);
        setvoteChoice(vote === 'Yes' ? 'Constitutional' : vote === 'No' ? 'Unconstitutional' : 'Abstain');
        setgovActionID(govActionID);
        if(!votes[0].voting_procedure.anchor) throw new Error("Vote has no anchor.");
        setmetadataAnchorURL(votes[0].voting_procedure.anchor.anchor_url);
        setMetadataAnchorHash(votes[0].voting_procedure.anchor.anchor_data_hash);
        setCardanoscan(getCardanoScanURL(govActionID,transactionNetworkID));
      }

      
    }
    catch (error) {
      console.error("Error validating transaction:", error);
    }
   
  };
 
  const signTransaction = async () => {
    console.log("isPartOfSigners:", validationState.isPartOfSigners);
    try {
      if (validationState.isPartOfSigners) {
        const signedTx = await wallet.signTx(unsignedTransactionHex, true);
        console.log("Transaction signed successfully:", signedTx);

        const signature = await decodeHextoTx(signedTx);
        setsignature(signature?.witness_set().vkeys()?.get(0)?.signature()?.to_hex() || '');
        console.log("signature:", signature?.witness_set().vkeys()?.get(0).signature().to_hex());
        
      }
      else { throw new Error("You are not part of the required signers."); }

    } catch (error) {
      console.error("Error signing transaction:", error);
      setMessage("Transaction signing failed. " + error);
    }
  };

  useEffect(() => {
    if (signature || unsignedTransaction) {
      const transactionElement = document.getElementById("sign-transaction");
      const signatureElement = document.getElementById("signature");
      if (signatureElement) {
        signatureElement.scrollIntoView({
          behavior: "smooth",
        });
      } else if (transactionElement) {
        transactionElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [signature,unsignedTransaction]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Transaction Input & Button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          type="string"
          label="Enter Hex Encoded Transaction"
          variant="outlined"
          fullWidth
          value={unsignedTransactionHex}
          onChange={(e) => {
            setUnsignedTransactionHex(e.target.value);
            resetValidationState();
            setvoteChoice("");
            setgovActionID("");
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={checkTransaction}
          sx={{ whiteSpace: "nowrap", px: 3 }}
        >
          Check Transaction
        </Button>
      </Box>

      {/* Transaction Details */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Transaction Validation Checks
        </Typography>

        {unsignedTransaction && (
            <TransactionChecks {...validationState}
          />
        )}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Voting Details
        </Typography>
        {unsignedTransaction && (
          <VotingDetails
            govActionID={govActionID}
            voteChoice={voteChoice}
            cardanoscan={cardanoscan}
            metadataAnchorURL={metadataAnchorURL}
            metadataAnchorHash={metadataAnchorHash}
          />
        )}
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 1,
            maxHeight: "400px",
            overflowY: "auto",
            marginTop: 2,
            boxShadow: 1,
          }}
        >
          {unsignedTransactionHex && (
            <ReactJsonPretty
              data={unsignedTransaction ? unsignedTransaction.to_json() : {}}
            />
          )}
        </Box>
      </Box>

      {/* Sign Button - Aligned to Right */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          id="sign-transaction"
          variant="contained"
          color="success"
          onClick={signTransaction}
          sx={{ whiteSpace: "nowrap", px: 3 }}
        >
          Sign Transaction
        </Button>
      </Box>

      {/* Signature Display */}
      {signature && (
        <Box id="signature" sx={{ mt: 3 }}>
          <Typography variant="h6">Signature</Typography>
          <Box
            sx={{
              backgroundColor: "#e8f5e9",
              padding: 2,
              borderRadius: 1,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              boxShadow: 2,
              maxHeight: "250px",
              overflowY: "auto",
            }}
            onClick={() => {
              navigator.clipboard.writeText(signature);
              setMessage("Signature copied to clipboard!");
            }}
          >
            <Typography component="pre">{signature}</Typography>
          </Box>
        </Box>
      )}

      {/* Error Message Display */}
      {message && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
     
    </Container>
  );
};