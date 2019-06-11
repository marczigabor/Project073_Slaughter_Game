import { Canvas } from './canvas';
import { Point } from '../model/point';
import { MapGenerator } from '../service/map-generator.service';
import { GameAnimation } from '../animation/gameAnimation';
import { DrawObject } from '../animation/drawObject';
import { ObjectCreatorService } from '../service/object-creator.service';
import { ImageLoaderService } from '../service/image-loader.service';
import { InputHandler } from './inputHandler';
import { MoveObject } from '../animation/moveObject';
import { RandomNumberService } from '../service/random-number.service';
import { GridService } from '../service/grid.service';
import { CharacterService } from '../service/character.service';

export class Game {

    private _canvas: Canvas;
    private _gridService: GridService;
    private _characterService: CharacterService;
    private _animation: GameAnimation;
    private _objects: MoveObject[];
    private _drawObjectFactory: ObjectCreatorService;
    private _inputHandler: InputHandler;

    constructor(
        widthBlockNumber: number, 
        heightBlockNumber: number,
        containerId: string,
        backgroundColor?: string
        ) {

            this._objects = [];
            this._gridService = new GridService(MapGenerator.generateMapArray(widthBlockNumber, heightBlockNumber, 25, new RandomNumberService()));
            //this._characterService = new CharacterService();
            let containerNode = document.getElementById(containerId);
            this._canvas = new Canvas(containerNode, backgroundColor);
            this._animation = new GameAnimation(this._canvas.canvas, this._canvas.context ); //, this._objects);
            this._drawObjectFactory = new ObjectCreatorService(new ImageLoaderService());
            this._inputHandler = new InputHandler(this._canvas.canvas);
            this._inputHandler.init().subscribe((event: MouseEvent) => this.handleInput(new Point(event.layerX, event.layerY)));
            this.loadDrawObjects().then(() => {
                this._animation.init();


            });
            console.log( this._gridService.grid);
    }

    private handleInput(inputPoint: Point){

        let found: boolean = false;
        let blockClicked: Point = this.getBlockByCoordinate(inputPoint);

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
            var character = this._objects.find((element)=> element.name == 'captainamerica_shield');
            if (character) {
                let charPoints = character.getCoords();
                let charPointsBlock = this.getBlockByCoordinate(charPoints);

                let routes = this._gridService.getRoute(charPointsBlock, blockClicked);
                console.log(routes);

                if (routes.length > 0){
    
                    let arrayPoints: Point[] = [];
                    arrayPoints.push(this.getCoordinateByBlock(charPointsBlock));
                    routes.forEach(element => {
                        arrayPoints.push(this.getCoordinateByBlock(element));
                    });
    
                    character.setMove(arrayPoints);
                }
            }
        }


        var enemy = this._objects.find((element)=> element.name == 'yuffiekisaragi');
        if (enemy){

            
            

        }
    }

    private loadDrawObjects(): Promise<void>{

        return this._drawObjectFactory.getFields(
            this._gridService, 
            this._canvas.contextBackground, 
            new Point(this.blockSizeX, this.blockSizeY) ).then((items: DrawObject[]) => {
            items.forEach(item => {
            //     this._objects.push(item);
                this._animation.addDrawObject(item);
            });
        }).then(() => {
            this._drawObjectFactory.getCharacter(
                    1,
                    this._canvas.context,
                    new Point((Math.random() * this._canvas.width) + 1, (Math.random() * this._canvas.height) + 1),
                    new Point(this.blockSizeX, this.blockSizeY)
                ).then((item: MoveObject)=> {
                    this._objects.push(item);
                    this._animation.addDrawObject(item);
                });
        }).then(()=> {
                this._drawObjectFactory.getCharacter(
                    2,
                    this._canvas.context,
                    new Point((Math.random() * this._canvas.width) + 1, (Math.random() * this._canvas.height) + 1),
                    new Point(this.blockSizeX, this.blockSizeY)
                ).then((item: MoveObject)=> {
                    this._objects.push(item);
                    this._animation.addDrawObject(item);
                    
                    //update the step
                    item.endStepSubject.subscribe((value)=> {
                        
                        //this._characterService.update(value, this.getBlockByCoordinate(item.getCoords()));
                    });
            });
        });
    }

    get blockSizeX(){
        return this._canvas.width / this._gridService.width;
    }

    get blockSizeY(){
        return this._canvas.height / this._gridService.height;
    }

    private getBlockByCoordinate(point: Point): Point {
        return new Point(Math.floor( point.x / this.blockSizeX), Math.floor (point.y / this.blockSizeY));
    }

    private getCoordinateByBlock(point: Point): Point {
        return new Point( point.x * this.blockSizeX, point.y * this.blockSizeY);
    }

}
