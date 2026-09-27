import type { Metadata } from "next";
import { readAdminStore } from "../../lib/local-admin-store";
import { getMediaSettings } from "../../lib/media";
import { EditorialHeader } from "../EditorialHeader";
import { EditorialFooter } from "../EditorialFooter";

export const metadata: Metadata = { title: "Turkish & Mediterranean Menu in Highams Park | Yaz", description: "Explore charcoal grills, colourful meze, seafood and vegetarian dishes at Yaz Restaurant in Highams Park, London.", alternates: { canonical: "/menu" }, openGraph: { title: "Yaz Restaurant Menu | Highams Park", description: "Turkish and Mediterranean dishes made for sharing, from relaxed brunch to dinner.", url: "/menu" } };
export const dynamic = "force-dynamic";

const fallback = [
  { title: "Yaz Mixed Grill", subtitle: "", body: "Charcoal-grilled lamb, chicken, adana, rice and house salad" },
  { title: "Mediterranean Sea Bass", subtitle: "", body: "Herbs, lemon, seasonal greens and olive oil" },
  { title: "Anatolian Meze", subtitle: "", body: "A generous table of vibrant dips, warm bread and shared plates" },
];

export default async function MenuPage() {
  let menu = fallback;
  let logoImage = "/yaz-logo.png";
  try {
    const rows = (await readAdminStore()).records.sort((a, b) => a.position - b.position);
    const live = rows.filter((row) => row.type === "menu" && row.active);
    if (live.length) menu = live;
  } catch { }
  try { logoImage = (await getMediaSettings()).logoImage; } catch { }

  return <main className="editorial-subpage editorial-menu-page">
    <EditorialHeader logoImage={logoImage} openTableRef="193299" subpage />
    <section className="editorial-subpage-hero editorial-menu-hero">
      <p className="editorial-eyebrow">Turkish &amp; Mediterranean dining · Highams Park</p>
      <h1>A table full<br /><em>of stories.</em></h1>
      <p>Charcoal-fired favourites, colourful meze and bright Mediterranean flavours—made for the whole table.</p>
      <a className="editorial-subpage-button" href="/#book">Book a table</a>
    </section>
    <section className="editorial-menu-list-section">
      <header><p className="editorial-eyebrow">A taste of Yaz</p><h2>Made for sharing.<br /><em>Remembered together.</em></h2><p>Our kitchen brings Anatolian recipes and modern Mediterranean cooking to the table. Vegetarian choices and halal dishes are available; please tell the team about allergies before ordering.</p></header>
      <div className="editorial-menu-list">{menu.map((item, index) => <article key={`${item.title}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div>{item.subtitle && <strong>{item.subtitle}</strong>}</article>)}</div>
      <a className="editorial-subpage-text-link" href="/#book">Find your table <span aria-hidden="true">↗</span></a>
    </section>
    <section className="editorial-subpage-cta"><p className="editorial-eyebrow">Your table is waiting</p><h2>Join us at Yaz.</h2><p>Good food, warm hospitality and an evening at your own pace.</p><a className="editorial-subpage-button light" href="/#book">Reserve with OpenTable</a></section>
    <EditorialFooter logoImage={logoImage} />
  </main>;
}
