class PlayerData
{
  canMove = true;

  bones = 0;
  ladders = 0;
  lifeMax = 10;
  life = this.lifeMax;
  energyMax = 100;
  energy = this.energyMax;

  energyLvl = 0;
  miningLvl = 0;
  miningSpeed = 0;
  inventoryLvl = 0;
  inventorySize = 5;
  coal = 0;
  iron = 0;
  silver = 0;
  gold = 0;
  diamond = 0;

  oreCount() : number
  {
    return this.coal + this.iron + this.silver + this.gold + this.diamond;
  }
}

