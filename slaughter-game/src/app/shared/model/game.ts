import { Canvas } from './canvas';
import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Point } from './point';
import { Map } from './map';
import { GameAnimation } from './gameAnimation';

export class Game {

    private _canvas: Canvas;
    private _map: Map;
    private _animation: GameAnimation;

    constructor(
        widthBlockNumber: number, 
        heightBlockNumber: number,
        containerId: string,
        backgroundColor?: string
        ) {

            this._map = new Map(widthBlockNumber, heightBlockNumber);

            let containerNode = document.getElementById(containerId);
            this._canvas = new Canvas(containerNode.offsetWidth, containerNode.offsetHeight, backgroundColor);
            containerNode.appendChild(this._canvas.createCanvasNode());

            this._animation = new GameAnimation(this._canvas.context, this._canvas.canvas);
            console.log( this._map.grid);
    }


    display(displayGrid?: boolean): void {

        if (displayGrid){
                this._canvas.displayGrid(this._map.width, this._map.height);
        }

        fromEvent(this._canvas.canvas, 'click')
            .pipe(tap((event: MouseEvent) => {
                let point = this.getBlockByCoordinate(event.layerX, event.layerY);
                console.log(event);
                console.log(point);
                console.log(this._map.getValueOfBlock(point.x, point.y));

                console.log(this._map.getRoute(point, new Point(3,3)));

            }))
            .subscribe();

        //this._animation.start();
    }

    private getBlockByCoordinate(x: number, y: number): Point {
        return new Point(Math.floor( x / (this._canvas.width / this._map.width)), Math.floor (y / (this._canvas.height / this._map.height)));
    }

    get canvas(): Canvas {
        return this._canvas;
    }

}
