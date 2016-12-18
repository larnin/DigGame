Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior2 extends Sup.Behavior 
{
  speed = 0.3;
  jump = 0.43;
  map = null;
  maprenderer = null;
  tilemap = null;
  
  awake()
  {
      this.map = Sup.getActor("Map");
      this.maprenderer = this.map.tileMapRenderer;
      this.tilemap =  this.maprenderer.getTileMap();
  }
  
  update() 
  {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    if (Sup.Input.isKeyDown("LEFT")) 
    {
      velocity.x = -this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } 
    else if (Sup.Input.isKeyDown("RIGHT")) 
    {
      velocity.x = this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } 
    else 
      velocity.x = 0;
    
    
    if(this.actor.spriteRenderer.getAnimation() == "Climb"){
      
    }
    else
    {
      if (this.actor.arcadeBody2D.getTouches().bottom) 
      {
        if (Sup.Input.wasKeyJustPressed("UP")) {
          
          let toto = worldToMap(this.actor.getX(),this.actor.getY(),this.map)
          
          if(this.tilemap.getTileAt(0,withoutDecimal(toto.x),withoutDecimal(toto.y)) == 9)
          {
             this.actor.spriteRenderer.setAnimation("Climb");
          }
          
          
          else
          {
            velocity.y = this.jump;
            this.actor.spriteRenderer.setAnimation("Jump");
          }
        } 
        else 
        {
          if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
          else this.actor.spriteRenderer.setAnimation("Run");
        }
      } 
      else 
      {
        if (velocity.y >= 0) 
          this.actor.spriteRenderer.setAnimation("Jump");
        else 
          this.actor.spriteRenderer.setAnimation("Fall");
      }
    }
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior2);
