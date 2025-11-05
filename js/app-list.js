document.addEventListener("DOMContentLoaded", function () {
  const apps = [
    {
      name: "AirSync",
      link: "./airsync.html",
      description:
        "The forbidden Android + macOS continuity with notification and clipboard sync and more.",
      iconUrl: "/assets/img/articles/airsync/airsync-logo.png",
      imageUrl: "https://github.com/user-attachments/assets/1b59fa22-780b-455d-87b1-6bb028c69d37",
      price: "foss",
    },
    {
      name: "Zen Browser",
      link: "./zen.html",
      description:
        "'Welcome to a calmer internet' Beautifully designed, privacy-focused, and packed with features. We care about your experience, not your data.",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/zen-browser.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/zen.png",
      price: "foss",
    },
    {
      name: "Notion",
      link: "https://notion.so/",
      description:
        "Notion is an all-in-one workspace for your notes, tasks, wikis, and databases. It is a powerful tool that can be used for personal and professional use.",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/notion.png",
      price: "free",
    },
    {
      name: "Warp",
      link: "https://www.warp.dev/",
      description:
        "Warp is the terminal reimagined with AI and collaborative tools for better productivity. ",
      iconUrl:
        "https://cdn.terminaltrove.com/m/b1c31938-6e80-4f28-a2cd-d2047eddcdb2.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/warp.png",
      price: "free",
    },
    {
      name: "Google Tasks",
      link: "https://github.com/sameerasw/tasks",
      description:
        "A native Swift macOS app for Google Tasks by me.",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Tasks_2021.svg/1200px-Google_Tasks_2021.svg.png",
      imageUrl: "https://github.com/user-attachments/assets/2ba5ca6e-078d-4328-96a5-e8b9455062b8",
      price: "foss",
    },
    {
      name: "Zero",
      link: "https://github.com/sameerasw/Browser",
      description:
        "A browser by me. With transparency and minimal liquid glass UI",
      iconUrl:
        "https://github.com/sameerasw/Browser/blob/main/AppIcon.icon/Assets/Frame%201.png?raw=true",
      imageUrl: "https://github.com/user-attachments/assets/0053365a-76c3-478b-aea5-ec8754e95c22",
      price: "foss",
    },
    {
      name: "Karabiner Elements",
      link: "https://karabiner-elements.pqrs.org/",
      description:
        "A powerful and stable keyboard customizer for macOS. Used for adding macros, remapping keys, and more on the magic keyboard as well as on my 60% keyboard.",
      iconUrl:
        "https://karabiner-elements.pqrs.org/images/logo.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/karabiner.png",
      price: "foss",
    },
    {
      name: "Amethyst WM",
      link: "https://github.com/ianyh/Amethyst",
      description:
        "A powerful tiling window manager for macOS along the lines of xmonad.",
      iconUrl:
        "https://imagedelivery.net/-IT6z0z0Ec5yEiYj3DvVjg/40cafb867e75a445d9ec0e0a1a3157950bcda0c4/public",
      imageUrl: "https://camo.githubusercontent.com/f3d8dbdf980ee1867e93b5cfdd8c643e5632c4fb35f850f41e1c03f3518797da/68747470733a2f2f69616e79682e636f6d2f616d6574687973742f696d616765732f77696e646f77732e706e67",
      price: "foss",
    },
    {
      name: "VSCode",
      link: "https://code.visualstudio.com/",
      description:
        "You know it",
      iconUrl:
        "https://code.visualstudio.com/assets/images/code-stable.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/vscode.jpeg",
      price: "free",
    },
    {
      name: "Mac Mouse Fix",
      link: "https://macmousefix.com/",
      description: "Make Your $10 Mouse Better Than an Apple Trackpad!",
      iconUrl:
        "https://macmousefix.com/_ipx/w_450&q_100/mmf-icon.png",
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
      name: "Raycast",
      link: "https://www.raycast.com/",
      description:
        "A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable.",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/en/f/f4/Raycast_App_Icon.png",
      imageUrl: "/assets/img/articles/macos/app-screenshots/raycast.png",
      price: "free",
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
    // {
    //   name: "ProtonVPN",
    //   link: "https://protonvpn.com/",
    //   description: "The best VPN for speed and security. Stay safe. Play fast.",
    //   iconUrl:
    //     "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/8ef87b0fb3b73ced0ee18224baca3293_z7sHQzGa3S.png",
    //   imageUrl: "/assets/img/articles/macos/app-screenshots/protonvpn.png",
    //   price: "free",
    // },
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
    // {
    //   name: "Battery Toolkit",
    //   link: "https://github.com/mhaeuser/Battery-Toolkit",
    //   description:
    //     "Control the platform power state of your Apple Silicon Mac.",
    //   iconUrl:
    //     "https://raw.githubusercontent.com/mhaeuser/Battery-Toolkit/main/Resources/AppIcon.svg",
    //   imageUrl:
    //     "/assets/img/articles/macos/app-screenshots/battery-toolkit.png",
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
    {
      name: "Multiviewer",
      link: "hhttps://multiviewer.app/",
      description:
        "Stream F1 TV with multiple streams and extensive realtime data",
      iconUrl:
        "https://multiviewer.app/favicon.ico",
      imageUrl:
        "https://multiviewer.app/_next/static/media/feature-multi-view.0259957f.jpg",
      price: "free",
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
