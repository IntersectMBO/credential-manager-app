"use client";

import { someAction } from "@/actions/meshServer";
import React, { useEffect, useState } from "react";

export const DynamicHookComponent = () => {
  const [useCustomHook, setUseCustomHook] = useState<any>(() => () => ({ connected: false }));
  const [isHookLoaded, setIsHookLoaded] = useState(false);

  useEffect(() => {
    const loadHook = async () => {
      try {
        const { useWallet } = await import("@meshsdk/react");
        const { BrowserWallet } = await import("@meshsdk/core");
        setUseCustomHook(() => useWallet);
        const wallet = await BrowserWallet.enable("eternl");
        const balance = await wallet.getBalance();
        console.log("balance", balance);
        await someAction();
        setIsHookLoaded(true);
      } catch (error) {
        console.error("Error loading hook:", error);
      }
    };

    loadHook();
  }, []);

  const result = useCustomHook();
  console.log(result);

  if (!isHookLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Hook Result: {result.connected.toString()}</div>
    </div>
  );
};