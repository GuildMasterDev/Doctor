# Doctor

Healthcare resources, calculators, reference guides, and wellness tools — everything packed into a single `index.html` with no build step, no dependencies, and no network calls beyond the external links you choose to follow.

**Live demo:** https://guildmasterdev.github.io/Doctor

> ⚠️ **This app provides general health information only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.**

## Features

- **Resources** — curated, real external links for insurance & coverage, Direct Primary Care, emergency services, preventive care, mental health, and prescription assistance. Emergency numbers are `tel:` links on mobile.
- **Calculators** — BMI (WHO categories with a visual spectrum), water intake (activity and climate adjustments), heart-rate zones (max HR, optional Karvonen), sleep cycles (bedtime or wake-time), and a medication schedule helper.
- **Reference** — adult vital-sign ranges, USPSTF screening schedule by age, CDC adult vaccination schedule, common lab reference ranges (CBC / metabolic / lipids / A1C / TSH), step-by-step first-aid guides (CPR, choking, bleeding, burns, fractures, anaphylaxis), and a plain-language health-insurance glossary.
- **Wellness** — appointment-prep checklist (print / copy), symptom journal (localStorage-only, CSV export, per-entry delete), 4-7-8 breathing exercise with animated circle.
- **Runs anywhere** — vanilla HTML/CSS/JS with no dependencies. Open locally, host as a static site, install as a PWA, or wrap with Electron.
- **Offline-capable** — cache-first service worker once visited on the web.

## Run in the browser

Clone the repo and open `index.html` in any modern browser, or visit the live demo at https://guildmasterdev.github.io/Doctor.

## Install as a PWA

On mobile or a Chromium browser, visit the live demo and use "Install app" / "Add to Home Screen". Works offline after first load.

## Run as a desktop app (Electron)

```bash
git clone https://github.com/GuildMasterDev/Doctor.git
cd Doctor
npm install
npm start
```

To build installers:

```bash
npm run dist         # builds for your current platform
npm run dist:mac     # mac DMG + zip
npm run dist:win     # win NSIS + portable
npm run dist:linux   # linux AppImage + deb
```

## Important disclaimer

Doctor is an educational reference. It does **not** diagnose, treat, or replace professional medical, psychiatric, or therapeutic care. Calculators are general screening tools — the values they produce do not account for your full clinical picture. Reference ranges vary by laboratory and by individual.

- **Emergency?** Call 911 (US) or your local emergency number.
- **Mental-health crisis?** Call or text 988 (Suicide & Crisis Lifeline, US).
- **Poisoning?** Call 1-800-222-1222 (US Poison Control).

Doctor is **not a medical device**. No patient data is transmitted — everything (including symptom-journal entries) stays in your browser's local storage until you export or clear it.

## Technology

- Single `index.html` with all CSS and JS inline (no bundler)
- Zero runtime dependencies
- Service worker (`sw.js`) for offline PWA support
- Electron 41.x + electron-builder for desktop distribution

## License

[MIT](LICENSE) — open source.

## Author

GuildMaster Development
