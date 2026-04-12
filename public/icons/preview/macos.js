document.addEventListener("DOMContentLoaded", async function () {
    // read the two list.txt files inside the /folder-icons and /app-icons folders and get files names of each line from it
    const folderIcons = await fetch("https://raw.githubusercontent.com/sameerasw/mac-icons/main/folder-icons/list.txt").then((res) => res.text());
    const appIcons = await fetch("https://raw.githubusercontent.com/sameerasw/mac-icons/main/app-icons/list.txt").then((res) => res.text());
    const folderIconsList = folderIcons.split("\n");
    const appIconsList = appIcons.split("\n");
    let logo = document.getElementById('logo');
let title = document.getElementById('title');
let nav = document.getElementById('nav');
let totop = document.getElementById('totop');
let sidebar = document.getElementById('sidebar');
let themeButton = document.getElementById('theme');
let colorButton = document.getElementById('color');
let darkColors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#C71585', '#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C', '#DC143C', '#B22222', '#8B0000', '#FF0000', '#FF6347', '#FF4500', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FFFFE0', '#FFFACD', '#FAFAD2', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B', '#ADFF2F', '#7FFF00', '#7CFC00', '#00FF00', '#32CD32', '#98FB98', '#90EE90', '#00FA9A', '#00FF7F', '#3CB371', '#2E8B57', '#228B22', '#008000', '#006400', '#9ACD32', '#6B8E23', '#808000', '#556B2F', '#66CDAA', '#8FBC8F', '#20B2AA', '#008B8B', '#008080', '#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4', '#66CDAA', '#20B2AA', '#5F9EA0', '#008B8B', '#008080', '#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4', '#66CDAA', '#20B2AA', '#5F9EA0', '#008B8B', '#008080', '#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4', '#66CDAA', '#20B2AA', '#5F9EA0', '#008B8B', '#008080', '#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4', '#66CDAA', '#20B2AA', '#5F9EA0', '#008B8B', '#008080'];
let pastelColors = ['#449966', '#336699', '#993366', '#669933', '#996633', '#669966', '#339966', '#339999', '#336333', '#336666', '#333366', '#663366', '#663333', '#663399'];


//hides the nav bar when the user scrolls down and show it when the user scrolls up
let lastScrollTop = 0;
window.addEventListener('scroll', function(){
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if(currentScroll > lastScrollTop){
        nav.classList.add('mini');
        // sidebar.classList.add('mini-sidebar');
    } else{
        nav.classList.remove('mini');
        // sidebar.classList.remove('mini-sidebar');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);


//animate each item one by one when the page is loaded
let items = document.querySelectorAll('.item');
let i = 0;

function animate(){
    if(i < items.length){
        items[i].style.opacity = 1;
        items[i].style.transform = "translateY(0)";
        i++;
        setTimeout(animate, 150);
    }
}

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



//generate a random pastel themed color and assign to the accent color css var
const randomColor = (darkMode) => {
    if(darkMode){
      let color = darkColors[Math.floor(Math.random()*darkColors.length)];
        return color;
    } else{
        let color = pastelColors[Math.floor(Math.random()*pastelColors.length)];
        return color;
    }
  }