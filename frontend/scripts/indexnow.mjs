// Notify IndexNow search engines (Bing, Yandex, Seznam, Naver...) that pages changed.
// Run AFTER the new version is live:   npm run indexnow
// Optional: pass specific paths, e.g. npm run indexnow -- /tools/word-to-pdf /blog
// The key file public/<KEY>.txt must be reachable at https://movifile.com/<KEY>.txt.

const HOST = "movifile.com";
const KEY = "4e635d2e23baf3d669fc618675fb7247";

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not load sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const paths = process.argv.slice(2);
const urlList = paths.length
  ? paths.map((p) => new URL(p, `https://${HOST}`).toString())
  : await sitemapUrls();

const keyCheck = await fetch(`https://${HOST}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file https://${HOST}/${KEY}.txt is not live yet. Deploy first, then run this again.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`Submitted ${urlList.length} URLs to IndexNow: HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exit(1);
}
