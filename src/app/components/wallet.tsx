"use client";

import { useEffect, useState } from "react";
import "../globals.css"; // Import the CSS file
import "@meshsdk/react/styles.css"
import { useWallet } from "@meshsdk/react";
import { deserializeAddress } from "@meshsdk/core";
import {  Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";


export const Wallet = () => {
  const [WalletComponent, setWalletComponent] = useState<any | null>(null);
  const [paymentCred, setPaymentCred] = useState<string | null>(null);
  const [stakeCred, setStakeCred] = useState<string | null>(null);
 
  useEffect(() => {
    const run = async () => {
      try {
        const { CardanoWallet } = await import("@meshsdk/react");
        setWalletComponent(() => CardanoWallet);
      } catch (error) {
        console.error("Error importing MeshProvider:", error);
      }
    };
    run();
  }, []);

  const WalletWrapper = () => {
    const { wallet, connected, name, connect, disconnect, error } = useWallet();

    useEffect(() => {
      const handleWalletConnection = async () => {
        if (connected) {
          console.log("Wallet connected:", name);
          const pubKey = await wallet.getRegisteredPubStakeKeys();
          console.log("Public key:", pubKey);
          const changeAddress = await wallet.getChangeAddress();

          setPaymentCred(deserializeAddress(changeAddress).pubKeyHash);

          setStakeCred(deserializeAddress(changeAddress).stakeCredentialHash);

          console.log("Payment Credential:", paymentCred);
          console.log("Stake Credential:", stakeCred);
        }else{
          console.log("Wallet not connected.");
          setPaymentCred(null);
          setStakeCred(null);
        }
      };

      handleWalletConnection();
    }, [wallet,connected, name]);

    return <WalletComponent />;
  };

  if (WalletComponent === null) {
    return <div className="wallet-container">Loading...</div>;
  }

  return (

    <Container maxWidth="md">  
    <div className="wallet-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
      <WalletWrapper />
    </div>
          {/* Credentials Table */}
          <TableContainer sx={{ mb: 3 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Payment Credential</TableCell>
                  <TableCell>{paymentCred || "Not Available"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Stake Credential</TableCell>
                  <TableCell>{stakeCred || "Not Available"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
    
    </Container>
  );
};

export default Wallet;
