class CloudsMoverMenuBehavior extends Sup.Behavior 
{
  size : number = 25;
  moveSpeed :number = 0;
  originalX : number;
  
  start() 
  {
    this.originalX = this.actor.getLocalX();
  }

  update() 
  {
    //let posX = this.originalX+G.sys.gameManager.camera.actor.getX()-this.originalCameraPosX;
    
    let nextPos = this.actor.getLocalX() + this.moveSpeed;
    if(Math.abs(nextPos-this.originalX) > this.size)
    {
      if(nextPos > this.originalX)
        nextPos -= this.size;
      else nextPos += this.size;
    }
    this.actor.setLocalX(nextPos);
  }
}
Sup.registerBehavior(CloudsMoverMenuBehavior);
