let logo = document.getElementById('logo');
let title = document.getElementById('title');
let nav = document.getElementById('nav');
let totop = document.getElementById('totop');
let sidebar = document.getElementById('sidebar');

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

try{
    //change the active nav to the current scroll position based on sections
    let intro = document.getElementById('intro');
    let projects = document.getElementById('projects');
    let about = document.getElementById('about-me');
    let contact = document.getElementById('contact');

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
        } else if(scroll < contact.offsetTop - 400){
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
        //only if the window width is lower than 500px
        if(window.innerWidth < 500){
            let value = window.scrollY;
            // console.log(value);
            logo.style.opacity = 1 - value * 1/200;
        }
    }
    );
} catch(e){
    console.log(e);
}


try{
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
} catch(e){
    console.log(e);
}


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