class Animation
{
  constructor(sprite,startX,startY,frames,interval)
  {
    this.sprite = sprite;
    this.counter = -1;
    this.frames = [];
    this.interval = interval;
    this.maxFrames = frames;
    for(let i=0;i<=sprite.sprites.length;i++)
    {
      var j=startY;
      if(startX == i && startY == j)
      {
        this.counter = 0;
      }
      if(this.counter >= 0)
      {
        this.frames.push(this.sprite.sprites[i][j]);
        this.counter++;
      }
      if(this.counter == frames)
      {
         this.counter = -1;
         break;
      }
    }
  }

  drawFrame(x,y,w,flip,type)
  {
    this.sprite.drawSprite(x,y,this.frames[w].x,this.frames[w].y,flip,type);
  }

  toDrawDead(x,y,w,flip,type)
  {
    this.sprite.drawDead(x,y,this.frames[w].x,this.frames[w].y,flip,type);
  }
}
