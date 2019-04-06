import { Canvas } from './canvas';
import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Area } from './area';
import { Point } from './point';

export class Game {

    private _canvas: Canvas;
    private _containerNode: HTMLElement;
    private _gameBlock: Area;

    constructor(
        widthBlockNumber: number, 
        heightBlockNumber: number,
        backgroundColor: string,  
        contaierId: string) {

            this._gameBlock = new Area(widthBlockNumber, heightBlockNumber);

            this._containerNode = document.getElementById(contaierId);
            this._canvas = new Canvas(this._containerNode.offsetWidth, this._containerNode.offsetHeight, backgroundColor);
    }

    init(): void {
        
        this._containerNode.appendChild(this._canvas.createCanvasNode());

        fromEvent(this._canvas.canvasNode, 'click')
            .pipe(tap((event: MouseEvent) => {
                console.log(this.getBlockByCoordinate(event.layerX, event.layerY));
            }))
            .subscribe();
    }

    private getBlockByCoordinate(x: number, y: number): Point {
        return new Point(Math.floor( x / (this._canvas.width / this._gameBlock.width)), Math.floor (y / (this._canvas.height / this._gameBlock.height)));
    }

    get canvas(): Canvas {
        return this._canvas;
    }

}
