class CloudsMoverBehavior extends Sup.Behavior 
{
  size : number = 25;
  moveSpeed :number = 0;
  originalX : number;
  originalCameraPosX : number;
  offset : number = 0;
  
  start() 
  {
    this.originalX = this.actor.getLocalX();
    this.originalCameraPosX = G.sys.gameManager.camera.actor.getX();
  }

  update() 
  {
    //let posX = this.originalX+G.sys.gameManager.camera.actor.getX()-this.originalCameraPosX;
    
    this.offset += this.moveSpeed;
    if(Math.abs(this.offset) > this.size)
      this.offset = 0;
    
    let nextPos = this.originalX + this.offset+G.sys.gameManager.camera.actor.getX()-this.originalCameraPosX;
    this.actor.setLocalX(nextPos);
  }
}
Sup.registerBehavior(CloudsMoverBehavior);
