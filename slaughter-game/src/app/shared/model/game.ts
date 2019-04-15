import { Canvas } from './canvas';
import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Point } from './point';
import { Map } from './map';
import { GameAnimation } from './Animation/gameAnimation';
import { Sprite, SpriteOptions } from './Animation/sprite';

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

            this._animation = new GameAnimation(this._canvas.context, this._canvas.canvas, this.getCharacter());
            //console.log( this._map.grid);
    }

    getCharacter(){

        var image = new Image();
        image.src = "assets/image/yuffiekisaragi.png";

        const options: SpriteOptions = {
            context: this.canvas.context,
            frameHeight: 48,
            frameWidth: 32,
            displayHeight: this.blockSizeX,
            displayWidth: this.blockSizeY,
            image: image,
            speedX: 5,
            speedY: 5
        }

        const character = new Sprite(options);
        return character;
    }

    get blockSizeX(){
        return this._canvas.width / this._map.width;
    }

    get blockSizeY(){
        return this._canvas.height / this._map.height;
    }

    display(displayGrid?: boolean): void {

        let x = 0;
        let y = 0;

        if (displayGrid){
            this._canvas.displayGrid(this.blockSizeX, this.blockSizeY, this._map.width, this._map.height);
        }

        fromEvent(this._canvas.canvas, 'click')
            .pipe(tap((event: MouseEvent) => {
                let block = this.getBlockByCoordinate(event.layerX, event.layerY);
                console.log(event);
                //console.log(point);
                //console.log(this._map.getValueOfBlock(point.x, point.y));

                let ballPoints = this._animation.getPoints();
                let routes = this._map.getRoute(this.getBlockByCoordinate(ballPoints.x, ballPoints.y), block);
                console.log(routes);

                let arrayPoints: Point[] = [];
                routes.forEach(element => {
                    arrayPoints.push(this.getCoordinateByBlock(element.x, element.y));
                });

                //let pointTo = this.getCoordinateByBlock(point.x, point.y);
                this._animation.move(arrayPoints);

                //x = pointTo.x;
                //y = pointTo.y;

            }))
            .subscribe();

        //this._animation.start();
    }

    private getBlockByCoordinate(x: number, y: number): Point {
        return new Point(Math.floor( x / this.blockSizeX), Math.floor (y / this.blockSizeY));
    }

    private getCoordinateByBlock(x: number, y: number): Point {
        return new Point( x * this.blockSizeX, y * this.blockSizeY);
    }

    get canvas(): Canvas {
        return this._canvas;
    }

}
