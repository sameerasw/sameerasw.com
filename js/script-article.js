let featureHeader = document.getElementById('featureHeader');
let featureList = document.getElementById('featureList');



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