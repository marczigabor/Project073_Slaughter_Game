import { Canvas } from './canvas';
import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Point } from './point';
import { Map } from './map';
import { GameAnimation } from './Animation/gameAnimation';
import { DrawObject } from './Animation/drawObject';
import { DrawObjectFactory } from './drawObjectFactory';

export class Game {

    private _canvas: Canvas;
    private _map: Map;
    private _animation: GameAnimation;
    private _objects: DrawObject[];
    private _drawObjectFactory: DrawObjectFactory;

    constructor(
        widthBlockNumber: number, 
        heightBlockNumber: number,
        containerId: string,
        backgroundColor?: string
        ) {

            this._objects = [];
            this._map = new Map(widthBlockNumber, heightBlockNumber);

            let containerNode = document.getElementById(containerId);
            this._canvas = new Canvas(containerNode.offsetWidth, containerNode.offsetHeight, backgroundColor);
            containerNode.appendChild(this._canvas.createCanvasNode());

            this._animation = new GameAnimation(this.canvas.canvas, this.canvas.context);

            this._drawObjectFactory = new DrawObjectFactory(
                this._canvas.context, 
                new Point(widthBlockNumber, heightBlockNumber), 
                new Point(this._canvas.canvas.width, this._canvas.canvas.height)
                );


            //fields
            this._drawObjectFactory.getFields(this._map).forEach(item => {
                this._objects.push(item);
            })   

            //characters
            this._objects.push(this._drawObjectFactory.getCharacter(0));
            this._objects.push(this._drawObjectFactory.getCharacter(1));
            this._objects.push(this._drawObjectFactory.getCharacter(2));
            this._objects.push(this._drawObjectFactory.getCharacter(3));
            this._objects.push(this._drawObjectFactory.getCharacter(4));
            this._objects.push(this._drawObjectFactory.getCharacter(5));

            this._objects.forEach (item => {
                this._animation.addDrawObject(item);
            });

            console.log( this._map.grid);
    }

    get blockSizeX(){
        return this._canvas.width / this._map.width;
    }

    get blockSizeY(){
        return this._canvas.height / this._map.height;
    }

    display(): void {

        let x = 0;
        let y = 0;

        fromEvent(this._canvas.canvas, 'click')
            .pipe(tap((event: MouseEvent) => {

                let found: boolean = false;
                let block: Point = this.getBlockByCoordinate(new Point(event.layerX, event.layerY));

                this._objects.forEach (item=> {
                    const point = item.getCoords();
                    const charBlock = this.getBlockByCoordinate(point);
                    if (item.speedX != 0 && item.speedY != 0 && charBlock.x == block.x && charBlock.y == block.y){
                        console.log(item.name);
                        found = true;
                    }
                });    

                //console.log(event);

                if (!found){
                    this._objects.forEach(element => {

                        if (element.speedX != 0 && element.speedY != 0 ){
                            let charPoints = element.getCoords();
                            let routes = this._map.getRoute(this.getBlockByCoordinate(charPoints), block);
                            //console.log(routes);
            
                            let arrayPoints: Point[] = [];
                            routes.forEach(element => {
                                arrayPoints.push(this.getCoordinateByBlock(element));
                            });
            
                            element.moveArray(arrayPoints);
                        }
                    });
                }

            }))
            .subscribe();
    }

    private getBlockByCoordinate(point: Point): Point {
        return new Point(Math.floor( point.x / this.blockSizeX), Math.floor (point.y / this.blockSizeY));
    }

    private getCoordinateByBlock(point: Point): Point {
        return new Point( point.x * this.blockSizeX, point.y * this.blockSizeY);
    }

    get canvas(): Canvas {
        return this._canvas;
    }

}
