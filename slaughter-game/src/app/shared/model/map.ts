import { Graph, astar } from 'javascript-astar';
import { Point } from "./point";

export class Map {

    private _grid: any; //0: wall 

    constructor(x: number, y: number){
        this._grid = new Graph(this.generateArray(x, y, false));
    }

    getRoute = (startPoint: Point, endPoint: Point):any => {
        this.clearDirtyNodes();
        var start = this._grid.grid[startPoint.x][startPoint.y];
        var end = this._grid.grid[endPoint.x][endPoint.y];
        return astar.search(this._grid, start, end);            
    }

    generateArray = (x: number, y: number, generateWalls: boolean): number[][] => {
        let array: number[][] = [];
        let j=0;
        
        // for (let i=0; i < x; i++){
        //     array[i] = Array.from(Array(y), () => generateWalls ? this.getRandomInt(0, 1) : 1);
        // }


        array = [[1,1,1,1], 
                [1,0,0,1],
                [1,0,0,1],
                [1,1,1,1],
            ];

        //console.log(array);
        return array;
    }

    getValueOfBlock = (x: number, y: number): number => { //0: wall; 1: opened
        return this._grid.grid[x][y].weight;
    }

    private clearDirtyNodes = () => {
        this._grid.nodes.forEach((element: { closed: boolean; visited: boolean }) => {
            element.closed=false;
        });
    }

    private getRandomInt = (min, max): number => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }    

    get grid(): any{
        return this._grid;
    }

    get width(): number{
        return this._grid.grid[0].length;
    }

    get height(): number{
        return this._grid.grid.length;
    }

}