let logo = document.getElementById('logo');
let typing_text = document.getElementById('typing-text');
let title = document.getElementById('title');
let nav = document.getElementById('nav');
let totop = document.getElementById('totop');

//reduce the hight of the logo according to how much the user has scrolled
window.addEventListener('scroll', function(){
    //only if the window width is lower than 500px
    if(window.innerWidth < 500){
        let value = window.scrollY;
        // console.log(value);
        logo.style.height = 100 - value * 1/4 + 'vw';
        logo.style.opacity = 1 - value * 1/400;
        if(value > 300){
            typing_text.style.opacity = 0;
        } else{
            typing_text.style.opacity = 1;
        }
    } else{
        logo.style.height = '8em';
    }
}
);

//hides the nav bar when the user scrolls down and show it when the user scrolls up
let lastScrollTop = 0;
window.addEventListener('scroll', function(){
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if(currentScroll > lastScrollTop){
        nav.style.bottom = "-20em";
        totop.style.bottom = "1em";
    } else{
        nav.style.bottom = "1em";
        totop.style.bottom = "-20em";
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

window.onload = function(){
    animate();
}