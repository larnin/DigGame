class MapGeneratorBehavior extends Sup.Behavior 
{
  awake() 
  {
    let tileIDs : number[] = [0, 25];
    let mapRender = this.actor.tileMapRenderer;
    let map = mapRender.getTileMap();
    for(let i = 0 ; i < map.getWidth() ; i++)
      for(let j = 0 ; j < map.getHeight() ; j++)
        {
          let value : number = Math.floor(Math.random()*tileIDs.length);
          map.setTileAt(1, i, j, tileIDs[value]);
        }
  }

  update() 
  {
    
  }
}
Sup.registerBehavior(MapGeneratorBehavior);
