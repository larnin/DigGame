const coalValue = 5;
const ironValue = 10;
const silverValue = 20;
const goldValue = 40;
const diamondValue = 100;
const ladder1Value = 5;
const ladder20Value = 75;
const lifeValue = 10;
const foodValue = 1;

const maxPickLevel = 5;
const maxFoodLevel = 5;
const maxInventoryLevel = 5;

class ShopBehavior extends Sup.Behavior 
{
  private charSize = 0.5625;
  
  barsSize = 40;
  
  bonesText : Sup.TextRenderer = null;
  
  healButton : Sup.Actor = null;
  foodButton : Sup.Actor = null;
  ladder1Button : Sup.Actor = null;
  ladder20Button : Sup.Actor = null;
  pickLvlButton : Sup.Actor = null;
  foodLvlButton : Sup.Actor = null;
  invLvlButton : Sup.Actor = null;
  exitButton : Sup.Actor = null;
  
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
    this.exitButton = this.actor.getChild("ExitButon");
    
    this.laddersText = this.actor.getChild("Ladders").textRenderer;
    this.pickLvlText = this.actor.getChild("PickLvl").textRenderer;
    this.foodLvlText = this.actor.getChild("FoodLvl").textRenderer;
    this.invLvlText = this.actor.getChild("InvLvl").textRenderer;
    
    this.lifeBar = this.actor.getChild("Life");
    this.foodBar = this.actor.getChild("Food");
    
    this.renderAndSellOres();
    
    this.renderAll();
    G.sys.playerData.canMove = false;
  }

  update() 
  {
    if(Sup.Input.wasMouseButtonJustReleased(0))
    {
      let pos = Sup.Input.getMousePosition();
      let ray = new Sup.Math.Ray();
      ray.setFromCamera(G.sys.gameManager.camera, Sup.Input.getMousePosition());
      let hits = ray.intersectActors([this.healButton, this.foodButton, this.ladder1Button, this.ladder20Button, this.pickLvlButton, this.foodLvlButton, this.invLvlButton, this.exitButton]);
      if(hits.length == 0)
        return;
      if(hits[0].actor == this.healButton)
        this.onHealButtonClick();
      if(hits[0].actor == this.foodButton)
        this.onFoodButtonClick();
      if(hits[0].actor == this.ladder1Button)
        this.onLadder1ButtonClick();
      if(hits[0].actor == this.ladder20Button)
        this.onLadder20ButtonClick();
      if(hits[0].actor == this.pickLvlButton)
        this.onPickLvlButtonClick();
      if(hits[0].actor == this.foodLvlButton)
        this.onFoodLvlButtonClick();
      if(hits[0].actor == this.invLvlButton)
        this.onInvLvlButtonClick();
      if(hits[0].actor == this.exitButton)
        this.onExitButtonClick();
    }
  }
  
  renderAndSellOres() : void
  {
    const bonePos = 3;
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
    total.textRenderer.setText("Total: +" + value);
    let boneOffset = bonePos + this.charSize*(value >= 1 ? this.charSize*Math.floor(Math.log(value)*Math.LOG10E)/2 : 0);
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
    let lifePrice = Math.floor((G.sys.playerData.lifeMax-G.sys.playerData.life)*lifeValue);
    this.renderButtonWithValue(this.healButton, true, lifePrice > 0 && lifePrice <= G.sys.playerData.bones, "Heal", lifePrice);
    let foodPrice = Math.floor((G.sys.playerData.energyMax-G.sys.playerData.energy)*foodValue);
    this.renderButtonWithValue(this.foodButton, true, foodPrice > 0 && foodPrice <= G.sys.playerData.bones, "Food", foodPrice);
    
    this.laddersText.setText(G.sys.playerData.ladders);
    this.renderButtonWithValue(this.ladder1Button, false, G.sys.playerData.bones >= ladder1Value , "+1", ladder1Value);
    this.renderButtonWithValue(this.ladder20Button, false, G.sys.playerData.bones >= ladder20Value, "+20", ladder20Value);
    
    if(G.sys.playerData.miningLvl >= maxPickLevel)
      this.renderButton(this.pickLvlButton, true, false, "Max");
    else
    {
      let pickPrice = pickLevelPrice(G.sys.playerData.miningLvl+1);
      this.renderButtonWithValue(this.pickLvlButton, true, G.sys.playerData.bones >= pickPrice, "Up", pickPrice);
    }
    this.pickLvlText.setText("Level " + G.sys.playerData.miningLvl);
    
    if(G.sys.playerData.energyLvl >= maxFoodLevel)
      this.renderButton(this.foodLvlButton, true, false, "Max");
    else
    {
      let foodPrice = foodLevelPrice(G.sys.playerData.energyLvl+1);
      this.renderButtonWithValue(this.foodLvlButton, true, G.sys.playerData.bones >= foodPrice, "Up", foodPrice);
    }
    this.foodLvlText.setText("Level " + G.sys.playerData.energyLvl);
    
    if(G.sys.playerData.inventoryLvl >= maxInventoryLevel)
      this.renderButton(this.invLvlButton, true, false, "Max");
    else
    {
      let invPrice = invLevelPrice(G.sys.playerData.inventoryLvl+1);
      this.renderButtonWithValue(this.invLvlButton, true, G.sys.playerData.bones >= invPrice, "Up", invPrice);
    }
    this.invLvlText.setText("Level "  + G.sys.playerData.inventoryLvl);
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
    
    const boneOffset = 0.3 + (value >= 1 ? this.charSize*Math.floor(Math.log(value)*Math.LOG10E)/2 : 0);
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
  
  onHealButtonClick() : void
  {
    let lifePrice = Math.floor((G.sys.playerData.lifeMax-G.sys.playerData.life)*lifeValue);
    if(lifePrice < 0 || lifePrice > G.sys.playerData.bones)
      return;
    G.sys.playerData.bones -= lifePrice;
    G.sys.playerData.life = G.sys.playerData.lifeMax;
    this.renderAll();
  }
  
  onFoodButtonClick() : void
  {
    let foodPrice = Math.floor((G.sys.playerData.energyMax-G.sys.playerData.energy)*foodValue);
    if(foodPrice < 0 || foodPrice > G.sys.playerData.bones)
      return;
    G.sys.playerData.bones -= foodPrice;
    G.sys.playerData.energy = G.sys.playerData.energyMax;
    this.renderAll();
  }
  
  onLadder1ButtonClick() : void
  {
    if(ladder1Value > G.sys.playerData.bones)
      return;
    G.sys.playerData.bones -= ladder1Value;
    G.sys.playerData.ladders ++;
    this.renderAll();
  }
  
  onLadder20ButtonClick() : void
  {
    if(ladder20Value > G.sys.playerData.bones)
      return;
    G.sys.playerData.bones -= ladder20Value;
    G.sys.playerData.ladders += 20;
    this.renderAll();
  }
  
  onPickLvlButtonClick() : void
  {
    if(G.sys.playerData.miningLvl >= maxPickLevel)
      return;
    
    let pickPrice = pickLevelPrice(G.sys.playerData.miningLvl+1);
    if(pickPrice > G.sys.playerData.bones)
      return;
    G.sys.playerData.bones -= pickPrice;
    G.sys.playerData.miningLvl++;
    G.sys.playerData.miningSpeed = pickSpeed(G.sys.playerData.miningLvl);
    this.renderAll();
  }
  
  onFoodLvlButtonClick() : void
  {
    if(G.sys.playerData.energyLvl >= maxFoodLevel)
      return;
    
    let foodPrice = foodLevelPrice(G.sys.playerData.energyLvl+1);
    if(foodPrice > G.sys.playerData.bones)
      return;
    G.sys.playerData.bones -= foodPrice;
    G.sys.playerData.energyLvl++;
    G.sys.playerData.energyMax = foodSize(G.sys.playerData.energyLvl);
    this.renderAll();
  }
  
  onInvLvlButtonClick() : void
  {
    if(G.sys.playerData.inventoryLvl >= maxInventoryLevel)
      return;
    
    let invPrice = invLevelPrice(G.sys.playerData.inventoryLvl+1);
    if(invPrice > G.sys.playerData.bones)
      return;
    G.sys.playerData.bones -= invPrice;
    G.sys.playerData.inventoryLvl++;
    G.sys.playerData.inventorySize = inventorySize(G.sys.playerData.inventoryLvl);
    this.renderAll();
  }
  
  onExitButtonClick() : void
  {
    G.sys.playerData.canMove = true;
    this.actor.destroy();
  }
}
Sup.registerBehavior(ShopBehavior);

function pickSpeed(level : number) : number
{
  return 0.1*Math.sqrt(level);
}

function foodSize(level : number) : number
{
  return level*20;
}

function inventorySize(level : number) : number
{
  return level*5;
}

function pickLevelPrice(level : number) : number
{
  switch(level)
  {
    case 2 : return 100;
    case 3 : return 400;
    case 4 : return 1000;
    case 5 : return 2500;
    default : return -1;
  }
}

function foodLevelPrice(level : number) : number
{
  switch(level)
  {
    case 2 : return 100;
    case 3 : return 400;
    case 4 : return 1000;
    case 5 : return 2500;
    default : return -1;
  }
}

function invLevelPrice(level : number) : number
{
  switch(level)
  {
    case 2 : return 100;
    case 3 : return 400;
    case 4 : return 1000;
    case 5 : return 2500;
    default : return -1;
  }
}

