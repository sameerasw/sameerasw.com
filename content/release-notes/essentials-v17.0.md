---
title: "Essentials v17.0"
description: "Many new cool things... I lost track"
app: "essentials"
version: "v17.0"
date: "2026-08-09"
link: "https://github.com/sameerasw/essentials/releases/tag/v17.0"
---

# What's New?
- Easier access to more developer options
   - Prefer GPU for screen compositing
   - Allow overlays in settings
   - Transparent navigation bar
- SurfaceFlinger modifications
   - Reaching further into Android settings by modifying the runtime overlays with surface flinger.
- New networks feature category
   - Network download rate limit
   - Mobile data always on
   - Wireless display certification
- Power and battery feature category
   - Standby apps controls for further power saving
- New feature organization and categories UI
- Group features in categories
- Somethings are not always essential. Automate Essential features.
- App Freezing
   - Freeze automations
   - Toggle auto freeze from app grid
   - Frozen app tags/ categories
   - Filter frozen apps by tags
   - Cleaner frozen apps UI with FAB menu
   - Optional color coded frozen app tags in grid
- Updated searchUI to match Android settings
- GenAI (Gemini Nano)
   - You can now ask on device Gemini Nano to create automations for you
   - GenAI is disabled by default, Enable in settings
   - Not all devices are supported, [refer](https://developers.google.com/ml-kit/genai#device-support)
   - First time use may take some time for the models to download
   - AI will make mistakes, Please review the content
   - This was done mainly to learn how to use these APIs and it was fairly easy. AI is and will not be a main feature of this app unless you want to. Let me know if you really want to see support for other devices with maybe using Gemini API keys or so.
- Added App Functions support for Gemini
   - App functions are not yet public by Google, So you can't really use them until they allow everyone to integrate app functions
   - But, that being said, this allows you to externally control many features of the app
- New in-app help and guides
- Easier access to in-app help and guides from main screen
- Smart Pixels. Save power with OLED displays by turning off individual pixels.
- Extract and use wallpaper accent color before you apply
- Major project refactor, reformat and updated architecture
   - Had some AI credits left and decided to make a plan and fully re-structure the app into a new more readable and maintainable architecture
   - Why? Having 2000+ lines in the main view model was not fun, Nor having the services of each feature placed randomly around the codebase, no proper method declarations, lack of documentation and many other things were bothering me every time I was working on the project.
   - So no, anyone is welcome to contribute and check out the project and you will easily get used tot eh structure of the codebase and also will easily learn where to look for things with the included documentation
- Fix: shizuku stop() command with auth token
- Fix: battery sheet broken translations
- [New Wiki!](https://github.com/sameerasw/essentials/wiki) (WIP)
   - I will try to maintain a GitHub Wiki but it is not easy to keep up to the development. 
   - Most of the documentation is generated and under review.
   - Contributions are welcome!
- And many many more improvements and fixes, Maybe a couple  more bugs to fix later ( ´ ▽ ` )

<p align="center">
<img width="24%" alt="screen-20260809-153056-1786269615574" src="https://github.com/user-attachments/assets/f6880d1d-d86a-46fc-9414-91d9b30a0e02" />
<img width="24%" alt="Screenshot_20260809-151255 Large" src="https://github.com/user-attachments/assets/fde58b66-f754-4971-8f6f-a9d8cd0c713b" />
<img width="24%" alt="Screenshot_20260809-151302 Large" src="https://github.com/user-attachments/assets/5c96c9e9-975c-4422-b946-d4cbff000ca4" />
<img width="24%" alt="Screenshot_20260809-151313 Large" src="https://github.com/user-attachments/assets/9168af32-67ef-4d89-bb57-12d443ba6d16" />
</p>

<p align="center">
<img width="24%" alt="Screenshot_20260809-151359 Large" src="https://github.com/user-attachments/assets/1c260359-2279-4199-b7ed-d2973eef4ee4" />
<img width="24%" alt="Screenshot_20260809-151407 Large" src="https://github.com/user-attachments/assets/7d87197d-52be-4995-a590-fc2c13708352" />
<img width="24%" alt="Screenshot_20260809-151417 Large" src="https://github.com/user-attachments/assets/d96d3528-67dc-4099-9d18-966fae84f43f" />
<img width="24%" alt="Screenshot_20260809-151436 Large" src="https://github.com/user-attachments/assets/95394797-cc2d-4c59-a387-5f22c0451ec3" />
</p>

<p align="center">
<img width="24%" alt="Screenshot_20260809-151447 Large" src="https://github.com/user-attachments/assets/bbfe1d46-835a-4c3d-8f92-1d19545ba6e2" />
<img width="24%" alt="Screenshot_20260809-151507 Large" src="https://github.com/user-attachments/assets/418fe5af-c611-479b-82b8-1a155e68ef27" />
<img width="24%" alt="Screenshot_20260809-151552 Large" src="https://github.com/user-attachments/assets/df5f3b36-73cc-4cec-a17d-895ea9bf836f" />
<img width="24%" alt="Screenshot_20260809-151612 Large" src="https://github.com/user-attachments/assets/c9fa320e-1e6a-4806-96d5-9a219c5e79af" />
</p>

> I might give another try at putting Essentials on Play Store which means we may loose in-app update tracker and some other features. Just an experiment... And if it goes well (Which I doubt) might be a little break from new feature drops as well.

<details>
   <summary><h3>PRs & Contributions</h3></summary>

* Develop - SurfaceFlinger, New feature categories, Standby apps, Shizuku stop () fix, Disable flashlight for TCL, Sometimes essentials, freeze tags and more by @sameerasw in https://github.com/sameerasw/essentials/pull/704
* Community translations by @AhmedAwad7 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/693
* Community translations by @elchumy6960 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/696
* Community translations by @dwvwvvwvwb by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/703
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/705
* Feature/gen ai by @sameerasw in https://github.com/sameerasw/essentials/pull/709
* Develop - Reorganize settings and UI, freeze automation, fix battery translations, GenAI automations, more help and guides, Smart Pixels and more by @sameerasw in https://github.com/sameerasw/essentials/pull/710
* Develop - AppFunctions for Gemini and wallpaper color extraction before apply by @sameerasw in https://github.com/sameerasw/essentials/pull/714
* Community translations by @OrdinaryPerson0 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/706
* Community translations by @cngtn by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/708
* Community translations by @MetaOxytocin by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/711
* Community translations by @Kawaharu869 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/713
* Refactor code and new architecture by @sameerasw in https://github.com/sameerasw/essentials/pull/718
* Community translations by @Kawaharu869 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/716
* Community translations by @QuaternionDev by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/717
* Community translations by @Luoluo29 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/720
* Community translations by @BenceBarens by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/721
* Develop - Project refactor, documentations and translations by @sameerasw in https://github.com/sameerasw/essentials/pull/723
* Community translations by @Fuchs23 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/724
* Community translations by @KaucBartosz by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/725
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/726

</details>

**Full Changelog**: https://github.com/sameerasw/essentials/compare/v16.6...v17.0

---

<p align="center">
  <a href="https://www.reddit.com/r/MadebySameerasw"><img  width="49%"  alt=" reddit-banner" src="https://github.com/user-attachments/assets/a5197458-d64a-4c6a-a6a3-9e1f36030205" /></a>
  <a href="https://t.me/tidwib"><img  width="49%"  alt=" telegram-banner" src="https://github.com/user-attachments/assets/425b3cc1-9ac6-46ec-8f48-71c7af9c9ca2" /></a>
</p>

> **Visit the website:** [sameerasw.com/essentials](https://sameerasw.com/essentials)
> **About Essentials:** [README](https://github.com/sameerasw/essentials#navigation)
> **More projects:** [sameerasw.com](https://sameerasw.com/#updates)
> **Show some love:** [buymeacoffee](https://buymeacoffee.com/sameerasw) | [GitHub Sponsor](https://github.com/sponsors/sameerasw)
> 
> <img width="400" alt="madeby Medium" src="https://github.com/user-attachments/assets/cea162a1-4cbb-4b5b-b21b-80be522ab646" />