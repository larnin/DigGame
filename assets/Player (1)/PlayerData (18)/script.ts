const MiningCost = 1;
const LadderCost = 1;
const OpenChestCost = 1;
const StepForLoseFood = 50;
const StepLimitCost = 1;


class PlayerData
{
  canMove = true;

  energyLvl = 1;
  miningLvl = 1;
  inventoryLvl = 1;

  bones = 0;
  ladders = 5;
  lifeMax = 100;
  life = this.lifeMax;
  energyMax = foodSize(this.energyLvl);
  energy = this.energyMax;

  miningSpeed = pickSpeed(this.miningLvl);
  inventorySize = inventorySize(this.inventoryLvl);
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

