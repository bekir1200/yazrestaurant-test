import type { Metadata } from "next";
import { CrmLeadForm } from "../CrmLeadForm";
import { EditorialHeader } from "../EditorialHeader";
import { EditorialFooter } from "../EditorialFooter";
import { getMediaSettings } from "../../lib/media";

export const metadata: Metadata = { title: "Private Hire & Party Venue in Highams Park | Yaz", description: "Host birthdays, engagements and work dinners for up to 200 guests at Yaz Restaurant, Highams Park. Bespoke menus, cocktail bar and heated balcony.", alternates: { canonical: "/private-hire" }, openGraph: { title: "Private Hire at Yaz Restaurant", description: "A stylish private party and dining venue in Highams Park for up to 200 guests.", url: "/private-hire" } };
const faq = [
  { q: "How many guests can Yaz host?", a: "Our flexible upstairs space can host celebrations for up to 200 guests, depending on the style of your event." },
  { q: "Can you create a bespoke menu?", a: "Yes. Our team can help shape a menu around your occasion, group size and dietary needs." },
  { q: "Where is Yaz Restaurant?", a: "We are at 7–9 Signal Walk in Highams Park, London E4 9BW, close to Highams Park station." },
];

export default async function PrivateHirePage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  let logoImage = "/yaz-logo.png";
  try { logoImage = (await getMediaSettings()).logoImage; } catch { }

  return <main className="editorial-subpage editorial-private-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <EditorialHeader logoImage={logoImage} openTableRef="193299" subpage />
    <section className="editorial-subpage-hero editorial-private-hero">
      <p className="editorial-eyebrow">Private dining · Parties · Celebrations</p>
      <h1>Your occasion,<br /><em>beautifully hosted.</em></h1>
      <p>A characterful Highams Park setting for birthdays, engagements, work dinners and the moments worth gathering for.</p>
      <a className="editorial-subpage-button" href="#enquire">Plan your occasion</a>
    </section>
    <section className="editorial-private-intro">
      <p className="editorial-eyebrow">Gather at Yaz</p><h2>Space to make it<br /><em>yours.</em></h2>
      <p>Our upstairs dining room, cocktail bar and heated balcony create an easy flow from welcome drinks to dinner and dancing. The Yaz team can help shape a celebration that feels personal from the first arrival to the last toast.</p>
    </section>
    <section className="editorial-private-features" aria-label="Private hire highlights">
      <article><strong>Up to 200</strong><span>guests</span></article><article><strong>Bespoke</strong><span>menus</span></article><article><strong>Dedicated</strong><span>event team</span></article>
    </section>
    <section className="editorial-private-faq"><p className="editorial-eyebrow">Planning your event</p><h2>A few helpful details.</h2>{faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
    <div id="enquire" className="editorial-private-form"><CrmLeadForm /></div>
    <EditorialFooter logoImage={logoImage} />
  </main>;
}
