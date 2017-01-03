class GameManagerBehavior extends Sup.Behavior 
{
  camera : Sup.Camera = null;
  player : PlayerBehavior2 = null;
  map : Sup.TileMap = null;
  egg : EggBehavior = null;
  
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
    
    let egg = Sup.getActor("Egg");
    if(egg == null)
      Sup.log("Can't found the egg !");
    this.egg = egg.getBehavior(EggBehavior);
    
    G.sys.gameManager = this;
    
    G.sys.playerData = new PlayerData();
  }
  
  start()
  {
    generate(this.map);
    renderAll(this.map);
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
  
  openChest(x : number, y : number) : void
  {
    let worldX = x*2-40+0.78;
    let worldY = y*2+0.468;
    Sup.log(worldX + " " + worldY);
    let actor = Sup.appendScene("Map/ChestEffect/ChestPrefab");
    actor[0].setPosition(worldX, worldY, -9);
    
  }
  
  hitEgg() : void
  {
    G.sys.playerData.canMove = false;
    this.egg.open();
  }
  
  endGame() : void
  {
    Sup.loadScene("Menu/Menu");
  }
}
Sup.registerBehavior(GameManagerBehavior);
