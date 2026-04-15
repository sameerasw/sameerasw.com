---
title: "Privacy Policy"
order: 1
slug: "privacy"
---

# AirSync Privacy Policy

At **AirSync**, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains what data we collect, how it is used, and your rights.

**Effective date**: December 23, 2025

---

## Information We Collect

AirSync collects and processes the following data **locally on your device**:

- **Connectivity & Background Sync**: Uses internet and network state permissions to maintain a secure local network connection. It runs as a foreground service to ensure persistent connectivity and reliable feature performance like notification mirroring.
- **Communication & Call Sync**: Detects real-time call status and identifies caller numbers from call logs and contacts registry to display names and statuses on your Mac.
- **Notification Mirroring**: Reads device notifications and securely forwards them to your Mac.
- **Media & Personalization**: Syncs media playback controls and "Now Playing" information. Optionally reads wallpaper for synchronization with your Mac's desktop background.
- **Setup & Utilities**: Uses the camera exclusively for scanning pairing QR codes and handles audio-related sync features.
- **Productivity & Features**: Supports capturing screen content or taking notes via floating windows, and securely integrates with companion apps (like AirSync Essentials) for extended functionality. It also handles seamless app update downloading in the background.
- **Battery Level**: Shares your phone's current battery level with the Mac app for remote monitoring.

> **Important:** All data transfer occurs exclusively over your **secure local Wi-Fi/Network**. No call logs, contact details, or notification contents are ever stored on our servers.

---

## How We Use Your Data

All data processed by AirSync is:

- **Stored locally** on your devices.
- **Never uploaded** to any server or cloud service.
- **Only transmitted** via an encrypted local WebSocket connection (WSS) between your Android and macOS devices.

AirSync does not:

- Collect analytics or crash data
- Serve ads or use tracking technologies
- Share data with any third-party services

---

## Permissions Explanation

### Connectivity & Background Sync

| Permission | Purpose |
| :--- | :--- |
| `INTERNET`, `ACCESS_NETWORK_STATE`, `ACCESS_WIFI_STATE`, `CHANGE_NETWORK_STATE` | Used for establishing and maintaining a secure local network connection between your Android device and your Mac. Change network state is used for mDNS discovery to locate your Mac securely over the local network. |
| `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_CONNECTED_DEVICE` | Required to maintain a persistent, high-priority connection to your Mac so that features like notification and call mirroring work reliably in the background. |
| `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` | Used to ensure that the Android system does not kill the AirSync background service, guaranteeing constant connectivity. |
| `WAKE_LOCK` | Prevents the phone from entering deep sleep while an active sync session is in progress. |

### Communication & Call Sync

| Permission | Purpose |
| :--- | :--- |
| `READ_PHONE_STATE` | Used to detect real-time call status (ringing, answered, or ended) so the status can be mirrored on your Mac. |
| `READ_CALL_LOG` | Strictly used to identify the phone number of an incoming caller for display on your Mac's notification. |
| `READ_CONTACTS` | Used to match phone numbers with names from your contact registry so you can see who is calling or messaging you by name on your Mac. |

### Notification Mirroring

| Permission | Purpose |
| :--- | :--- |
| `BIND_NOTIFICATION_LISTENER_SERVICE` | The core permission that allows AirSync to read your device notifications and securely forward them to your Mac. |
| `POST_NOTIFICATIONS`, `POST_PROMOTED_NOTIFICATIONS` | Used to show local app alerts and the persistent status notification that allows you to disconnect from your Mac. |

### Media & Personalization

| Permission | Purpose |
| :--- | :--- |
| `MANAGE_EXTERNAL_STORAGE`, `READ_WALLPAPER_INTERNAL` | An optional permission used solely to read your phone's wallpaper for synchronization with your Mac's desktop background. |
| `BATTERY_STATS` | Used to share your phone's current battery level with the Mac app for remote monitoring. |

### Setup & Utilities

| Permission | Purpose |
| :--- | :--- |
| `CAMERA` | Used exclusively for scanning the QR code on your Mac to facilitate quick and secure pairing. |
| `MODIFY_AUDIO_SETTINGS` | Used to handle audio-related sync features. |

### App Features & Integrations

| Permission | Purpose |
| :--- | :--- |
| `DOWNLOAD_WITHOUT_NOTIFICATION` | Allows the app to seamlessly download required updates in the background. |
| `LAUNCH_CAPTURE_CONTENT_ACTIVITY_FOR_NOTE` | Used for the Notes role to enable content capture in floating windows. |
| `com.sameerasw.permission.ESSENTIALS_AIRSYNC_BRIDGE` | A secure bridge permission used to communicate with the AirSync Essentials companion app. |

---

## Security

AirSync uses **TLS (WSS) AES 256-bit** encryption to secure all communication between devices. A shared encryption key is exchanged locally during the pairing process and is never transmitted over the internet.

---

## Data Retention

No personal data is stored permanently. All mirrored notifications and clipboard data are stored only in RAM or app sandbox storage and are cleared automatically after use.

---

## Your Rights

Since AirSync does not collect or store any personal data on external servers, there's no user data to delete or export. All usage is local and under your full control.

---

## Contact

If you have any questions about this Privacy Policy or how AirSync works, contact me at:

**[mail@sameerasw.com](mailto:mail@sameerasw.com)**  
[GitHub](https://github.com/sameerasw) | [Website](https://www.sameerasw.com)

---

## Changes to This Policy

This policy may be updated occasionally to reflect changes in features or permissions. You will be notified of major changes in-app or via our website.
