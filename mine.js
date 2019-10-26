var mineColors = ["#880000","#888800","#008888"];
var mineTickColors = ["#FF0000","#FFFF00","#00FFFF"];
var mineActivationRadius = [35,45,55];
var mineBoomTimeOuts = [40,30,20];
var mineBoomRadius = [150,200,250];

class Mine
{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.dead = false;
    this.counter = -1;
    this.lvl = 0;
    this.color = mineColors[this.lvl];
    this.tickColor = mineTickColors[this.lvl];
    this.activationRadius = mineActivationRadius[this.lvl];
    this.boomTimeOut = mineBoomTimeOuts[this.lvl];
    this.boomRadius = mineBoomRadius[this.lvl];
  }

  update()
  {
    if(!this.dead)
    {
      if(this.counter<0)
      {
        for(let i=0;i<skeletons.length;i++)
        {
          if(!skeletons[i].dead&&getEllipticalDistance(skeletons[i].x+16,skeletons[i].y+32,this.x,this.y)<this.activationRadius)
          {
            this.counter = this.boomTimeOut;
          }
        }
      }
      if(this.counter>0)
      {
        this.counter--;
        if(this.counter==0)
        {
          mineEllipses.push(new Ellipse(2,this.x,this.y,this.boomRadius));
          this.dead = true;
          this.counter--;
        }
      }
      this.draw();
    }
  }

  draw()
  {
    c.beginPath();
    c.ellipse(this.x,this.y,this.activationRadius,this.activationRadius/2,0,0,Math.PI*2);
    c.lineWidth=0.5;
    c.strokeStyle = "#DD0000";
    c.stroke();
    c.beginPath();
    c.ellipse(this.x,this.y,8,3.5,0,0,Math.PI*2);
    c.fillStyle = "#BBBBBB";
    c.fill();
    c.beginPath();
    c.ellipse(this.x,this.y-3,5,2.5,0,0,Math.PI*2);
    if((this.counter)%10>5)c.fillStyle = this.tickColor;
    else c.fillStyle = this.color;
    c.fill();
  }
}
