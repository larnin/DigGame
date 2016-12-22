const airID = 0;
const dirtID = 1;
const stoneID = 2;
const hardStoneID = 3;
const coalID = 4;
const ironID = 5;
const silverID = 6;
const goldID = 7;
const diamondID = 8;
const ladderID = 9;
const solidAirID = 10;
const chestID = 11;
const openChestID = 12;
const shopID = 13;

const dirtDurability = 5;
const stoneDurability = 25;
const coalDurability = 15;
const ironDurability = 30;
const silverDurability = 60;
const goldDurability = 120;
const diamondDurability = 250;

function isCollisionLayer(id : number) : boolean
{
  return id <= 15;
}

function isDirt(id : number) : boolean
{
  if(id == 1 || id == 4 || id == 5)
    return true;
  return false;
}

function isStone(id : number) : boolean
{
  if(id == 2 || (id >= 6 && id <= 8))
    return true;
  return false;
}

function isHardStone(id : number) : boolean
{
  if(id == 3)
    return true;
  return false;
}

function isOre(id : number) : boolean
{
  if(id >= 4 && id <= 8)
    return true;
  return false;
}

function isMineral(id : number) : boolean
{
  return isDirt(id) || isStone(id) || isHardStone(id);
}

function isConnectedToDirt(id : number) : boolean
{
  if(isDirt(id))
    return true;
  return isConnectedToStone(id);
}

function isConnectedToStone(id : number) : boolean
{
  if(isStone(id))
    return true;
  return isConnectedToHardStone(id);
}

function isConnectedToHardStone(id : number) : boolean
{
  return isHardStone(id);
}

function isConnectedTo(fromId : number, toId : number) : boolean
{
  if(fromId == toId)
    return true;
  
  if(isDirt(toId))
    return isConnectedToDirt(fromId);
  if(isStone(toId))
    return isConnectedToStone(fromId);
  if(isHardStone(toId))
    return isConnectedToHardStone(fromId);
  return false;
}

function canHaveDecoration(id : number) : boolean
{
  return id == stoneID || id == dirtID;
}

function isUnbreakable(id : number) : boolean
{
  return isHardStone(id) || id == solidAirID;
}

function isBreakableBlock(id : number) : boolean
{
  return isDirt(id) || isStone(id) || isHardStone(id) || isOre(id) || id == chestID;
}

function blockDifficultyOf(id : number) : number //mining level
{
  if(id == coalID || id == chestID)
    return 1;
  if(id == ironID)
    return 2;
  if(id == silverID)
    return 3;
  if(id == goldID)
    return 4;
  if(id == diamondID)
    return 5;
  if(isDirt(id))
    return 1;
  if(isStone(id))
    return 3;
  return 100;
}

function durabilityOf(id : number)
{
  if(id == coalID)
    return coalDurability;
  if(id == ironID)
    return ironDurability;
  if(id == silverID)
    return silverDurability;
  if(id == goldID)
    return goldDurability;
  if(id == diamondID)
    return diamondDurability;
  if(isDirt(id))
    return dirtDurability;
  if(isStone(id))
    return stoneDurability;
  return 0;
}

function canHaveGrave(id : number) : boolean
{
  if(id == airID || id == ladderID || id == chestID || id == openChestID)
    return true;
  return false;
}