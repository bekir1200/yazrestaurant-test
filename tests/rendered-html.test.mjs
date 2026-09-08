import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read=(path)=>readFile(new URL(path,import.meta.url),"utf8");

test("publishes complete restaurant SEO metadata",async()=>{
  const [layout,home,robots,sitemap]=await Promise.all([read("../app/layout.tsx"),read("../app/page.tsx"),read("../app/robots.ts"),read("../app/sitemap.ts")]);
  assert.match(layout,/Turkish Restaurant in Highams Park/);
  assert.match(layout,/alternates:\s*\{ canonical:/);
  assert.match(home,/application\/ld\+json/);
  assert.match(home,/"@type"\s*:\s*"Restaurant"/);
  assert.match(home,/alt="Atmospheric dining room/);
  assert.match(robots,/disallow: \["\/admin", "\/crm", "\/api\/"\]/);
  assert.match(sitemap,/`\$\{base\}\/menu`/);
  assert.match(sitemap,/`\$\{base\}\/private-hire`/);
});

test("provides indexable landing pages and protects private tools",async()=>{
  const [menu,privateHire,admin,crm]=await Promise.all([read("../app/menu/page.tsx"),read("../app/private-hire/page.tsx"),read("../app/admin/page.tsx"),read("../app/crm/page.tsx")]);
  assert.match(menu,/alternates:\{canonical:"\/menu"\}/);
  assert.match(privateHire,/alternates:\{canonical:"\/private-hire"\}/);
  assert.match(privateHire,/"@type":"FAQPage"/);
  assert.match(admin,/index:false,follow:false/);
  assert.match(crm,/index:false,follow:false/);
});
