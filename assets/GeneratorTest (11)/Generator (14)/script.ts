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

const totalHeight = 100;
const grassHeight = totalHeight-5;
const stoneHeight = totalHeight-30;
const stoneMaxProbability = 0.85;
const hardStoneHeight = totalHeight-70;
const hardStoneMaxProbability = 0.25;
const holesHeight = totalHeight-20;
const holesMaxProbability = 128;
const holesStretch = 3;

const holesCount = 10;
const holesMaxHeight = grassHeight-20;

function generate(map : Sup.TileMap) : void
{
  for(let i = 0 ; i < map.getWidth() ; i++)
    for(let j = 0 ; j < map.getHeight() ; j++)
      map.setTileAt(0, i, j, placeMineralLayer(i, j, map.getWidth(), map.getHeight()));
  
  placeHoles(map);
}

function placeMineralLayer(x : number, y : number, width : number, height : number) : number
{
  if(y > grassHeight)
  {
    if(x === 0 || x === width-1)
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
  let stoneProbability = (stoneHeight-y)/stoneHeight;
  stoneProbability = (-stoneProbability*stoneProbability+2*stoneProbability)*stoneMaxProbability;
  let id = dirtID;
  if(Math.random() <= stoneProbability)
    id = stoneID;
  
  let hardStoneProbability = (hardStoneHeight-y)/hardStoneHeight;
  hardStoneProbability = (-hardStoneProbability*hardStoneProbability+2*hardStoneProbability)*hardStoneMaxProbability;
  if(Math.random() <= hardStoneProbability)
    id = hardStoneID;
  
  return id;
}

function placeHoles(map : Sup.TileMap) : void
{
  /*
  amplitude?: number
  frequency?: number
  max?: number
  min?: number
  octaves?: number
  persistence?: number
  random?: () => number
  */
  let noise = new FastSimplexNoise({frequency: 0.03, max: 255, min: 0, octaves: 4});
  for(let i = 0 ; i < map.getWidth() ; i++)
    for(let j = 0 ; j < Math.min(map.getHeight(), holesMaxHeight) ; j++)
    {
      let holesProbability = (holesMaxHeight-i)/holesMaxHeight;
      holesProbability = (-holesProbability*holesProbability+2*holesProbability)*holesMaxProbability;
      if(noise.scaled([i, j*holesStretch])<holesProbability)
        map.setTileAt(0, i, j, airID); 
    }
}

