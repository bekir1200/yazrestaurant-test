"use client";

import { useState } from "react";
import { BookingLink } from "./BookingLink";

export function EditorialHeader({ logoImage, openTableRef, subpage = false }: { logoImage: string | null; openTableRef: string; subpage?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return <header className="editorial-nav">
    <a className="editorial-nav-brand" href={subpage ? "/#top" : "#top"} aria-label="Yaz Restaurant home">
      {logoImage ? <img className="yaz-logo-img" src={logoImage} alt="Yaz Restaurant" /> : <span className="editorial-wordmark">YAZ</span>}
    </a>
    <button className={`editorial-menu-toggle${menuOpen ? " is-open" : ""}`} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="editorial-site-menu" onClick={() => setMenuOpen((open) => !open)}>
      <span /><span />
    </button>
    {menuOpen && <nav className="editorial-site-menu" id="editorial-site-menu" aria-label="Main menu">
      <a href={subpage ? "/#menu" : "#menu"} onClick={() => setMenuOpen(false)}>Menus</a>
      <a href={subpage ? "/#story" : "#story"} onClick={() => setMenuOpen(false)}>Our story</a>
      <a href="/private-hire" onClick={() => setMenuOpen(false)}>Private hire</a>
      <a href={subpage ? "/#visit" : "#visit"} onClick={() => setMenuOpen(false)}>Find Yaz</a>
      {subpage ? <a href="/#book" onClick={() => setMenuOpen(false)}>Book a table</a> : <BookingLink restRef={openTableRef}>Book a table</BookingLink>}
    </nav>}
  </header>;
}
