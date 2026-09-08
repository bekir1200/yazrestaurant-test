"use client";

export function CrmActions({ id, status, restricted }: { id: number; status: string; restricted: boolean }) {
  async function update(payload: object) { await fetch(`/api/crm/leads/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }); location.reload(); }
  async function erase() { if (confirm("Permanently erase this contact record? This cannot be undone.")) { await fetch(`/api/crm/leads/${id}`, { method: "DELETE" }); location.reload(); } }
  return <div className="crm-actions"><select aria-label="Lead status" defaultValue={status} onChange={(e) => update({ status: e.target.value })}><option value="new">New</option><option value="contacted">Contacted</option><option value="viewing">Viewing</option><option value="quoted">Quoted</option><option value="booked">Booked</option><option value="closed">Closed</option></select><button onClick={() => update({ restricted: !restricted })}>{restricted ? "Unrestrict" : "Restrict"}</button><button className="danger" onClick={erase}>Erase</button></div>;
}
