import { Area } from "./area";
import { Graph, astar } from 'javascript-astar';

export class Map {

    private _grid: Graph; //0: wall 

    constructor(x: number, y: number){
        
        this._grid = new Graph(this.generateArray(x, y, false));
        
        // var start = this._grid.grid[0][0];
        // var end = this._grid.grid[1][2];
        // var result = astar.search(this._grid, start, end);            

    }

    generateArray(x: number, y: number, generateWalls: boolean): number[][]{
        let array: number[][] = [];

        for (let i=0; i < y; i++){
            array[i] = Array.from(Array(x), () => generateWalls ? this.getRandomInt(0, 1) : 1);
        }

        return array;
    }

    getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }    

    get grid(): Graph{
        return this._grid;
    }

    get width(): number{
        return this._grid.grid[0].length;
    }

    get height(): number{
        return this._grid.grid.length;
    }

}