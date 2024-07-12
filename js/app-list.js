document.addEventListener('DOMContentLoaded', function() {
    const apps = [
        {
            name: 'ARC Browser',
            link: 'https://arc.net/',
            description: 'ARC Browser is different approach to the boring web browser to re-imagine the internet. A free product offered by the Browser Company NYC.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/67138c1169a77e9463b41b67985c5d43_low_res_Arc.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/arc-browser.png',
            price: 'free'
        },
        {
            name: 'Notion',
            link: 'https://notion.so/',
            description: 'Notion is an all-in-one workspace for your notes, tasks, wikis, and databases. It is a powerful tool that can be used for personal and professional use.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/edd1187d9ca7d2ff5f126ff0f8945563_kbvNfoXHXp.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/notion.png',
            price: 'free'
        },
        {
            name: 'Warp',
            link: 'https://www.warp.dev/',
            description: 'Warp is the terminal reimagined with AI and collaborative tools for better productivity. ',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/c5f52463c3cdb7ed0c67f6f9b53bcc23_low_res_Warp.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/warp.png',
            price: 'free'
        },
        {
            name: 'Karabiner Elements',
            link: 'https://karabiner-elements.pqrs.org/',
            description: 'A powerful and stable keyboard customizer for macOS. Used for adding macros, remapping keys, and more on the magic keyboard as well as on my 60% keyboard.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/be53e2eac5e33c9ce8fa864f211c84d7_low_res_Karabiner%20Elements.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/karabiner.png',
            price: 'foss'
        },
        {
            name: 'Mac Mouse Fix',
            link: 'https://macmousefix.com/',
            description: 'Make Your $10 Mouse Better Than an Apple Trackpad!',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/dd0669d44c519797bb7548025bbceff3_BeqbQpVaSy.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/mac-mouse-fix.png',
            price: 'paid'
        },
        {
            name: 'YouTube Music Desktop',
            link: 'https://th-ch.github.io/youtube-music/',
            description: 'Open source, cross-platform, unofficial YouTube Music Desktop App with built-in ad blocker, downloader and a lot mmore features being continuously added.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/fdf3365454022eab82c11a692e2dea7c_pwi9IYN1v9.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/yt-music.png',
            price: 'foss'
        },
        {
            name: 'Latest',
            link: 'https://max.codes/latest/',
            description: 'Latest is a free and open source app for macOS that checks if all your apps are up to date. Get a quick overview of which apps changed and what changed and update them right away.',
            iconUrl: 'https://github.com/mangerlahn/Latest/blob/main/Latest/Resources/Assets.xcassets/AppIcon.appiconset/64.png?raw=true',
            imageUrl: '/assets/img/articles/macos/app-screenshots/latest.png',
            price: 'foss'
        },
        {
            name: 'IINA',
            link: 'https://iina.io/',
            description: 'IINA is born to be a modern macOS application, from its framework to the user interface. It adopts the post-Yosemite design language of macOS and keeps up the pace of new technologies.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/5132d30ec156bd6d1ce27dce2c50f567_zb8tSYdlVC.png',
            imageUrl: 'https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fb420cf1b-b5de-455a-bc03-3990ae2d77ba%2Fd9e4cc7c-5a32-4dcd-bdfb-e2c081bda75f%2FUntitled.png?table=block&id=cbdcc7c0-13fa-4a42-9ec9-1ea08f8ded6c&cache=v2',
            price: 'foss'
        },
        {
            name: 'Raycast',
            link: 'https://www.raycast.com/',
            description: 'A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/ff9688e8751c364dbe41e7ec986e63ec_low_res_Raycast.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/raycast.png',
            price: 'free'
        },
        {
            name: 'scrcpy',
            link: 'https://github.com/Genymobile/scrcpy/blob/master/doc/macos.md',
            description: 'This application mirrors Android devices (video and audio) connected via USB or over TCP/IP, and allows to control the device with the keyboard and the mouse of the computer.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/b7cda5b2e776c4dde49eb3ef8ab2d35e_prk2we4Lr1.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/scrcpy.png',
            price: 'foss'
        },
        {
            name: 'LocalSend',
            link: 'https://localsend.org',
            description: 'Share files to nearby devices. Free, open-source, cross-platform.',
            iconUrl: 'https://static.macupdate.com/products/64323/l/phpzoeizw-logo.png?v=1684308099',
            imageUrl: '/assets/img/articles/macos/app-screenshots/localsend.png',
            price: 'foss'
        },
        {
            name: 'ProtonVPN',
            link: 'https://localsend.org',
            description: 'The best VPN for speed and security. Stay safe. Play fast.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/85f7bae7b0c9c4e4e47b530ea127e3cd_low_res_Proton%20VPN.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/protonvpn.png',
            price: 'free'
        },
        {
            name: 'CleanShot X',
            link: 'https://cleanshot.com/',
            description: 'CleanShot X provides over 50 features making it the ultimate screen capturing tool.',
            iconUrl: 'https://www.podfeet.com/blog/wp-content/uploads/2022/04/CleanShot-X-logo.png',
            imageUrl: 'https://cleanshot.com/_nuxt/bgtool.18b35a89.jpg',
            price: 'paid'
        },
        {
            name: 'Blip',
            link: 'https://localsend.org',
            description: 'Send any size file, right from your desktop via internet. A cross platform free to use app.',
            iconUrl: '/assets/img/articles/macos/app-screenshots/blip-icon.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/blip.png',
            price: 'free'
        },
        {
            name: 'Battery Toolkit',
            link: 'https://github.com/mhaeuser/Battery-Toolkit',
            description: 'Control the platform power state of your Apple Silicon Mac.',
            iconUrl: 'https://raw.githubusercontent.com/mhaeuser/Battery-Toolkit/main/Resources/AppIcon.svg',
            imageUrl: '/assets/img/articles/macos/app-screenshots/battery-toolkit.png',
            price: 'foss'
        }
    ];

    const appsListContainer = document.getElementById('apps-list');

    apps.forEach(app => {
        const card = document.createElement('a');
        // add the price as a class name to the card
        card.className = 'card item ' + app.price;
        card.href = app.link;

        const iconImg = document.createElement('img');
        iconImg.src = app.iconUrl;
        iconImg.alt = '';
        iconImg.className = 'app-icon';

        const imageImg = document.createElement('img');
        imageImg.src = app.imageUrl;
        imageImg.alt = '';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        const name = document.createElement('h3');
        name.textContent = app.name;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const description = document.createElement('p');
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