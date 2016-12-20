const grassRenderOffset = 16;
const dirtRenderOffset = 32;
const stoneRenderOffset = 80;
const hardStoneRenderOffset = 128;

const oreRenderSize = 3;
const coalRenderOffset = 176;
const ironRenderOffset = 179;
const silverRenderOffset = 182;
const goldRenderOffset = 185;
const diamondRenderOffset = 188;

const decorationRenderStart = 208;
const decorationRenderSize = 9;
const decorationDoubleProbability = 0.5;
const decorationDoubleID = 216;
const decorationDoubleIDExtention = 217;
const decorationDirtProbability = 0.02;
const decorationStoneProbability = 0.1;

const ladderSingleRenderID = 192;
const ladderTopRenderID = 193;
const ladderCenterRenderID = 194;
const ladderBottomRenderID = 195;

const chestRenderID = 198;
const openChestRenderID = 199;

const graveRenderID1 = 196;
const graveRenderID2 = 197;

class NearBlocks
{
  current : number = 0;
  up : number = 0;
  upRight : number = 0;
  right : number = 0;
  downRight : number = 0;
  down : number = 0;
  downLeft : number = 0;
  left : number = 0;
  upLeft : number = 0;
  
  constructor(map : Sup.TileMap, x : number, y : number)
  {
    this.current = map.getTileAt(0, x, y);
    
    if(x == 0)
    {
      this.downLeft = -1;
      this.left = -1;
      this.upLeft = -1;
    }
    if(x == map.getWidth()-1)
    {
      this.downRight = -1;
      this.right = -1;
      this.upRight = -1;
    }
    if(y == 0)
    {
      this.downRight = -1;
      this.down = -1;
      this.downLeft = -1;
    }
    if(y == map.getHeight()-1)
    {
      this.upRight = -1;
      this.up = -1;
      this.left = -1;
    }
    
    if(this.up != -1) this.up = map.getTileAt(0, x, y+1);
    if(this.upRight != -1) this.upRight = map.getTileAt(0, x+1, y+1);
    if(this.right != -1) this.right = map.getTileAt(0, x+1, y);
    if(this.downRight != -1) this.downRight = map.getTileAt(0, x+1, y-1);
    if(this.down != -1) this.down = map.getTileAt(0, x, y-1);
    if(this.downLeft != -1) this.downLeft = map.getTileAt(0, x-1, y-1);
    if(this.left != -1) this.left = map.getTileAt(0, x-1, y);
    if(this.upLeft != -1) this.upLeft = map.getTileAt(0, x-1, y+1);
  }
}

class BlockConnexions
{
  up : boolean = false;
  upRight : boolean = false;
  right : boolean = false;
  downRight : boolean = false;
  down : boolean = false;
  downLeft : boolean = false;
  left : boolean = false;
  upLeft : boolean = false;
  
  constructor(env : NearBlocks)
  {
    this.up = isConnectedTo(env.up, env.current);
    this.upRight = isConnectedTo(env.upRight, env.current);
    this.right = isConnectedTo(env.right, env.current);
    this.downRight = isConnectedTo(env.downRight, env.current);
    this.down = isConnectedTo(env.down, env.current);
    this.downLeft = isConnectedTo(env.downLeft, env.current);
    this.left = isConnectedTo(env.left, env.current);
    this.upLeft = isConnectedTo(env.upLeft, env.current);
  }
  
  renderOffset(fullConnectedRandom : boolean = false) : number
  {
    // full single block
    if(!this.up && !this.down && !this.left && !this.right)
      return 1;
    //connected from only one side
    if(!this.down && !this.left && !this.right)
      return 21;
    if(!this.up && !this.left && !this.right)
      return 5;
    if(!this.up && !this.down && !this.right)
      return 3;
    if(!this.up && !this.down && !this.left)
      return 2;
    //connected from opposite sides
    if(!this.left && !this.right)
      return 20;
    if(!this.up && !this.down)
      return 4;
    //connected 2 sides on corner and the corner
    if(!this.down && !this.left && this.upRight)
      return 22;
    if(!this.up && !this.left && this.downRight)
      return 6;
    if(!this.up &&!this.right && this.downLeft)
      return 7;
    if(!this.down && !this.right && this.upLeft)
      return 23;
    //connected 2 sides on corner but not the corner
    if(!this.down && !this.left)
      return 40;
    if(!this.up && !this.left)
      return 32;
    if(!this.up &&!this.right)
      return 33;
    if(!this.down && !this.right)
      return 41;
    //connected on 3 side and corners
    if(!this.down && this.upLeft && this.upRight)
      return 24;
    if(!this.left && this.upRight && this.downRight)
      return 18;
    if(!this.up && this.downLeft && this.downRight)
      return 8;
    if(!this.right && this.upLeft && this.downLeft)
      return 19;
    //connected on 3 side and 1 corner
    if(!this.down && this.upRight)
      return 44;
    if(!this.left && this.downRight)
      return 37;
    if(!this.up && this.downRight)
      return 38;
    if(!this.right && this.downLeft)
      return 47;
    if(!this.down && this.upLeft)
      return 46;
    if(!this.left && this.upRight)
      return 39;
    if(!this.up && this.downLeft)
      return 36;
    if(!this.right && this.upLeft)
      return 45;
    //connected on 3 side but no corners
    if(!this.down)
      return 42;
    if(!this.left)
      return 35;
    if(!this.up)
      return 34;
    if(!this.right)
      return 43;
    //disconnected on all corners
    if(!this.upLeft && !this.upRight && !this.downLeft && !this.downRight)
      return 17;
    //disconnected on 3 corners
    if(!this.upRight && !this.downLeft && !this.downRight)
      return 29;
    if(!this.upLeft && !this.downLeft && !this.downRight)
      return 13;
    if(!this.upLeft && !this.upRight &&!this.downRight)
      return 30;
    if(!this.upLeft && !this.upRight && !this.downLeft)
      return 14;
    //disconnected on 2 opposite corners
    if(!this.upRight && !this.downLeft)
      return 31;
    if(!this.upLeft && !this.downRight)
      return 15;
    //disconnected on 2 sides corners
    if(!this.upRight && !this.downRight)
      return 11;
    if(!this.upLeft && !this.downLeft)
      return 12;
    if(!this.upLeft && !this.upRight)
      return 28;
    if(!this.downLeft && !this.downRight)
      return 27;
    //disconnected on 1 corner
    if(!this.upRight)
      return 25;
    if(!this.upLeft)
      return 26;
    if(!this.downRight)
      return 9;
    if(!this.downLeft)
      return 10;
    
    if(fullConnectedRandom && Math.random() > 0.5)
      return 16;
    return 0;
  }
}

function renderAll(map : Sup.TileMap) : void
{
  if(map.getLayerCount() != 3)
  {
    Sup.log("The tilemap must have exactly 3 layers !");
    return;
  }
  
  for(let i = 0 ; i < map.getWidth() ; i++)
    for(let j = 0 ; j < map.getHeight() ; j++)
    {
      renderBlock(map, i, j, true);
    }
}

function renderBlock(map : Sup.TileMap, x : number, y : number, overrideRender : boolean = false)
{
  if(overrideRender)
  {
    map.setTileAt(1, x, y, 0);
    map.setTileAt(2, x, y, 0);
  }
  
  let block = new NearBlocks(map, x, y);
  if(isMineral(block.current))
  {
    let id = new BlockConnexions(block).renderOffset(isStone(block.current));
    if(isDirt(block.current))
    {
      if(y == grassHeight)
        id += grassRenderOffset;
      else id += dirtRenderOffset;
    }
    else if(isStone(block.current))
      id += stoneRenderOffset;
    else id += hardStoneRenderOffset;
    map.setTileAt(1, x, y, id);
    if(isOre(block.current) && overrideRender)
      map.setTileAt(2, x, y, renderOre(block.current));
    if(canHaveDecoration(block.current) && y != grassHeight && overrideRender)
    {
      let deco = randomDecoration(block.current);
      let side = Math.random() < 0.5;
      if(deco != 0)
        map.setTileAt(2, x, y, deco, side);
      if(deco == decorationDoubleID && Math.random() < decorationDoubleProbability)
      {
        if(canHaveDecoration(block.right) && !side)
          map.setTileAt(2, x+1, y, decorationDoubleIDExtention);
        if(canHaveDecoration(block.left) && side)
          map.setTileAt(2, x-1, y, decorationDoubleIDExtention, true);
      }
    }
  }
  
  if(block.current == ladderID)
  {
    let id = ladderSingleRenderID;
    if(block.up == ladderID && block.down == ladderID)
      id = ladderCenterRenderID;
    if(block.up == ladderID && block.down != ladderID)
      id = ladderBottomRenderID;
    if(block.up != ladderID && block.down == ladderID)
      id = ladderTopRenderID;
    map.setTileAt(1, x, y, id);
  }
  
  if(block.current == chestID)
    map.setTileAt(1, x, y, chestRenderID);
  if(block.current == openChestID)
    map.setTileAt(1, x, y, openChestRenderID);
}

function breakBlock(map : Sup.TileMap, x : number, y : number) : void
{
  setBlock(map, airID, x, y, true);
}

function placeLadder(map : Sup.TileMap, x : number, y : number) : void
{
  setBlock(map, ladderID, x, y);
}

function placeGrave(map : Sup.TileMap, x : number, y : number)
{
  if(!canHaveGrave(map.getTileAt(0, x, y)))
    return;
  let graveID = Math.random() > 0.5 ? graveRenderID1 : graveRenderID2;
  map.setTileAt(2, x, y, graveID);
}

function openChest(map : Sup.TileMap, x : number, y : number)
{
  if(map.getTileAt(0, x, y) != chestID)
    return;
  map.setTileAt(0, x, y, openChestID);
  renderBlock(map, x, y);
}

function setBlock(map : Sup.TileMap, id : number, x : number, y : number, overrideRender : boolean = false) : void
{
  map.setTileAt(0, x, y, id);
  renderBlock(map, x, y, overrideRender);
  if(x > 0)
    renderBlock(map, x-1, y);
  if(x > 0 && y > 0)
    renderBlock(map, x-1, y-1);
  if(y > 0)
    renderBlock(map, x, y-1);
  if(x < map.getWidth()-1 && y > 0)
    renderBlock(map, x+1, y-1);
  if(x < map.getWidth()-1)
    renderBlock(map, x+1, y);
  if(x < map.getWidth()-1, y < map.getHeight()-1)
    renderBlock(map, x+1, y+1);
  if(y < map.getHeight()-1)
    renderBlock(map, x, y+1);
  if(x > 0 && y < map.getWidth()-1)
    renderBlock(map, x-1, y+1);
}

function renderOre(id : number) : number
{
  let base = id == coalID ? coalRenderOffset : id == ironID ? ironRenderOffset : id == silverID ? silverRenderOffset : id == goldID ? goldRenderOffset : diamondRenderOffset;
  return base + Math.floor(Math.random()*3);
}

function randomDecoration(id : number) : number
{
  let proba = decorationDirtProbability;
  if(isStone(id))
    proba = decorationStoneProbability;
  if(Math.random() > proba)
    return 0;
  
  return Math.floor(Math.random()*decorationRenderSize)+decorationRenderStart;
}
  
  
