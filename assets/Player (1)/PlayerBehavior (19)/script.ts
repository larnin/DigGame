Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior2 extends Sup.Behavior 
{
  speed = 0.2;
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
    this.rightLeftMovement(velocity);
    
    if(this.actor.spriteRenderer.getAnimation() == "Climb")
    {
      this.ladderMovement(velocity);
    }
    else
    {
      this.normalMovement(velocity);
    }
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
  
  rightLeftMovement(velocity)
  {
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
  }
  
  ladderMovement(velocity)
  {
      if (Sup.Input.isKeyDown("UP")) 
      { 
        velocity.y = this.speed;
      }
      else if (Sup.Input.isKeyDown("DOWN"))
      {
          velocity.y = -this.speed; 
      }
      else
      {
        velocity.y = 0;
      }
      if (this.actor.arcadeBody2D.getTouches().bottom)
        {
          Sup.ArcadePhysics2D.setGravity(0, -0.02);
          this.actor.spriteRenderer.setAnimation("Idle");
        }
      let playerPosition = worldToMap(this.actor.getX(),this.actor.getY(),this.map)
      if(this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)) != ladderID)
      {
        this.actor.spriteRenderer.setAnimation("Fall");
        Sup.ArcadePhysics2D.setGravity(0, -0.02);
      }
      if(velocity.y == 0)
        {
          this.actor.spriteRenderer.pauseAnimation();
        }
      else
        {
          this.actor.spriteRenderer.playAnimation();
        }
  }
  
  normalMovement(velocity)
  {
    if (this.actor.arcadeBody2D.getTouches().bottom) 
      {
        if (Sup.Input.wasKeyJustPressed("UP")) {
          let playerPosition = worldToMap(this.actor.getX(),this.actor.getY(),this.map)
          if(this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)) == ladderID)
          {
             this.actor.spriteRenderer.setAnimation("Climb");
             Sup.ArcadePhysics2D.setGravity(0, 0);
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
        let playerPosition = worldToMap(this.actor.getX(),this.actor.getY(),this.map)
        if(this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)) == ladderID && (Sup.Input.isKeyDown("UP") || Sup.Input.isKeyDown("DOWN")))
          {
              this.actor.spriteRenderer.setAnimation("Climb");
              Sup.ArcadePhysics2D.setGravity(0, 0);    
          }
        else
          {
            if (velocity.y >= 0) 
              this.actor.spriteRenderer.setAnimation("Jump");
            else 
              this.actor.spriteRenderer.setAnimation("Fall");      
          }

      }
  }
  
  
}
Sup.registerBehavior(PlayerBehavior2);
