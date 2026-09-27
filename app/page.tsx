import type { Metadata } from "next";
import { decryptIntegrationSecret, readAdminStore } from "../lib/local-admin-store";
import { getSeoSettings, pageSeoMetadata } from "../lib/seo-settings";
import { CrmLeadForm } from "./CrmLeadForm";
import { MobileBookingButton } from "./MobileBookingButton";
import { EditorialHeader } from "./EditorialHeader";
import { OpenTableBooking } from "./OpenTableBooking";
import { NorthEastArrow } from "./NorthEastArrow";
import { getMediaSettings } from "../lib/media";
import { GoogleMap } from "./GoogleMap";

const heroImage = "https://static.wixstatic.com/media/16ca1a_b5c3a872574b4054af44f6fab16435a8f000.jpg/v1/fill/w_1800,h_1800,al_c,q_90,enc_avif,quality_auto/16ca1a_b5c3a872574b4054af44f6fab16435a8f000.jpg";
const foodImage = "https://static.wixstatic.com/media/16ca1a_a7a5fe1e979f40efb026481393cddd56f000.jpg/v1/fill/w_1600,h_1600,al_c,q_90,enc_avif,quality_auto/16ca1a_a7a5fe1e979f40efb026481393cddd56f000.jpg";
const fallbackMenu = [
  { name: "Yaz Mixed Grill", detail: "Lamb, chicken and adana from the charcoal fire", price: "" },
  { name: "Mediterranean Sea Bass", detail: "Lemon, herbs, seasonal greens and olive oil", price: "" },
  { name: "Anatolian Meze", detail: "Vibrant dips, warm bread and plates made to share", price: "" },
];
const restaurantSchema = { "@context": "https://schema.org", "@type": "Restaurant", name: "Yaz Restaurant", image: [heroImage, foodImage], url: "https://www.yazrestaurant.co.uk/", telephone: "+44 20 8279 9239", priceRange: "££–£££", servesCuisine: ["Turkish", "Mediterranean", "Middle Eastern"], acceptsReservations: true, menu: "https://www.yazrestaurant.co.uk/menu", hasMap: "https://maps.google.com/?q=Yaz+Restaurant+Highams+Park", areaServed: ["Highams Park", "Chingford", "Waltham Forest", "East London"], address: { "@type": "PostalAddress", streetAddress: "7–9 Signal Walk, Highams Park", addressLocality: "London", postalCode: "E4 9BW", addressCountry: "GB" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"], opens: "10:30", closes: "23:00" }, { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "10:30", closes: "00:00" }], sameAs: ["https://www.instagram.com/yazrestaurant/", "https://www.tiktok.com/@yazrestaurant_uk", "https://www.tripadvisor.co.uk/Restaurant_Review-g10283565-d15636700-Reviews-Yaz_Restaurant-Chingford_Waltham_Forest_Greater_London_England.html"] };

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageSeoMetadata(await getSeoSettings(), "home", "/");
}

export default async function Home() {
  const media = await getMediaSettings();
  let menu = fallbackMenu;
  let events: { title: string; date: string; detail: string }[] = [];
  let headline = "A table full of stories.";
  let intro = "Contemporary Turkish and Mediterranean cooking, generous hospitality and evenings that move at their own pace.";
  let footerTagline = "Turkish roots. Mediterranean rhythm. London energy.";
  let instagram = "https://www.instagram.com/yazrestaurant/";
  let tiktok = "https://www.tiktok.com/@yazrestaurant_uk";
  let openTableRef = "193299";
  let googleMapsKey = "";

  try {
    const store = await readAdminStore();
    const rows = store.records.sort((a, b) => a.position - b.position);
    const liveMenu = rows.filter((row) => row.type === "menu" && row.active).map((row) => ({ name: row.title, detail: row.body, price: row.subtitle }));
    if (liveMenu.length) menu = liveMenu.slice(0, 3);
    events = rows.filter((row) => row.type === "event" && row.active).map((row) => ({ title: row.title, date: row.subtitle, detail: row.body }));
    const hero = rows.find((row) => row.type === "content" && row.title === "homepage.hero" && row.active);
    if (hero?.subtitle) headline = hero.subtitle;
    if (hero?.body) intro = hero.body;
    for (const item of rows.filter((row) => row.type === "footer" && row.active)) {
      if (item.title === "tagline") footerTagline = item.subtitle;
      if (item.title === "instagram") instagram = item.subtitle;
      if (item.title === "tiktok") tiktok = item.subtitle;
    }
    const openTable = store.integrations.find((item) => item.provider === "opentable" && item.enabled);
    if (openTable) openTableRef = decryptIntegrationSecret(openTable.secretEncrypted) || openTableRef;
    const maps = store.integrations.find((item) => item.provider === "google-maps" && item.enabled);
    if (maps) googleMapsKey = decryptIntegrationSecret(maps.secretEncrypted);
  } catch { }

  const menuCards = [
    { title: "Dine with us", detail: "Come together over generous Turkish favourites, made to share and savour.", image: "/yaz-gallery-table.jpeg", href: "/menu" },
    { title: "Cocktails at Yaz", detail: "Raise a glass to signature cocktails, timeless classics and evenings that linger.", image: "/yaz-gallery-cocktails.jpeg", href: "/menu" },
    { title: "The Yaz setting", detail: "A warm welcome, from the first moment.", image: "/yaz-gallery-room.jpeg", href: "/private-hire" },
    { title: "Private dining", detail: "Bring everyone together around one table.", image: "/yaz-gallery-private-dining.jpeg", href: "/private-hire" },
  ];
  const experienceCards = [
    { title: "Dining", image: "/yaz-gallery-dining.jpeg", href: "#menu" },
    { title: "Private hire", image: "/yaz-gallery-private-dining.jpeg", href: "/private-hire" },
    { title: "Cocktails", image: "/yaz-gallery-cocktails.jpeg", href: "/menu" },
    { title: "Find Yaz", image: "/yaz-gallery-room.jpeg", href: "#visit" },
  ];
  const Logo = ({ footer = false }: { footer?: boolean }) => media.logoImage
    ? <img className={footer ? "yaz-logo-img footer-logo" : "yaz-logo-img"} src={media.logoImage} alt="Yaz Restaurant" />
    : <span className="editorial-wordmark">YAZ</span>;

  return <main className="yaz-home editorial-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />

    <EditorialHeader logoImage={media.logoImage} openTableRef={openTableRef} />

    <section className="editorial-hero" id="top" aria-label="Welcome to Yaz">
      <img className="editorial-hero-poster" src={media.heroImage} alt="Warmly lit Yaz Restaurant dining room" fetchPriority="high" />
      <video className="editorial-hero-video" autoPlay muted loop playsInline preload="metadata" poster={media.heroImage} aria-hidden="true"><source src={media.heroVideo} /></video>
      <div className="editorial-hero-shade" />
      <span className="editorial-hero-mark">
        {media.logoImage ? <img src={media.logoImage} alt="Yaz Restaurant" /> : <span>YAZ</span>}
      </span>
      <a className="editorial-scroll" href="#welcome">Scroll down <span aria-hidden="true">↓</span></a>
    </section>

    <section className="editorial-welcome" id="welcome">
      <h1>Welcome to Yaz, a contemporary celebration of the flavours we <em>know and love.</em></h1>
      <p>{intro}</p>
      <div className="editorial-actions"><a href="/private-hire">Discover Yaz</a></div>
      <OpenTableBooking restRef={openTableRef} />
    </section>

    <section className="editorial-fire-video" aria-label="Yaz by the fire">
      <video autoPlay muted loop playsInline preload="metadata" poster="/yaz-gallery-room.jpeg" aria-hidden="true">
        <source src="/yaz-duet.mp4" type="video/mp4" />
      </video>
    </section>

    <section className="editorial-menu" id="menu">
      <header><p className="editorial-eyebrow">A taste of Yaz</p><h2>The menus—<br /><em>Turkish soul, London spirit.</em></h2></header>
      <div className="editorial-menu-cards">{menuCards.map((card, index) => <article key={card.title}>
        <a className="editorial-card-image" href={card.href}><img src={card.image} alt={card.title} loading="lazy" /><span>0{index + 1}</span></a>
        <h3>{card.title}</h3><p>{card.detail}</p><a className="editorial-card-link" href={card.href}>{index < 2 ? "The menu" : "Discover more"} <NorthEastArrow /></a>
      </article>)}</div>
      <a className="editorial-outline-button" href="/menu">Explore all menus</a>
      <div className="editorial-handline" aria-hidden="true" />
    </section>

    <section className="editorial-story" id="story">
      <div className="editorial-story-heading"><p className="editorial-eyebrow">A place to gather</p><h2>Good food. Long evenings.<br /><em>Room for everyone.</em></h2></div>
      <div className="editorial-story-copy"><p>Rooted in Turkish hospitality and shaped by the energy of London, Yaz is made for the moments that bring people closer. Come for a table, stay for the feeling.</p><a className="editorial-outline-button" href="/private-hire">Discover our story</a></div>
      <figure><img src={media.heroImage} alt="Inside Yaz Restaurant in Highams Park" loading="lazy" /><figcaption>Turkish roots · Mediterranean rhythm · London energy</figcaption></figure>
    </section>

    <section className="editorial-experiences" id="explore" aria-label="Explore Yaz">
      {experienceCards.map((card) => <a className="editorial-experience-card" href={card.href} key={card.title}><img src={card.image} alt="" loading="lazy" /><span>{card.title}</span></a>)}
    </section>

    <section className="editorial-values" aria-label="The Yaz experience"><p>Turkish roots</p><span aria-hidden="true">✳</span><p>Mediterranean rhythm</p><span aria-hidden="true">✳</span><p>London energy</p></section>

    {events.length > 0 && <section className="editorial-events"><p className="editorial-eyebrow">What’s on</p><div>{events.map((event) => <article key={event.title}><span>{event.date}</span><h2>{event.title}</h2><p>{event.detail}</p><a href="#visit">Join us <NorthEastArrow /></a></article>)}</div></section>}

    {process.env.VERCEL ? <section className="editorial-enquiry"><p className="editorial-eyebrow">Private hire</p><h2>Gather around<br /><em>the Yaz table.</em></h2><p>Birthdays, celebrations and evenings worth remembering in Highams Park.</p><a href="/private-hire">Plan your occasion <NorthEastArrow /></a></section> : <CrmLeadForm />}

    <section className="editorial-visit" id="visit">
      <div className="editorial-visit-heading"><p className="editorial-eyebrow">Find us</p><h2>Meet you<br />at Yaz.</h2><a href="https://maps.google.com/?q=Yaz+Restaurant+Highams+Park" target="_blank" rel="noreferrer">Open in Maps <NorthEastArrow /></a><GoogleMap apiKey={googleMapsKey} /></div>
      <div className="editorial-visit-details"><article><span>Address</span><p>7–9 Signal Walk<br />Highams Park<br />London E4 9BW</p></article><article><span>Hours</span><p>Sun–Thu<br />10:30–23:00</p><p>Fri–Sat<br />10:30–00:00</p></article><article><span>Contact</span><a href="tel:+442082799239">020 8279 9239</a><a href="mailto:contact@yazrestaurant.co.uk">contact@yazrestaurant.co.uk</a></article></div>
    </section>

    <footer className="editorial-footer">
      <div className="editorial-footer-brand"><a href="#top" aria-label="Yaz home"><Logo footer /></a><p>{footerTagline}</p></div>
      <nav aria-label="Explore Yaz"><strong>Explore</strong><a href="/menu">Menus</a><a href="/private-hire">Private hire</a><a href="#story">Our story</a></nav>
      <div className="editorial-footer-social"><strong>Socials</strong><a href={instagram} target="_blank" rel="noreferrer">Instagram</a><a href={tiktok} target="_blank" rel="noreferrer">TikTok</a><a href="mailto:contact@yazrestaurant.co.uk">Email us</a></div>
      <div className="editorial-footer-bottom"><span>7–9 Signal Walk, Highams Park, London E4 9BW</span><a href="/privacy">Privacy</a><small>© {new Date().getFullYear()} Yaz Restaurant</small></div>
    </footer>
    <MobileBookingButton restRef={openTableRef} />
  </main>;
}
