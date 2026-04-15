---
title: "2.5 ADB and mirroring setup"
order: 5
slug: "adb-mirroring"
---

## 2.5 ADB and mirroring setup

Make sure you got android-platform-tools and scrcpy installed via brew on your mac if you have not done during the setup screens.

```bash
brew install --cask android-platform-tools
brew install scrcpy
```

Might need to re-open AirSync after installation.

### 2.5.1 For first time ADB use

1. Go to Android settings > about phone and tap on build number for 7 times to enable developer options. May require biometric authentication.
2. Go to developer options. Usually will be under settings > system > developer options or you can just search.
3. Look for Wireless Debugging and enable.
    
    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/f9483c72-8109-4edb-aa7e-ac96f4db0c61" />
    
4. In wireless debugging, go into pair with code.
5. On mac, open terminal of your choice and execute the following replacing the provided IP and PORT.
    
    ```bash
    adb pair ip:port
    ```
    
6. You will be prompted to enter the code displayed. Do so. You should now be successfully authenticated for Wireless ADB. **These steps were needed only once per device pair** .
7. Now head to the mac app. Re-connect the devices and if you have granted Android permissions, it should detect the open ports automatically and should connect to wireless ADB. You can see the result in the ADB console that appears below.
8. Now wired ADB is also supported allowing a faster and more stable connection.

> Wireless ADB can be used being on the same WiFi as well as on Tailscale network being on separate WiFi networks.
> But portable hotspot on Android does not allow wireless ADB via it.

<aside>
⚠️

Switching WiFi connections will automatically toggle off Wireless debugging. You can easily turn it back on by adding the Wireless debugging QS tile.

<img width="50%" alt="image" src="https://github.com/user-attachments/assets/6dfb2233-85c1-4b12-ac05-f2556f0e0185" />

- Upcoming Android versions are working on an auto wireless ADB feature for known networks which will help this process. (Currectly available in Android 17 beta)

</aside>

<aside>
⚠️

Using any other service or app that uses ADB simultaneously might cause issues especially with Android Studio and such. This is expected.

</aside>
