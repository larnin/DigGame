class GameManagerBehavior extends Sup.Behavior 
{
  camera : Sup.Camera = null;
  player : PlayerBehavior2 = null;
  map : Sup.TileMap = null;
  
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
    
    let map = Sup.getActor("Map");
    if(map == null)
      Sup.log("Can't found the tilemap !");
    this.map = map.tileMapRenderer.getTileMap();
    
    G.sys.gameManager = this;
  }
  
  start()
  {
    renderAll(this.map);
    
    G.sys.playerData.coal = 6;
    G.sys.playerData.iron = 5;
    G.sys.playerData.silver = 4;
    G.sys.playerData.gold = 3;
    G.sys.playerData.diamond = 2;
    
    this.openShop();
  }
  
  onDestroy()
  {
    G.sys.gameManager = null;
  }
  
  openShop() : void
  {
    G.sys.playerData.canMove = false;
    let actor = Sup.appendScene("HUD/Shop/ShopPrefab", G.sys.gameManager.camera.actor);
    actor[0].setLocalZ(-1.5);
  }
}
Sup.registerBehavior(GameManagerBehavior);
