import { Graph, astar } from 'javascript-astar';
import { Point } from '../model/point';

//create another service for the objects (characters, bombs, slow down packs, etc) 
export class GridService {

  private _graph: Graph; //0: wall 

  constructor(map: number[][])  {

    this._graph = new Graph(map);
  }
 
  getRoute = (startPoint: Point, endPoint: Point):any => {
    this.clearDirtyNodes(this._graph);
    var start = this._graph.grid[startPoint.x][startPoint.y];
    var end = this._graph.grid[endPoint.x][endPoint.y];
    return astar.search(this._graph, start, end);            
  }

  private clearDirtyNodes = (graph: Graph) => {
    graph.nodes.forEach((element: { closed: boolean; visited: boolean }) => {
        element.closed=false;
    });
  }  
  
  getValueOfBlock = (x: number, y: number): number => { //0: wall; 1: opened
    return this._graph.grid[x][y].weight;
  }

  get grid(): Graph{
    return this._graph;
  }

  get width(): number{
    return this._graph.grid.length;
  }

  get height(): number{
    return this._graph.grid[0].length;
  }
}
