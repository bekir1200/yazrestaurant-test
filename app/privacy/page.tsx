import { getMediaSettings } from "../../lib/media";
import { getSeoSettings, pageSeoMetadata } from "../../lib/seo-settings";
import { EditorialHeader } from "../EditorialHeader";
import { EditorialFooter } from "../EditorialFooter";

export async function generateMetadata() {
  return pageSeoMetadata(await getSeoSettings(), "privacy", "/privacy");
}

export const dynamic = "force-dynamic";
const sections = [
  { title: "Who we are", text: "Yaz Restaurant is the data controller for enquiries submitted on this website. Contact: contact@yazrestaurant.co.uk, 7–9 Signal Walk, Highams Park, London E4 9BW." },
  { title: "What we collect and why", text: "For event enquiries we collect your name, email, optional phone number, event details and preferred date so we can respond, prepare a quote and manage the requested service. Our lawful basis is taking steps at your request before entering a contract and, where relevant, performance of a contract." },
  { title: "Marketing", text: "Marketing email is optional and based on your separate consent. Refusing marketing does not affect your enquiry. You may withdraw consent at any time by emailing us." },
  { title: "Analytics and advertising cookies", text: "Optional Google Analytics, Google Ads, Google Tag Manager and Meta Pixel tags are disabled until you accept optional cookies. You can reject them or change your choice using Cookie settings. These services may process page views, interactions and advertising measurement data. An embedded Google map loads only after you choose to load it." },
  { title: "Sharing and international transfers", text: "We only share information with service providers needed to host and operate the website or deliver your event. Before launch, Yaz will document each provider, its location and any international-transfer safeguards here." },
  { title: "How long we keep it", text: "Unsuccessful event enquiries are scheduled for deletion after 12 months. Confirmed bookings and accounting records may be retained longer where required for contractual, tax or legal purposes. We review records before deletion or anonymisation." },
  { title: "Your rights", text: "You may ask for access, correction, deletion, restriction, portability or object to certain uses. Email contact@yazrestaurant.co.uk. We may need to verify your identity. You can also complain to the UK Information Commissioner’s Office." },
  { title: "Security", text: "CRM access is restricted to authorised users, changes are logged, and the public form does not expose stored records." },
];

export default async function PrivacyPage() {
  let logoImage = "/yaz-logo.png";
  try { logoImage = (await getMediaSettings()).logoImage; } catch { }
  return <main className="editorial-subpage editorial-privacy-page">
    <EditorialHeader logoImage={logoImage} openTableRef="193299" subpage />
    <section className="editorial-subpage-hero editorial-privacy-hero"><p className="editorial-eyebrow">Privacy notice · Version 25 September 2026</p><h1>Your privacy<br /><em>at Yaz.</em></h1><p>How we look after information when you visit our website or contact the Yaz team.</p></section>
    <section className="editorial-privacy-content">{sections.map((section) => <article key={section.title}><h2>{section.title}</h2><p>{section.text}</p></article>)}<a className="editorial-subpage-text-link" href="mailto:contact@yazrestaurant.co.uk?subject=Privacy%20request">Make a privacy request <span aria-hidden="true">↗</span></a></section>
    <EditorialFooter logoImage={logoImage} />
  </main>;
}
