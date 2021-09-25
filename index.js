const score=document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
//------------------------------------------------

console.log(score);
startScreen.addEventListener('click',start);
let player={speed:5 ,score: 0};

//---------------------------------------------
let keys = {ArrowUp: false,ArrowDown:false,ArroweLeft:false,ArrowRight:false}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
        e.preventDefault();
         keys[e.key]=true;
     
    }
    function keyUp(e){
        e.preventDefault(); 
        keys[e.key]=false; 
      
    }
//--------------------------------------------
function iscollide(a,b){
      aRect=a.getBoundingClientRect();
      bRect=b.getBoundingClientRect();
      return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
    }
    //-----------------------------------------
function moveLines(){
      let lines=document.querySelectorAll('.lines');
      lines.forEach(function(item){
    if(item.y>=700){
      item.y-=750;
    }
        
       item.y+=player.speed;
       item.style.top=item.y+"px";
      });
    }
    //----------------------------------------------
    function endGame(){
           player.start=false;
           startScreen.classList.remove('hide');
           startScreen.innerHTML="Game Over  <br> Your final Score is : " +player.score+"<br>Press here to restart the Game.";
         }
        //-----------------------------------------
    function moveenemy(car){
          let enemy=document.querySelectorAll('.enemy');
          enemy.forEach(function(item){
          if(iscollide(car,item)){
            // console.log("Hit the car");
           endGame();
          }
        if(item.y>=750){
          item.y=-350;
          item.style.left=Math.floor(Math.random()*350)+"px";
        }
        
           item.y+=player.speed;
           item.style.top=item.y+"px";
          });
        }
//------------------------------------------        
    function gamePlay(){
        // console.log("Hii i am clicked");
        let road=gameArea.getBoundingClientRect();
        let car=document.querySelector('.car');
        if(player.start){
            moveLines();
            moveenemy(car);


            if(keys.ArrowUp && player.y>(road.top+120)){player.y-=player.speed};
                    if(keys.ArrowDown&& player.y<(road.bottom-90)){player.y+=player.speed};
                    
                    if(keys.ArrowLeft && player.x>0){player.x-=player.speed};
                    if(keys.ArrowRight&& player.x<(road.width-65)){player.x+=player.speed};
                    car.style.top=player.y+"px";
                    car.style.left=player.x+"px";
             
        
        window.requestAnimationFrame(gamePlay);
            player.score++;
    let plScore=player.score-1;
    score.innerHTML= "Score:" +  plScore;
   
    }
    }
//--------------------------------------------
    function start() {
        // gameArea.classList.remove('hide');
        startScreen.classList.add('hide');
         gameArea.innerHTML="";
        player.start=true;
        player.score=0;
     
        window.requestAnimationFrame(gamePlay);

         for(let x=0;x<5;x++){
              let rodeLine=document.createElement('div');
              rodeLine.setAttribute('class','lines');
                
              rodeLine.y=(x*150);
              rodeLine.style.top=rodeLine.y+"px";
              gameArea.appendChild(rodeLine);
              }

         let car = document.createElement('div');
               car.setAttribute('class','car');
        //    car.innerText="car is there ";
            gameArea.appendChild(car);
           player.x=car.offsetLeft;
           player.y=car.offsetTop;
//--------------------------------------


    for(let x=0;x<3;x++){
          let enemyCar=document.createElement('div');
          enemyCar.setAttribute('class','enemy');
            enemyCar.style.backgroundColor= randomColor();
          enemyCar.y=((x+1)*350)*-1;
          enemyCar.style.left=Math.floor(Math.random()*350)+"px";
                 
          enemyCar.style.top=enemyCar.y+"px";
          gameArea.appendChild(enemyCar);
          }
    }
    
 function randomColor(){
       function c(){
         let hax=Math.floor(Math.random()*256).toString(16);
         return ("0"+String(hax)).substr(-2);
       }
       return "#"+c()+c()+c();
    }