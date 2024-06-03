document.addEventListener("DOMContentLoaded", async function () {
    // read the two list.txt files inside the /folder-icons and /app-icons folders and get files names of each line from it
    const folderIcons = await fetch("https://raw.githubusercontent.com/sameerasw/folder-icons/main/PNGs/list.txt").then((res) => res.text());
    const folderIconsList = folderIcons.split("\n");

    // skip non png files
    folderIconsList.forEach((icon, index) => {
        if (!icon.endsWith(".png")) {
            folderIconsList[index] = null;
        }
    });

    //sort the icons list
    folderIconsList.sort();

    let icongrid = document.getElementById("grid");

    // create the folder icons
    folderIconsList.forEach((icon) => {
        if (icon) {
            let img = document.createElement("img");
            img.src = `https://raw.githubusercontent.com/sameerasw/folder-icons/main/PNGs/${icon}`;
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
            // change the link from the PNGs folder to the ICO folder and change the file extension from .png to .ico
            let url = e.target.src.replace("PNGs", "ICO").replace(".png", ".ico");
            window.open(url);
        }
    });
});
