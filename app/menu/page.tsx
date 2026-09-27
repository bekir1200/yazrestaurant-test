import type { Metadata } from "next";
import { readAdminStore } from "../../lib/local-admin-store";
import { getMediaSettings } from "../../lib/media";
import { menuDietaryNote, menuSections } from "../../lib/menu-data";
import { EditorialHeader } from "../EditorialHeader";
import { EditorialFooter } from "../EditorialFooter";

export const metadata: Metadata = { title: "Turkish & Mediterranean Menu in Highams Park | Yaz", description: "Explore charcoal grills, colourful meze, seafood and vegetarian dishes at Yaz Restaurant in Highams Park, London.", alternates: { canonical: "/menu" }, openGraph: { title: "Yaz Restaurant Menu | Highams Park", description: "Turkish and Mediterranean dishes made for sharing, from relaxed brunch to dinner.", url: "/menu" } };
export const dynamic = "force-dynamic";

const normaliseName = (value: string) => value.trim().toLocaleLowerCase("en-GB");

export default async function MenuPage() {
  const sections = menuSections.map((section) => ({ ...section, items: section.items.map((item) => ({ ...item })) }));
  let logoImage = "/yaz-logo.png";

  try {
    const rows = (await readAdminStore()).records.filter((row) => row.type === "menu" && row.active);
    for (const row of rows) {
      const sectionItem = sections.flatMap((section) => section.items).find((item) => normaliseName(item.name) === normaliseName(row.title));
      if (sectionItem) {
        if (row.subtitle.trim()) sectionItem.price = row.subtitle.trim();
        if (row.body.trim()) sectionItem.description = row.body.trim();
        continue;
      }

      let category = "";
      try { category = String((JSON.parse(row.metadata || "{}") as { category?: string }).category || ""); } catch { }
      const targetSection = sections.find((section) => normaliseName(section.title) === normaliseName(category));
      if (targetSection && row.title.trim()) targetSection.items.push({ name: row.title.trim(), description: row.body.trim(), price: row.subtitle.trim() });
    }
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
      <header><p className="editorial-eyebrow">A taste of Yaz</p><h2>Made for sharing.<br /><em>Remembered together.</em></h2><p>Our kitchen brings Anatolian recipes and modern Mediterranean cooking to the table. Please tell the team about allergies or dietary requirements before ordering.</p></header>
      <div className="editorial-menu-catalog">{sections.map((section) => <section className="editorial-menu-category" key={section.title}>
        <header><h3>{section.title}</h3>{section.note && <p>{section.note}</p>}</header>
        <div>{section.items.map((item) => <article key={item.name}>
          <div className="editorial-menu-item-heading"><h4>{item.name}</h4><strong>{item.price}</strong></div>
          {item.description && <p>{item.description}</p>}
          {item.dietary?.length ? <span className="editorial-menu-dietary">{item.dietary.join(" · ")}</span> : null}
        </article>)}</div>
      </section>)}</div>
      <p className="editorial-menu-disclaimer">{menuDietaryNote}</p>
      <a className="editorial-subpage-text-link" href="/#book">Find your table <span aria-hidden="true">↗</span></a>
    </section>
    <section className="editorial-subpage-cta"><p className="editorial-eyebrow">Your table is waiting</p><h2>Join us at Yaz.</h2><p>Good food, warm hospitality and an evening at your own pace.</p><a className="editorial-subpage-button light" href="/#book">Reserve with OpenTable</a></section>
    <EditorialFooter logoImage={logoImage} />
  </main>;
}
