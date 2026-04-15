---
title: "2.5 ADB and mirroring setup"
order: 5
slug: "adb-mirroring"
---

## 2.5 ADB and mirroring setup

Make sure you got android-platform-tools and scrcpy installed via brew on your mac.

```bash
brew install --cask android-platform-tools
brew install scrcpy
```

Might need to re-open AirSync after installation.

### 2.5.1 For first time ADB use

1. Go to Android settings > about phone and tap on build number for 7 times to enable developer options. May require biometric authentication.
2. Go to developer options. Usually will be under settings > system > developer options or you can just search.
3. Look for Wireless Debugging and enable.
    
    ![Wireless Debugging](attachment:4beb4b33-ddad-4d37-aabb-891d8ae4192c:Screenshot_20250819-224307.png)
    
4. In wireless debugging, go into pair with code.
5. On mac, open terminal of your choice and execute the following replacing the provided IP and PORT.
    
    ```bash
    adb pair ip:port
    ```
    
6. You will be prompted to enter the code displayed. Do so. You should now be successfully authenticated for Wireless ADB. These steps were needed only once per device pair.
7. Now head to the mac app. And click connect ADB in settings. You can see the result in the ADB console that appears below. If all goes correctly, you should see Mirroring options appear. if seeing errors, head to the troubleshooting.

<aside>
⚠️

Switching WiFi connections will automatically toggle off Wireless debugging. You can easily turn it back on by adding the Wireless debugging QS tile.

![Wireless Debugging QS](attachment:84aa0cf4-89be-4917-9724-3e7ceb404b2a:Screenshot_20250819-224421.png)

</aside>

<aside>
⚠️

Using any other service or app that uses ADB simultaneously might cause issues especially with Android Studio and such. This is expected.

</aside>
