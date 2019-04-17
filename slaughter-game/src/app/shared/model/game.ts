import { Canvas } from './canvas';
import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Point } from './point';
import { Map } from './map';
import { GameAnimation } from './Animation/gameAnimation';
import { Sprite, SpriteOptions } from './Animation/sprite';
import { DrawObject } from './Animation/drawObject';

export class Game {

    private _canvas: Canvas;
    private _map: Map;
    private _animation: GameAnimation;
    private _objects: DrawObject[];

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

            this._objects.push(this.getCharacter(0));
            this._objects.push(this.getCharacter(1));
            this._objects.push(this.getCharacter(2));
            this._objects.push(this.getCharacter(3));
            this._objects.push(this.getCharacter(4));
            this._objects.push(this.getCharacter(5));

            this._objects.forEach (item => {
                this._animation.addDrawObject(item);
            });

            console.log( this._map.grid);
    }

    getCharacter(num: number){

        var image = new Image();
        switch (num){
            case 0:
                image.src = "assets/image/yuffiekisaragi.png";    
                break;
            case 1:
                image.src = "assets/image/captainamerica_shield.png";    
                break;
            case 2:
                image.src = "assets/image/elphaba3.png";    
                break;
            case 3:
                image.src = "assets/image/england.png";    
                break;
            case 4:
                image.src = "assets/image/pirate_m2.png";    
                break;
            case 5:
                image.src = "assets/image/china.png";    
                break;
        }
        const speed = (Math.random() * 4) + 0.5;
        const options: SpriteOptions = {
            context: this.canvas.context,
            frameHeight: 48,
            frameWidth: 32,
            displayHeight: this.blockSizeX,
            displayWidth: this.blockSizeY,
            image: image,
            speedX: speed,
            speedY: speed
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

        fromEvent(this._canvas.canvas, 'click')
            .pipe(tap((event: MouseEvent) => {
                let block = this.getBlockByCoordinate(event.layerX, event.layerY);
                console.log(event);

                this._objects.forEach(element => {
                    let charPoints = element.getCoords();
                    let routes = this._map.getRoute(this.getBlockByCoordinate(charPoints.x, charPoints.y), block);
                    console.log(routes);
    
                    let arrayPoints: Point[] = [];
                    routes.forEach(element => {
                        arrayPoints.push(this.getCoordinateByBlock(element.x, element.y));
                    });
    
                    element.moveArray(arrayPoints);
                });

            }))
            .subscribe();
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
