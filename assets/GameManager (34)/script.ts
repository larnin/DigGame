class GameManagerBehavior extends Sup.Behavior 
{
  camera : Sup.Camera = null;
  player : PlayerBehavior2 = null;
  
  awake() 
  {
    let cam = Sup.getActor("Camera");
    if(cam == null)
      Sup.log("Can't found the camera !");
    else this.camera = cam.camera;
    
    let player = Sup.getActor("Player");
    if(player == null)
      Sup.log("Can't found the player !");
    else this.player = player.getBehavior(PlayerBehavior2);
    
    G.sys.gameManager = this;
  }
  
  onDestroy()
  {
    G.sys.gameManager = null;
  }
}
Sup.registerBehavior(GameManagerBehavior);
