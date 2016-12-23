Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior2 extends Sup.Behavior 
{
  speed = 0.2;
  jump = 0.43;
  map = null;
  maprenderer = null;
  tilemap = null;
  ray = null;
  
  attacktarget = null;
  attackvalue = 0;
  moving = true;
  
  lookingLeft = true;
  
  awake()
  {
      this.map = Sup.getActor("Map");
      this.maprenderer = this.map.tileMapRenderer;
      this.tilemap =  this.maprenderer.getTileMap();
      this.ray = new Sup.Math.Ray();
  }
  
  update() 
  {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    let velocity = this.actor.arcadeBody2D.getVelocity();
    let animation = this.actor.spriteRenderer.getAnimation();
    this.rightLeftMovement(velocity);
    if(animation == "Attack")
      {
        this.attackMode();
      }
    if(animation == "Climb")
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
  
  attackMode()
  {
    this.attackvalue += G.sys.playerData.miningSpeed;
    if(this.attackvalue > durabilityOf(this.tilemap.getTileAt(0,Math.floor(this.attacktarget.x),Math.floor(this.attacktarget.y))))
    {
      breakBlock(this.tilemap,Math.floor(this.attacktarget.x),Math.floor(this.attacktarget.y));
      this.actor.spriteRenderer.setAnimation("Idle");
      this.attacktarget = null;
      this.attackvalue = 0;
      this.moving = true;
    }
  }
  
  rightLeftMovement(velocity)
  {
    if (Sup.Input.isKeyDown("LEFT")) 
    {
      this.moving = true;
      velocity.x = -this.speed;
      if(!this.lookingLeft)
        {
          this.actor.spriteRenderer.setHorizontalFlip(true);
          this.lookingLeft = true;
        }
    } 
    else if (Sup.Input.isKeyDown("RIGHT")) 
    {
      this.moving = true;
      velocity.x = this.speed;
      if(this.lookingLeft)
        {
          this.lookingLeft = false;
          this.actor.spriteRenderer.setHorizontalFlip(false);
        }
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
    this.ray.setFromCamera(G.sys.gameManager.camera,Sup.Input.getMousePosition());
    let hits = this.ray.intersectActors([ this.map ]);
    for (let hit of hits) {
      let mousePosition = worldToMap(hit.point.x,hit.point.y,this.map);
      if(this.mouseNearlyPlayer(playerPosition,mousePosition))
      {
        if(Sup.Input.wasMouseButtonJustPressed(2))
        {
          if(this.canPlaceLadder(mousePosition))
            {
              placeLadder(this.tilemap,Math.floor(mousePosition.x),Math.floor(mousePosition.y));
              G.sys.playerData.ladders--;
              G.sys.playerData.energy--;
            }
        }
        if(Sup.Input.wasMouseButtonJustPressed(0))
          {
            if(this.canMining(mousePosition))
              {
                if(this.actor.spriteRenderer.getAnimation() == "Attack")
                  {
                    if(mousePosition != this.attacktarget)
                      {
                        this.attacktarget = mousePosition;
                        this.attackvalue = 0;
                      }
                  }
                else
                {
                  this.moving = false;
                  this.actor.spriteRenderer.setAnimation("Attack");
                  this.attacktarget = mousePosition; 
                  this.attackvalue = 0;
                }
              }
          }
      }
    }
    /*if(this.mouseNearlyPlayer(playerPosition,mousePositionInTilemap))
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
      }*/
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
