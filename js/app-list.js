document.addEventListener("DOMContentLoaded", function () {
  const apps = [
    {
      name: "Zen Browser",
      link: "https://zen-browser.app/",
      description:
        "'Welcome to a calmer internet' Beautifully designed, privacy-focused, and packed with features. We care about your experience, not your data.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/f47c2154d3afca8f7d81d3788d089800_low_res_Zen_Browser.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/zen.png",
      price: "foss",
    },
    {
      name: "Notion",
      link: "https://notion.so/",
      description:
        "Notion is an all-in-one workspace for your notes, tasks, wikis, and databases. It is a powerful tool that can be used for personal and professional use.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/edd1187d9ca7d2ff5f126ff0f8945563_kbvNfoXHXp.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/notion.png",
      price: "free",
    },
    {
      name: "Warp",
      link: "https://www.warp.dev/",
      description:
        "Warp is the terminal reimagined with AI and collaborative tools for better productivity. ",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/c5f52463c3cdb7ed0c67f6f9b53bcc23_low_res_Warp.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/warp.png",
      price: "free",
    },
    {
      name: "Karabiner Elements",
      link: "https://karabiner-elements.pqrs.org/",
      description:
        "A powerful and stable keyboard customizer for macOS. Used for adding macros, remapping keys, and more on the magic keyboard as well as on my 60% keyboard.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/be53e2eac5e33c9ce8fa864f211c84d7_low_res_Karabiner%20Elements.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/karabiner.png",
      price: "foss",
    },
    {
      name: "Mac Mouse Fix",
      link: "https://macmousefix.com/",
      description: "Make Your $10 Mouse Better Than an Apple Trackpad!",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/dd0669d44c519797bb7548025bbceff3_BeqbQpVaSy.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/mac-mouse-fix.png",
      price: "paid",
    },
    // {
    //   name: "YouTube Music Desktop",
    //   link: "https://th-ch.github.io/youtube-music/",
    //   description:
    //     "Open source, cross-platform, unofficial YouTube Music Desktop App with built-in ad blocker, downloader and a lot mmore features being continuously added.",
    //   iconUrl:
    //     "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/fdf3365454022eab82c11a692e2dea7c_pwi9IYN1v9.png",
    //   imageUrl: "/assets/img/articles/macos/app-screenshots/yt-music.png",
    //   price: "foss",
    // },
    {
      name: "Latest",
      link: "https://max.codes/latest/",
      description:
        "Latest is a free and open source app for macOS that checks if all your apps are up to date. Get a quick overview of which apps changed and what changed and update them right away.",
      iconUrl:
        "https://github.com/mangerlahn/Latest/blob/main/Latest/Resources/Assets.xcassets/AppIcon.appiconset/64.png?raw=true",
      imageUrl: "/assets/img/articles/macos/app-screenshots/latest.png",
      price: "foss",
    },
    {
      name: "Elmedia Video Player",
      link: "https://apps.apple.com/us/app/elmedia-universal-video-player/id937759555?mt=12",
      description:
        "ELMEDIA is a Mac video player that offers advanced playback and streaming options. It can handle any conceivable media format. Local files can be streamed to Chromecast, AirPlay, Roku and DLNA devices.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/609cbad939b456df49fd7d8b14f511b3_8IBWfjKvFa.png",
      imageUrl:
        "/assets/img/articles/macos/app-screenshots/elmedia.png",
      price: "free",
    },
    {
      name: "Raycast",
      link: "https://www.raycast.com/",
      description:
        "A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/ff9688e8751c364dbe41e7ec986e63ec_low_res_Raycast.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/raycast.png",
      price: "free",
    },
    {
      name: "scrcpy",
      link: "https://github.com/Genymobile/scrcpy/blob/master/doc/macos.md",
      description:
        "This application mirrors Android devices (video and audio) connected via USB or over TCP/IP, and allows to control the device with the keyboard and the mouse of the computer.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/b7cda5b2e776c4dde49eb3ef8ab2d35e_prk2we4Lr1.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/scrcpy.png",
      price: "foss",
    },
    // {
    //   name: "LocalSend",
    //   link: "https://localsend.org",
    //   description:
    //     "Share files to nearby devices. Free, open-source, cross-platform.",
    //   iconUrl:
    //     "https://static.macupdate.com/products/64323/l/phpzoeizw-logo.png?v=1684308099",
    //   imageUrl: "/assets/img/articles/macos/app-screenshots/localsend.png",
    //   price: "foss",
    // },
    {
      name: "ProtonVPN",
      link: "https://protonvpn.com/",
      description: "The best VPN for speed and security. Stay safe. Play fast.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/8ef87b0fb3b73ced0ee18224baca3293_z7sHQzGa3S.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/protonvpn.png",
      price: "free",
    },
    {
      name: "Proton Pass",
      link: "https://protonvpn.com/",
      description: "Proton Pass is a password manager developed by the Swiss software company Proton AG. It stores login credentials, email aliases, credit card data, passkeys, 2FA secret keys, and notes in virtual vaults.",
      iconUrl:
        "/assets/img/articles/macos/app-screenshots/protonpass.png",
      imageUrl: "https://images.prismic.io/proton-me/ZpVD6B5LeNNTxKho_Frame3465630.png?auto=format%2Ccompress&fit=max",
      price: "free",
    },
    {
      name: "Ente Auth",
      link: "https://github.com/ente-io/ente?tab=readme-ov-file#ente-auth",
      description: "End to end encrypted open source authentication app that syncs your 2FA codes across devices on multiple platforms.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9447d3c11138f440e3ddf42adef1cff1_low_res_Proton_Pass.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/ente.png",
      price: "foss",
    },
    {
      name: "CleanShot X",
      link: "https://cleanshot.com/",
      description:
        "CleanShot X provides over 50 features making it the ultimate screen capturing tool.",
      iconUrl:
        "https://www.podfeet.com/blog/wp-content/uploads/2022/04/CleanShot-X-logo.png",
      imageUrl: "https://cleanshot.com/_nuxt/bgtool.18b35a89.jpg",
      price: "paid",
    },
    {
      name: "Blip",
      link: "https://blip.net/",
      description:
        "Send any size file, right from your desktop via internet. A cross platform free to use app.",
      iconUrl: "/assets/img/articles/macos/app-screenshots/blip-icon.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/blip.png",
      price: "free",
    },
    {
      name: "Battery Toolkit",
      link: "https://github.com/mhaeuser/Battery-Toolkit",
      description:
        "Control the platform power state of your Apple Silicon Mac.",
      iconUrl:
        "https://raw.githubusercontent.com/mhaeuser/Battery-Toolkit/main/Resources/AppIcon.svg",
      imageUrl:
        "/assets/img/articles/macos/app-screenshots/battery-toolkit.png",
      price: "foss",
    },
    {
      name: "Keka",
      link: "https://www.keka.io/en/",
      description:
        "With Keka you can compress as many files as you want in a bunch of formats. You can also encrypt them to store and share securely and with privacy.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/df314a3478afb8505106f1dede53b40e_WvS8oRjSkY.png",
      imageUrl:
        "https://www.keka.io/img/demo/dock/Keka-Square-dock-b2x.png",
      price: "foss",
    },
    {
      name: "Progressive Downloader",
      link: "https://www.macpsd.net/",
      description:
        "A download manager to get 'em as fast as possible using the whole breadth of the Internet connection.",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/e3cdb6853dfd67648c9462259f7e97ce_wzff0nFDwq.png",
      imageUrl:
        "/assets/img/articles/macos/app-screenshots/progressive-downloader.png",
      price: "free",
    },
    {
      name: "Calendr",
      link: "https://github.com/pakerwreah/Calendr",
      description:
        "Menubar calendar for macOS with upcoming events",
      iconUrl:
        "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9af2892bf89c2db582e5e9c8b3420d5b_low_res_Calendar.png",
      imageUrl:
        "https://github.com/pakerwreah/Calendr/raw/master/resources/screenshot.png",
      price: "foss",
    },
  ];

  const appsListContainer = document.getElementById("apps-list");

  apps.forEach((app) => {
    const card = document.createElement("a");
    // add the price as a class name to the card
    card.className = "card item " + app.price;
    card.href = app.link;

    const iconImg = document.createElement("img");
    iconImg.src = app.iconUrl;
    iconImg.alt = "";
    iconImg.className = "app-icon";

    const imageImg = document.createElement("img");
    imageImg.src = app.imageUrl;
    imageImg.alt = "";
    imageImg.className = "app-image";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";

    const name = document.createElement("h3");
    name.textContent = app.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const description = document.createElement("p");
    description.textContent = app.description;

    cardHeader.appendChild(name);
    cardBody.appendChild(description);
    card.appendChild(iconImg);
    card.appendChild(imageImg);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    appsListContainer.appendChild(card);
  });
});
