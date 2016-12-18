class CameraBehavior extends Sup.Behavior 
{
  speed = 0.3;
  zoomSpeed = 0.3;
  
  awake() 
  {
    let tilemap = Sup.getActor("Tilemap").tileMapRenderer.getTileMap();
    generate(tilemap);
    tilemap.setTileAt(0, 10, 10, ladderID);
    tilemap.setTileAt(0, 10, 11, ladderID);
    tilemap.setTileAt(0, 10, 12, ladderID);
    tilemap.setTileAt(0, 12, 10, openChestID);
    tilemap.setTileAt(0, 14, 12, chestID);
    tilemap.setTileAt(0, 15, 12, chestID);
    renderAll(tilemap);
    openChest(tilemap, 15, 12);
    placeGrave(tilemap, 15, 12);
  }

  update() 
  {
    let pos = this.actor.getPosition();
    if (Sup.Input.isKeyDown("LEFT"))
      pos.x -= this.speed;
    if (Sup.Input.isKeyDown("RIGHT"))
      pos.x += this.speed;
    if (Sup.Input.isKeyDown("UP"))
      pos.y += this.speed;
    if (Sup.Input.isKeyDown("DOWN"))
      pos.y -= this.speed;
    this.actor.setPosition(pos);
    
    let scale = this.actor.camera.getOrthographicScale();
    if(Sup.Input.isKeyDown("NUMPAD8"))
      scale += this.zoomSpeed;
    if(Sup.Input.isKeyDown("NUMPAD2"))
      scale -= this.zoomSpeed;
    this.actor.camera.setOrthographicScale(scale);
  }
}
Sup.registerBehavior(CameraBehavior);
