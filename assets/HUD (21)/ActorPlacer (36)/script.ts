//allow to fix the actor on the edge of the camera even if the scene is resized

enum HAlign { LEFT=0, RIGHT=1, CENTER=2 };
enum VAlign { TOP=0, BOTTOM=1, CENTER=2 };

class ActorPlacerBehavior extends Sup.Behavior 
{
  hAlign : number = HAlign.CENTER;
  vAlign : number = VAlign.CENTER;
  xOffset : number = 0;
  yOffset : number = 0;
  
  awake() 
  {
    
  }

  update()
  {
    let camSize = G.sys.gameManager.camera.getOrthographicScale();
    let camRatio = G.sys.gameManager.camera.getWidthToHeightRatio();
    let sizeX = camSize*camRatio;
    
    let posX = this.xOffset;
    let posY = this.yOffset;
    if(this.hAlign == HAlign.LEFT)
      posX -= sizeX/2;
    if(this.hAlign == HAlign.RIGHT)
      posX += sizeX/2;
    if(this.vAlign == VAlign.TOP)
      posY += camSize/2;
    if(this.vAlign == VAlign.BOTTOM)
      posY -= camSize/2;
    this.actor.setLocalPosition({x:posX, y:posY, z:this.actor.getLocalZ()});
  }
}
Sup.registerBehavior(ActorPlacerBehavior);
