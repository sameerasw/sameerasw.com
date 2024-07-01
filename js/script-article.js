let logo = document.getElementById('logo');
let title = document.getElementById('title');
let nav = document.getElementById('nav');
let sidebar = document.getElementById('sidebar');
let themeButton = document.getElementById('theme');
let colorButton = document.getElementById('color');
let darkColors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#C71585', '#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C', '#DC143C', '#B22222', '#8B0000', '#FF0000', '#FF6347', '#FF4500', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FFFFE0', '#FFFACD', '#FAFAD2', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B', '#ADFF2F', '#7FFF00', '#7CFC00', '#00FF00', '#32CD32', '#98FB98', '#90EE90', '#00FA9A', '#00FF7F', '#3CB371', '#2E8B57', '#228B22', '#008000', '#006400', '#9ACD32', '#6B8E23', '#808000', '#556B2F', '#66CDAA', '#8FBC8F', '#20B2AA', '#008B8B', '#008080', '#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4', '#66CDAA', '#20B2AA', '#5F9EA0', '#008B8B', '#008080', '#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4', '#66CDAA', '#20B2AA', '#5F9EA0', '#008B8B', '#008080', '#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4', '#66CDAA', '#20B2AA', '#5F9EA0', '#008B8B', '#008080', '#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4', '#66CDAA', '#20B2AA', '#5F9EA0', '#008B8B', '#008080'];
let pastelColors = ['#449966', '#336699', '#993366', '#669933', '#996633', '#669966', '#339966', '#339999', '#336333', '#336666', '#333366', '#663366', '#663333', '#663399'];
let featureHeader = document.getElementById('featureHeader');
let featureList = document.getElementById('featureList');

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

document.addEventListener('DOMContentLoaded', function(){
    const colorChange = () => {
        let random = randomColor(darkMode);
        const accentColor = document.querySelector(':root');
        accentColor.style.setProperty('--primary-color', `${random}`);
    }
    let body = document.querySelector('body');
    body.style.filter = "none";
    animate();
    if(localStorage.getItem('theme') === 'light' && localStorage.getItem('theme') !== null){
        document.getElementById('css').setAttribute('href', 'css/light.css');
        darkMode = false;
    } else{
        document.getElementById('css').setAttribute('href', 'css/dark.css');
        darkMode = true;
    }
    // console.log(localStorage.getItem('theme'));
    // console.log(localStorage.getItem('theme'));
    // console.log(darkMode);

    colorChange();

    //call the color change on click on the logo
    colorButton.addEventListener('click', () => {
        colorChange();
    }
    );

    //switch between light and dark mode by changing the css file from light.css to dark.css
    themeButton.addEventListener('click', function(){
        if(darkMode){
            document.getElementById('css').setAttribute('href', 'css/light.css');
            darkMode = false;
        } else{
            document.getElementById('css').setAttribute('href', 'css/dark.css');
            darkMode = true;
        }
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        colorChange();
    }
    );

}
);


window.addEventListener('scroll', function(){
    //only if the window width is lower than 500px
    if(window.innerWidth < 500){
        let value = window.scrollY;
        // console.log(value);
        logo.style.opacity = 1 - value * 1/200;
    }
}
);

//if an item goes outside the screen, depth effect will be applied
window.addEventListener('scroll', function(){
    for(let i = 0; i < items.length; i++){
        let position = items[i].getBoundingClientRect();
        if(position.top > window.innerHeight - 10 || position.bottom < 20){
            // items[i].style.filter = "blur(5px)";
            items[i].style.scale = "0.75";
        } else{
            // items[i].style.filter = "none";
            items[i].style.scale = "1";
        }
    }
}
);


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

  try{
    
        //clicking on featureHeader will toggle the featureList
        featureHeader.addEventListener('click', function(){
            featureList.style.height = featureList.style.height === 'auto' ? '0' : 'auto';
            featureList.style.scale = featureList.style.scale === '1' ? '0' : '1';
        }
        );

    } catch(e){
    }