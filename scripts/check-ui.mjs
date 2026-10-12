import { createRequire } from 'node:module';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, extname, sep } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
let origin = process.env.UI_ORIGIN || 'http://127.0.0.1:4331';
let server;
if (process.env.UI_STATIC === '1') {
  const root = resolve('dist');
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4' };
  server = createServer(async (request, response) => {
    try {
      let file = resolve(root, `.${decodeURIComponent(new URL(request.url, 'http://localhost').pathname)}`);
      if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
      const stream = createReadStream(file);
      stream.on('error', () => response.destroy());
      stream.pipe(response);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  origin = `http://127.0.0.1:${server.address().port}`;
}
const allRoutes = ['/', '/tentang-kami/', '/karir-pengabdian/', '/iapa/', ...[
  'the-father-project', 'the-fitrah-journey', 'ushuluna', 'homebased-learning',
  'headmaster-teacher-academy', 'kaderisasi-guru-quran-paud-sd', 'iaiee', 'deenup',
].map((slug) => `/program/${slug}/`)];
const routes = process.env.UI_ROUTES ? process.env.UI_ROUTES.split(',') : allRoutes;
const widths = (process.env.UI_WIDTHS || '320,375,414,768,1440').split(',').map(Number);
let browser;
const report = [];
const layout = [];
await mkdir('.hallmark/ui-review', { recursive: true });

try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const route of routes) {
    for (const width of widths) {
      const errors = [];
      const onError = (error) => errors.push(error.message);
      page.on('pageerror', onError);
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
      await page.evaluate(async () => {
        document.querySelector('astro-dev-toolbar')?.remove();
        document.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
        await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 2500))]);
        await Promise.race([Promise.all([...document.images].map((img) => img.decode().catch(() => {}))), new Promise((done) => setTimeout(done, 5000))]);
      });
      const result = await page.evaluate(() => {
        const visible = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
        const elements = [...document.querySelectorAll('body *')].filter(visible);
        const overflow = elements.filter((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.left >= -1 && rect.right <= innerWidth + 1) return false;
          for (let parent = el.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
            const style = getComputedStyle(parent);
            const bounds = parent.getBoundingClientRect();
            if (['hidden', 'clip'].includes(style.overflowX) && bounds.left >= -1 && bounds.right <= innerWidth + 1) return false;
          }
          return true;
        }).filter((el) => !el.closest('[class*="skip"], [aria-hidden="true"], astro-dev-toolbar'));
        const brokenAnchors = [...document.querySelectorAll('a[href^="#"]')]
          .filter((el) => !document.getElementById(el.getAttribute('href').slice(1)))
          .map((el) => el.getAttribute('href'));
        const images = [...document.images].filter((el) => el.complete && !el.naturalWidth).map((el) => el.getAttribute('src'));
        const bottom = document.querySelector('.hm-mobile-bottom-nav, .hm-iaiee-bottom-nav');
        const nav = document.querySelector('body > div > header, body > header');
        const navOverlaps = nav ? [...nav.querySelectorAll('a, summary')].filter(visible).flatMap((a, i, links) => links.slice(i + 1).filter((b) => {
          if (a.contains(b) || b.contains(a)) return false;
          const ra = a.getBoundingClientRect(); const rb = b.getBoundingClientRect();
          return Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left) > 2 && Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top) > 2;
        }).map((b) => `${a.textContent.trim()} / ${b.textContent.trim()}`)) : [];
        const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        const rgba = (color) => { context.clearRect(0,0,1,1); context.fillStyle = color; context.fillRect(0,0,1,1); return [...context.getImageData(0,0,1,1).data].map((n, i) => i === 3 ? n / 255 : n); };
        const luminance = (rgb) => rgb.slice(0,3).map((value) => { const c = value / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }).reduce((sum, value, i) => sum + value * [.2126,.7152,.0722][i], 0);
        const contrast = elements.filter((el) => [...el.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()) && el.tagName !== 'OPTION').flatMap((el) => {
          if (el.closest('header')) return [];
          const hero = el.closest('section[class*="hero"]');
          if (hero) {
            const button = el.closest('a');
            if (!button || rgba(getComputedStyle(button).backgroundColor)[3] < .99) return [];
          }
          const chain = []; let bg = [255,255,255];
          for (let parent = el; parent; parent = parent.parentElement) {
            const style = getComputedStyle(parent);
            if (style.backgroundImage !== 'none' || Number(style.opacity) < .9 || parent.matches('svg, astro-dev-toolbar')) return [];
            chain.unshift(style.backgroundColor);
          }
          chain.forEach((color) => { const fg = rgba(color); bg = bg.map((value, i) => fg[i] * fg[3] + value * (1 - fg[3])); });
          const style = getComputedStyle(el); const fg = rgba(style.color);
          const blended = bg.map((value, i) => fg[i] * fg[3] + value * (1 - fg[3]));
          const levels = [luminance(bg), luminance(blended)].sort((a,b) => b-a);
          const ratio = (levels[0] + .05) / (levels[1] + .05);
          const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && Number(style.fontWeight) >= 700);
          return ratio + .03 < (large ? 3 : 4.5) ? [{ text: el.textContent.trim().slice(0,70), class: el.className, ratio: +ratio.toFixed(2), color: style.color, bg: bg.map(Math.round) }] : [];
        });
        return {
          overflow: overflow.slice(0, 12).map((el) => ({ tag: el.tagName, class: el.className, text: el.textContent.trim().slice(0, 70) })),
          brokenAnchors: [...new Set(brokenAnchors)], images, navOverlaps,
          h1Count: document.querySelectorAll('h1').length,
          bottomVisible: !!bottom && !!visible(bottom),
          rootOverflow: document.documentElement.scrollWidth > innerWidth, contrast,
        };
      });
      if (process.env.UI_LAYOUT === '1') {
        await page.evaluate(() => document.activeElement?.blur());
        const sections = await page.evaluate(() => [...document.querySelectorAll('main section, footer')].map((section) => {
          const rect = section.getBoundingClientRect();
          const heading = section.querySelector('h1, h2');
          const style = getComputedStyle(section);
          return { class: section.className, top: Math.round(rect.top + scrollY), height: Math.round(rect.height), width: Math.round(rect.width), padding: [style.paddingTop, style.paddingBottom], heading: heading?.textContent.trim(), fontSize: heading ? getComputedStyle(heading).fontSize : null, headingHeight: heading ? Math.round(heading.getBoundingClientRect().height) : 0 };
        }));
        const narrowText = await page.evaluate(() => [...document.querySelectorAll('main p, main span, main h2, main h3, footer p')].filter((el) => el.getClientRects().length && el.textContent.trim().length > 40 && !el.querySelector('p, span') && !el.closest('nav, [aria-hidden="true"]') && el.getBoundingClientRect().width < 160).map((el) => ({ text: el.textContent.trim().slice(0,85), width: Math.round(el.getBoundingClientRect().width), parent: el.parentElement.className, section: el.closest('section')?.className })));
        result.layoutErrors = await page.evaluate(() => {
          const issues = [];
          const visible = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
          const links = [...document.querySelectorAll('footer a')].filter(visible);
          links.forEach((a, i) => links.slice(i + 1).forEach((b) => {
            if (a.contains(b) || b.contains(a)) return;
            const x = a.getBoundingClientRect(); const y = b.getBoundingClientRect();
            if (Math.min(x.right, y.right) - Math.max(x.left, y.left) > 2 && Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top) > 2) issues.push(`Footer overlap: ${a.textContent.trim()} / ${b.textContent.trim()}`);
          }));
          const overview = document.querySelector('.program-overview .program-inner');
          const intro = document.querySelector('.iais-intro, .hta-welcome, .pkgq-intro');
          if (overview && intro) {
            const inset = (el) => el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
            if (Math.abs(inset(overview) - inset(intro)) > 2) issues.push('Program overview and intro gutters differ');
          }
          const signals = document.querySelector('.hm-hbl .iais-signals');
          if (signals) {
            const list = signals.querySelector('ol');
            const contentWidth = signals.clientWidth - parseFloat(getComputedStyle(signals).paddingLeft) - parseFloat(getComputedStyle(signals).paddingRight);
            if (list.getBoundingClientRect().width < contentWidth * .9) issues.push('HBL flowchart is compressed inside its section');
          }
          document.querySelectorAll('footer > div[class*="-meta"]').forEach((meta) => {
            const footer = meta.parentElement;
            const contentWidth = footer.clientWidth - parseFloat(getComputedStyle(footer).paddingLeft) - parseFloat(getComputedStyle(footer).paddingRight);
            if (meta.getBoundingClientRect().width < contentWidth * .9) issues.push('Footer metadata is compressed beside the closing statement');
          });
          return issues;
        });
        layout.push({ route, width, sections, narrowText });
        result.narrowText = narrowText;
        if (width === 375 || width === 1440) {
          const targets = page.locator('main > section:not([class*="hero"]), .program-faq, footer');
          const count = await targets.count();
          for (const index of [...new Set([Math.min(2, count - 1), Math.floor(count / 2), count - 1])]) {
            const target = targets.nth(index);
            await target.scrollIntoViewIfNeeded();
            await target.screenshot({ path: `.hallmark/ui-review/${route.replaceAll('/', '_')}-${width}-section-${index}.png` });
          }
          await page.evaluate(() => scrollTo(0, 0));
          if (route === '/program/homebased-learning/') {
            for (const selector of ['.iais-signals', '.program-overview', 'footer']) {
              const target = page.locator(selector);
              await target.scrollIntoViewIfNeeded();
              await target.screenshot({ path: `.hallmark/ui-review/hbl-${width}-${selector.replaceAll('.', '')}.png` });
            }
            await page.evaluate(() => scrollTo(0, 0));
          }
        }
      }
      const menu = page.locator('header details:visible, nav[aria-label*="bawah"] details:visible').first();
      if (await menu.count()) {
        await menu.locator('summary').click();
        const open = await menu.getAttribute('open');
        await page.keyboard.press('Escape');
        result.menuEscape = open !== null && (await menu.getAttribute('open')) === null;
      }
      if (width === 375 || width === 1440) {
        await page.screenshot({ path: `.hallmark/ui-review/${route.replaceAll('/', '_') || 'home'}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `.hallmark/ui-review/${route.replaceAll('/', '_') || 'home'}-${width}-top.png` });
        const guide = page.locator('.program-preparation');
        if (await guide.count()) await guide.screenshot({ path: `.hallmark/ui-review/${route.replaceAll('/', '_')}-${width}-guide.png` });
      }
      result.interactionErrors = [];
      if (width === 375) {
        if (route === '/') {
          const query = page.locator('[data-program-finder] input');
          const group = page.locator('[data-program-finder] select');
          const items = page.locator('[data-program-result]:visible');
          await query.fill('Ushuluna');
          if (await items.count() !== 1) result.interactionErrors.push('Program search');
          await query.fill(''); await group.selectOption('pendidik');
          if (await items.count() !== 3) result.interactionErrors.push('Audience filter');
          await page.locator('[data-program-finder]').screenshot({ path: '.hallmark/ui-review/program-finder-375.png' });
          await query.fill('tidak-ada-program-ini');
          if (await items.count() || !(await page.locator('[data-program-empty]').isVisible())) result.interactionErrors.push('Empty state');
          await page.locator('[data-program-reset]').click();
          if (await items.count() !== 9) result.interactionErrors.push('Reset filter');
        }
        const faq = page.locator('.program-faq details').first();
        if (await faq.count()) {
          await faq.locator('summary').click();
          if (await faq.getAttribute('open') === null) result.interactionErrors.push('FAQ open');
          await page.keyboard.press('Enter');
          if (await faq.getAttribute('open') !== null) result.interactionErrors.push('FAQ keyboard close');
        }
        const curriculum = page.locator('.iais-curriculum-grid details').first();
        if (await curriculum.count()) {
          await curriculum.locator('summary').click();
          if (!(await curriculum.locator('ul').isVisible())) result.interactionErrors.push('Curriculum disclosure');
          await page.keyboard.press('Enter');
          if (await curriculum.getAttribute('open') !== null) result.interactionErrors.push('Curriculum keyboard close');
        }
        const disclosures = page.locator('header details:visible, nav[aria-label*="bawah"] details:visible');
        if (await disclosures.count() > 1) {
          await disclosures.first().locator('summary').click();
          await disclosures.last().locator('summary').click();
          if (await page.locator('header details[open], nav[aria-label*="bawah"] details[open]').count() !== 1) result.interactionErrors.push('Exclusive menus');
          await page.keyboard.press('Escape');
        }
      }
      page.off('pageerror', onError);
      report.push({ route, width, status: response.status(), ...result, errors });
    }
  }
  await writeFile('.hallmark/ui-review/report.json', JSON.stringify(report, null, 2));
  if (layout.length) await writeFile('.hallmark/ui-review/layout.json', JSON.stringify(layout, null, 2));
  const findings = report.filter((r) => r.status !== 200 || r.rootOverflow || r.overflow.length || r.brokenAnchors.length || r.images.length || r.navOverlaps.length || r.h1Count !== 1 || r.errors.length || r.menuEscape === false || r.contrast.length || r.interactionErrors.length || r.narrowText?.length || r.layoutErrors?.length || (r.width <= 414 && !r.bottomVisible));
  const unique = findings.filter((r, index) => findings.findIndex((other) => other.route === r.route && JSON.stringify({ ...other, width: 0 }) === JSON.stringify({ ...r, width: 0 })) === index);
  console.log(JSON.stringify({ checked: report.length, findings: unique }, null, 2));
  process.exitCode = findings.length ? 1 : 0;
} finally {
  await browser?.close();
  if (server) await new Promise((done) => server.close(done));
}
