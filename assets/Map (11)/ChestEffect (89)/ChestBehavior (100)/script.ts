const chestBoneProbability = 0.3;
const chestLadderProbability = 0.3;
const chestFoodProbability = 0.2;
const chestOreProbability = 0.2;

const chestBoneMin = 10;
const chestBoneMax = 100;
const chestLadderMin = 2;
const chestLadderMax = 20;
const chestFoodMin = 10;
const chestFoodMax = 100;
const chestOreMin = 1;
const chestOreMax = 3;
const chestCoalProbability = 0.4;
const chestIronProbability = 0.27;
const chestSilverProbability = 0.17;
const chestGoldProbability = 0.11;
const chestDiamondProbability = 0.05;

class ChestBehavior extends Sup.Behavior 
{
  time : number = 5;
  
  awake() 
  {
    this.createOneTrasure(this.actor.getChild("1"), this.actor.getChild("1Text"));
    this.createOneTrasure(this.actor.getChild("2"), this.actor.getChild("2Text"));
  }
  
  createOneTrasure(visual : Sup.Actor, text : Sup.Actor) : void
  {
    let rand = Math.random();
    if(rand < chestBoneProbability)
      this.createBone(visual, text);
    else if(rand < chestBoneProbability+chestLadderProbability)
      this.createLadder(visual, text);
    else if(rand < chestBoneProbability+chestLadderProbability+chestFoodProbability)
      this.createFood(visual, text);
    else this.createOre(visual, text);
  }
  
  createBone(visual : Sup.Actor, text : Sup.Actor) : void
  {
    let value = Math.floor(Math.random()*(chestBoneMax-chestBoneMin+1)+chestBoneMin);
    let offset = (0.5625*(value >= 1 ? Math.floor(Math.log(value)*Math.LOG10E)/2 : 0)+0.3)/2;
    visual.moveX(-offset);
    visual.spriteRenderer.setSprite("Map/ChestEffect/Bone");
    text.moveX(offset);
    text.textRenderer.setText(value);
    G.sys.playerData.bones += value
  }
  
  createLadder(visual : Sup.Actor, text : Sup.Actor) : void
  {
    let value = Math.floor(Math.random()*(chestLadderMax-chestLadderMin+1)+chestLadderMin);
    let offset = (0.5625*(value >= 1 ? Math.floor(Math.log(value)*Math.LOG10E)/2 : 0)+0.5)/2;
    visual.moveX(-offset);
    visual.spriteRenderer.setSprite("Map/ChestEffect/LadderSmall");
    text.moveX(offset);
    text.textRenderer.setText(value);
    G.sys.playerData.ladders += value;
  }
  
  createFood(visual : Sup.Actor, text : Sup.Actor) : void
  {
    let value = Math.floor(Math.random()*(chestFoodMax-chestFoodMin+1)+chestFoodMin);
    visual.spriteRenderer.setSprite("Map/ChestEffect/Food");
    text.setVisible(false);
    G.sys.playerData.energy += value;
    if(G.sys.playerData.energy > G.sys.playerData.energyMax)
      G.sys.playerData.energy = G.sys.playerData.energyMax;
  }
  
  createOre(visual : Sup.Actor, text : Sup.Actor) : void
  {
    let value = Math.floor(Math.random()*(chestOreMax-chestOreMin+1)+chestOreMin);
    let ore = Math.random();
    if(ore < chestCoalProbability)
    {
      visual.spriteRenderer.setSprite("Map/ChestEffect/Coal");
      G.sys.playerData.coal += this.maxOre(value);
    }
    else if(ore < chestCoalProbability + chestIronProbability)
    {
      visual.spriteRenderer.setSprite("Map/ChestEffect/Iron");
      G.sys.playerData.iron += this.maxOre(value);
    }
    else if(ore < chestCoalProbability + chestIronProbability + chestSilverProbability)
    {
      visual.spriteRenderer.setSprite("Map/ChestEffect/Silver");
      G.sys.playerData.silver += this.maxOre(value);
    }
    else if(ore < chestCoalProbability + chestIronProbability + chestSilverProbability + chestGoldProbability)
    {
      visual.spriteRenderer.setSprite("Map/ChestEffect/Gold");
      G.sys.playerData.gold += this.maxOre(value);
    }
    else
    {
      visual.spriteRenderer.setSprite("Map/ChestEffect/Diamond");
      G.sys.playerData.diamond += this.maxOre(value);
    }
    
    if(value <= 1)
      text.setVisible(false);
    text.textRenderer.setText(value);
    text.moveX(0.3);
    text.moveY(-0.3);
  }
  
  maxOre(value : number) : number
  {
    if(G.sys.playerData.oreCount() + value > G.sys.playerData.inventorySize)
      return  G.sys.playerData.inventorySize- G.sys.playerData.oreCount();
    return value;
  }

  update() 
  {
    this.time -= 1/60;
    if(this.time <= 0)
      this.actor.destroy();
  }
}
Sup.registerBehavior(ChestBehavior);
