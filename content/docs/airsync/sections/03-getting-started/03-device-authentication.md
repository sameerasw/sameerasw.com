---
title: "2.3 Device Authentication"
order: 3
slug: "device-authentication"
---

## 2.3 Device Authentication

This is a one time per device pair for each network setup. 

Once the initial setup and the on-boarding flow of the apps are done, in the AirSync mac app, you will see a QR code followed by a settings screen on the right side of the screen.

Use the Android device’s camera to scan the QR code which should prompt you to open AirSync app.

<aside>
⚠️

Some OEM camera apps won’t support these API calls to directly open the AirSync app ***cough***  OnePlus ***cough* …** In that case, using the Google Lens scan will always ensure the process works. In any case if these options are not functional or if the device lacks hardware for a QR scan, Use the manual authentication method.

![Authentication](attachment:b20d2743-194c-4b28-aafa-95b7ed0d7ce5:image.png)

</aside>

Once the authentication pop-up appears, verify the device and connect. It should connect instantly if everything was setup correctly. If not, head over to the troubleshooting section.

<aside>
ℹ️

Once you scan and authenticate a device pair, You need to do that again only for other networks where the IP addresses changes. Once all your possible networks authenticated, You can always use the Quick Settings tile to reconnect to the last connected device with a tap in any of those networks.

![QS Tile](attachment:066d93ed-1355-432a-8457-e3a86ec6d50e:image.png)

</aside>
