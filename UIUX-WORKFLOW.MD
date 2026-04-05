# UIUX-WORKFLOW.MD — Visual UI/UX Development Workflow

> **Skill:** Headless Playwright visual feedback loop for Next.js UI/UX iteration
> **Status:** Proven and working on this VM
> **Created:** 2026-04-05

---

## What This Is

BarneyBot can **see** the UI it builds. No VNC, no desktop, no GUI. Just:
1. Edit a component
2. Next.js hot-reloads
3. Playwright takes a headless screenshot
4. BarneyBot views the screenshot (base64)
5. Adjusts based on visual feedback
6. Repeat

Desi watches live via SSH tunnel → `localhost:3000` in his Mac browser.

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 22+ | Already on VM |
| npm | 10+ | Already on VM |
| Next.js | 16+ | `npx create-next-app@latest` |
| Playwright | 1.59+ | `npm i -D playwright @playwright/test` |
| Chromium | (bundled) | `npx playwright install --with-deps chromium` |

No Xvfb, no VNC, no desktop environment needed.

---

## Quick Start

```bash
# 1. Start dev server (if not running)
~/start-dev.sh

# 2. From Mac — SSH tunnel
ssh -L 3000:localhost:3000 desazure@20.81.190.88
# Open http://localhost:3000
```

---

## Screenshot Command (for BarneyBot)

### One-liner
```bash
cd ~/projects/<app> && node -e "
const{chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1920,height:1080}});
  await p.goto('http://localhost:3000',{waitUntil:'networkidle'});
  await p.screenshot({path:'/tmp/screenshot.png',fullPage:true});
  await b.close();
  console.log('Done');
})()"
```

### With DOM inspection
```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Screenshot
  await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true });

  // DOM inspection
  const title = await page.title();
  const h1 = await page.locator('h1').textContent();
  const links = await page.locator('a').count();
  console.log({ title, h1, links });

  // Check for visual regressions
  const errors = await page.locator('.error, [role="alert"]').count();
  if (errors > 0) console.warn(`Found ${errors} error elements`);

  await browser.close();
})();
```

### Specific viewport sizes
```javascript
// Mobile
await page.setViewportSize({ width: 375, height: 812 });
await page.screenshot({ path: '/tmp/screenshot-mobile.png', fullPage: true });

// Tablet
await page.setViewportSize({ width: 768, height: 1024 });
await page.screenshot({ path: '/tmp/screenshot-tablet.png', fullPage: true });

// Desktop
await page.setViewportSize({ width: 1920, height: 1080 });
await page.screenshot({ path: '/tmp/screenshot-desktop.png', fullPage: true });
```

---

## Iteration Workflow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Edit          │────▶│ Hot Reload   │────▶│ Screenshot   │
│ component.tsx │     │ (automatic)  │     │ (Playwright) │
└──────────────┘     └──────────────┘     └──────┬───────┘
       ▲                                         │
       │              ┌──────────────┐            │
       └──────────────│ View + Judge │◀───────────┘
                      │ (base64 img) │
                      └──────────────┘
```

### BarneyBot checks after each edit:
1. **Does it render?** (no blank page, no error overlay)
2. **Layout correct?** (grid, spacing, alignment)
3. **Responsive?** (test mobile + desktop viewports)
4. **Content correct?** (headings, text, data)
5. **Styling correct?** (colors, fonts, shadows)

---

## Advanced: Playwright Automation Beyond Screenshots

```javascript
// Click through navigation
await page.click('nav a[href="/about"]');
await page.waitForURL('**/about');
await page.screenshot({ path: '/tmp/about.png' });

// Fill forms
await page.fill('input[name="email"]', 'test@example.com');
await page.click('button[type="submit"]');
await page.waitForResponse('**/api/**');

// Check console errors
page.on('console', msg => {
  if (msg.type() === 'error') console.error('Browser error:', msg.text());
});

// Network monitoring
page.on('response', resp => {
  if (resp.status() >= 400) console.warn(`HTTP ${resp.status()}: ${resp.url()}`);
});
```

---

## File Locations

| Item | Path |
|------|------|
| This workflow | `~/projects/UIUX-WORKFLOW.MD` |
| Test app | `~/projects/vnc-test-app/` |
| Startup script | `~/start-dev.sh` |
| Screenshots | `/tmp/screenshot-*.png` |
| Shared (for Desi) | `~/shared/screenshot-*.png` |

---

## Escalation Path

| Phase | What | When |
|-------|------|------|
| **1 (current)** | Headless Playwright + SSH tunnel | Default |
| **2** | Add Xvfb for headed Playwright | If headless rendering has artifacts |
| **3** | Full VNC (XFCE + TigerVNC + noVNC) | If Desi needs to watch BarneyBot drive a live browser |

---

## Notes

- **No ports exposed publicly.** All access via SSH tunnel. Zero Azure NSG changes.
- **Dev server persists** via detached process. Survives SSH disconnects.
- **Screenshots are instant** — Playwright launches Chromium, screenshots, exits in ~2 seconds.
- **Hot reload works through tunnel** — Desi sees changes in real-time without refreshing.
- **Playwright can do more than screenshot** — it can click, type, navigate, test accessibility, measure performance.
