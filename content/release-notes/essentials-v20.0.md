---
title: "Essentials v20.0"
description: "New island, DIY enhancements,Widget stacks, Per-app volume and a lot more stuff"
app: "essentials"
version: "v20.0"
date: "2026-10-18"
link: "https://github.com/sameerasw/essentials/releases/tag/v20.0"
---



<img width="100%" src="https://github.com/user-attachments/assets/71fa5d74-c0ff-4f67-93ee-ba13bef87f61" />


# What's New?
### Island
- OTP in island
- External apps now can remotely render inside island
- compact line peek
- island hostspot plugin
- seconds in island time
- Allow duo and island in full screen
- Fix missing secondary island outline
- Separate battery and time in island settings
- Avoid bt device spam in island
- Attempt to fix unresponsive island
- DND aware island notifications
- fix offline mobile data icon color
- Island minimal peek mode and notification queue stacked layout
- Option to hide caffeinate timer from island
- Hide individual statusbar item in island
- Fix island priority for battery
- Fix flashlight expanded view collapsing
- Fix island placement animations for corners
- Fix island material you colors
- Customize battery level % for overlays
- Camera position based island improvements
- Fix island battery alerts
- Balance island option
- Fix background haptics for conscious gate in island
- Fix island reply text being persistent
- Prioritize progress over timer for notifications
- Option to keep island notifications forever
- Fix call controls in island
- Option to use secondary island bubble

### DIY
- Stacked DIY actions
- DIY failure notification and detailed view
- fix background location use
- notifications and caffeinate in DIY
- Location based automations
- Android auto automations
- Device mode automations
- Split screen shortcut and action
- Back gesture controls DIY

### New features
- Live updates in HiLight
- Widget stacks
- Back gesture controls
- Token based auth for external apps
- Pixel watch eSIM installer for unsupported regions (credits: [AllMySlop/pixel-watch-esim-writer](https://github.com/AllMySlop/pixel-watch-esim-writer))
- Auto delete screenshots
- Media volume steps
- Default launcher qs tile
- Auto config backup
- Re-written battery widget
- Per-app volume
- Watchface app is finally live

### Improvements
- Updated Batteries, It's now a shared setting across the app for all devices
- Battery charging limit info for features
- Fix lock screen shortcuts
- Improve pixel searchbar replacement
- Clear secure settings cache
- Improve accessibility package fetching
- Move navigation settings to input and actions
- Fix notification lighting color picker
- Disable per-package auth in app lock
- Mediatek flashlight controls (Via unsupported features, proceed with caution)
- LAN permission
- Fix search text clearing issues with state changes
- And more fixes and improvements
- A lot of translations

### [Essentials WatchFace is finally on Google Play Store!](https://play.google.com/store/apps/details?id=com.sameerasw.essentials.watchface&pcampaignid=web_share) Use the in-app welcome screen or the help sheep opens with the ? button in watch page to directly open the play store on your watch to install it easily.

<p align="center">
<img width="32%" alt="widget-stack" src="https://github.com/user-attachments/assets/6c0180a5-f888-4944-a104-605cdfe11283" />
<img width="32%" alt="island-hotspot" src="https://github.com/user-attachments/assets/d1969b3c-d35f-41b6-8bcc-0bbb020f5e0b" />
<img width="32%" alt="island-otp" src="https://github.com/user-attachments/assets/7b7d243a-3343-4e80-9b6e-8958667d3552" />
</p>

<p align="center">
<img width="32%" align="top" alt="per-app-vol" src="https://github.com/user-attachments/assets/6c5f24b2-02d7-4740-86c7-fb5e5256b5a9" />
<img width="32%" align="top"  alt="island-navigation" src="https://github.com/user-attachments/assets/115d055c-d4bb-47aa-b9de-64bb227f0ecf" />
<img width="32%" align="top" alt="Screenshot_20261018-124117" src="https://github.com/user-attachments/assets/d6661c3f-e144-4304-bba0-892e6f0cdb9f" />
</p>

<details>
   <summary><h3>PRs & Contributions</h3></summary>

* Develop - fix island outline bubble border, live updates in hilight, stacked DIY actions, fix lock screen shortcuts, widget stacks by @sameerasw in https://github.com/sameerasw/essentials/pull/1336
* [feat(Island)] Added a battery alerts plugin to show alerts for charging, low battery and critical battery by @ssethhyy in https://github.com/sameerasw/essentials/pull/1254
* Develop - update searchbar replacement behavior, island battery status by @sameerasw in https://github.com/sameerasw/essentials/pull/1338
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1339
* Develop - clear secure settings cache, DIY failure notification, allow duo and island on full screen, token based auth for external app access, avoid bt device spam in island, improve accessibility package fetching, attempt to fix unresponsive island, fix call notifications in island by @sameerasw in https://github.com/sameerasw/essentials/pull/1343
* feat(island): new notification options screen & compact view mode by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1303
* feat(island): handle DND and show island even with DND mode ON by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1349
* feat(diy):notification, DND triggers, wait & caffeinate actions by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1350
* chore(diy): added value label for automation row by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1352
* feat(island): add hotspot plugin and toggle to show on island by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1357
* Develop - compact line peek, fix background lcoation use, seconds in island, DND for island notifications, DND , notif and caffeinate in DIY, Automation values display, island hostspot, fix offline mobile data icon color, fix island remote touch events by @sameerasw in https://github.com/sameerasw/essentials/pull/1360
* Develop - Pixel watch eSIM by @sameerasw in https://github.com/sameerasw/essentials/pull/1361
* Develop - allow hiding weather from island and island app controls by @sameerasw in https://github.com/sameerasw/essentials/pull/1362
* feat: arrive at and leave location automation triggers by @jawzf in https://github.com/sameerasw/essentials/pull/1341
* feat(island): minimal peek mode & notification queue view modes by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1354
* feat: move Navigation settings to Input and Actions by @jawzf in https://github.com/sameerasw/essentials/pull/1381
* feat(island): caffeinate options to hide timer by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1388
* feat: volume steps to set how far each volume key press moves media volume by @jawzf in https://github.com/sameerasw/essentials/pull/1389
* Develop - location based automations, minimal island peek and stack, move navigation settings to input, hide caffeinate timer in island, volume steps and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1391
* feat: split screen action and two-finger swipe gesture by @jawzf in https://github.com/sameerasw/essentials/pull/1374
* Develop - split screen action, fix widget stack animation, fix island call notification listener, fix notification lighting colors, disable per-package auth in app lock, sync island, notif dismissal, default launcher qs tile, mediatek flashlight controls, auto config backup, fix island weather height, updated Batteries, re-written battery widget, hide individual statusbar item in island, fix island priority, fix flashlight collapsing, fix island placement animations, battery charging limit info for features and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1394
* Develop - Fix island material you colors, Android auto automations, back gesture controls and DIY, per-app volume, device mode automations and more  by @sameerasw in https://github.com/sameerasw/essentials/pull/1396
* Community translations by @flyinghouse-ma by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1351
* Community translations by @lufranca21-oss by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1367
* Community translations by @OrdinaryPerson0 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1370
* Community translations by @Celestial04 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1371
* Community translations by @forelas by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1375
* Community translations by @MicrSpace by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1397
* Community translations by @ls84luan-stack by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1400
* Community translations by @OfficialMicrowave by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1401
* Community translations by @CapMarkoTo by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/1402
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1403
* Develop - fix notification looping, fix empty weather in island, fix device battery in island brief, fix island compact being default peek and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1415
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/1416
* feat(island): add navigation plugin and settings to island by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1369
* feat: screenshots page with auto-clean by @jawzf in https://github.com/sameerasw/essentials/pull/1385
* feat: widget stack remembers its position across reboots by @jawzf in https://github.com/sameerasw/essentials/pull/1409
* feat: add Send notification DIY action by @jawzf in https://github.com/sameerasw/essentials/pull/1411
* Develop - Island navigation, auto cleanup screenshots, widget stack persistency, notification DIY by @sameerasw in https://github.com/sameerasw/essentials/pull/1425
* feat(island): add OTP notification handler filtering by @isaacsa51 in https://github.com/sameerasw/essentials/pull/1386
* Develop - OTP in island, customizable battery levels for Duo, Camera position based island improvements, fix battery alerts, balance island option, fix background conscious gate haptics, fix island notification reply text, prioritize progress over timer for island, keep island notifications always, fix calls in island, secondary island bubble toggle, local network permission, watch face is live, fix search input persistency and more by @sameerasw in https://github.com/sameerasw/essentials/pull/1426
</details>

**Full Changelog**: https://github.com/sameerasw/essentials/compare/v19.0...v20.0

---

<p align="center">
  <a href="https://www.reddit.com/r/MadebySameerasw"><img  width="49%"  alt=" reddit-banner" src="https://github.com/user-attachments/assets/a5197458-d64a-4c6a-a6a3-9e1f36030205" /></a>
  <a href="https://t.me/tidwib"><img  width="49%"  alt=" telegram-banner" src="https://github.com/user-attachments/assets/425b3cc1-9ac6-46ec-8f48-71c7af9c9ca2" /></a>
</p>

> **Visit the website:** [sameerasw.com/essentials](https://sameerasw.com/essentials)
> **About Essentials:** [README](https://github.com/sameerasw/essentials#navigation)
> **More projects:** [sameerasw.com](https://sameerasw.com/#updates)
> **Show some love:** 
> <a href=https://buymeacoffee.com/sameerasw><img width="130" alt="buymeacoffee Small" src="https://github.com/user-attachments/assets/a9d92253-d41e-4281-8cb3-13cac6cdab57" /></a> <a href="https://github.com/sponsors/sameerasw"><img width="130" alt="github-sponsor Small" src="https://github.com/user-attachments/assets/42c3cf2c-3eba-4450-9110-d1d4bd1f41e4" /></a>
> <img width="400" alt="madeby Medium" src="https://github.com/user-attachments/assets/cea162a1-4cbb-4b5b-b21b-80be522ab646" />