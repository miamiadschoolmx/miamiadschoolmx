"use client";

import { createContext, useContext, useEffect } from "react";

import type { PublicConfig } from "@/lib/public-config";
import { captureUtm } from "@/lib/utm";

const PublicConfigContext = createContext<PublicConfig | null>(null);

export function PublicConfigProvider({
  value,
  children,
}: {
  value: PublicConfig;
  children: React.ReactNode;
}) {
  // Captura de UTM en cualquier página de entrada.
  useEffect(() => {
    captureUtm(window.location.search);
  }, []);

  return (
    <PublicConfigContext.Provider value={value}>
      {children}
    </PublicConfigContext.Provider>
  );
}

export function usePublicConfig(): PublicConfig {
  const ctx = useContext(PublicConfigContext);
  if (!ctx) throw new Error("usePublicConfig requiere <PublicConfigProvider>");
  return ctx;
}
