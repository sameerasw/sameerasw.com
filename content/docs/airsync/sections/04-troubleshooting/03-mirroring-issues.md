---
title: "4.3 Mirroring/ ADB issues"
order: 3
---

### 4.3.1 No mirroring options

- Mirroring is currently an AirSync+ option. Check your licenses or on the trial.
- You need adb setup for mirroring to work, Check and refer to [2.5 ADB and mirroring setup](adb-mirroring) first.
- Make sure you installed `android-platform-tools` via brew before starting.
- Most of the time, checking the adb console will provide possible solutions.
- Try toggling Wireless debugging or wifi connections.
- Make sure other apps are not using adb like Android Studio.

### 4.3.2 Wireless debugging disconnect when display is off

- Try using the keep awake option with blank display.

### 4.3.3 Display goes black and unresponsive on the phone

- This is because the blank display setting is on which allows keeping the device awake while display off to save energy and also to only use the display from the mac.
- You can turn the display back on with `⌥ Shift o` (not zero) and turn back off with `⌥ o`.
