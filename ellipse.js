class Ellipse
{
  constructor(level,x=0,y=0,radius=0,superr=false)
  {
    if(level)
    {
      this.explosive = true;
      this.superr = superr;
      this.lvl = level;
      this.opacity = 0.5;
      this.size = 0;
      this.radius = radius;
      this.x = x;
      this.y = y;
    }
    else
    {
      this.opacity = 0;
      this.size = 300;
      this.x = x;
      this.y = y;
    }
  }

  update()
  {
    if(!this.dead)
    {
      if(this.explosive)
      {
        if(this.superr)
        {
          this.opacity-=0.01;
          this.size+=30;
        }
        else
        {
          this.opacity-=0.5/16;
          this.size+=this.radius/15;
        }
        for(let i=0;i<skeletons.length;i++)
        {
          if(getDistance(skeletons[i].x,skeletons[i].y,this.x,this.y)<this.size&&!skeletons[i].dead)skeletons[i].die();
        }
        if(this.size>this.radius)
        {
          this.dead = true;
          if(this.superr)
          {
            //skeletonsDead=0;
            //spawnInterval=10000;
            //maxSkeletons=1;
            //setTimeout(spawn,3000);
            nextSkeleton = -300; //should do the trick
            //timeout = setTimeout(spawnInt,spawnInterval);
          }
        }
        this.draw();
      }
      else
      {
        if(this.size>0)
        {
          this.opacity+=0.01;
          this.size-=5;
          this.draw();
        }
        else this.dead=true;
      }
    }
  }

  draw()
  {
    if(this.explosive)
    {
      c.lineWidth = this.lvl;
      c.beginPath();
      c.ellipse(this.x,this.y,this.size,this.size*0.5,0,0,Math.PI*2);
      c.fillStyle="rgba(255,255,255,"+this.opacity+")";
      c.fill();
      c.strokeStyle="rgba(255,255,255,"+this.opacity+")";
      c.stroke();
      if(this.superr)
      {
        d.fillStyle = "rgba(0,0,0,0.005)";
        d.strokeStyle = "rgba(0,0,0,0.04)";
        d.lineWidth = this.lvl;
        d.ellipse(this.x,this.y,this.size,this.size*0.5,0,0,Math.PI*2);
        d.stroke();
        d.fill();
      }
    }
    else
    {
      c.lineWidth = 1;
      c.beginPath();
      c.ellipse(this.x,this.y,this.size,this.size*0.5,0,0,Math.PI*2);
      c.strokeStyle="rgba(255,255,255,"+this.opacity+")";
      c.stroke();
    }
  }
}
