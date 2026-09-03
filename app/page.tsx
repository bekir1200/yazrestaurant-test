import { OpenTableBooking } from "./OpenTableBooking";

const bookingUrl = "#book";

const menuHighlights = [
  { name: "Yaz Mixed Grill", detail: "Charcoal-grilled lamb, chicken, adana, rice and house salad" },
  { name: "Mediterranean Sea Bass", detail: "Herbs, lemon, seasonal greens and olive oil" },
  { name: "Anatolian Meze", detail: "A generous table of vibrant dips, warm bread and shared plates" },
];

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Yaz Restaurant",
  image: [
    "https://static.wixstatic.com/media/16ca1a_b5c3a872574b4054af44f6fab16435a8f000.jpg",
    "https://static.wixstatic.com/media/16ca1a_a7a5fe1e979f40efb026481393cddd56f000.jpg",
  ],
  url: "https://www.yazrestaurant.co.uk/",
  telephone: "+44 20 8279 9239",
  priceRange: "££–£££",
  servesCuisine: ["Turkish", "Mediterranean", "Middle Eastern"],
  acceptsReservations: true,
  menu: "https://www.yazrestaurant.co.uk/menu",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7–9 Signal Walk, Highams Park",
    addressLocality: "London",
    postalCode: "E4 9BW",
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"], opens: "10:30", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "10:30", closes: "00:00" },
  ],
  sameAs: [
    "https://www.instagram.com/yazrestaurant/",
    "https://www.tiktok.com/@yazrestaurant_uk",
    "https://www.tripadvisor.co.uk/Restaurant_Review-g10283565-d15636700-Reviews-Yaz_Restaurant-Chingford_Waltham_Forest_Greater_London_England.html",
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Yaz Restaurant home"><span>Y</span>AZ</a>
        <nav aria-label="Main navigation">
          <a href="#story">Our story</a><a href="#menu">Menu</a><a href="#private-hire">Private hire</a><a href="#visit">Visit</a>
        </nav>
        <a className="header-book" href={bookingUrl}>Book a table</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Highams Park · London</p>
          <h1>Mediterranean soul.<br/><em>London energy.</em></h1>
          <p className="intro">Modern Turkish and Mediterranean dining, made for long lunches, candlelit dinners and celebrations that deserve something special.</p>
          <div className="hero-actions">
            <a className="button button-gold pulse-button" href={bookingUrl}>Book a table</a>
            <a className="button button-quiet" href="#menu">Explore the menu <span aria-hidden="true">→</span></a>
          </div>
          <div className="opening-note"><span>Open every day</span><span>Sun–Thu 10:30–23:00</span><span>Fri–Sat 10:30–00:00</span></div>
        </div>
        <div className="hero-image" role="img" aria-label="Warm, elegant dining room at Yaz Restaurant">
          <div className="image-stamp"><small>Your escape to the</small><strong>Mediterranean</strong></div>
        </div>
      </section>

      <section className="marquee" aria-label="Yaz restaurant highlights"><div><span>Turkish flavours</span><i>•</i><span>Modern hospitality</span><i>•</i><span>Made to share</span><i>•</i><span>Highams Park</span><i>•</i><span>Turkish flavours</span><i>•</i><span>Modern hospitality</span><i>•</i><span>Made to share</span><i>•</i><span>Highams Park</span></div></section>

      <OpenTableBooking />

      <section className="story section" id="story">
        <div><p className="eyebrow dark">Family-run · Generously served</p><h2>A little piece of the Mediterranean, right here in London.</h2></div>
        <div className="story-copy"><p>From sunrise to starlight, Yaz brings together the flavours of Anatolia and the Mediterranean with the easy warmth of a family table.</p><p>Join us downstairs for relaxed breakfast and brunch, or head upstairs for supper, cocktails and a night to remember.</p><a className="text-link" href="#visit">Discover Yaz <span>→</span></a></div>
      </section>

      <section className="experience-grid" aria-label="The Yaz experience">
        <div className="portrait-image" role="img" aria-label="Fresh Mediterranean food at Yaz Restaurant" />
        <article className="experience-card"><p className="eyebrow">Fresh from the kitchen</p><h2>Authentic flavours.<br/>Made with heart.</h2><p>Charcoal grills, colourful meze, market-fresh seafood and indulgent desserts—each plate carries a familiar taste with a modern Yaz signature.</p><a className="button button-outline" href="#menu">View our favourites</a></article>
      </section>

      <section className="menu-section section" id="menu">
        <div className="section-heading"><div><p className="eyebrow dark">A taste of Yaz</p><h2>Come hungry.<br/><em>Leave happy.</em></h2></div><p>Our menus move from laid-back brunch to generous evening feasts, with vegetarian choices and halal dishes throughout.</p></div>
        <div className="menu-list">{menuHighlights.map((item, index) => <article key={item.name}><span>0{index + 1}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div></article>)}</div>
        <a className="button button-dark" href="https://www.yazrestaurant.co.uk/menu" target="_blank" rel="noreferrer">View full menus</a>
      </section>

      <section className="private-hire" id="private-hire">
        <div className="private-copy"><p className="eyebrow">Gather at Yaz</p><h2>Your occasion,<br/><em>beautifully hosted.</em></h2><p>Birthdays, engagements, work dinners and celebrations for up to 200 guests. Our upstairs space, cocktail bar and heated balcony are yours to make memorable.</p><a className="button button-gold" href="mailto:contact@yazrestaurant.co.uk?subject=Private%20hire%20enquiry">Plan your event</a></div>
        <div className="private-detail"><span>Private dining</span><span>Up to 200 guests</span><span>Bespoke menus</span><span>Dedicated team</span></div>
      </section>

      <section className="visit section" id="visit">
        <div><p className="eyebrow dark">Come and see us</p><h2>Meet you at Yaz.</h2><p className="address">7–9 Signal Walk<br/>Highams Park, London E4 9BW</p><a className="text-link" href="https://maps.google.com/?q=Yaz+Restaurant+Highams+Park" target="_blank" rel="noreferrer">Get directions <span>↗</span></a></div>
        <div className="visit-info"><div><h3>Opening hours</h3><p>Sunday–Thursday<br/>10:30–23:00</p><p>Friday–Saturday<br/>10:30–00:00</p></div><div><h3>Contact</h3><a href="tel:+442082799239">020 8279 9239</a><a href="mailto:contact@yazrestaurant.co.uk">contact@yazrestaurant.co.uk</a></div></div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span>Y</span>AZ</a><p>Turkish &amp; Mediterranean dining in Highams Park.</p><div><a href="https://www.instagram.com/yazrestaurant/">Instagram</a><a href="https://www.tiktok.com/@yazrestaurant_uk">TikTok</a><a href="https://www.tripadvisor.co.uk/Restaurant_Review-g10283565-d15636700-Reviews-Yaz_Restaurant-Chingford_Waltham_Forest_Greater_London_England.html">Tripadvisor</a></div><small>© {new Date().getFullYear()} Yaz Restaurant</small></footer>
      <a className="mobile-book" href={bookingUrl}>Book a table</a>
    </main>
  );
}
