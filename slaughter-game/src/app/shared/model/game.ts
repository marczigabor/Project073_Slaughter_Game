import { Canvas } from './canvas';
import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Point } from './point';
import { Map } from './map';

export class Game {

    private _canvas: Canvas;
    private _containerNode: HTMLElement;
    private _map: Map;

    constructor(
        widthBlockNumber: number, 
        heightBlockNumber: number,
        containerId: string,
        backgroundColor?: string
        ) {

            this._map = new Map(widthBlockNumber, heightBlockNumber);

            this._containerNode = document.getElementById(containerId);
            this._canvas = new Canvas(this._containerNode.offsetWidth, this._containerNode.offsetHeight, backgroundColor);

            console.log( this._map.grid);
    }


    display(displayGrid?: boolean): void {
        
        this._containerNode.appendChild(this._canvas.createCanvasNode());

        if (displayGrid){
                this._canvas.displayGrid(this._map.width, this._map.height);
        }

        fromEvent(this._canvas.canvasNode, 'click')
            .pipe(tap((event: MouseEvent) => {
                console.log(this.getBlockByCoordinate(event.layerX, event.layerY));
            }))
            .subscribe();
    }

    private getBlockByCoordinate(x: number, y: number): Point {
        return new Point(Math.floor( x / (this._canvas.width / this._map.width)), Math.floor (y / (this._canvas.height / this._map.height)));
    }

    get canvas(): Canvas {
        return this._canvas;
    }

}
