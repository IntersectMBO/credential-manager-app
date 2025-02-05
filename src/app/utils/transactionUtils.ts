import * as CLS from "@emurgo/cardano-serialization-lib-browser";
import { deserializeAddress } from "@meshsdk/core";

/**
 * Decodes a transaction from a hex string to a CardanoSerializationLib Transaction object.
 * @param unsignedTransactionHex hex string of the unsigned transaction.
 * @returns {CLS.Transaction} the decoded transaction object, or null if the decoding fails.
 */

export const decodeHextoTx = (unsignedTransactionHex: string) => {
    try {
      const unsignedTransaction = CLS.Transaction.from_hex(unsignedTransactionHex);
      console.log("signers list", unsignedTransaction.body().required_signers()?.to_json());
      return unsignedTransaction;
    } catch (error) {
      console.error("Error decoding transaction:", error);
      return null;
    }
  };

/**
 * Checks if the given stake credential is part of the required signers of the transaction.
 * @param transactionBody the body of the transaction to check.
 * @param stakeCred the stake credential to check.
 * @returns {boolean} true if the stake credential is part of the required signers, false otherwise.
 */
export const checkIfPartOfSigners = async (transactionBody: any, stakeCred: string) => {
    
    if (!transactionBody) {
        throw new Error("Transaction body is null.");
    }
    //wallet needs to sign
    // Check if signer part of plutus output data
    const requiredSigners = transactionBody.required_signers();

    if (!requiredSigners || requiredSigners.len() === 0) {
        console.log("No required signers in the transaction.");

    } else if (requiredSigners?.to_json().includes(stakeCred)) {
        console.log("Required signers in the transaction:", requiredSigners?.to_json());
        return true;
    }else{
        console.log("Not part of the required signers.");
        return false;
    }

}

/**
 * Checks if the transaction has one vote set.
 * @param transactionBody the body of the transaction to check.
 * @returns {boolean} true if the transaction has one vote set, false otherwise.
 */
const checkIfOneVoteOnTX = (transactionBody: any) => {
    //one vote 
    const voting_procedures = transactionBody.to_js_value().voting_procedures;
    const votes = voting_procedures?.[0]?.votes;
    const votesNumber = votes?.length;
    const voteResult = votes?.[0]?.voting_procedure?.vote;
    let hasOneVote = false;

    if (votesNumber === 1) {
        console.log("Transaction has one vote set to:", voteResult);
        hasOneVote = true;
    } else if (!votesNumber) {
        throw new Error("Transaction has no votes.");
    } else {
        throw new Error("You are signing more than one vote. Number of votes: " + votesNumber);
    }

    return hasOneVote;
};

/**
 * Checks if the transaction has certificates.
 * @param transactionBody the body of the transaction to check.
 * @returns {boolean} true if the transaction has certificates, false otherwise.
 */
const checkIfHasCertificates = (transactionBody: any) => {

    const certificates = transactionBody?.certs();
    let hasCertificates = true;

    console.log("certificates:", certificates);

    if (!certificates) {
      console.log("No certificates in the transaction.");
      hasCertificates = false;
    }

    return hasCertificates;

};

/**
 * Checks if the transaction is on the same network as the wallet.
 * @param transactionBody The body of the transaction to check.
 * @param walletNetworkID The network ID of the wallet.
 * @returns {boolean} True if the transaction is on the same network, false otherwise.
 */
const checkIfSameNetwork = (transactionBody: any, walletNetworkID: number): boolean => {
  // Determine the network ID from the transaction's first output address
  const transactionNetworkID = transactionBody
    .outputs()
    .get(0)
    .address()
    .to_bech32()
    .startsWith("addr_test1") ? 0 : 1;
  
  console.log("transactionNetwork:", transactionNetworkID);

  // Compare the transaction network ID with the wallet network ID
  return walletNetworkID === transactionNetworkID;
};


// export const checkTransaction = async (transaction: CLS.Transaction, wallet: any , connected: boolean) => {


//     if (!connected) {
//         setIsPartOfSigners(false);
//         setIsOneVote(false);
//         setHasCertificates(true);
//         setIsSameNetwork(false);
//         setHasICCCredentials(false);
//         setIsInOutputPlutusData(false);
//         setVoteResult("");
//         setVoteID("");
//         setMessage("Please connect your wallet first.");
//         return;
//     }

//     const network = await wallet.getNetworkId();
//     console.log("Connected wallet network ID:", network);
//     console.log("isPartOfSigners:", isPartOfSigners);

//     const unsignedTransaction = decodeHextoTx(unsignedTransactionHex);
//     setUnsignedTransaction(unsignedTransaction);

//     console.log("unsignedTransaction:", unsignedTransaction);

//     const changeAddress = await wallet.getChangeAddress();
//     const stakeCred = deserializeAddress(changeAddress).stakeCredentialHash;

//     console.log("Stake Credential:", stakeCred);

//     //**************************************Transaction Validation Checks****************************************

//     const transactionBody = unsignedTransaction?.body();
//     const voting_procedures = transactionBody?.to_js_value().voting_procedures;

//     try {
//         if (!transactionBody) {
//             throw new Error("Transaction body is null.");
//         }
//         //wallet needs to sign
//         // Check if signer part of plutus output data
//         const requiredSigners = transactionBody.required_signers();
//         if (!requiredSigners || requiredSigners.len() === 0) {
//             console.log("No required signers in the transaction.");

//         } else if (requiredSigners?.to_json().includes(stakeCred)) {
//             console.log("Required signers in the transaction:", requiredSigners?.to_json());
//             setIsPartOfSigners(true);
//         }

//         //one vote 
//         const votes = voting_procedures?.[0]?.votes;
//         const votesNumber = votes?.length;

//         if (votesNumber === 1) {
//             setIsOneVote(true);
//             setVoteResult(votes?.[0].voting_procedure.vote);
//             setVoteID(votes?.[0].action_id.transaction_id);
//             setmetadataAnchorURL(votes?.[0].voting_procedure.anchor?.anchor_url);
//             setMetadataAnchorHash(votes?.[0].voting_procedure.anchor?.anchor_data_hash);
//             console.log("Transaction has one vote set to:", voteResult);
//         } else if (!votesNumber) {
//             throw new Error("Transaction has no votes.");
//         } else {
//             //throw new Error("You are signing more than one vote. Number of votes: "+ votesNumber);
//         }

//         // Check to see if the transactions has any certificates in it
//         const certificates = transactionBody?.certs();
//         console.log("certificates:", certificates);
//         if (!certificates) {
//             console.log("No certificates in the transaction.");
//             setHasCertificates(false);
//         }

//         //Same network
//         const transactionNetworkID = transactionBody.outputs().get(0).address().to_bech32().startsWith("addr_test1") ? 0 : 1;
//         console.log('transactionNetwork:', transactionNetworkID);
//         if (network === transactionNetworkID) {
//             setIsSameNetwork(true);
//         }


//         //Is Intersect CC credential
//         const voterJSON = voting_procedures?.[0]?.voter;
//         console.log("voterJSON:", voterJSON);
//         let script;
//         // Function to check if the voterJSON has ConstitutionalCommitteeHotCred to avoid type error
//         function isConstitutionalCommitteeHotCred(voter: CLS.VoterJSON): voter is { ConstitutionalCommitteeHotCred: { Script: string } } {
//             return (voter as { ConstitutionalCommitteeHotCred: any }).ConstitutionalCommitteeHotCred !== undefined;
//         }

//         if (voterJSON && isConstitutionalCommitteeHotCred(voterJSON)) {
//             // If it has ConstitutionalCommitteeHotCred, extract the Script hex
//             const credType = voterJSON.ConstitutionalCommitteeHotCred;
//             script = credType.Script;
//             console.log("ConstitutionalCommitteeHotCred Script:", script);

//         }
//         //If in Testnet and scrit matches preview ICC credential ; else if in mainnet and script matches mainnet ICC credential
//         if (network === 0 && script === "4f00984fa72e265b8ff8ffce4405da562cd3d6b16a4a38de3372eeea") {
//             console.log("Intersect CC Credential found in testnet");
//             setHasICCCredentials(true);
//         } else if (network === 1 && script === "85c47dd4b9a2e70e88965d91dd69be182d5605b23bb5250b1c94bf64") {
//             console.log("Intersect CC Credential found in mainnet");
//             setHasICCCredentials(true);
//         } else {
//             console.error("Incorrect Intersect CC Credentials");
//         }
//         //check if signer is in plutus data
//         const plutusScripts = transactionBody?.outputs().to_js_value();
//         console.log("plutusScripts:", plutusScripts);
//         console.log("stakeCred:", stakeCred);

//         if (Array.isArray(plutusScripts) && stakeCred) {

//             const regex = new RegExp(stakeCred);

//             plutusScripts.forEach((output, index) => {
//                 if (output.plutus_data && typeof output.plutus_data === 'object' && 'Data' in output.plutus_data) {
//                     const plutusData = output.plutus_data.Data;
//                     console.log("plutusData:", plutusData);

//                     if (regex.test(plutusData)) {
//                         console.log(`Stake credential found in output for address ${output.address}`);
//                         setIsInOutputPlutusData(true);
//                     }
//                 } else if (!output.plutus_data) {
//                     console.log(`No plutus data found in output`);
//                 } else {
//                     console.log(`Stake credential not found on plutus script data for address ${output.address}`);
//                 }
//             });

//         } else {
//             console.error("Transaction outputs are not available ");
//         }


//         //for future add context of some of the 

//         //********************************************Voting Details *********************************************************************/
//         if (transactionNetworkID === 0) {
//             setCardanoscan("https://preprod.cardanoscan.io/transaction/");
//         } else if (transactionNetworkID === 1) {
//             setCardanoscan("https://cardanoscan.io/transaction/");
//         }


//     }
//     catch (error) {
//         console.error("Error validating transaction:", error);
//     }

// };
