class Skeleton
{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.spdX = 0;
    this.spdY = 0;
    this.angle = 0;
    this.currentAnimation = walk;
    this.currentFrame = 0;
    this.ticks = 0;
    this.flip = false;
    this.dead = false;
    this.superDead = false;
    this.spd = 0.9+stage*0.1+Math.random()*stage*0.1+Math.random()*0.5+skeletonsDeadThisStage/500;
    this.type = "none";
    if(Math.random()<shadowChance)this.type="shadow";
  }

  anime()
  {
    this.ticks++;
    if(!this.dead||this.dead&&this.currentFrame!=9)
    {
      if(this.ticks%this.currentAnimation.interval == 0)this.currentFrame++;
    }
    if(!this.dead)
    {
      if(this.currentFrame == this.currentAnimation.maxFrames)this.currentFrame = 0;
      if(canvas.width/2<this.x+16&&this.newborn<=0)this.flip=true;
      else this.flip=false;
    }
    if(this.dead&&this.currentFrame==9)
    {
      this.currentAnimation.toDrawDead(this.x,this.y,this.currentFrame,this.flip,this.type);
      this.superDead = true;
    }
    else this.currentAnimation.drawFrame(this.x,this.y,this.currentFrame,this.flip,this.type);
  }

  update()
  {
    if(!this.dead)
    {
      this.newborn = 0;
      this.angle = getAngle(this.x+16,this.y+16,canvas.width/2,canvas.height/2);
      if(Math.abs(this.x+16-canvas.width/2)>24)
      {
        this.spdX = Math.cos(this.angle/180*Math.PI)*this.spd;
        if(this.currentAnimation!=walk)
        {
          this.currentAnimation = walk;
          this.currentFrame = 0;
        }
      }
      if(Math.abs(this.y+16-canvas.height/2)>5)
      {
        this.spdY = Math.sin(this.angle/180*Math.PI)*this.spd;
        if(this.currentAnimation!=walk)
        {
          this.currentAnimation = walk;
          this.currentFrame = 0;
        }
      }
      if(this.spdX==0&&this.spdY==0&&this.currentAnimation!=attack)
      {
        this.currentAnimation = attack;
        this.currentFrame = 0;
      }
      if(this.currentAnimation==attack&&(this.currentFrame == 5||this.currentFrame == 7))
      {
        diamondHP--;
        if(diamondHP == 0)
        {
          ellipses.push(new Ellipse(50,canvas.width/2,canvas.height/2,getEllipticalDistanceFromCenter(canvas.width,canvas.height)+30,true));
          diamondHP=-1;
          maxSkeletons = 0;
        }
      }
      this.x+=this.spdX;
      this.y+=this.spdY;
      this.spdX = 0;
      this.spdY = 0;
    }
  }

  die(reason)
  {
    this.dead = "true";
    this.currentAnimation = death;
    this.currentFrame = 0;
    skeletonsAlive--;
    skeletonsDead++;
    skeletonsDeadThisStage++;
    if(stageChange<=0)powerCharge++;
    if(powerCharge > maxPower)powerCharge=maxPower;
    maxSkeletons = 10+stage-1+skeletonsDeadThisStage/50;
    spawnInterval = 60*Math.pow(0.98,(stage-1))*Math.pow(0.997,skeletonsDeadThisStage);
    shadowChance = 0.01*stage+0.0005*skeletonsDead;
    shadowChance = shadowChance>0.3?0.3:shadowChance;
    spawnInterval = spawnInterval<5?5:spawnInterval;
    // console.clear();
    // console.log("max: "+Math.round(maxSkeletons*100)/100);
    // console.log("int: "+Math.round(spawnInterval*100)/100);
    // console.log("sha: "+Math.round(shadowChance*100)/100);
    // console.log("spd-: "+Math.round((1+stage*0.1)*100)/100);
    // console.log("spd+: "+Math.round((1+stage*0.7)*100)/100);
    if(reason!="click" && powerCharge>=maxPower)
    {
      if(this.type != "none")gold+=2;
      else gold+=1;
    }
    else if(reason!="click" || powerCharge>=maxPower)
    {
      if(this.type != "none")gold+=6;
      else gold+=3;
    }
    else
    {
      if(this.type != "none")gold+=10;
      else gold+=5;
    }
    showInfo();
  }
}
