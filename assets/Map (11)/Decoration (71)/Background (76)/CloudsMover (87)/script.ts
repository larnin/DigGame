class CloudsMoverBehavior extends Sup.Behavior 
{
  size : number = 25;
  moveSpeed :number = 0;
  originalX : number;
  
  awake() 
  {
    this.originalX = this.actor.getLocalX();
  }

  update() 
  {
    let nextPos = this.actor.getLocalX() + this.moveSpeed;
    if(Math.abs(nextPos-this.originalX) > this.size)
    {
      if(nextPos > this.originalX)
        nextPos -= this.size;
      else nextPos += this.size;
    }
    this.actor.setLocalX(nextPos);
  }
}
Sup.registerBehavior(CloudsMoverBehavior);
