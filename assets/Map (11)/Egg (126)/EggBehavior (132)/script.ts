class EggBehavior extends Sup.Behavior 
{
  dino : Sup.SpriteRenderer = null;
  crack : Sup.Actor = null;
  black : Sup.SpriteRenderer = null;
  victory : Sup.SpriteRenderer = null;
  
  time = 0;
  timeMax = 7;
  timeBeforeRaw = 1;
  timeRaw = 1;
  timeBlackStart = 4;
  timeBlack = 1.5;
  called = false;
  
  crackRotSpeed = 0.05;
  
  awake() 
  {
    this.dino = this.actor.getChild("Dino").spriteRenderer;
    this.crack = this.actor.getChild("Crack");
    this.crack.setVisible(false);
    this.crack.arcadeBody2D.setCustomGravity(0, -0.01);
    
    this.black = this.actor.getChild("Black").spriteRenderer;
    this.victory = this.actor.getChild("Victory").spriteRenderer;
  }

  update() 
  {
    if(!this.called)
      return;
    
    this.time += 1/60;
    this.crack.rotateLocalEulerZ(this.crackRotSpeed);
    if(this.time > this.timeBeforeRaw && this.time < this.timeBeforeRaw + this.timeRaw)
      this.dino.setAnimation("Raw");
    else this.dino.setAnimation("Idle");
    if(this.time > this.timeBlackStart)
    {
      let color = (this.time-this.timeBlackStart)/this.timeBlack;
      if(color > 1) color = 1;
      this.black.setOpacity(color);
      this.victory.setOpacity(color);
    }
    if(this.time > this.timeMax)
      G.sys.gameManager.endGame();
  }
  
  open() : void
  {
    this.crack.setVisible(true);
    this.crack.arcadeBody2D.setMovable(true);
    this.crack.arcadeBody2D.setVelocity(0.05, 0.25);
    this.actor.spriteRenderer.setSprite("Map/Egg/Egg2");
    this.called = true;
    
    this.victory.actor.setParent(G.sys.gameManager.camera.actor);
    this.victory.actor.setLocalPosition(0, 0, -0.5);
    this.black.actor.setParent(G.sys.gameManager.camera.actor);
    this.black.actor.setLocalPosition(0, 0, -1);
  }
}
Sup.registerBehavior(EggBehavior);
