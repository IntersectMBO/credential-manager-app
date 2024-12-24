"use client";

import { useEffect, useState } from "react";
import "../globals.css"; // Import the CSS file
import "@meshsdk/react/styles.css"
import { useWallet } from "@meshsdk/react";

export const Wallet = () => {
  const [WalletComponent, setWalletComponent] = useState<any | null>(null);

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
        }
      };

      handleWalletConnection();
    }, [connected, name, wallet]);

    return <WalletComponent />;
  };

  if (WalletComponent === null) {
    return <div className="wallet-container">Loading...</div>;
  }

  return (
    <div className="wallet-container">
      <WalletWrapper />
    </div>
  );
};

export default Wallet;
