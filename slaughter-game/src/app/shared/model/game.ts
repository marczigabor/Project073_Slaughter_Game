import { Canvas } from './canvas';
import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Point } from './point';
import { Map } from './map';
import { GameAnimation } from './Animation/gameAnimation';
import { DrawObject } from './Animation/drawObject';
import { ObjectCreatorService } from '../service/object-creator.service';
import { ImageLoaderService } from '../service/image-loader.service';

export class Game {

    private _canvas: Canvas;
    private _map: Map;
    private _animation: GameAnimation;
    private _objects: DrawObject[];
    private _drawObjectFactory: ObjectCreatorService;

    constructor(
        widthBlockNumber: number, 
        heightBlockNumber: number,
        containerId: string,
        backgroundColor?: string
        ) {

            this._objects = [];
            this._map = new Map(widthBlockNumber, heightBlockNumber);
            let containerNode = document.getElementById(containerId);
            this._canvas = new Canvas(containerNode, backgroundColor);
            this._animation = new GameAnimation(this.canvas.canvas, this.canvas.context);
            this._drawObjectFactory = new ObjectCreatorService(new ImageLoaderService());

            this.loadDrawObjects();

            //characters


            console.log( this._map.grid);
    }

    private loadDrawObjects(): void{
        var that = this;
        //fields
        this._drawObjectFactory.getFields(
            this._map, 
            this._canvas.contextBackground, 
            new Point(this.blockSizeX, this.blockSizeY) ).then((items: DrawObject[]) => {
            
            items.forEach(item => {
                that._objects.push(item);
                that._animation.addDrawObject(item);
            });

           return 0;

        }).then(() => {
            that._drawObjectFactory.getCharacters(
                    this.canvas.context,
                    new Point((Math.random() * this.canvas.width) + 1, (Math.random() * this.canvas.height) + 1),
                    new Point(this.blockSizeX, this.blockSizeY)
                ).then((items: DrawObject[])=> {

                items.forEach ((item) =>{
                    that._objects.push(item);
                    this._animation.addDrawObject(item);
                });
            });
            return 0;

        }).then(() => {
            that._animation.init();
        });           
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

        fromEvent(this._canvas.canvas, 'mousemove')
        .pipe(tap((event: MouseEvent) => {
            console.log(event.x + " " + event.y);
        }));


        fromEvent(this._canvas.canvas, 'click')
            .pipe(tap((event: MouseEvent) => {

                let found: boolean = false;
                let blockClicked: Point = this.getBlockByCoordinate(new Point(event.layerX, event.layerY));

                // this._objects.forEach (item=> {
                //     const point = item.getCoords();
                //     const charBlock = this.getBlockByCoordinate(point);
                //     if (item.speedX != 0 && item.speedY != 0 && charBlock.x == block.x && charBlock.y == block.y){
                //         console.log(item.name);
                //         found = true;
                //     }
                // });    

                //console.log(event);

                //TODO move it to move handler object
                if (!found){
                    this._objects.forEach(element => {

                        if (element.speedX != 0 && element.speedY != 0 ){
                            let charPoints = element.getCoords();
                            let charPointsBlock = this.getBlockByCoordinate(charPoints);

                            let routes = this._map.getRoute(charPointsBlock, blockClicked);
                            console.log(routes);
    
                            if (routes.length > 0){
                
                                let arrayPoints: Point[] = [];
                                arrayPoints.push(this.getCoordinateByBlock(charPointsBlock));
                                routes.forEach(element => {
                                    arrayPoints.push(this.getCoordinateByBlock(element));
                                });
                
                                element.setMove(arrayPoints);
                            }
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
