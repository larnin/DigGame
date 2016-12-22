Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior2 extends Sup.Behavior 
{
  speed = 0.2;
  jump = 0.43;
  map = null;
  maprenderer = null;
  tilemap = null;
  camera = null;
  
  attacktarget = null;
  attackvalue = 0;
  moving = true;
  
  awake()
  {
      this.map = Sup.getActor("Map");
      this.maprenderer = this.map.tileMapRenderer;
      this.tilemap =  this.maprenderer.getTileMap();
      this.camera = Sup.getActor("Camera");
      G.sys.playerData.miningSpeed = 0.1;
      G.sys.playerData.miningLvl = 1;
  }
  
  update() 
  {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    let velocity = this.actor.arcadeBody2D.getVelocity();
    this.rightLeftMovement(velocity);
    if(this.actor.spriteRenderer.getAnimation() == "Attack")
      {
        this.attackvalue += G.sys.playerData.miningSpeed;
        if(this.attackvalue > durabilityOf(this.tilemap.getTileAt(0,Math.floor(this.attacktarget.x),Math.floor(this.attacktarget.y))))
        {
          breakBlock(this.tilemap,Math.floor(this.attacktarget.x),Math.floor(this.attacktarget.y));
          this.actor.spriteRenderer.setAnimation("Idle");
          this.attacktarget = null;
          this.attackvalue = 0;
        }
      }
    if(this.actor.spriteRenderer.getAnimation() == "Climb")
    {
      this.ladderMovement(velocity);
    }
    else
    {
      this.normalMovement(velocity);
    }
    this.mouseControl();
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
  
  rightLeftMovement(velocity)
  {
    if (Sup.Input.isKeyDown("LEFT")) 
    {
      this.moving = true;
      velocity.x = -this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } 
    else if (Sup.Input.isKeyDown("RIGHT")) 
    {
      this.moving = true;
      velocity.x = this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } 
    else 
      velocity.x = 0;
  }
  
  ladderMovement(velocity)
  {
      this.moving = true;
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
      let playerPosition = worldToMap(this.actor.getX(),this.actor.getY(),this.map);
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
          this.moving = true;
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
          if (velocity.x == 0)
            {
            if(this.moving)
              this.actor.spriteRenderer.setAnimation("Idle");
            }
          else 
            this.actor.spriteRenderer.setAnimation("Run");
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
  
  mouseControl()
  {
    let playerPosition = worldToMap(this.actor.getX(),this.actor.getY(),this.map);  
    let mousePosition = Sup.Input.getMousePosition();
    let pixelMousePositionX = mousePosition.x * Sup.Input.getScreenSize().x / 2;
    let pixelMousePositionY = mousePosition.y * Sup.Input.getScreenSize().y / 2;
    let pixelPerUnit = this.tilemap.getPixelsPerUnit();
    let mousePositionInTilemap = worldToMap((pixelMousePositionX/pixelPerUnit)+this.camera.getPosition().x,(pixelMousePositionY/pixelPerUnit)+this.camera.getPosition().y,this.map);

    if(this.mouseNearlyPlayer(playerPosition,mousePositionInTilemap))
      {
        if(Sup.Input.wasMouseButtonJustPressed(2))
        {
          if(this.canPlaceLadder(mousePositionInTilemap))
            {
              placeLadder(this.tilemap,Math.floor(mousePositionInTilemap.x),Math.floor(mousePositionInTilemap.y));
              G.sys.playerData.ladders--;
              G.sys.playerData.energy--;
            }
        }
        if(Sup.Input.wasMouseButtonJustPressed(0))
          {
            if(this.canMining(mousePositionInTilemap))
              {
                if(this.actor.spriteRenderer.getAnimation() == "Attack")
                  {
                    if(mousePositionInTilemap != this.attacktarget)
                      {
                        this.attacktarget = mousePositionInTilemap;
                        this.attackvalue = 0;
                      }
                  }
                else
                {
                  this.moving = false;
                  this.actor.spriteRenderer.setAnimation("Attack");
                  this.attacktarget = mousePositionInTilemap; 
                  this.attackvalue = 0;
                }
              }
          }
      }
  }
  
  mouseNearlyPlayer(playerPosition,mousePosition) : boolean
  {
    let result = false;
    if(this.testProxymity(Math.floor(playerPosition.x),Math.floor(mousePosition.x)))
      {
        if(this.testProxymity(Math.floor(playerPosition.y),Math.floor(mousePosition.y)))
          {
            result = true;
          }
      }
    return result;
  }
  
  testProxymity(elementA : number, elementB : number) : boolean
  {
    if(elementA + 1 == elementB || elementB + 1 == elementA || elementB == elementA)
      return true;
    else
      return false;
  }
  
  canPlaceLadder(mousePosition) : boolean
  {
    let result = false;
    if(G.sys.playerData.ladders > 0)
      if(this.tilemap.getTileAt(0,Math.floor(mousePosition.x),Math.floor(mousePosition.y)) == airID)
        if(this.actor.spriteRenderer.getAnimation() != "Jump" && this.actor.spriteRenderer.getAnimation() != "Fall")
          result = true;
    return result;
  }
  
  canMining(mousePosition) : boolean
  {
    let result = false;
    if(this.actor.spriteRenderer.getAnimation() == "Idle" || this.actor.spriteRenderer.getAnimation() == "Attack")
      {
        if(G.sys.playerData.miningLvl >= blockDifficultyOf(this.tilemap.getTileAt(0,Math.floor(mousePosition.x),Math.floor(mousePosition.y))))
          {
            result = true; 
          }
      }
    return result;
  }
}
Sup.registerBehavior(PlayerBehavior2);
