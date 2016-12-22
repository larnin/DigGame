const coalValue = 5;
const ironValue = 10;
const silverValue = 20;
const goldValue = 40;
const diamondValue = 100;
const ladder1Value = 5;
const ladder20Value = 75;
const lifeValue = 10;
const foodValue = 1;

const maxInventoryLevel = 5;
const maxFoodLevel = 5;
const maxPickLevel = 5;

class ShopBehavior extends Sup.Behavior 
{
  private charSize = 0.5625;
  
  barsSize = 40;
  
  bonesText : Sup.TextRenderer = null;
  /*coalText : Sup.TextRenderer = null;
  ironText : Sup.TextRenderer = null;
  silverText : Sup.TextRenderer = null;
  goldText : Sup.TextRenderer = null;
  diamondText : Sup.TextRenderer = null;
  oresValueText : Sup.TextRenderer = null;*/
  
  healButton : Sup.Actor = null;
  foodButton : Sup.Actor = null;
  ladder1Button : Sup.Actor = null;
  ladder20Button : Sup.Actor = null;
  pickLvlButton : Sup.Actor = null;
  foodLvlButton : Sup.Actor = null;
  invLvlButton : Sup.Actor = null;
  
  laddersText : Sup.TextRenderer = null;
  pickLvlText : Sup.TextRenderer = null;
  foodLvlText : Sup.TextRenderer = null;
  invLvlText : Sup.TextRenderer = null;
  
  lifeBar : Sup.Actor = null;
  foodBar : Sup.Actor = null;
  
  awake() 
  {
    this.bonesText = this.actor.getChild("Bones").textRenderer;
    this.healButton = this.actor.getChild("ButtonLife");
    this.foodButton = this.actor.getChild("ButtonFood");
    this.ladder1Button = this.actor.getChild("Button1Ladder");
    this.ladder20Button = this.actor.getChild("Button20Ladders");
    this.pickLvlButton = this.actor.getChild("ButtonPickUp");
    this.foodLvlButton = this.actor.getChild("ButtonFoodUp");
    this.invLvlButton = this.actor.getChild("ButtonInvUp");
    
    this.laddersText = this.actor.getChild("Ladders").textRenderer;
    this.pickLvlText = this.actor.getChild("PickLvl").textRenderer;
    this.foodLvlText = this.actor.getChild("FoodLvl").textRenderer;
    this.invLvlText = this.actor.getChild("InvLvl").textRenderer;
    
    this.lifeBar = this.actor.getChild("Life");
    this.foodBar = this.actor.getChild("Food");
    
    this.renderAndSellOres();
    
    this.renderAll();
  }

  update() 
  {
    
  }
  
  renderAndSellOres() : void
  {
    const bonePos = 2.7;
    let coal = this.actor.getChild("Coal").textRenderer;
    let iron = this.actor.getChild("Iron").textRenderer;
    let silver = this.actor.getChild("Silver").textRenderer;
    let gold = this.actor.getChild("Gold").textRenderer;
    let diamond = this.actor.getChild("Diamond").textRenderer;
    let total = this.actor.getChild("TotalOres");
    
    coal.setText(G.sys.playerData.coal);
    iron.setText(G.sys.playerData.iron);
    silver.setText(G.sys.playerData.silver);
    gold.setText(G.sys.playerData.gold);
    diamond.setText(G.sys.playerData.diamond);
    
    let value = G.sys.playerData.coal*coalValue + G.sys.playerData.iron*ironValue + G.sys.playerData.silver*silverValue + G.sys.playerData.gold*goldValue + G.sys.playerData.diamond*diamondValue;
    total.textRenderer.setText("Total: " + value);
    let boneOffset = bonePos + this.charSize*Math.floor(Math.log(value)*Math.LOG10E)/2;
    total.getChild("Bone").setLocalX(boneOffset);
    
    G.sys.playerData.coal = 0;
    G.sys.playerData.iron = 0;
    G.sys.playerData.silver = 0;
    G.sys.playerData.gold = 0;
    G.sys.playerData.diamond = 0;
    G.sys.playerData.bones += value;
  }
  
  renderAll() : void
  {
    this.bonesText.setText(G.sys.playerData.bones);
    this.renderBars();
    
    this.renderButtonWithValue(this.ladder1Button, false, true, "+1", ladder1Value);
    this.renderButtonWithValue(this.ladder20Button, false, false, "+20", ladder20Value);
    
    this.renderButtonWithValue(this.pickLvlButton, true, false, "Up", 50);
    this.renderButtonWithValue(this.foodLvlButton, true, true, "Up", 5000);
  }
  
  renderBars() : void
  {
    this.lifeBar.setLocalScaleX(G.sys.playerData.life/G.sys.playerData.lifeMax*this.barsSize);
    this.foodBar.setLocalScaleX(G.sys.playerData.energy/G.sys.playerData.energyMax*this.barsSize);
  }
  
  renderButton(button : Sup.Actor, big : Boolean, active : Boolean, text : string) : void
  {
    this.renderBaseButton(button.spriteRenderer, big, active);
    button.getChild("Text").textRenderer.setText(text);
    button.getChild("Bone").setVisible(false);
  }
  
  renderButtonWithValue(button : Sup.Actor, big : Boolean, active : Boolean, text : string, value : number) : void
  {
    this.renderBaseButton(button.spriteRenderer, big, active);
    
    const boneOffset = 0.3 + this.charSize*Math.floor(Math.log(value)*Math.LOG10E)/2;
    button.getChild("Text").textRenderer.setText(text+"\n"+value + " ");
    let bone = button.getChild("Bone");
    bone.setVisible(true);
    bone.setLocalX(boneOffset);
  }
  
  renderBaseButton(button : Sup.SpriteRenderer, big : Boolean, active : Boolean) : void
  {
    let buttonName = "HUD/Shop/";
    if(big)
    {
      if(active)
        buttonName+="ButtonBig";
      else buttonName+= "ButtonBigGrey";
    }
    else
    {
      if(active)
        buttonName += "ButtonSmall";
      else buttonName += "ButtonSmallGrey";
    }
    button.setSprite(buttonName);
  }
  
}
Sup.registerBehavior(ShopBehavior);

function inventorySize(level : number) : number
{
  return level*5;
}

function foodSize(level : number) : number
{
  return level*20;
}

function pickSpeec(level : number) : number
{
  return Math.sqrt(level);
}