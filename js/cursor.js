const cursor = document.getElementById("cursor");
//select all the links on the page
const links = document.querySelectorAll("a");
const hoverables = document.querySelectorAll(".hover-state");


const moveCursor = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
   
  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}


function updateTitle(titleText){
  if(titleText){
    document.getElementById('title').innerHTML = titleText;
  }
}

window.addEventListener('mousemove', moveCursor)

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.classList.add('blur-mini');
    cursor.classList.add('cursor-grow');
    updateTitle(link.getAttribute('data-title'));
  })
  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('blur-mini');
    cursor.classList.remove('cursor-grow');
    updateTitle("Sameera Sandakelum");
  })
}
)


hoverables.forEach(hoverable => {
  hoverable.addEventListener('mouseenter', () => {
    cursor.style.display = "none";
    document.body.style.cursor = "pointer";
  })
  hoverable.addEventListener('mouseleave', () => {
    cursor.style.display = "block";
    document.body.style.cursor = "none";
  })
}

)
