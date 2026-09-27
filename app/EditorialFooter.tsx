export function EditorialFooter({ logoImage }: { logoImage: string | null }) {
  return <footer className="editorial-subpage-footer">
    <div className="editorial-subpage-footer-brand"><a href="/#top" aria-label="Yaz Restaurant home">{logoImage ? <img src={logoImage} alt="Yaz Restaurant" /> : <span>YAZ</span>}</a><p>Turkish roots. Mediterranean rhythm. London energy.</p></div>
    <nav aria-label="Explore Yaz"><strong>Explore</strong><a href="/menu">Menus</a><a href="/private-hire">Private hire</a><a href="/#visit">Find us</a></nav>
    <div><strong>Visit</strong><span>7–9 Signal Walk</span><span>Highams Park, London E4 9BW</span><a href="tel:+442082799239">020 8279 9239</a><a href="mailto:contact@yazrestaurant.co.uk">Email Yaz</a></div>
    <p className="editorial-subpage-footer-bottom"><a href="/privacy">Privacy</a><span>© {new Date().getFullYear()} Yaz Restaurant</span></p>
  </footer>;
}
