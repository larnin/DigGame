class MovingBackgroundBehavior extends Sup.Behavior 
{
  originalPosX : number;
  originalPosY : number;
  originalCameraPosX : number;
  originalCameraPosY : number;
  moveX : number = 0;
  moveY : number = 0;
  
  start() 
  {
    this.originalPosX = this.actor.getLocalX();
    this.originalPosY = this.actor.getLocalY();
    this.originalCameraPosX = G.sys.gameManager.camera.actor.getX();
    this.originalCameraPosY = G.sys.gameManager.camera.actor.getY();
  }

  update()
  {
    let posX = this.originalPosX+(G.sys.gameManager.camera.actor.getX()-this.originalCameraPosX)*this.moveX;
    let posY = this.originalPosY+(G.sys.gameManager.camera.actor.getY()-this.originalCameraPosY)*this.moveY;
    this.actor.setLocalX(posX);
    this.actor.setLocalY(posY);
  }
}
Sup.registerBehavior(MovingBackgroundBehavior);
