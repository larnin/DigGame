class CameraBehavior extends Sup.Behavior 
{
  moveSpeed : number = 0.1;
  
  update() 
  {
    let playerPos = new Sup.Math.Vector2(G.sys.gameManager.player.actor.getPosition().x, G.sys.gameManager.player.actor.getPosition().y);
    let camPos = new Sup.Math.Vector2(this.actor.getPosition().x, this.actor.getPosition().y);
    let dist = playerPos; 
    dist.subtract(camPos);
    dist.multiplyScalar(this.moveSpeed);
    this.actor.move(dist);
    Sup.log(this.actor.getPosition());
  }
}
Sup.registerBehavior(CameraBehavior);
