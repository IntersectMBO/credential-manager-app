import * as CLS from "@emurgo/cardano-serialization-lib-browser";
import { deserializeAddress } from "@meshsdk/core";
import dotevn from "dotenv";
dotevn.config();
const NEXT_PUBLIC_REST_IPFS_GATEWAY=process.env.NEXT_PUBLIC_REST_IPFS_GATEWAY;

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

/**
 * Get the CardanoScan URL for a given Bech32 string which can be an address or a gov id.
 * @param bech32 Bech32 string.
 * @param txNetworkID Network ID of the transaction.
 * @returns URL of the CardanoScan page.
 */
export const getCardanoScanURL = (bech32String: string, networkID: number): string => {
  const baseURL = networkID === 0 ? "https://preprod.cardanoscan.io/" : "https://cardanoscan.io/";
  const isAddress = bech32String.startsWith("addr");
  const isGovAction = bech32String.startsWith("gov_action");
  if (isAddress) {
    return `${baseURL}address/${bech32String}`;
  } else if (isGovAction) {
    console.log('CardanoScan URL:'+`${baseURL}govAction/${bech32String}`);
    return `${baseURL}govAction/${bech32String}`;
  }
  return "";
};

export const openInNewTab = (url: string) => {
  // Ensure the URL is absolute
  const fullUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : url.startsWith("ipfs")
      ? "https://" + NEXT_PUBLIC_REST_IPFS_GATEWAY + url?.slice(7)
      : "https://" + url;
  window.open(fullUrl, "_blank", "noopener,noreferrer");
};