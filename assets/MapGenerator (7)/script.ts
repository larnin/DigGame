class MapGeneratorBehavior extends Sup.Behavior 
{
  awake() 
  {
    let tileIDs : number[] = [0, 25];
    let collisionsIDs : number[] = [0, 83];
    let mapRender = this.actor.tileMapRenderer;
    let map = mapRender.getTileMap();
    for(let i = 0 ; i < map.getWidth() ; i++)
      for(let j = 0 ; j < map.getHeight() ; j++)
      {
        let value : number = Math.floor(Math.random()*(tileIDs.length-0.5));
        map.setTileAt(1, i, j, tileIDs[value]);
        map.setTileAt(0, i, j, collisionsIDs[value]);
      }
    
    let centerSize = 4;
    let centerX = Math.floor(map.getWidth()/2);
    let centerY = Math.floor(map.getHeight()/2);
    for(let i = -centerSize ; i < centerSize ; i++)
      for(let j = -centerSize ; j < centerSize ; j++)
      {
        map.setTileAt(1, centerX+i, centerY+j, 0);
        map.setTileAt(0, centerX+i, centerY+j, 0);
      }
  }

  update() 
  {
    
  }
}
Sup.registerBehavior(MapGeneratorBehavior);
