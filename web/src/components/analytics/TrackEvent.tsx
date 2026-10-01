"use client";

import { useEffect, useRef } from "react";

import { track, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

/** Dispara un evento una sola vez al montar (p. ej. vsl_page_viewed). */
export function TrackEvent({
  event,
  props,
}: {
  event: AnalyticsEvent;
  props?: AnalyticsProps;
}) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track(event, props);
  }, [event, props]);
  return null;
}
