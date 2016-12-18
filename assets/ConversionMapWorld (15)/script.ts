function worldToMap(x:number, y:number, map : Sup.Actor) : {x:number,y:number}
{
  let maprenderer = map.tileMapRenderer;
  let tilemap = maprenderer.getTileMap();
  
  let pixelPerUnit = tilemap.getPixelsPerUnit();
  let tileSize = maprenderer.getTileSet().getGridSize();
  let tilePerUnit = pixelPerUnit/tileSize.width;
  let relativeX = x - map.getX();
  let relativeY = y - map.getY();
  return {x:relativeX*tilePerUnit,y:relativeY*tilePerUnit};
}

function withoutDecimal(x:number) : number
{
  let loop = true;
  let cpt = 0;
  while(loop)
  {
    if(cpt+1>x)
    {
      loop = false
    }
    else
    {
      cpt++;
    }
  }
  return cpt;
}
