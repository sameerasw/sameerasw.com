---
title: "2.2 Android App First Launch"
order: 2
slug: "first-launch-android"
---

## 2.2 Android App

1. Open the AirSync app from the apps drawer.
2. At the top of the app, You will notice a few permission dialogs. Below is a summary of them.

### 2.2.1 AirSync Android permissions and usage

<img width="40%" alt="Screenshot_20260415-161611 Medium" src="https://github.com/user-attachments/assets/20f6381e-eee2-4243-bfb0-fe07efa30d8f" />


1. Notification Access
    
    Notification listener permission is required for the app in order to read incoming notifications, currently playing media status and sync them to the mac.
    
    <aside>
    ⚠️
    
    **Granting notification read permission [Only for sideloaded installs]**
    
    Since the app was installed by sideloading, Android by default prevents granting sensitive permissions such as notification listener and accessibility to those apps. To still allow that, You need to manually go into AirSync app info page, click on the 3 dot menu to allow restricted settings which will require bio-metric authentication.
    
    Then head back to the app and re-try granting notification listener permission.
    
    <img width="90%" alt="image" src="https://github.com/user-attachments/assets/491ce6eb-e5ab-4f30-9601-64787cf2cbb2" />

    
    </aside>
    
2. Post Notifications (optional)
    
    Used to display the connection status in an ongoing notification in the Android’s notification shade.
    
3. Background App Usage (optional)
    
    Used to keep the app alive in the background to prevent being killed by the Android’s aggressive battery optimization.
    
4. External Storage Access (optional)
    
    Required for the wallpaper sync feature to work. Android has restricted previous ways of gathering this permission in recent updates so the only possible way is to use this manage external storage permission which is a bit sensitive.
    
    <aside>
    ⚠️
    
    Keep in mind that some samsung devices may still prevent accessing the device’s wallpaper for unknown reasons.
    
    And also the wallpaper is retrieved ONLY if it’s a still image. Any kind of animated or dynamic behavior will revert it to the device’s stock wallpaper and if that’s also not a still wallpaper, feature will not work.
    
    </aside>
    
