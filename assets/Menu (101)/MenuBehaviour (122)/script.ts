class MenuBehaviour extends Sup.Behavior 
{
  playText : Sup.Actor;
  camera : Sup.Camera;
  
  leftArrow : Sup.Actor;
  rightArrow : Sup.Actor;
  
  player : Sup.SpriteRenderer;
  playerName : Sup.TextRenderer;
  
  shadow : Sup.SpriteRenderer;
  
  timer : number = 0;
  playMinSize = 2.8;
  playMaxSize = 3.2;
  playPeriode = 1;
  playClicked = false;
  playClickedTime = 0;
  playDelayTime = 1.5;
  
  playerMaxID = 7;
  playerID = 0;
  
  arrowMinSize = 1;
  arrowMaxSize = 1.3;
  
  awake() 
  {
    this.camera = Sup.getActor("Camera").camera;
    
    this.playText = Sup.getActor("PlayText");
    this.leftArrow = Sup.getActor("Left");
    this.rightArrow = Sup.getActor("Right");
    
    this.player = Sup.getActor("Player").spriteRenderer;
    this.playerName = Sup.getActor("Name").textRenderer;
    
    this.shadow = Sup.getActor("Shadow").spriteRenderer;
    
    this.updatePlayer();
  }

  update() 
  {
    this.timer += 1/60;
    this.playBump();
    
    if(!this.playClicked)
    {
      if(Sup.Input.wasMouseButtonJustReleased(0))
      {
        let ray = new Sup.Math.Ray();
        ray.setFromCamera(this.camera, Sup.Input.getMousePosition());
        let hits = ray.intersectActors([this.playText, this.leftArrow, this.rightArrow]);
        if(hits.length > 0)
        {
          if(hits[0].actor == this.playText)
            this.onPlayButtonClick();
          else if(hits[0].actor == this.leftArrow)
            this.onArrowButtonClick(true);
          else if(hits[0].actor == this.rightArrow)
            this.onArrowButtonClick(false);
        }
      }
    }
    else
    {
      let currentTime = this.timer-this.playClickedTime;
      if(currentTime > this.playDelayTime)
      {
        this.play();
        return;
      }
      this.shadow.setOpacity(currentTime/this.playDelayTime);
    }
    
  }
  
  playBump() : void
  {
    let size = (Math.sin(this.timer/this.playPeriode)+1)/2*(this.playMaxSize-this.playMinSize)+this.playMinSize;
    this.playText.setLocalScale(size, size, size);
    
    let arrowSize = (Math.sin(this.timer/this.playPeriode)+1)/2*(this.arrowMaxSize-this.arrowMinSize)+this.arrowMinSize;
    this.rightArrow.setLocalScale(-arrowSize, arrowSize, arrowSize);
    this.leftArrow.setLocalScale(arrowSize, arrowSize, arrowSize);
  }
  
  play() : void
  {
    Sup.loadScene("Scene");
  }
  
  onPlayButtonClick() : void
  {
    this.playClicked = true;
    this.playClickedTime = this.timer;
  }
  
  onArrowButtonClick(left : boolean)
  {
    this.playerID += (left ? -1 : 1);
    if(this.playerID < 0)
      this.playerID = this.playerMaxID;
    if(this.playerID > this.playerMaxID)
      this.playerID = 0;
    this.updatePlayer();
  }
  
  updatePlayer() : void
  {
    G.sys.playerData.spriteName = "Player/Sprites/"+this.playerID;
    this.player.setSprite(G.sys.playerData.spriteName);
    this.player.setAnimation("Idle");
    this.playerName.setText(this.getPlayerNameFromId(this.playerID));
  }
  
  getPlayerNameFromId(id : number) : string
  {
    if(id == 0)
      return "Pierre";
    if(id == 1)
      return "Croman";
    if(id == 2)
      return "Blond";
    if(id == 3)
      return "Calimero";
    if(id == 4)
      return "Plouf";
    if(id == 5)
      return "Chouette";
    if(id == 6)
      return "Lion";
    return "Bidule";
  }
}
Sup.registerBehavior(MenuBehaviour);
