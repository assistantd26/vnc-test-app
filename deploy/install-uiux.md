# install-uiux.md — How to Install the UI/UX Visual Dev Skill

> Adds the Playwright headless screenshot workflow to any machine's GitHub Copilot CLI.

---

## What You're Installing

The **UI-UX.MD** skill file teaches Copilot how to:
- Take headless Playwright screenshots of a running Next.js app
- View and iterate on UI visually without VNC or a desktop environment
- Test responsive viewports (mobile, tablet, desktop)
- Inspect DOM, monitor console errors, and automate browser interactions

---

## Prerequisites

- GitHub Copilot CLI installed and configured
- `~/.copilot/` directory exists (created by Copilot CLI)
- `~/.copilot/copilot-instructions.md` exists (user-level Copilot instructions file)

---

## Install Steps

### Step 1: Copy the skill file

```bash
cp deploy/UI-UX.MD ~/.copilot/UI-UX.MD
```

### Step 2: Add reference to copilot-instructions.md

Add this line to `~/.copilot/copilot-instructions.md`:

```markdown
**For UI/UX work, read `~/.copilot/UI-UX.MD` for the visual development workflow.**
```

If the file doesn't exist yet, create it:

```bash
cat >> ~/.copilot/copilot-instructions.md << 'EOF'

**For UI/UX work, read `~/.copilot/UI-UX.MD` for the visual development workflow.**
EOF
```

### Step 3: Install project dependencies (per Next.js project)

In each Next.js project where you want the visual workflow:

```bash
cd ~/projects/<your-app>
npm i -D playwright @playwright/test
npx playwright install --with-deps chromium
```

---

## Verify Installation

```bash
# 1. Check skill file exists
cat ~/.copilot/UI-UX.MD | head -5

# 2. Check reference in copilot-instructions.md
grep "UI-UX.MD" ~/.copilot/copilot-instructions.md

# 3. Test Playwright works (from a project with it installed)
cd ~/projects/<your-app>
node -e "const{chromium}=require('playwright');(async()=>{const b=await chromium.launch();console.log('Chromium OK');await b.close()})()"
```

---

## Uninstall

```bash
# Remove skill file
rm ~/.copilot/UI-UX.MD

# Remove reference line from copilot-instructions.md
# (edit manually — remove the line referencing UI-UX.MD)
```

---

## What Happens After Install

Every new Copilot CLI session on this machine will see the UI/UX skill reference in `copilot-instructions.md`. When Copilot is asked to do UI/UX work, it reads `~/.copilot/UI-UX.MD` and knows how to:

1. Start the Next.js dev server
2. Take Playwright screenshots after each edit
3. View screenshots to verify visual output
4. Iterate until the UI looks right
5. Copy screenshots to `~/shared/` for review

No VNC, no desktop, no GUI required.
