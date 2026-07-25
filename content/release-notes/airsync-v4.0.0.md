---
title: "AirSync v4.0.0"
description: "All new AirSync v4 with Nearby connection, Improved mirroring, menubar glance and more!"
app: "airsync"
version: "v4.0.0"
date: "2026-07-25"
link: "https://sameerasw.com/airsync"
---

# What's New?
- Bluetooth LE Nearby connection
   - Fallback when WiFi not found
   - Smooth switching between networks
- Bonjour for discovery and reconnect
- Pair ADB with QR code
- Mirroring (scrcpy)
   - Added support for scrcpy v4
   - Flex display! (Re-sizable virtual display)
   - ADB device picker
- Mirroring (Native - Experimental)
   - Navigation buttons
   - Desktop mirroring
   - Mirror here (sidebar)
   - Keyboard input and improved scroll
   - Wireless connection
   - Default Android and desktop mirror mode selection
- Menubar glance
   - Battery icon
   - Unread notification icons
   - Background container
   - Album art
   - Call controls
   - Text marquee
- Menubar pop-up
   - Call controls
   - Notification dismissals
- Apple Intelligence for notification summarization
- File sharing and access 
   - WebDAV remote file browsing [Experimental]
   - Quick Share files pop-up
- Media
   - Seekbar sync
   - Show playback in control center
- Notifications
   - Easier app muting
   - Per app specific settings
   - Notification priority
   - Progress notification support
- TouchID for QR scan
- Improved app search and launcher
- All new settings UI on mac and Android
- Lottie animations in Android settings
- A lot of new keyboard shortcuts
- Efficiency improvements up to 50%
- New app icon with macOS 27 updates
- UI tooltips
- More accessible mirror buttons and options
- Device lost pop-up message
- Custom error reporting
- And a sh*t ton more improvements and fixes!

<video src="https://github.com/user-attachments/assets/4f9a5937-d9a7-435a-911d-4c726d977607" autoplay loop muted></video>

<details>
   <summary><h3>PRs & Contributions</h3></summary>
  
* refactor: remove redundant and unused legacy app icon assets by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/231
* Ble - Bluetooth LE communication by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/233
* Web dav file access impl by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/239
* Implement Seekbar sync for now playing by @Mudit200408 in https://github.com/sameerasw/airsync-mac/pull/237
* Develop - BLE, scrcpy updates, seekbar, scanner and settings ui updates, WebDAV, file pop up, menubar customizations, websocket call controls and more by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/242
* Re applied all the notification fixes indivividually by @Mudit200408 in https://github.com/sameerasw/airsync-mac/pull/245
* Develop - Wireless ADB QR pair, Reconnecting message, menubar text marquee and a lot more fixes by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/246
* New Crowdin updates by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/235
* Develop - translations by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/247
* feat(haptics): add trackpad haptic feedback to all seekbars and settings sliders by @Mudit200408 in https://github.com/sameerasw/airsync-mac/pull/243
* Develop - seekbar haptics, app tour, marquee text for menubar, mirroring shortcuts and navigation, adb device picker and progress notification support by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/249
* New Crowdin updates by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/248
* Develop - Translations by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/250
* Develop - Wireless native mirror, desktop and sidebar native mirror, CPU optimizations, Notification settings per-app, custom app search and more by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/252
* feat: Allow to configure and open app/link directly from the notifica… by @Mudit200408 in https://github.com/sameerasw/airsync-mac/pull/253
* Develop by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/254
* Bonjour by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/255
* Develop - Bonjour! - Keyboard shortcuts, Apple Intelligence, efficiency improvements, notification click actions, new app icon by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/256
* Crash reporting - Switched from Sentry to custom impl by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/258
* Develop - Crash reporting and fixes by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/259
* Develop - ADB kill-server, Silent notif exclusion, AI summary toggles, Settings refactor, Label capitalization fixes, Background BLE fixes, Raycast improvements by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/268
* New Crowdin updates by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/251
* Develop - translations by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/269
* New Crowdin updates by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/270
* Develop - ADB, Quick share, ui fixes and tooltips by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/273
* Develop - Background scanning improvements, easier device pairing, scrcpy updated to v4.1 and call progress check by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/275
* Develop - Opitmize BLE disconnect, update plus welcome note and version bump by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/277
* feat: new installer bg image by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/278
* Develop - Optimizations by @sameerasw in https://github.com/sameerasw/airsync-mac/pull/281

---

* Ble - Bluetooth LE communication by @sameerasw in https://github.com/sameerasw/airsync-android/pull/108
* Web dav file access impl by @sameerasw in https://github.com/sameerasw/airsync-android/pull/111
* Implement Seekbar sync for now playing by @Mudit200408 in https://github.com/sameerasw/airsync-android/pull/109
* Develop - BLE, UI generalization, Seekbar, WebDAV, Refactor and AGP upgrades, Native call controls, Notifying app picker, background discovery and more by @sameerasw in https://github.com/sameerasw/airsync-android/pull/113
* Develop - connection improvements, theming updates, continue browsing licensing fix and progress notifications by @sameerasw in https://github.com/sameerasw/airsync-android/pull/118
* perf(android): optimize seekbar sync and filter out trivial media progress updates by @Mudit200408 in https://github.com/sameerasw/airsync-android/pull/115
* Bonjour by @sameerasw in https://github.com/sameerasw/airsync-android/pull/120
* Develop - Bonjour! , seekbar improvements, efficiency improvements by @sameerasw in https://github.com/sameerasw/airsync-android/pull/121
* Crash reporting by @sameerasw in https://github.com/sameerasw/airsync-android/pull/122
* Develop - Remove sentry, custom crash reporting, fix quick share, new settings UI, bluetooth name fixes, lottie animations and more  by @sameerasw in https://github.com/sameerasw/airsync-android/pull/133
* Develop - Optimization by @sameerasw in https://github.com/sameerasw/airsync-android/pull/134

</details>

**Full Changelog**: https://github.com/sameerasw/airsync-mac/compare/v3.2.0...v4.0.0
**Full Changelog**: https://github.com/sameerasw/airsync-android/compare/v3.1.0...v4.0.0

---

<p align="center">
  <a href="https://www.reddit.com/r/MadebySameerasw"><img  width="49%"  alt=" reddit-banner" src="https://github.com/user-attachments/assets/a5197458-d64a-4c6a-a6a3-9e1f36030205" /></a>
  <a href="https://t.me/tidwib"><img  width="49%"  alt=" telegram-banner" src="https://github.com/user-attachments/assets/425b3cc1-9ac6-46ec-8f48-71c7af9c9ca2" /></a>
</p>

> **Visit the website:** [sameerasw.com/airsync](https://sameerasw.com/airsync)
> **Help translating the app:** [Crowdin](https://crowdin.com/project/airsync)
> **More projects:** [sameerasw.com](https://sameerasw.com/#updates)
> **Show some love:** [buymeacoffee](https://buymeacoffee.com/sameerasw) | [GitHub Sponsor](https://github.com/sponsors/sameerasw)
> 
> <img width="400" alt="madeby Medium" src="https://github.com/user-attachments/assets/cea162a1-4cbb-4b5b-b21b-80be522ab646" />