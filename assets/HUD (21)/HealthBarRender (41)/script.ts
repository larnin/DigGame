class HealthBarRenderBehavior extends Sup.Behavior 
{
  lifeBarWidth : number = 32;
  foodBarWidth : number = 20.75;
  
  lifeBarRender : Sup.Actor = null;
  foodBarRender : Sup.Actor = null;
  
  start() 
  {
    this.lifeBarRender = this.actor.getChild("LifeBar");
    this.foodBarRender = this.actor.getChild("FoodBar");
  }

  update() 
  {
    this.renderBars();
  }
  
  renderBars() : void
  {
    let life = G.sys.playerData.life / G.sys.playerData.lifeMax;
    this.lifeBarRender.setLocalScaleX(this.lifeBarWidth*life);
    let food = G.sys.playerData.energy / G.sys.playerData.energyMax;
    this.foodBarRender.setLocalScaleX(this.foodBarWidth*food);
  }
}
Sup.registerBehavior(HealthBarRenderBehavior);
