"use client";

import { FormEvent, useState } from "react";

export function CrmLeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/crm/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    if (response.ok) { event.currentTarget.reset(); setState("done"); } else setState("error");
  }

  return (
    <section className="enquiry-section" id="enquire">
      <div className="enquiry-copy"><p className="eyebrow">Private hire enquiries</p><h2>Tell us what<br/><em>you’re planning.</em></h2><p>Share only what we need to respond to your event enquiry. We normally remove unsuccessful enquiries after 12 months.</p></div>
      <form className="enquiry-form" onSubmit={submit}>
        <label><span>Name *</span><input name="name" required autoComplete="name" /></label>
        <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
        <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
        <label><span>Event type *</span><select name="eventType" required defaultValue=""><option value="" disabled>Select one</option><option>Birthday</option><option>Wedding / engagement</option><option>Corporate event</option><option>Private dining</option><option>Other</option></select></label>
        <label><span>Preferred date</span><input name="eventDate" type="date" /></label>
        <label><span>Estimated guests</span><input name="guests" type="number" min="1" max="200" /></label>
        <label className="full"><span>Event details</span><textarea name="message" rows={4} maxLength={1500} /></label>
        <label className="consent full"><input name="marketingConsent" type="checkbox" value="yes"/><span>I would like to receive occasional news and offers from Yaz by email. This is optional and I can unsubscribe at any time.</span></label>
        <p className="privacy-copy full">We use your details to answer and manage this enquiry. Marketing is separate and optional. See our <a href="/privacy">privacy notice</a>.</p>
        <button className="button button-gold full" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
        <p className="form-status full" aria-live="polite">{state === "done" ? "Thank you — your enquiry has been received." : state === "error" ? "Something went wrong. Please call us on 020 8279 9239." : ""}</p>
      </form>
    </section>
  );
}
