Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior2 extends Sup.Behavior 
{
  speed = 0.2;
  jump = 0.43;
  map = null;
  maprenderer = null;
  tilemap = null;
  ray = null;
  
  targetID = null;
  attacktarget = null;
  attackvalue = 0;
  moving = true;
  
  lookingLeft = false;
  
  lastPosition = null;
  stepCount = 0;
  
  positionBeforeFalling = null;
  isFalling = false;

  blockSprite = null;
  
  awake()
  {
      this.map = Sup.getActor("Map");
      this.maprenderer = this.map.tileMapRenderer;
      this.tilemap =  this.maprenderer.getTileMap();
      this.ray = new Sup.Math.Ray();
      this.lastPosition = worldToMap(this.actor.getX(),this.actor.getY(),this.map);
      this.blockSprite = new Sup.Actor("CrackEffect"); 
      new Sup.SpriteRenderer(this.blockSprite,"Player/BlockCrack/allCrack");
      this.blockSprite.spriteRenderer.setAnimation("null");
  }
  
  update() 
  {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    this.updateStepValue();
    if(G.sys.playerData.canMove)
      {
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
  }
  
  updateStepValue()
  {
    let playerPosition = worldToMap(this.actor.getX(),this.actor.getY(),this.map);
    if(playerPosition.x != this.lastPosition.x)
      {
        this.stepCount++;
        this.lastPosition.x = playerPosition.x;
      }
    if(playerPosition.y != this.lastPosition.y)
      {
        this.stepCount++;
        this.lastPosition.y = playerPosition.y;
      }
    if(this.stepCount >= StepForLoseFood)
      {
        this.stepCount = this.stepCount - StepForLoseFood;
        this.reduceFood(StepLimitCost);
      }
  }
  
  attackMode()
  {
    this.attackvalue += G.sys.playerData.miningSpeed;
    let breakPerCent = Math.floor((this.attackvalue / durabilityOf(this.targetID))*10);
    if(breakPerCent == 0)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack0")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack0");
          }
      }
     if(breakPerCent == 1)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack1")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack1");
          }
      }
    if(breakPerCent == 2)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack2")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack2");
          }
      }
    if(breakPerCent == 3)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack3")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack3");
          }
      }
    if(breakPerCent == 4)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack4")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack4");
          }
      }
    if(breakPerCent == 5)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack5")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack5");
          }
      }
    if(breakPerCent == 6)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack6")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack6");
          }
      }
    if(breakPerCent == 7)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack7")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack7");
          }
      }
    if(breakPerCent == 8)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack8")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack8");
          }
      }
    if(breakPerCent == 9)
      {
        if(this.blockSprite.spriteRenderer.getAnimation != "Crack9")
          {
            let mouseWorldPosition = mapToWorld(this.attacktarget.x+0.5,this.attacktarget.y+0.5,this.map);
            this.blockSprite.setPosition(mouseWorldPosition.x,mouseWorldPosition.y,1);
            this.blockSprite.spriteRenderer.setAnimation("Crack9");
          }
      }
    if(breakPerCent == 10)
    {
      if(G.sys.playerData.inventorySize > G.sys.playerData.oreCount())
        {
          if(this.targetID == coalID)
            {
              G.sys.playerData.coal++;
            }
          if(this.targetID == ironID)
            {
              G.sys.playerData.iron++;
            }
          if(this.targetID == goldID)
            {
              G.sys.playerData.gold++;
            }
          if(this.targetID == diamondID)
            {
              G.sys.playerData.diamond++;
            }
        }
      breakBlock(this.tilemap,Math.floor(this.attacktarget.x),Math.floor(this.attacktarget.y));
      this.reduceFood(MiningCost);
      this.actor.spriteRenderer.setAnimation("Idle");
      this.blockSprite.spriteRenderer.setAnimation("null");
      this.attacktarget = null;
      this.attackvalue = 0;
      this.moving = true;
      this.targetID = null;
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
        this.isFalling = true;
        this.actor.spriteRenderer.setAnimation("Fall");
        this.positionBeforeFalling = playerPosition;
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
        let playerPosition = worldToMap(this.actor.getX(),this.actor.getY(),this.map)
        if(this.actor.spriteRenderer.getAnimation() == "Fall")
          {
            this.isFalling = false;
            if(playerPosition.y < this.positionBeforeFalling.y - 2)
              {
                this.reduceLife(Math.floor(this.positionBeforeFalling.y - 2 - playerPosition.y)*FallingMultiplicateMalus);
              }
          }
        if (Sup.Input.wasKeyJustPressed("UP")) {
          this.blockSprite.spriteRenderer.setAnimation("null");
          this.attacktarget = null;
          this.attackvalue = 0;
          this.moving = true;
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
            {
              this.blockSprite.spriteRenderer.setAnimation("null");
              this.attacktarget = null;
              this.attackvalue = 0;
              this.actor.spriteRenderer.setAnimation("Run");
            }
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
              {
                this.actor.spriteRenderer.setAnimation("Fall");
                if(!this.isFalling)
                  {
                    this.positionBeforeFalling = playerPosition;
                    this.isFalling = true;
                  }
              }
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
              this.reduceFood(LadderCost);
            }
        }
        if(Sup.Input.wasMouseButtonJustPressed(0))
          {
            if(this.canMining(mousePosition))
              {
                if(mousePosition.x < playerPosition.x)
                {
                  if(!this.lookingLeft)
                  {
                    this.actor.spriteRenderer.setHorizontalFlip(true);
                    this.lookingLeft = true;
                  }
                }
                if(mousePosition.x > playerPosition.x)
                {
                  if(this.lookingLeft)
                  {
                    this.lookingLeft = false;
                    this.actor.spriteRenderer.setHorizontalFlip(false);
                  }
                }
                if(this.actor.spriteRenderer.getAnimation() == "Attack")
                  {
                    let target = {x:Math.floor(mousePosition.x),y:Math.floor(mousePosition.y)}
                    if(target.x != this.attacktarget.x || target.y != this.attacktarget.y )
                      {
                        this.attacktarget = target;
                        this.attackvalue = 0;
                      }
                  }
                else
                {
                  let targetID = this.tilemap.getTileAt(0,Math.floor(mousePosition.x),Math.floor(mousePosition.y));
                  if(targetID == chestID)
                    {
                      openChest(this.tilemap,Math.floor(mousePosition.x),Math.floor(mousePosition.y));
                      this.reduceFood(OpenChestCost);
                    }
                  else if(targetID == shopID)
                  {
                    G.sys.gameManager.openShop();
                  }
                  else
                  {
                    this.moving = false;
                    this.actor.spriteRenderer.setAnimation("Attack");
                    this.attacktarget = {x:Math.floor(mousePosition.x),y:Math.floor(mousePosition.y)}; 
                    this.attackvalue = 0;  
                    this.targetID = targetID;
                  }
                }
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
            if(Math.floor(playerPosition.x) == Math.floor(mousePosition.x) || Math.floor(playerPosition.y) == Math.floor(mousePosition.y))
              result = true;
            else
            {
              if(mousePosition.x > playerPosition.x)
                {
                  if(mousePosition.y > playerPosition.y)
                    {
                      if(this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)+1) == airID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x)+1,Math.floor(playerPosition.y)) == airID || this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)+1) == ladderID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x)+1,Math.floor(playerPosition.y)) == ladderID )
                        {
                          result = true; 
                        }
                    }
                  else
                  {
                    if(this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)-1) == airID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x)+1,Math.floor(playerPosition.y)) == airID || this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)-1) == ladderID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x)+1,Math.floor(playerPosition.y)) == ladderID )
                        {
                          result = true; 
                        }
                  }
                }
              else
              {
                if(mousePosition.y > playerPosition.y)
                    {
                      if(this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)+1) == airID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x)-1,Math.floor(playerPosition.y)) == airID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)+1) == ladderID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x)-1,Math.floor(playerPosition.y)) == ladderID  )
                        {
                          result = true; 
                        }
                    }
                  else
                  {
                    if(this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)-1) == airID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x)-1,Math.floor(playerPosition.y)) == airID  || this.tilemap.getTileAt(0,Math.floor(playerPosition.x),Math.floor(playerPosition.y)-1) == ladderID ||this.tilemap.getTileAt(0,Math.floor(playerPosition.x)-1,Math.floor(playerPosition.y)) == ladderID)
                        {
                          result = true; 
                        }
                  }
              }
            }
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
          if(mousePosition.y <= grassHeight+1)
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
  
  reduceFood(value : number)
  {
    if(G.sys.playerData.energy - value < 0)
      G.sys.playerData.energy = 0;    
    else
      G.sys.playerData.energy = G.sys.playerData.energy - value;
  }
  
  reduceLife(value : number)
  {
    if(G.sys.playerData.life - value < 0)
      G.sys.playerData.life = 0;    
    else
      G.sys.playerData.life = G.sys.playerData.life - value;
  }
}
Sup.registerBehavior(PlayerBehavior2);
