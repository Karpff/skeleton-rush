class Sprite
{
  constructor(img,sheetWidth,sheetHeight,spriteWidth,spriteHeight)
  {
    this.img = img;
    this.sprites = [];
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    for(let i=0;i<=sheetWidth;i+=spriteWidth)
    {
      let row = [];
      for(let j=0;j<=sheetHeight;j+=spriteHeight)
      {
        row.push({x:i,y:j});
      }
      this.sprites.push(row);
    }
  }

  drawSprite(x,y,w,h,flip,type)
  {
    c.lineWidth = 1;
    c.strokeStyle = "black";
    if(type=="shadow")c.globalAlpha=0.2;
    if(flip)
    {
      c.beginPath();
      c.moveTo(x+6,y+33);
      c.lineTo(x+24,y+33);
      c.stroke();
      c.save();
      c.translate(x,y)
      c.scale(-1,1);
      c.drawImage(this.img,w,h,this.spriteWidth,this.spriteHeight,-32,0,this.spriteWidth,this.spriteHeight);
      c.restore();
    }
    else
    {
      c.beginPath();
      c.moveTo(x+8,y+33);
      c.lineTo(x+25,y+33);
      c.stroke();
      c.drawImage(this.img,w,h,this.spriteWidth,this.spriteHeight,x,y,this.spriteWidth,this.spriteHeight);
    }
    c.globalAlpha=1;
  }

  drawDead(x,y,w,h,flip,type)
  {
    if(type=="shadow")d.globalAlpha=0.2;
    if(flip)
    {
      d.save();
      d.translate(x,y)
      d.scale(-1,1);
      d.drawImage(this.img,w,h,this.spriteWidth,this.spriteHeight,-32,0,this.spriteWidth,this.spriteHeight);
      d.restore();
    }
    else
    {
      d.drawImage(this.img,w,h,this.spriteWidth,this.spriteHeight,x,y,this.spriteWidth,this.spriteHeight);
    }
    d.globalAlpha=1;
  }
}
