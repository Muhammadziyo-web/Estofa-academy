/*          *     .        *  .    *    *   . 
 .  *  move your mouse to over the stars   .
 *  .  .   change these values:   .  *
   .      * .        .          * .       */
   const STAR_COLOR = '#ffffff53';
   const STAR_SIZE = 3;
   const STAR_MIN_SCALE = 0.9;
   const OVERFLOW_THRESHOLD = 50;
   const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 50;
   
   const canvas = document.querySelector( 'canvas' ),
         context = canvas.getContext( '2d');
   
   let scale = 1, // device pixel ratio
       width,
       height;
   
   let stars = [];
   
   let pointerX,
       pointerY;
   
   let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
   
   let touchInput = false;
   
   generate();
   resize();
   step();
   
   window.onresize = resize;
   canvas.onmousemove = onMouseMove;
   canvas.ontouchmove = onTouchMove;
   canvas.ontouchend = onMouseLeave;
   document.onmouseleave = onMouseLeave;
   
   function generate() {
   
      for( let i = 0; i < STAR_COUNT; i++ ) {
       stars.push({
         x: 0,
         y: 0,
         z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
       });
      }
   
   }
   
   function placeStar( star ) {
   
     star.x = Math.random() * width;
     star.y = Math.random() * height;
   
   }
   
   function recycleStar( star ) {
   
     let direction = 'z';
   
     let vx = Math.abs( velocity.x ),
           vy = Math.abs( velocity.y );
   
     if( vx > 1 || vy > 1 ) {
       let axis;
   
       if( vx > vy ) {
         axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
       }
       else {
         axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
       }
   
       if( axis === 'h' ) {
         direction = velocity.x > 0 ? 'l' : 'r';
       }
       else {
         direction = velocity.y > 0 ? 't' : 'b';
       }
     }
     
     star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );
   
     if( direction === 'z' ) {
       star.z = 0.1;
       star.x = Math.random() * width;
       star.y = Math.random() * height;
     }
     else if( direction === 'l' ) {
       star.x = -OVERFLOW_THRESHOLD;
       star.y = height * Math.random();
     }
     else if( direction === 'r' ) {
       star.x = width + OVERFLOW_THRESHOLD;
       star.y = height * Math.random();
     }
     else if( direction === 't' ) {
       star.x = width * Math.random();
       star.y = -OVERFLOW_THRESHOLD;
     }
     else if( direction === 'b' ) {
       star.x = width * Math.random();
       star.y = height + OVERFLOW_THRESHOLD;
     }
   
   }
   
   function resize() {
   
     scale = window.devicePixelRatio || 1;
   
     width = window.innerWidth * scale;
     height = window.innerHeight * scale;
   
     canvas.width = width;
     canvas.height = height;
   
     stars.forEach( placeStar );
   
   }
   
   function step() {
   
     context.clearRect( 0, 0, width, height );
   
     update();
     render();
   
     requestAnimationFrame( step );
   
   }
   
   function update() {
   
     velocity.tx *= 0.96;
     velocity.ty *= 0.96;
   
     velocity.x += ( velocity.tx - velocity.x ) * 0.8;
     velocity.y += ( velocity.ty - velocity.y ) * 0.8;
   
     stars.forEach( ( star ) => {
   
       star.x += velocity.x * star.z;
       star.y += velocity.y * star.z;
   
       star.x += ( star.x - width/2 ) * velocity.z * star.z;
       star.y += ( star.y - height/2 ) * velocity.z * star.z;
       star.z += velocity.z;
     
       // recycle when out of bounds
       if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
         recycleStar( star );
       }
   
     } );
   
   }
   
   function render() {
   
     stars.forEach( ( star ) => {
   
       context.beginPath();
       context.lineCap = 'round';
       context.lineWidth = STAR_SIZE * star.z * scale;
       context.globalAlpha = 0.5 + 0.5*Math.random();
       context.strokeStyle = STAR_COLOR;
   
       context.beginPath();
       context.moveTo( star.x, star.y );
   
       var tailX = velocity.x * 2,
           tailY = velocity.y * 2;
   
       // stroke() wont work on an invisible line
       if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
       if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;
   
       context.lineTo( star.x + tailX, star.y + tailY );
   
       context.stroke();
   
     } );
   
   }
   
   function movePointer( x, y ) {
   
     if( typeof pointerX === 'number' && typeof pointerY === 'number' ) {
   
       let ox = x - pointerX,
           oy = y - pointerY;
   
       velocity.tx = velocity.tx + ( ox / 8*scale ) * ( touchInput ? 1 : -1 );
       velocity.ty = velocity.ty + ( oy / 8*scale ) * ( touchInput ? 1 : -1 );
   
     }
   
     pointerX = x;
     pointerY = y;
   
   }
   
   function onMouseMove( event ) {
   
     touchInput = false;
   
     movePointer( event.clientX*-1, event.clientY*-1 );
   
   }
   
   function onTouchMove( event ) {
   
     touchInput = true;
   
     movePointer( event.touches[0].clientX, event.touches[0].clientY, true );
   
     event.preventDefault();
   
   }
   
   function onMouseLeave() {
   
     pointerX = null;
     pointerY = null;
   
   }


   //Stars
   function createStars(type, quantity) {
    for(let i = 0; i < quantity; i++) {
        let star = document.createElement('div');
        star.classList.add('star', `type-${type}`);
        star.style.left = `${randomNumber(1, 99)}%`;
        star.style.bottom = `${randomNumber(1, 99)}%`;
        star.style.animationDuration = `${randomNumber(20, 50)}s`;
        $('.second-tab').appendChild(star);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

createStars(1, 100);
createStars(2, 105);
createStars(3, 100);


particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 355,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.48927153781200905,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.9,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 83.91608391608392,
        "size": 1,
        "duration": 3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

let wave = createElement('div','header',`


<!--Content before waves-->
<div class="inner-header flex">
<!--Just the logo.. Don't mind this-->
</div>

<!--Waves Container-->
<div>
<svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
<defs>
<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
</defs>
<g class="parallax">
<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
</g>
</svg>
</div>
<!--Waves end-->
`)

$('.third-tab').appendChild(wave)

// function hello(){  
//   for (var i = 0; i < 50; i++) {
//     var names = ['x1','x2','y1','y2'],
//         name = names[Math.floor(Math.random() * names.length)];
//     document.querySelector('.circles').insertAdjacentHTML("beforeend",'<div class="circle-container c'+i+'"><div class="circle i'+ i +'"></div></div>');
//     document.querySelector('.c'+i).css({
//       'animation': 'z 5s .'+ i +'s linear infinite'
//     });
//     document.querySelector('.i'+i).css({
//       'animation': name + ' 7.5s .'+ i +'s linear infinite'
//     });
//   }
// }

// hello()



$('.list-btn').addEventListener('click',()=>{
  if($('.ham').getAttribute('class').includes('bi-list')){
    $('.nav-links').style.transform  = ' translateX(0)'
    $('.ham').setAttribute('class','bi bi-x-lg ham')
  }else{
    $('.nav-links').style.transform  = ' translateX(100vw)'
    $('.ham').setAttribute('class','bi bi-list ham')
  }
})

var video = document.getElementsByTagName("video");
if (video.paused) {
    video.removeAttribute("loop");
    console.log(' stopped');
    video.setAttribute("loop",'loop');
} else {
    console.log("video is playing");
    //DO SOMETHING...
}

  