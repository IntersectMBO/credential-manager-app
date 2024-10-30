"use client";

import React, { useEffect, useState } from "react";

export const DynamicHookComponent = () => {
  const [useCustomHook, setUseCustomHook] = useState<any>(() => () => ({ connected: false }));
  const [isHookLoaded, setIsHookLoaded] = useState(false);

  useEffect(() => {
    const loadHook = async () => {
      try {
        const { useWallet } = await import("@meshsdk/react");
        setUseCustomHook(() => useWallet);
        setIsHookLoaded(true);
      } catch (error) {
        console.error("Error loading hook:", error);
      }
    };

    loadHook();
  }, []);

  const result = useCustomHook();
  console.log('connected wallet name:', result.name);

  if (!isHookLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Hook Result: {result.connected.toString()}</div>
    </div>
  );
};