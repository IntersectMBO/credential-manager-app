import * as CLS from "@emurgo/cardano-serialization-lib-browser";
import { deserializeAddress } from "@meshsdk/core";

/**
 * Decodes a transaction from a hex string to a CardanoSerializationLib Transaction object.
 * @param unsignedTransactionHex hex string of the unsigned transaction.
 * @returns {CLS.Transaction} the decoded transaction object, or null if the decoding fails.
 */

export const decodeHextoTx = (unsignedTransactionHex: string) => {
    console.log("decodeHextoTx");
    try {
      const unsignedTransaction = CLS.Transaction.from_hex(unsignedTransactionHex);
      return unsignedTransaction;
    } catch (error) {
      console.error("Error decoding transaction:", error);
      return null;
    }
  };


// convert basic GA ID to Bech32 as per CIP129 standard
// https://github.com/cardano-foundation/CIPs/tree/master/CIP-0129
export const convertGAToBech = (gaTxHash : string, gaTxIndex : number) => {
  const bech32 = require('bech32-buffer');

  // convert value index value to hex
  const indexHex = gaTxIndex.toString(16).padStart(2, '0');

  // return bech32 encoded GA ID
  return bech32.encode("gov_action", Buffer.from(gaTxHash+indexHex, 'hex')).toString();
}
