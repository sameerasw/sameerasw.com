document.addEventListener('DOMContentLoaded', function() {
    const apps = [
        {
            name: 'ARC Browser',
            link: 'https://arc.net/',
            description: 'ARC Browser is different approach to the boring web browser to re-imagine the internet. A free product offered by the Browser Company NYC.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/67138c1169a77e9463b41b67985c5d43_low_res_Arc.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/arc-browser.png'
        },
        {
            name: 'Notion',
            link: 'https://notion.so/',
            description: 'Notion is an all-in-one workspace for your notes, tasks, wikis, and databases. It is a powerful tool that can be used for personal and professional use.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/edd1187d9ca7d2ff5f126ff0f8945563_kbvNfoXHXp.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/notion.png'
        },
        {
            name: 'Warp',
            link: 'https://www.warp.dev/',
            description: 'Warp is the terminal reimagined with AI and collaborative tools for better productivity. ',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/c5f52463c3cdb7ed0c67f6f9b53bcc23_low_res_Warp.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/warp.png'
        },
        {
            name: 'Karabiner Elements',
            link: 'https://karabiner-elements.pqrs.org/',
            description: 'A powerful and stable keyboard customizer for macOS. Used for adding macros, remapping keys, and more on the magic keyboard as well as on my 60% keyboard.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/be53e2eac5e33c9ce8fa864f211c84d7_low_res_Karabiner%20Elements.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/karabiner.png'
        },
        {
            name: 'Mac Mouse Fix',
            link: 'https://macmousefix.com/',
            description: 'Make Your $10 Mouse Better Than an Apple Trackpad!',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/dd0669d44c519797bb7548025bbceff3_BeqbQpVaSy.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/mac-mouse-fix.png'
        },
        {
            name: 'YouTube Music Desktop',
            link: 'https://th-ch.github.io/youtube-music/',
            description: 'Open source, cross-platform, unofficial YouTube Music Desktop App with built-in ad blocker, downloader and a lot mmore features being continuously added.',
            iconUrl: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/2b456a86229b8f12bc39043a2b417c32_low_res_YouTube_Music.png',
            imageUrl: '/assets/img/articles/macos/app-screenshots/yt-music.png'
        }
    ];

    const appsListContainer = document.getElementById('apps-list');

    apps.forEach(app => {
        const card = document.createElement('a');
        card.className = 'card';
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