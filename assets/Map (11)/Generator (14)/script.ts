const totalHeight = 100;
const grassHeight = totalHeight-5;
const stoneHeight = totalHeight-30;
const stoneMaxProbability = 0.85;
const hardStoneHeight = totalHeight-70;
const hardStoneMaxProbability = 0.25;
const holesHeightTransition = 40;
const holesMaxProbability = 80;
const holesStretch = 2;
const holesMaxHeight = grassHeight-5;

const coalHeight = grassHeight-1;
const coalTransitionSize = 0;
const coalProbability = 0.05;
const ironHeight = grassHeight-15;
const ironProbability = 0.04;
const silverHeight = grassHeight-30;
const silverProbability = 0.03;
const goldHeight = grassHeight-40;
const goldProbabiliy = 0.025;
const diamondHeight = grassHeight-50;
const diamondProbability = 0.02;
const oreTransitionSize = 20;
const chestNumber = 10;
const chestHeight = grassHeight-10;

const shopY = grassHeight+1;
const shopX = 0.6;

const eggCavernHeight = 3;
const eggCavernWidth = 5;

function generate(map : Sup.TileMap) : void
{
  for(let i = 0 ; i < map.getWidth() ; i++)
    for(let j = 0 ; j < map.getHeight() ; j++)
      map.setTileAt(0, i, j, placeMineralLayer(i, j, map.getWidth(), map.getHeight()));
  
  placeHoles(map);
  placeOres(map);
  
  placeShop(map);
  
  placeChests(map);
  
  placeEgg(map);
}

function placeMineralLayer(x : number, y : number, width : number, height : number) : number
{
  if(y > grassHeight)
  {
    if(x == 0 || x == width-1)
      return solidAirID;
    return airID;
  }
  if(x == 0 || x == width-1)
    return hardStoneID;
  if((x == 1 || x == width-2) && Math.random() < 0.5)
    return hardStoneID;
  if(y == 0)
    return hardStoneID;
  
  if(y >= stoneHeight)
    return dirtID;
  let stoneProbability = probabilitySquared(0, stoneHeight, y, 0, stoneMaxProbability);
  let id = dirtID;
  if(Math.random() <= stoneProbability)
    id = stoneID;
  
  let hardStoneProbability = probabilitySquared(0, hardStoneHeight, y, 0, hardStoneMaxProbability);
  if(Math.random() <= hardStoneProbability)
    id = hardStoneID;
  
  return id;
}

function placeHoles(map : Sup.TileMap) : void
{
  let noise = new FastSimplexNoise({frequency: 0.07, max: 255, min: 0, octaves: 2});
  for(let i = 0 ; i < map.getWidth() ; i++)
    for(let j = 0 ; j < Math.min(map.getHeight(), holesMaxHeight) ; j++)
    {
      let holesProbability = probabilityLinear(holesMaxHeight, holesMaxHeight - holesHeightTransition, j, 0, holesMaxProbability);
      if(noise.scaled([i, j*holesStretch])<holesProbability && !(i == 0 || i == map.getWidth()-1 || j == 0))
        map.setTileAt(0, i, j, airID); 
    }
}

function placeOres(map : Sup.TileMap) : void
{
  for(let i = 0 ; i < map.getWidth() ; i++)
    for(let j = 0 ; j < map.getHeight() ; j++)
    {
      let currentTile = map.getTileAt(0, i, j);
      if(currentTile == dirtID)
      {
        let coalP = (j > coalHeight ? 0 : coalProbability);
        let ironP = probabilitySquared(ironHeight-oreTransitionSize, ironHeight, j, 0, ironProbability);
        let rand = Math.random();
        if(rand < coalP)
          map.setTileAt(0, i, j, coalID);
        else if(rand < coalP+ironP)
          map.setTileAt(0, i, j, ironID);
      }
      else if(currentTile == stoneID)
      {
        let silverP = probabilitySquared(silverHeight-oreTransitionSize, silverHeight, j, 0, silverProbability);
        let goldP = probabilitySquared(goldHeight-oreTransitionSize, goldHeight, j, 0, goldProbabiliy);
        let diamondP = probabilitySquared(diamondHeight-oreTransitionSize, diamondHeight, j, 0, diamondProbability);
        let rand = Math.random();
        if(rand < silverP)
          map.setTileAt(0, i, j, silverID);
        else if(rand < silverP+goldP)
          map.setTileAt(0, i, j, goldID);
        else if(rand < silverP+goldP+diamondP)
          map.setTileAt(0, i, j, diamondID);
      }
    }
}

function placeShop(map : Sup.TileMap) : void
{
  map.setTileAt(0, Math.floor(shopX*map.getWidth()), shopY, shopID);
  map.setTileAt(0, Math.floor(shopX*map.getWidth()), shopY-1, hardStoneID)
}

function placeChests(map : Sup.TileMap) : void
{
  for(let i = 0 ; i < chestNumber ; i++)
  {
    let x = Math.floor(Math.random()*(map.getWidth()-2))+1;
    let y = Math.floor(Math.random()*(chestHeight-1))+1;
    let haveChest = false;
    for(let j = -1 ; j <= 1 ; j++)
      for(let k = -1 ; k <= 2 ; k++)
        {
          if(map.getTileAt(0, x+j, y+k) == chestID)
          {
            haveChest = true;
            break;
          }
        }
    if(haveChest)
    {
      i--;
      continue;
    }
    map.setTileAt(0, x, y, chestID);
    map.setTileAt(0, x, y-1, hardStoneID);
    if(x>0)
    {
      map.setTileAt(0, x-1, y+1, airID);
      map.setTileAt(0, x-1, y, airID);
    }
    map.setTileAt(0, x, y+1, airID);
    if(x<map.getWidth()-1)
    {
      map.setTileAt(0, x+1, y, airID);
      map.setTileAt(0, x+1, y+1, airID);
    }
  }
}

function placeEgg(map : Sup.TileMap) : void
{
  let x = map.getWidth()/2;
  
  for(let i = -eggCavernWidth ; i <= eggCavernWidth ; i++)
    for(let j = 0 ; j <= eggCavernHeight ; j++)
    {
      if(((Math.abs(i)+0.5)/eggCavernWidth*(Math.abs(i)+0.5)/eggCavernWidth)+((j+0.5)/eggCavernHeight*(j+0.5)/eggCavernHeight) > 1)
        continue;
      if(map.getTileAt(0, x+i, j+1) == hardStoneID && map.getTileAt(0, x+i, j+2) == chestID)
        continue;
      map.setTileAt(0, x+i, j+1, airID);
    }
  map.setTileAt(0, x, 1, eggID);
}

function probabilityLinear(minRange : number, maxRange : number, value : number, minProbability : number, maxProbability : number) : number
{
  let normalisedValue = (value - minRange)/(maxRange-minRange);
  if(normalisedValue < 0)
    normalisedValue = 0;
  if(normalisedValue > 1)
    normalisedValue = 1;
  return normalisedValue*maxProbability+(1-normalisedValue*minProbability);
}

function probabilitySquared(minRange : number, maxRange : number, value : number,  minProbability : number, maxProbability : number) : number
{
  let p = probabilityLinear(minRange, maxRange, value, 0, 1);
  return (-p*p+2*p)*(maxProbability-minProbability)+minProbability;
}

