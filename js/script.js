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
        logo.style.opacity = 1 - value * 1/300;
    } else{
    }
}
);

//hides the nav bar when the user scrolls down and show it when the user scrolls up
let lastScrollTop = 0;
window.addEventListener('scroll', function(){
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if(currentScroll > lastScrollTop){
        nav.classList.add('mini');
        // nav.style.bottom = "-20em";
        // totop.style.bottom = "1em";
    } else{
        nav.classList.remove('mini');
        // nav.style.bottom = "1em";
        // totop.style.bottom = "-20em";
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
    let body = document.querySelector('body');
    body.style.filter = "none";
    animate();
}

//change the active nav to the current scroll position based on sections
let intro = document.getElementById('intro');
let projects = document.getElementById('projects');
let about = document.getElementById('about-me');
let contatc = document.getElementById('contact');

let intro_nav = document.getElementById('home-nav');
let projects_nav = document.getElementById('projects-nav');
let about_nav = document.getElementById('about-nav');
let contact_nav = document.getElementById('contact-nav');

window.addEventListener('scroll', function(){
    let scroll = window.scrollY;
    if(scroll < projects.offsetTop - 400){
        intro_nav.classList.add('active');
        projects_nav.classList.remove('active');
        about_nav.classList.remove('active');
        contact_nav.classList.remove('active');
    } else if(scroll < about.offsetTop - 400){
        intro_nav.classList.remove('active');
        projects_nav.classList.add('active');
        about_nav.classList.remove('active');
        contact_nav.classList.remove('active');
    } else if(scroll < contatc.offsetTop - 400){
        intro_nav.classList.remove('active');
        projects_nav.classList.remove('active');
        about_nav.classList.add('active');
        contact_nav.classList.remove('active');
    } else{
        intro_nav.classList.remove('active');
        projects_nav.classList.remove('active');
        about_nav.classList.remove('active');
        contact_nav.classList.add('active');
    }
}
);

//expand more projects by letting elements show as block if it has the hidden class
let more_projects = document.getElementById('more-projects-button');

more_projects.addEventListener('click', function(){
    //get all the hidden projects and display or hide with button toggle
    let hidden_projects = document.querySelectorAll('.hidden');
    for(let i = 0; i < hidden_projects.length; i++){
        if(hidden_projects[i].style.display === 'block'){
            hidden_projects[i].style.display = 'none';
            more_projects.innerHTML = 'Show more';
        } else{
            hidden_projects[i].style.display = 'block';
            more_projects.innerHTML = 'Show less';
        }
    }
}
);

//if an item goes outside the screen, it will be blurred

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