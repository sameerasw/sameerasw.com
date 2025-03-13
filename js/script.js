let logo = document.getElementById("logo");
let title = document.getElementById("title");
let nav = document.getElementById("nav");
let totop = document.getElementById("totop");
let sidebar = document.getElementById("sidebar");

//hides the nav bar when the user scrolls down and show it when the user scrolls up
let lastScrollTop = 0;
window.addEventListener(
  "scroll",
  function () {
    let currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
      nav.classList.add("mini");
      // sidebar.classList.add('mini-sidebar');
    } else {
      nav.classList.remove("mini");
      // sidebar.classList.remove('mini-sidebar');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  },
  false
);

//animate each item one by one when the page is loaded
let items = document.querySelectorAll(".item");
let i = 0;

function animate() {
  if (i < items.length) {
    items[i].style.opacity = 1;
    items[i].style.transform = "translateY(0)";
    i++;
    setTimeout(animate, 150);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  animate();
});

try {
  //change the active nav to the current scroll position based on sections
  let intro = document.getElementById("intro");
  let projects = document.getElementById("projects");
  let about = document.getElementById("about-me");
  let contact = document.getElementById("contact");

  let intro_nav = document.getElementById("home-nav");
  let projects_nav = document.getElementById("projects-nav");
  let about_nav = document.getElementById("about-nav");
  let contact_nav = document.getElementById("contact-nav");

  window.addEventListener("scroll", function () {
    let scroll = window.scrollY;
    if (scroll < projects.offsetTop - 400) {
      intro_nav.classList.add("active");
      projects_nav.classList.remove("active");
      about_nav.classList.remove("active");
      contact_nav.classList.remove("active");
    } else if (scroll < about.offsetTop - 400) {
      intro_nav.classList.remove("active");
      projects_nav.classList.add("active");
      about_nav.classList.remove("active");
      contact_nav.classList.remove("active");
    } else if (scroll < contact.offsetTop - 400) {
      intro_nav.classList.remove("active");
      projects_nav.classList.remove("active");
      about_nav.classList.add("active");
      contact_nav.classList.remove("active");
    } else {
      intro_nav.classList.remove("active");
      projects_nav.classList.remove("active");
      about_nav.classList.remove("active");
      contact_nav.classList.add("active");
    }
  });
} catch (e) {
  console.log(e);
}

try {
  //expand more projects by letting elements show as block if it has the hidden class
  let more_projects = document.getElementById("more-projects-button");

  more_projects.addEventListener("click", function () {
    //get all the hidden projects and display or hide with button toggle
    let hidden_projects = document.querySelectorAll(".hidden");
    for (let i = 0; i < hidden_projects.length; i++) {
      if (hidden_projects[i].style.display === "block") {
        hidden_projects[i].style.display = "none";
        more_projects.innerHTML = "Show more";
      } else {
        hidden_projects[i].style.display = "block";
        more_projects.innerHTML = "Show less";
      }
    }
  });
} catch (e) {
  console.log(e);
}

//if an item goes outside the screen, depth effect will be applied
window.addEventListener("scroll", function () {
  for (let i = 0; i < items.length; i++) {
    let position = items[i].getBoundingClientRect();
    if (position.top > window.innerHeight - 10 || position.bottom < 20) {
      // items[i].style.filter = "blur(5px)";
      items[i].style.scale = "0.85";
    } else {
      // items[i].style.filter = "none";
      items[i].style.scale = "1";
    }
  }
});

window.addEventListener("scroll", function () {
  let scroll = window.scrollY;
  if (scroll > 100) {
    logo.classList.add("scrolled");
  } else {
    logo.classList.remove("scrolled");
  }
});
