"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import { track } from "@/lib/analytics";

import { LeadModal } from "./LeadModal";
import { usePublicConfig } from "./PublicConfigProvider";

type LeadCaptureContextValue = {
  /** Abre el modal de registro. `location` identifica el CTA (analítica). */
  open: (location: string) => void;
};

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export function LeadCaptureProvider({ children }: { children: React.ReactNode }) {
  const { leadMode } = usePublicConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("unknown");
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(
    (from: string) => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setLocation(from);
      setIsOpen(true);
      track("lead_form_opened", { location: from, lead_mode: leadMode });
    },
    [leadMode],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    // Devolver el foco al CTA que abrió el modal.
    requestAnimationFrame(() => returnFocus.current?.focus());
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <LeadCaptureContext.Provider value={value}>
      {children}
      {(leadMode === "systeme-api" ||
        leadMode === "systeme-embed" ||
        leadMode === "dev-simulated") && (
        <LeadModal isOpen={isOpen} location={location} onClose={close} />
      )}
    </LeadCaptureContext.Provider>
  );
}

export function useLeadCapture(): LeadCaptureContextValue {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) throw new Error("useLeadCapture requiere <LeadCaptureProvider>");
  return ctx;
}
