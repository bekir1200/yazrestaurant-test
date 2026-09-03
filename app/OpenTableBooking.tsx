"use client";

import { FormEvent, useState } from "react";

export function OpenTableBooking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [party, setParty] = useState("2");

  function reserve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ lang: "en-GB", restRef: "193299", otSource: "Restaurant website", partySize: party });
    if (date) params.set("dateTime", `${date}T${time}`);
    window.open(`https://www.opentable.co.uk/booking/restref/availability?${params.toString()}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="booking-panel" id="book" aria-labelledby="booking-title">
      <div className="booking-intro"><p className="eyebrow">Reserve your table</p><h2 id="booking-title">Your table is waiting.</h2><p>Choose your details here and continue securely with OpenTable.</p></div>
      <form onSubmit={reserve} className="booking-form">
        <label><span>Date</span><input required type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <label><span>Time</span><select value={time} onChange={(e) => setTime(e.target.value)}>{["10:30","12:00","13:30","15:00","17:00","18:30","19:00","19:30","20:00","20:30","21:00","22:00"].map((slot) => <option key={slot}>{slot}</option>)}</select></label>
        <label><span>Guests</span><select value={party} onChange={(e) => setParty(e.target.value)}>{Array.from({ length: 12 }, (_, i) => i + 1).map((count) => <option key={count} value={count}>{count} {count === 1 ? "guest" : "guests"}</option>)}</select></label>
        <button type="submit">Find a table <span aria-hidden="true">↗</span></button>
      </form>
      <p className="powered">Reservations powered by <strong>OpenTable</strong></p>
    </section>
  );
}
