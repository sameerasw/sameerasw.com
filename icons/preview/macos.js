document.addEventListener("DOMContentLoaded", async function () {
    // read the two list.txt files inside the /folder-icons and /app-icons folders and get files names of each line from it
    const folderIcons = await fetch("https://raw.githubusercontent.com/sameerasw/mac-icons/main/folder-icons/list.txt").then((res) => res.text());
    const appIcons = await fetch("https://raw.githubusercontent.com/sameerasw/mac-icons/main/app-icons/list.txt").then((res) => res.text());
    const folderIconsList = folderIcons.split("\n");
    const appIconsList = appIcons.split("\n");

    // skip non png files
    folderIconsList.forEach((icon, index) => {
        if (!icon.endsWith(".png")) {
            folderIconsList[index] = null;
        }
    });

    appIconsList.forEach((icon, index) => {
        if (!icon.endsWith(".png")) {
            appIconsList[index] = null;
        }
    });

    //sort the icons list
    folderIconsList.sort();
    appIconsList.sort();

    let icongrid = document.getElementById("grid");

    // create the folder icons
    folderIconsList.forEach((icon) => {
        if (icon) {
            let img = document.createElement("img");
            img.src = `https://raw.githubusercontent.com/sameerasw/mac-icons/main/folder-icons/${icon}`;
            img.alt = icon;
            img.title = icon;
            img.classList.add("icon");
            icongrid.appendChild(img);
        }
    });

    // create the app icons
    appIconsList.forEach((icon) => {
        if (icon) {
            let img = document.createElement("img");
            img.src = `https://raw.githubusercontent.com/sameerasw/mac-icons/main/app-icons/${icon}`;
            img.alt = icon;
            img.title = icon;
            img.classList.add("icon");
            icongrid.appendChild(img);
        }
    });

    let search = document.getElementById("search");

    // filter the icons based on the search input
    search.addEventListener("input", function (e) {
        let value = e.target.value.toLowerCase();
        let icons = icongrid.querySelectorAll("img");
        icons.forEach((icon) => {
            if (icon.src.toLowerCase().includes(value) || icon.alt.toLowerCase().includes(value)) {
                icon.style.display = "block";
                setTimeout(() => {
                    icon.style.scale = "1";
                }, 100);
            } else {
                icon.style.scale = "0";
                icon.style.display = "none";
            }
        });
    });

    // open the image in a new tab when clicked
    icongrid.addEventListener("click", function (e) {
        if (e.target.tagName === "IMG") {
            window.open(e.target.src, "_blank");
        }
    });
});
