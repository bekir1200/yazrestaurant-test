"use client";
import type { ReactNode } from "react";

declare global {
  interface Window {
    yazTrack?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export function BookingLink({ restRef, className, id, ariaHidden, tabIndex, children }: { restRef: string; className?: string; id?: string; ariaHidden?: boolean; tabIndex?: number; children: ReactNode }) {
  const href = `https://www.opentable.co.uk/booking/restref/availability?lang=en-GB&restRef=${encodeURIComponent(restRef)}&otSource=Restaurant%20website`;
  return <a id={id} className={className} href={href} target="_blank" rel="noreferrer" aria-hidden={ariaHidden} tabIndex={tabIndex} onClick={() => window.yazTrack?.("booking_start", { party_size: 2 })}>{children}</a>;
}
