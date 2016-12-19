class OreCountRenderBehavior extends Sup.Behavior 
{
  oldCoal : number = 0;
  coalText : Sup.TextRenderer = null;
  oldIron : number = 0;
  ironText : Sup.TextRenderer = null;
  oldSilver : number = 0;
  silverText : Sup.TextRenderer = null;
  oldGold : number = 0;
  goldText : Sup.TextRenderer = null;
  oldDiamond : number = 0;
  diamondText : Sup.TextRenderer = null;
  
  oldInv : number = 0;
  oldInvSize : number = 0;
  invText : Sup.TextRenderer = null;
  oldBones : number = 0;
  bonesText : Sup.TextRenderer = null;
  oldLadders : number = 0;
  laddersText : Sup.TextRenderer = null;
  
  start()
  {
    this.coalText = this.actor.getChild("CoalText").textRenderer;
    this.ironText = this.actor.getChild("IronText").textRenderer;
    this.silverText = this.actor.getChild("SilverText").textRenderer;
    this.goldText = this.actor.getChild("GoldText").textRenderer;
    this.diamondText = this.actor.getChild("DiamondText").textRenderer;
    this.invText = this.actor.getChild("InvText").textRenderer;
    this.bonesText = this.actor.getChild("BonesText").textRenderer;
    this.laddersText = this.actor.getChild("LaddersText").textRenderer;
    this.renderTexts(true);
  }

  update() 
  {
    this.renderTexts();
  }
  
  renderTexts(force : boolean = false) : void
  {
    if(G.sys.playerData.coal != this.oldCoal || force)
      this.coalText.setText(G.sys.playerData.coal);
    if(G.sys.playerData.iron != this.oldIron || force)
      this.ironText.setText(G.sys.playerData.iron);
    if(G.sys.playerData.silver != this.oldSilver || force)
      this.silverText.setText(G.sys.playerData.silver);
    if(G.sys.playerData.gold != this.oldGold || force)
      this.goldText.setText(G.sys.playerData.gold);
    if(G.sys.playerData.diamond != this.oldDiamond || force)
      this.diamondText.setText(G.sys.playerData.diamond);
    let ores = G.sys.playerData.oreCount();
    if(ores != this.oldInv || G.sys.playerData.inventorySize != this.oldInvSize || force)
      this.invText.setText(ores + "/" + G.sys.playerData.inventorySize);
    if(G.sys.playerData.bones != this.oldBones || force)
      this.bonesText.setText(G.sys.playerData.bones);
    if(G.sys.playerData.ladders != this.oldLadders || force)
      this.laddersText.setText(G.sys.playerData.ladders);
    
    this.oldCoal = G.sys.playerData.coal;
    this.oldIron = G.sys.playerData.iron;
    this.oldSilver = G.sys.playerData.silver;
    this.oldGold = G.sys.playerData.gold;
    this.oldDiamond = G.sys.playerData.diamond;
    this.oldInv = ores;
    this.oldInvSize = G.sys.playerData.inventorySize;
    this.oldBones = G.sys.playerData.bones;
    this.oldLadders = G.sys.playerData.ladders;
  }
}
Sup.registerBehavior(OreCountRenderBehavior);
