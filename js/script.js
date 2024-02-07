let logo = document.getElementById('logo');
let typing_text = document.getElementById('typing-text');
let title = document.getElementById('title');
let nav = document.getElementById('nav');

//reduce the hight of the logo according to how much the user has scrolled
window.addEventListener('scroll', function(){
    //only if the window width is lower than 500px
    if(window.innerWidth < 500){
        let value = window.scrollY;
        // console.log(value);
        logo.style.height = 100 - value * 1/4 + 'vw';
        logo.style.opacity = 1 - value * 1/400;
        if(value > 450){
            typing_text.style.opacity = 0;
            nav.style.bottom = "-20em";
        } else{
            typing_text.style.opacity = 1;
            nav.style.bottom = "1em";
        }
    } else{
        logo.style.height = '8em';
    }
}
);