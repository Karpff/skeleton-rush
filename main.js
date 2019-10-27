var canvas = document.getElementsByTagName("canvas")[1];
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');
var canvasD = document.getElementsByTagName("canvas")[0];
canvasD.width = innerWidth;
canvasD.height = innerHeight;
var d = canvasD.getContext('2d');

function getDistance(x1,y1,x2,y2)
{
  return Math.sqrt((x1-x2)*(x1-x2)+((y1-y2)*(y1-y2)));
}

function getEllipticalDistance(x1,y1,x2,y2)
{
  return Math.sqrt((x1-x2)*(x1-x2)+((y1-y2)*(y1-y2))*4);
}

function getDistanceFromCenter(x,y)
{
  return getDistance(x,y,canvas.width/2,canvas.height/2);
}

function getEllipticalDistanceFromCenter(x,y)
{
  return getEllipticalDistance(x,y,canvas.width/2,canvas.height/2);
}

function getAngle(x1,y1,x2,y2)
{
  return Math.atan2(y2-y1,x2-x1)*180/Math.PI;
}

function getAngleFromCenter(x,y)
{
  return getAngle(x,y,canvas.width/2,canvas.height/2);
}

//Config
var speed = 1.5;
var spawnInterval = 60; //57
var maxSkeletons = 10; //5

var mouseX = -32+16;
var mouseY = 20+16;
var skeletonsAlive = 0;
var skeletonsDead = 0;
var skeletonsDeadThisStage = 0;
var mouseIn = true;
var controlling;
var gold = 300;
var paused = false;
var nextSkeleton = -300;
var maxPower = 40; //65
var shadowChance = 0.05;

canvas.addEventListener('mousemove',function(e)
{
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseIn = true;
});

canvas.addEventListener('mousedown',function(e)
{
  for(let i=0;i<skeletons.length;i++)
  {
    if(getDistance(e.clientX,e.clientY,skeletons[i].x+16,skeletons[i].y+9)<20&&!skeletons[i].dead)
    {
      skeletons[i].die("click");
      break;
    }
  }
});

canvas.addEventListener('mouseleave',function()
{
  mouseIn = false;
});

document.addEventListener('keyup',function(e)
{
  if(e.keyCode=="17")controlling = false;
});

document.addEventListener('keydown',function(e)
{
  if(e.keyCode=="17")controlling = true;
  else if(e.keyCode=="32"&&powerCharge>=maxPower)
  {
    if(ellipses.length%30==0&&ellipses.length!=0)
    {
      powerCharge=0;
      clearTimeout(timeout);
      stageChange = 350;
      maxPower = 40+5*stage;
      stage++;
      ellipses.push(new Ellipse(50,canvas.width/2,canvas.height/2,getEllipticalDistanceFromCenter(canvas.width,canvas.height)+30,true));
    }
    else ellipses.push(new Ellipse(0,canvas.width/2,canvas.height/2));
  }
  else if(e.keyCode=="27")
  {
    if(paused)paused = false;
    else paused = true;
    c.fillStyle = "rgba(0,0,0,0.8)";
    c.fillRect(0,0,canvas.width,canvas.height);
    let text = "PAUSED";
    c.fillStyle = "rgba(255,0,0,"+0.5+")";
    c.font="bold 40px Verdana";
    c.fillText(text,canvas.width/2-c.measureText(text).width/2,200);
  }
});

document.addEventListener('contextmenu',function(e)
{
  e.preventDefault();
  if(diamondHP>0)
  {
    if(getEllipticalDistanceFromCenter(mouseX,mouseY)>240)
    {
      if(controlling)
      {
        let nope = false;
        let nopeDistance = 130;
        for(let i=0;i<zappers.length;i++)
        {
          if(getEllipticalDistance(mouseX,mouseY,zappers[i].x,zappers[i].y)<nopeDistance)
          {
            nope = zappers[i];
            nopeDistance = getEllipticalDistance(mouseX,mouseY,zappers[i].x,zappers[i].y)
          }
        }
        if(gold>=300&&!nope)
        {
          zappers.push(new Zapper(mouseX,mouseY));
          gold-=300;
        }
        else if(gold>=150&&nope.lvl<2&&nopeDistance<30)
        {
          nope.lvl++;
          nope.maxPower = zapperMaxPowers[nope.lvl];
          nope.range = zapperRanges[nope.lvl];
          gold-=150;
        }
      }
      else
      {
        let nope = false;
        let nopeDistance = 40;
        for(let i=0;i<mines.length;i++)
        {
          if(!mines[i].dead&&getEllipticalDistance(mouseX,mouseY,mines[i].x,mines[i].y)<nopeDistance)
          {
            nope = mines[i];
            nopeDistance = getEllipticalDistance(mouseX,mouseY,mines[i].x,mines[i].y);
          }
        }
        if(gold>=30&&!nope)
        {
          mines.push(new Mine(mouseX,mouseY,0));
          gold-=30;
        }
        else if(gold>=15&&nope.lvl<2&&nopeDistance<20)
        {
          nope.lvl++;
          nope.color = mineColors[nope.lvl];
          nope.tickColor = mineTickColors[nope.lvl];
          nope.activationRadius = mineActivationRadius[nope.lvl];
          nope.boomTimeOut = mineBoomTimeOuts[nope.lvl];
          nope.boomRadius = mineBoomRadius[nope.lvl];
          gold-=15;
        }
      }
    }
    else if(getDistanceFromCenter(mouseX,mouseY+10)<20)
    {
      if(gold>=100)
      {
        let nope = false;
        for(let i=0;i<skeletons.length;i++)
        {
          if(getEllipticalDistanceFromCenter(skeletons[i].x,skeletons[i].y)<240)nope = true;
        }
        if(!nope)
        {
          gold-=100;
          diamondHP+=100;
          if(diamondHP>500)diamondHP = 500;
        }
      }
    }
  }
  showInfo();
  return false;
});

var diamondImg = document.getElementsByTagName("img")[1];
var diamondHP = 500;

var skeletonImg = document.getElementsByTagName("img")[0];
var skeletonSprite = new Sprite(skeletonImg,320,160,32,32);
var idle = new Animation(skeletonSprite,0,0,10,5);
var walk = new Animation(skeletonSprite,0,2,10,4);
var attack = new Animation(skeletonSprite,0,3,10,5);
var death = new Animation(skeletonSprite,0,4,10,5);

var skeletons = [];
var ellipses = [];
var mineEllipses = [];
var mines = [];
var minesLeft = 3;
var timeout;
var powerCharge = 0;
var zappersLeft = 1;
var zappers = [];
var stage = 1;
var stageChange = 400;

function spawn()
{
  if(skeletonsAlive<Math.floor(maxSkeletons))
  {
    let x, y;
    if(Math.random()<0.5)x=-32;
    else x=canvas.width+32;
    skeletons.push(new Skeleton(x,Math.random()*canvas.height*1.25-canvas.height*0.125-16));
    skeletonsAlive++;
  }
}

function showInfo()
{
  document.getElementById("gold").innerHTML = "Gold: "+gold+"$";
}
showInfo();

d.fillStyle="#111111";
d.fillRect(0,0,canvas.width,canvas.height);

function animate()
{
  if(!paused)
  {
    c.clearRect(0,0,canvas.width,canvas.height);
    if(diamondHP>0)c.drawImage(diamondImg,canvas.width/2-16,canvas.height/2-25,32,32);
    c.beginPath();
    c.ellipse(canvas.width/2,canvas.height/2,240,120,0,0,Math.PI*2);
    c.lineWidth=1;
    c.strokeStyle = "rgba(255,255,255,0.1)";
    c.stroke();
    if(nextSkeleton>spawnInterval)
    {
      spawn();
      nextSkeleton=0;
    }
    nextSkeleton++;
    for(let i=0;i<mines.length;i++)
    {
      mines[i].update();
    }
    for(let i=0;i<zappers.length;i++)
    {
      zappers[i].update();
    }
    for(let i=0;i<skeletons.length;i++)
    {
      if(skeletons[i].superDead)skeletons.splice(i,1);
    }
    for(let i=0;i<skeletons.length;i++)
    {
      skeletons[i].anime();
      skeletons[i].update();
    }
    for(let i=0;i<mineEllipses.length;i++)
    {
      if(mineEllipses[i].dead)mineEllipses.splice(i,1);
      else mineEllipses[i].update();
    }
    for(let i=0;i<ellipses.length;i++)
    {
      ellipses[i].update();
    }
    if(stageChange>0)
    {
      let opacity = 0;
      if(stageChange>150)opacity = 0;
      else if(stageChange>100)opacity = 50-(stageChange-100);
      else if(stageChange>50)opacity = 50;
      else opacity = stageChange;
      let text = "Stage "+stage;
      c.fillStyle = "rgba(255,255,255,"+opacity/50+")";
      c.font="40px Verdana";
      c.fillText(text,canvas.width/2-c.measureText(text).width/2,canvas.height/2-150);
      stageChange--;
      if(stageChange==0)skeletonsDeadThisStage = 0;
    }
    if(diamondHP>0)
    {
      c.fillStyle = "rgba(255,0,0,0.6)";
      c.fillRect(canvas.width/2-40,canvas.height/2+10,80,5);
      c.fillStyle = "rgba(0,255,255,0.8)";
      c.fillRect(canvas.width/2-40,canvas.height/2+10,80/500*diamondHP,5);
    }
    else
    {
      maxSkeletons=0
      let text = "Game Over!"
      let subtext = "You've got to "+stage+" stage and killed "+skeletonsDead+" skeletons!";
      c.fillStyle = "white";
      c.font="50px Verdana";
      c.fillText(text,canvas.width/2-c.measureText(text).width/2,canvas.height/2-150);
      c.font="30px Verdana";
      c.fillText(subtext,canvas.width/2-c.measureText(subtext).width/2,canvas.height/2-100);
    }
    document.getElementById("powerInner").style.width = innerWidth/maxPower*powerCharge+"px";
    if(powerCharge>=maxPower)document.getElementById("powerInner").innerHTML = "Your special power is ready! Mash space to activate it!";
    else document.getElementById("powerInner").innerHTML = "";
  }
  window.requestAnimationFrame(animate);
}
animate();
