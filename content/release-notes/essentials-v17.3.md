---
title: "Essentials v17.3"
description: "Custom app icons, New link actions, Accessibility shortcuts, Watchfaces, MeDrop integrations and more"
app: "essentials"
version: "v17.3"
date: "2026-09-02"
link: "https://github.com/sameerasw/essentials/releases/tag/v17.3"
---

# What's New?
- New link action sheet with:
   - Web preview
   - QR code
   - Link shortener
   - Quick view
   - Easy access to AirSync and more
- Custom app icons
- Accessibility shortcuts 
- New: Essentials watchfaces
   There are 2 options,
    - Use the built-in watchface of the [Essentials WearOS app](https://github.com/sameerasw/essentials-wear)
       - WearOS 5 and below
       - Material You dynamic colors
       - Customizable fonts
       - Native complications
    - Use [the new WFF watchface](https://github.com/sameerasw/essentials-watchface) - Recommended
       - WearOS 5 and above
       - No dynamic colors (System limitations)
       - Tons of custom color presets
       - Customizable fonts
       - WearOS complications (Check below)
- Re-organized watch settings
- Watch ADB info
- [MeDrop](https://github.com/sameerasw/MeDrop) integration
- Some cool AGSL shaders in UI
   - Ripple effect
   - Motion blur
- Licenses and credits section
- Fix permission sheet being overflown by @PramudithaN 
- More lottie animations
- Settings description cleanup
- A lot of refinements and minor fixes


<details>
   <summary><h2>How to use Accessibility Shortcuts?</h2></summary>

You can setup all 3 shortcuts from DIY automations. It will prompt to enable if you have not already for each shortcut. In accessibility settings, you can pick what shortcut/ gesture to trigger each one. Here's my usage for example:
- Shortcut 1 : Screen bottom 2 finger gesture -> Take screenshot
- Shortcut 2 : Floating button -> Screen off
- Shortcut 3 : Hold both vol buttons -> Toggle vibrate mode

   <img width="99%" src="https://github.com/user-attachments/assets/9e99b479-d7a0-48d1-8532-38bdbf586387" />

   > I just found out that we can dynamically assign what shortcut to show up and enabled. So I got some ideas for the future as well. :)

</details>
<details>
   <summary><h2>How to use new watch faces?</h2></summary>

If you are on WearOS 5 or later, First install the [Essentials WearOS app](https://github.com/sameerasw/essentials-wear), Then download and sideload [this watch face app](https://github.com/sameerasw/essentials-watchface) (It need to be a separate non executable APK).
On some OS, it might not show up on watchface picker. In that case, try running the below command from adb.
```
adb shell am broadcast -a com.google.android.wearable.app.DEBUG_SURFACE --es operation set-watchface --es watchFaceId com.sameerasw.essentials.watchface
```

Then, in edit mode, setup your complications as below (Some might be already selected) :

<img width="384" height="384" src="https://github.com/user-attachments/assets/d3f0fab6-24a3-43fb-9999-9480e3ef3a48" /><br>

1. Essentials - At a glance
2. Essentials - At a glance (This is the middle of the watch face, used for the top glow)
3. Steps - Or up to you
4. Heart rate - Or up to you
5. Battery
6. Day and date
7. Essentials - Phone battery

### If you are on WearOS 5 or older, You can also use the built-in watch face of the [Essentials WearOS app](https://github.com/sameerasw/essentials-wear) alone without another WFF app which also allows customizations from Android app as well as extra features. But WFF might be a bit more efficient? 

</details>


<img width="99%" src="https://github.com/user-attachments/assets/7cf75e83-7c76-490f-b1b9-e996cf18f9a8" />
<p align="center">
<img width="24%" src="https://github.com/user-attachments/assets/a21c798c-227e-4e7e-a984-9c19638f219f" />
<img width="24%" src="https://github.com/user-attachments/assets/4db2e0d5-4405-4c39-89e6-4133b4198af0" />
<img width="24%" src="https://github.com/user-attachments/assets/2db7f1d5-3c6e-4ff0-9e92-7df620a5c16a" />
<img width="24%" src="https://github.com/user-attachments/assets/2a925f90-d660-4551-8c79-420052d4f5ed" />
</p>
<img width="99%" src="https://github.com/user-attachments/assets/8950e69b-7a7d-4ab9-a8d9-f40ee07d3475" />


<details>
   <summary><h3>PRs & Contributions</h3></summary>

* feat(link-picker): add Tools tab with URL Shortener Studio, QR Code Generator, and Quick Settings Tile by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/833
* feat(link-picker): add Tools tab with Private Floating Web Preview and Material 3 QR Code generator by @Balajitechlabs in https://github.com/sameerasw/essentials/pull/830
* Refactor: tile/widget registry, debugging tile name and icons by @thekrdev in https://github.com/sameerasw/essentials/pull/838
* Develop - url shortener, qr code and qs tile improvements by @sameerasw in https://github.com/sameerasw/essentials/pull/842
* Develop - Improved unified link actions sheet by @sameerasw in https://github.com/sameerasw/essentials/pull/849
* Community translations by @Fuchs23 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/828
* Community translations by @ArthusPVP by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/829
* Community translations by @OrdinaryPerson0 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/831
* Community translations by @agent13fab by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/832
* Community translations by @Naxomega by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/835
* Community translations by @makarena2938 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/836
* Community translations by @snowwysillycat by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/837
* Community translations by @paul1126 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/839
* Community translations by @Ndraaa-repo by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/841
* Community translations by @lt723707-tech by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/844
* Community translations by @LK024 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/848
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/851
* Develop - Essentials watchface controls by @sameerasw in https://github.com/sameerasw/essentials/pull/854
* Develop - Custom app icons by @sameerasw in https://github.com/sameerasw/essentials/pull/858
* Develop - Upstream by @sameerasw in https://github.com/sameerasw/essentials/pull/864
* Develop - MeDrop button, AGSL ripple effect by @sameerasw in https://github.com/sameerasw/essentials/pull/872
* fix: add verticalScroll to TimeSelectionSheet to fix unclickable save… by @PramudithaN in https://github.com/sameerasw/essentials/pull/876
* Develop - Permission  by @sameerasw in https://github.com/sameerasw/essentials/pull/882
* Community translations by @youseffahed861-code by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/855
* Community translations by @elchumy6960 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/856
* Community translations by @ru-tei2 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/859
* Community translations by @DDOneApps by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/861
* Community translations by @Yonkae by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/863
* Community translations by @gluetheknot2 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/865
* Community translations by @OrdinaryPerson0 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/866
* Community translations by @Fuchs23 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/867
* Community translations by @Ark-droid596 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/871
* feat(locale): added zh_TW by @olivertzeng in https://github.com/sameerasw/essentials/pull/873
* Community translations by @AhmedAwad7 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/874
* Community translations by @Amonoman by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/875
* Community translations by @Arno313 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/878
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/883
* Develop - Motion blur, watch settings re-organization, watch adb info, smart pixel lottie, minimal settings descriptions, battery widget to sheet, accessibility shortcuts by @sameerasw in https://github.com/sameerasw/essentials/pull/889
* Korean translations by @paul1126 in https://github.com/sameerasw/essentials/pull/884
* Community translations by @Kawaharu869 by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/885
* Community translations by @mariohdel14nasa-lang by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/886
* Community translations by @productbyPHT by @github-actions[bot] in https://github.com/sameerasw/essentials/pull/888
* Develop - Translations by @sameerasw in https://github.com/sameerasw/essentials/pull/890

</details>

## New Contributors
* @PramudithaN made their first contribution in https://github.com/sameerasw/essentials/pull/876
* @olivertzeng made their first contribution in https://github.com/sameerasw/essentials/pull/873
* @paul1126 made their first contribution in https://github.com/sameerasw/essentials/pull/884

**Full Changelog**: https://github.com/sameerasw/essentials/compare/v17.2...v17.3

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