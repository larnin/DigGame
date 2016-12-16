class CameraBehavior extends Sup.Behavior 
{
  speed = 0.3;
  zoomSpeed = 0.3;
  
  awake() 
  {
    generate(Sup.getActor("Tilemap").tileMapRenderer.getTileMap());
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
