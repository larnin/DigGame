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

const coalHeight = grassHeight;
const coalTransitionSize = 5;
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

function generate(map : Sup.TileMap) : void
{
  for(let i = 0 ; i < map.getWidth() ; i++)
    for(let j = 0 ; j < map.getHeight() ; j++)
      map.setTileAt(0, i, j, placeMineralLayer(i, j, map.getWidth(), map.getHeight()));
  
  placeHoles(map);
  placeOres(map);
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
    for(let j = 0 ; j < Math.min(map.getHeight(), holesMaxHeight) ; j++)
    {
      let currentTile = map.getTileAt(0, i, j);
      if(currentTile == dirtID)
      {
        let coalP = probabilitySquared(coalHeight-coalTransitionSize, coalHeight, j, 0, coalProbability);
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

