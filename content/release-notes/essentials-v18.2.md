---
title: "Essentials v18.2"
description: "Island, Conscious Gate ... already lost the count, A tons of new stuff"
app: "essentials"
version: "v18.2"
date: "2026-09-24"
link: "https://github.com/sameerasw/essentials/releases/tag/v18.2"
---

<img  width="100%"  alt="banner" src="https://github.com/sameerasw/sameerasw.com/blob/main/public/assets/img/articles/essentials/essentials-v18.2.jpeg?raw=true" />

# What's New?

- Island, You asked for it... Learn more below.
- Conscious Gate
- Button remap disabled while volume dialog is open
- Hidden Shizuku and Shevery intent support
- Feature tags
- Dynamically hide duo, island and status glance with statusbar
- New ripple and dash notification lightings
- Custom colors for per-app notifications

Feature specifics:
- ### Duo
   - Fix rotation
   - Foldable support
   - Integration with island

- ### About
   - Top contributors
   - About libraries
   - Repository info

- ### Battery info
   - Charging mode selector
   - Remove invalid system usage tab

- ### Automations
   - Charging mode
   - Fix screenshot availability
   - Essential search
   - Auto brightness toggle
   - WiFi
   - Cellular

- ### Essential Search
   - Media and file search
   - Set as default assistant

More changes and fixes:
- New prevent notification interaction on lock screen option
- Disable wallpaper on AOD in DND
- Statusbar icon tooltip on when Google massacred that option
- Data backup and restore is not public
- Reset lock screen clock option
- Fix AOD wallpaper without blur handling
- Heads up QS tile

General changes:
- Updated display settings categorization
- Manual number input for sliders with long press
- Updated default settings for features
- Updated what's new welcome screen
- General notification handling improvements across the app
- Avoid play protect invalid flagging for accessibility
- Improved overlay auto start
- Remove broken color extraction from daily wallpaper

Settings, frameworks and build:
- Use Google Sans Flex with round font across the app
- Sentry Gradle plugin
- Modern improved haptics
- Attach and share crash reports
- New lottie animations
- Android CI builds and tests
- A lot of UI fixes and minor improvements
- A lot of translations and string fixes

### Essentials watchface is finally on play store
- Join internal testing by following in-app instructions
- To refer again, check help section of Watch settings

<details>
   <summary><h3>More about Island</h3></summary>

   This was not something I had in mind as there's better alternatives out there but after 100 requests, it turned out to be decent
   What it shows?
   - Notifications
   - Calls
   - Time and battery
   - Flashlight
   - Timers and stopwatch
   - Weather
   - Media playback
   - Conscious gate
   - Caffeinate
   - Are we there yet?
   - Calendar events
   - Sound mode
   - Network connections
   - Connected devices
 
   Another feature is the Brief, which ... well... briefs you about what's going on. Next calendar event, music, devices battery, weather and everything together.

   Check docs to learn how island works and to make contributions of your own plugins!
</details>

<img  width="100%"  alt="banner" src="https://github.com/sameerasw/sameerasw.com/blob/main/public/assets/img/articles/island.gif?raw=true" />


---

<details>
   <summary><h3>PRs & Contributions</h3></summary>

* ci: add PR template and build verification workflow by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1045
* feat: hidden shizuku support, CI and PR checks by @sameerasw in https://github.com/sameerasw/essentials/pull/1046
* docs: replace broken local file URLs with repository-relative paths by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1047
* Community translations by @19deimon90 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/991
* Community translations by @5victory by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/995
* Community translations by @productbyPHT by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/997
* Community translations by @feuersternX by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/993
* Community translations by @kotkotenok45 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/998
* Community translations by @technoyama2012 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1006
* Community translations by @Kawaharu869 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1007
* Community translations by @OrdinaryPerson0 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1009
* Community translations by @dsora91 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1016
* Community translations by @ChadRat by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1021
* Community translations by @dimzhen by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1022
* Community translations by @Lucasbringmann16 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1024
* Community translations by @agent13fab by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1035
* Community translations by @converdario by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1037
* Community translations by @Framerr by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1038
* Community translations by @elchumy6960 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1040
* translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1049
* feat: add SetChargingMode DIY action with executor and settings UI by @sameerasw in https://github.com/sameerasw/essentials/pull/1051
* feat: charging mode selector in battery sheet, charging mode DIY, support for shevery intents, add screenshot action for duo. by @sameerasw in https://github.com/sameerasw/essentials/pull/1052
* feat: introduce Conscious Gate for mindful app pauses by @thomasborgogno in https://github.com/sameerasw/essentials/pull/852
* feat: Conscious gate by @sameerasw in https://github.com/sameerasw/essentials/pull/1054
* fix genAI prompt clipping, what's new about feature tags by @sameerasw in https://github.com/sameerasw/essentials/pull/1055
* Feature/island by @sameerasw in https://github.com/sameerasw/essentials/pull/1069
* Feat/contributors by @sameerasw in https://github.com/sameerasw/essentials/pull/1076
* fix(translations): resolve all XML warnings, crash risks, and upgrade in-app validation flow by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1057
* Develop - island, string fixes, android auto detection, conscious gate, fix duo rotation, duo foldable support, update default settings, aod wallpaper feature, updated display settings ordering, modern haptics, feature tags, contributor carousel, and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1078
* Feat/developer options - crash logs in bug report, data import and export in settings, fix flashlight crash, improve overlay auto start by @sameerasw in https://github.com/sameerasw/essentials/pull/1083
* feat(pixel-search): inline math expression evaluator engine and unit tests by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1080
* feat(pixel-search): category filter tabs & search results UI polish by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1082
* feat(assistant): integrate system digital assistant & voice interaction service by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1074
* feat(pixel-searchbar): enhance widget layouts, background scraper window & bind permission by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1075
* feat(pixel-search): indexed MediaStore file and media search engine by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1077
* feat(pixel-search): contextual action bottom sheets for files, apps & contacts by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/1079
* feat(duo): spin media art while music is playing by @wazeerc in https://github.com/sameerasw/essentials/pull/1060
* Develop - improved universal search, flashlight turn off fix, data export and import, developer options changes, crash logs in bug report, rotating album art in duo and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1084
* Community translations by @feuersternX by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1056
* Community translations by @K0rtus by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1062
* Community translations by @OrdinaryPerson0 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1061
* Community translations by @CapMarkoTo by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1058
* Community translations by @noobsitopremium by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1063
* Community translations by @jao571 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1064
* Community translations by @dthayakawa by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1067
* Community translations by @BenceBarens by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1068
* Community translations by @Balajitechlabs by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1072
* Develop - translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1086
* feat: add Essentials watchface promotion component and integration flows by @sameerasw in https://github.com/sameerasw/essentials/pull/1087
* Develop - fix sheet ime padding, ripple and dash notification lighting, custom app notification colors, reset lock screen clock, dynamic statusbar hiding in island, secure lock screen disable notification expansion, disable aod wallpaper during dnd, statusbar icon tooltips, remove daily wallpaper dynamic color, about libraris, google sans flex rounded and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1105
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1106
* Develop - island rewrite by @sameerasw in https://github.com/sameerasw/essentials/pull/1121
* feat(aod): add new aod wallpaper timeout and custom section by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1109
* Community translations by @elchumy6960 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1110
* Community translations by @K0rtus by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1114
* Community translations by @youseffahed861-code by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1115
* Community translations by @by654 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1117
* Community translations by @Kawaharu869 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1118
* Community translations by @AhmedAwad7 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1119
* Develop - aod wallpaper custom timeout and translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1122
* Develop - conversation icon for notif, fix duo rotation, battery % in island, island gestures, fallback to app icon for media playback and improve accuracy, open music app from expanded tap, island font size, hide island inside app by @sameerasw in https://github.com/sameerasw/essentials/pull/1126
* Develop - manual slider number input, dismiss island on outside touch, camera align button in island, urgent priority in island, heads up qs tile, network, charging peek, sound mode, progress notif, are we there yet, caffeinate, devices in island, combine duo and island combine and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1131
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1132
* Develop - Island brief, calendar automations, grant all permissions dev option, optical padding for island by @sameerasw in https://github.com/sameerasw/essentials/pull/1134
* Develop - Sentry gradle plugin, island, duo and searchbar lottie animations, hide them with statusbar expansion, optical paddings for peek layout by @sameerasw in https://github.com/sameerasw/essentials/pull/1136
* Implement new DIY actions as toggles for Wi-Fi and Cellular Data by @ssethhyy in https://github.com/sameerasw/essentials/pull/1116
* [fix] Island like button behavior + minor typo fix by @johnseagull3326 in https://github.com/sameerasw/essentials/pull/1137
* Develop - duo time scale, custom battery color for island, ignore device bt connections, auto brightness diy, brief ui updates, toggle wifi and cellular automations, disable island like button if not available, remove system battery tab, island seekbar, island flashlight, hide screen recorder in island, island calendar emojis and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1140
* Develop - island weather and translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1142


## New Contributors
* @isaacsa51 made their first contribution in https://github.com/sameerasw/essentials/pull/1109
* @ssethhyy made their first contribution in https://github.com/sameerasw/essentials/pull/1116
* @johnseagull3326 made their first contribution in https://github.com/sameerasw/essentials/pull/1137

</details>

**Full Changelog**: https://github.com/sameerasw/essentials/compare/v18.1...v18.2

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