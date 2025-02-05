"use client";

import { useState,useEffect } from "react";
import { useWallet } from "@meshsdk/react";
import { BlockfrostProvider, deserializeAddress } from "@meshsdk/core";
import { Button, TextField, Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import * as CLS from "@emurgo/cardano-serialization-lib-browser";
import ReactJsonPretty from 'react-json-pretty';
import dotevn from "dotenv";
import { Underline } from "lucide-react";
import * as txValidationUtils from "../utils/txValidationUtils";
import { TransactionChecks } from "./validationChecks";

dotevn.config();

const NEXT_PUBLIC_REST_IPFS_GATEWAY=process.env.NEXT_PUBLIC_REST_IPFS_GATEWAY;

// Function to decode an unasigned transaction


// convert basic GA ID to Bech32 as per CIP129 standard
// https://github.com/cardano-foundation/CIPs/tree/master/CIP-0129
const convertGAToBech = (gaTxHash : string, gaTxIndex : number) => {
  const bech32 = require('bech32-buffer');

  // convert value index value to hex
  const indexHex = gaTxIndex.toString(16).padStart(2, '0');

  // return bech32 encoded GA ID
  return bech32.encode("gov_action", Buffer.from(gaTxHash+indexHex, 'hex')).toString();
}


export const TransactionButton = () => {
  const [message, setMessage] = useState("");
  const [unsignedTransactionHex, setUnsignedTransactionHex] = useState("");
  const [unsignedTransaction, setUnsignedTransaction] = useState<CLS.Transaction | null>(null);
  const { wallet, connected, name, connect, disconnect } = useWallet();
  const [signature, setsignature] = useState<string>("");
  const [isPartOfSigners, setIsPartOfSigners] = useState(false);
  const [isOneVote, setIsOneVote] = useState(false);
  const [hasCertificates, setHasCertificates] = useState(true);
  const [isSameNetwork, setIsSameNetwork] = useState(false);
  const [hasICCCredentials, setHasICCCredentials] = useState(false);
  const [isInOutputPlutusData , setIsInOutputPlutusData] = useState(false); 
  const [voteChoice, setvoteChoice] = useState<string>();
  const [voteID, setVoteID] = useState<string>();
  const [cardanoscan, setCardanoscan] = useState<string>();
  const [metadataAnchorURL, setmetadataAnchorURL] = useState<string>();
  const [metadataAnchorHash, setMetadataAnchorHash] = useState<string>();


  const checkTransaction = async () => {
    if (!connected) {
      setIsPartOfSigners(false);
      setIsOneVote(false);
      setHasCertificates(true);
      setIsSameNetwork(false);
      setHasICCCredentials(false);
      setIsInOutputPlutusData(false);
      setvoteChoice("");
      setVoteID("");
      setMessage("Please connect your wallet first.");
      return;
    }
    
    const network = await wallet.getNetworkId();
   

    const unsignedTransaction = txValidationUtils.decodeHextoTx(unsignedTransactionHex);
    setUnsignedTransaction(unsignedTransaction);
    const changeAddress = await wallet.getChangeAddress();
    const stakeCred = deserializeAddress(changeAddress).stakeCredentialHash;

    console.log("Connected wallet network ID:", network);
    console.log("isPartOfSigners:", isPartOfSigners);
    console.log("unsignedTransaction:", unsignedTransaction);
    console.log("Stake Credential:", stakeCred);

    //**************************************Transaction Validation Checks****************************************

    const transactionBody = unsignedTransaction?.body();
    const voting_procedures= transactionBody?.to_js_value().voting_procedures;
  
    try{
      if (!transactionBody) {
        throw new Error("Transaction body is null.");
      }
      setmetadataAnchorURL(voting_procedures?.[0]?.votes?.[0].voting_procedure.anchor?.anchor_url);
      setMetadataAnchorHash(voting_procedures?.[0]?.votes?.[0].voting_procedure.anchor?.anchor_data_hash);
      //wallet needs to sign
      txValidationUtils.isPartOfSigners(transactionBody, stakeCred).then((result) => {
        setIsPartOfSigners(result);
      })

      //one vote 
      const votes=voting_procedures?.[0]?.votes;
      const votesNumber = votes?.length;

      if(votes && votesNumber === 1){
        setIsOneVote(true);
        setVoteID(convertGAToBech(votes[0].action_id.transaction_id, votes[0].action_id.index));
        setmetadataAnchorURL(votes[0].voting_procedure.anchor?.anchor_url);
        setMetadataAnchorHash(votes[0].voting_procedure.anchor?.anchor_data_hash);
        console.log("Transaction has one vote set to:",voteChoice);

        if (votes?.[0].voting_procedure.vote==='Yes'){
          setvoteChoice('Constitutional');
        }else if (votes?.[0].voting_procedure.vote==='No'){
          setvoteChoice('Unconstitutional');
        }else{
          setvoteChoice('Abstain');
        }
      }else if (!votesNumber){
        throw new Error("Transaction has no votes.");
      }else{
        //throw new Error("You are signing more than one vote. Number of votes: "+ votesNumber);
      }
      
      // Check to see if the transactions has any certificates in it
      setHasCertificates(txValidationUtils.hasCertificates(transactionBody));
      //Same network
      setIsSameNetwork(txValidationUtils.isSameNetwork(transactionBody, network));
      //Is Intersect CC credential
      
      //If in Testnet and scrit matches preview ICC credential ; else if in mainnet and script matches mainnet ICC credential
      setHasICCCredentials( txValidationUtils.hasValidICCCredentials(transactionBody, network));
      console.log("hasICCCredentials:", hasICCCredentials,txValidationUtils.hasValidICCCredentials(transactionBody, network));
      
      //check if signer is in plutus data
      

      //for future add context of some of the 

      //********************************************Voting Details *********************************************************************/
      const transactionNetworkID = transactionBody.outputs().get(0).address().to_bech32().startsWith("addr_test1") ? 0 : 1;
      const votes=voting_procedures?.[0]?.votes;
      const votesNumber = votes?.length;
    
      setVoteResult(votes?.[0].voting_procedure.vote);
      setVoteID(votes?.[0].action_id.transaction_id);
      setmetadataAnchorURL(votes?.[0].voting_procedure.anchor?.anchor_url);
      setMetadataAnchorHash(votes?.[0].voting_procedure.anchor?.anchor_data_hash);

      if (transactionNetworkID === 0) {
        setCardanoscan("https://preprod.cardanoscan.io/govAction/");
      } else if (transactionNetworkID === 1) {
        setCardanoscan("https://cardanoscan.io/govAction/");
      }

      
    }
    catch (error) {
      console.error("Error validating transaction:", error);
    }
   
  };
 
  const signTransaction = async () => {
    console.log("isPartOfSigners:", isPartOfSigners);
    try {
      if (isPartOfSigners) {
        const signedTx = await wallet.signTx(unsignedTransactionHex, true);
        console.log("Transaction signed successfully:", signedTx);

        const signature = await txValidationUtils.decodeHextoTx(signedTx);
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
            setIsPartOfSigners(false);
            setIsOneVote(false);
            setHasCertificates(true);
            setIsSameNetwork(false);
            setHasICCCredentials(false);
            setIsInOutputPlutusData(false);
            setvoteChoice("");
            setVoteID("");
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
            <TransactionChecks
            isPartOfSigners={isPartOfSigners}
            isOneVote={isOneVote}
            hasCertificates={hasCertificates}
            isSameNetwork={isSameNetwork}
            hasICCCredentials={hasICCCredentials}
            isInOutputPlutusData={isInOutputPlutusData}
          />
        )}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Voting Details
        </Typography>
        {unsignedTransaction && (
          <TableContainer sx={{ mb: 3 }}>
            <Table sx={{ mt: 3 }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Governance Action ID{" "}
                  </TableCell>
                  <TableCell>
                    <a href={`${cardanoscan}${voteID}`} target="_blank">
                      {voteID}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Vote Choice{" "}
                  </TableCell>
                  <TableCell>{voteChoice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Metadata Anchor URL
                  </TableCell>
                  <TableCell>
                    <a
                      href={
                        metadataAnchorURL?.startsWith("https://") || metadataAnchorURL?.startsWith("http://")
                        ? metadataAnchorURL
                        : metadataAnchorURL?.startsWith("ipfs")
                        ? "https://" + NEXT_PUBLIC_REST_IPFS_GATEWAY + metadataAnchorURL?.slice(7)
                        : "https://" + metadataAnchorURL
                      }
                      target="_blank"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {metadataAnchorURL}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Metadata Anchor Hash
                  </TableCell>
                  <TableCell>{metadataAnchorHash}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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