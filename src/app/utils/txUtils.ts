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
      console.log("signers list", unsignedTransaction.body().required_signers()?.to_json());
      return unsignedTransaction;
    } catch (error) {
      console.error("Error decoding transaction:", error);
      return null;
    }
  };

