"use client";
import { FormEvent, useState } from "react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/admin/session", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
    setBusy(false);
    if (!response.ok) return setMessage("Şifre yanlış.");
    location.reload();
  }
  return <main className="control-login"><form onSubmit={submit}><a className="control-brand" href="/"><span>Y</span>AZ <small>CONTROL</small></a><p>Güvenli yönetim alanı</p><h1>Admin girişi</h1><span>Site ayarları ve müşteri kayıtlarını yönetmek için giriş yap.</span><label>Şifre<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" autoFocus required/></label><button disabled={busy}>{busy ? "Giriş yapılıyor…" : "Panele gir"}</button><em aria-live="polite">{message}</em></form></main>;
}
