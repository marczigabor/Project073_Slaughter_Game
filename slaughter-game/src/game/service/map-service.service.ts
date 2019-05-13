import { Graph, astar } from 'javascript-astar';
import { Point } from '../model/point';


export class MapService {

  private _grid: Graph; //0: wall 

  constructor(map: number[][]) {

    this._grid = new Graph(map);

  }

  getRoute = (startPoint: Point, endPoint: Point):any => {
    this.clearDirtyNodes();
    var start = this._grid.grid[startPoint.x][startPoint.y];
    var end = this._grid.grid[endPoint.x][endPoint.y];
    return astar.search(this._grid, start, end);            
  }
  
  getValueOfBlock = (x: number, y: number): number => { //0: wall; 1: opened
    return this._grid.grid[x][y].weight;
  }

  private clearDirtyNodes = () => {
    this._grid.nodes.forEach((element: { closed: boolean; visited: boolean }) => {
        element.closed=false;
    });
  }

  get grid(): Graph{
    return this._grid;
  }

  get width(): number{
    return this._grid.grid.length;
  }

  get height(): number{
    return this._grid.grid[0].length;

  }
}
