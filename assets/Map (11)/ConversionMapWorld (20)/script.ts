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

function mapToWorld(x:number, y:number, map: Sup.Actor) : {x:number, y:number}
{
  let maprenderer = map.tileMapRenderer;
  let tilemap = maprenderer.getTileMap();
  let tileSize = maprenderer.getTileSet().getGridSize();
  let pixelPerUnit = tilemap.getPixelsPerUnit();
  let tilePerUnit = pixelPerUnit/tileSize.width;
  let relativeX = x/tilePerUnit;
  let relativeY = y/tilePerUnit;
  return {x:relativeX + map.getX(),y:relativeY + map.getY()}
}
