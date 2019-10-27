var zapperMaxPowers = [345,300,255];
var zapperRanges = [130,150,170];

class Zapper
{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.power = 0;
    this.lvl = 0;
    this.maxPower = zapperMaxPowers[this.lvl];
    this.range = zapperRanges[this.lvl];
    this.target = 0;
    this.lazor = 0;
  }

  update()
  {
    if(this.power<this.maxPower)this.power++
    if(this.power>=this.maxPower)
    {
      let closestDistance = this.range;
      var closest = 0;
      for(let i=0;i<skeletons.length;i++)
      {
        if(getEllipticalDistance(this.x,this.y,skeletons[i].x+16,skeletons[i].y+32)<closestDistance&&!skeletons[i].dead&&skeletons[i].type!="shadow")
        {
          closestDistance = getEllipticalDistance(this.x,this.y,skeletons[i].x+16,skeletons[i].y+32);
          closest = skeletons[i];
        }
      }
      if(closest!=0)
      {
        this.power-=this.maxPower;
        this.target=closest;
        this.target.die("zap");
        this.lazor = 50;
      }
    }
    this.draw();
  }

  draw()
  {
    c.beginPath();
    c.ellipse(this.x,this.y,this.range,this.range/2,0,0,Math.PI*2);
    c.lineWidth=0.5;
    c.strokeStyle = "#00FFFF";
    c.stroke();

    c.strokeStyle = "#DDEEFF";
    c.fillStyle = "#DDEEFF";
    if(this.lvl==0)
    {
      c.beginPath();
      c.ellipse(this.x,this.y,8,3,0,0,Math.PI*2);
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y);
      c.lineTo(this.x,this.y-12);
      c.lineWidth = 7;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x,this.y-12);
      c.lineTo(this.x,this.y-20);
      c.lineWidth = 5;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x,this.y-20);
      c.lineTo(this.x,this.y-26);
      c.lineWidth = 3;
      c.stroke();

      for(let i=1;i<=this.power/(this.maxPower/3)+1;i++)
      {
        c.beginPath();
        c.arc(this.x,this.y-26,i*4,0,Math.PI*2);
        c.fillStyle = "rgba(0,255,255,"+0.05+")";
        c.fill();
      }
      c.beginPath();
      c.arc(this.x,this.y-26,3,0,Math.PI*2);
      c.fillStyle = "#DDEEFF";
      c.fill();
      c.beginPath();
      c.arc(this.x,this.y-26,2,0,Math.PI*2);
      if(this.lazor>0)c.fillStyle = `rgb(0,${this.lazor*4+55},${this.lazor*51})`;
      else if(this.power>=this.maxPower)c.fillStyle = "#00FF00";
      else c.fillStyle = "#006600";
      c.fill();

      if(this.target!=0&&this.lazor>0)
      {
        this.lazor--;
        c.beginPath();
        c.moveTo(this.x,this.y-26);
        c.lineTo(this.target.x+16,this.target.y+10);
        c.strokeStyle="rgba(0,255,255,"+this.lazor/50+")";
        c.stroke();
      }
    }
    else if(this.lvl==1)
    {
      c.beginPath();
      c.ellipse(this.x,this.y,8,3,0,0,Math.PI*2);
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y);
      c.lineTo(this.x,this.y-16);
      c.lineWidth = 8;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x,this.y-16);
      c.lineTo(this.x,this.y-28);
      c.lineWidth = 6;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x,this.y-28);
      c.lineTo(this.x,this.y-36);
      c.lineWidth = 4;
      c.stroke();

      for(let i=1;i<=this.power/(this.maxPower/3)+1;i++)
      {
        c.beginPath();
        c.arc(this.x,this.y-36,i*4,0,Math.PI*2);
        c.fillStyle = "rgba(0,255,255,"+0.05+")";
        c.fill();
      }
      c.beginPath();
      c.arc(this.x,this.y-36,3,0,Math.PI*2);
      c.fillStyle = "#DDEEFF";
      c.fill();
      c.beginPath();
      c.arc(this.x,this.y-36,2,0,Math.PI*2);
      if(this.lazor>0)c.fillStyle = `rgb(0,${this.lazor*4+55},${this.lazor*51})`;
      else if(this.power>=this.maxPower)c.fillStyle = "#00FF00";
      else c.fillStyle = "#006600";
      c.fill();

      if(this.target!=0&&this.lazor>0)
      {
        this.lazor--;
        c.beginPath();
        c.moveTo(this.x,this.y-36);
        c.lineTo(this.target.x+16,this.target.y+10);
        c.strokeStyle="rgba(0,255,255,"+this.lazor/50+")";
        c.stroke();
      }
    }
    else if(this.lvl==2)
    {
      c.beginPath();
      c.ellipse(this.x,this.y,8,3,0,0,Math.PI*2);
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y);
      c.lineTo(this.x,this.y-16);
      c.lineWidth = 9;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x,this.y-16);
      c.lineTo(this.x,this.y-28);
      c.lineWidth = 7;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x,this.y-28);
      c.lineTo(this.x,this.y-36);
      c.lineWidth = 5;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x,this.y-36);
      c.lineTo(this.x,this.y-42);
      c.lineWidth = 3;
      c.stroke();

      for(let i=1;i<=this.power/(this.maxPower/3)+1;i++)
      {
        c.beginPath();
        c.arc(this.x,this.y-42,i*4,0,Math.PI*2);
        c.fillStyle = "rgba(0,255,255,"+0.05+")";
        c.fill();
      }
      c.beginPath();
      c.arc(this.x,this.y-42,3,0,Math.PI*2);
      c.fillStyle = "#DDEEFF";
      c.fill();
      c.beginPath();
      c.arc(this.x,this.y-42,2,0,Math.PI*2);
      if(this.lazor>0)c.fillStyle = `rgb(0,${this.lazor*4+55},${this.lazor*51})`;
      else if(this.power>=this.maxPower)c.fillStyle = "#00FF00";
      else c.fillStyle = "#006600";
      c.fill();

      if(this.target!=0&&this.lazor>0)
      {
        this.lazor--;
        c.beginPath();
        c.moveTo(this.x,this.y-42);
        c.lineTo(this.target.x+16,this.target.y+10);
        c.strokeStyle="rgba(0,255,255,"+this.lazor/50+")";
        c.stroke();
      }
    }

    else if(this.target!=0)this.target=0;
  }
}
