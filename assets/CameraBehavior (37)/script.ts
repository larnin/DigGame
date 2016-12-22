class CameraBehavior extends Sup.Behavior 
{
  moveSpeed : number = 0.1;
  maxWidth : number = 38;
  
  update() 
  {
    let camSize = G.sys.gameManager.camera.getOrthographicScale();
    let camRatio = G.sys.gameManager.camera.getWidthToHeightRatio();
    let sizeX = camSize*camRatio;
    let maxPos = this.maxWidth-sizeX/2;
   
    let playerPos = new Sup.Math.Vector2(G.sys.gameManager.player.actor.getPosition().x, G.sys.gameManager.player.actor.getPosition().y);
    if(playerPos.x < -maxPos)
      playerPos.x = -maxPos;
    if(playerPos.x > maxPos)
      playerPos.x = maxPos;
    if(playerPos.y < camSize/2)
      playerPos.y = camSize/2;
    
    let camPos = new Sup.Math.Vector2(this.actor.getPosition().x, this.actor.getPosition().y);
    let dist = playerPos; 
    dist.subtract(camPos);
    dist.multiplyScalar(this.moveSpeed);
    this.actor.move(dist);
  }
}
Sup.registerBehavior(CameraBehavior);
