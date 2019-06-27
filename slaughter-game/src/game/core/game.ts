import { Canvas } from './canvas';
import { Point } from '../model/point';
import { MapGenerator } from '../service/map-generator.service';
import { GameAnimation } from '../animation/gameAnimation';
import { ObjectCreatorService } from '../service/object-creator.service';
import { ImageLoaderService } from '../service/image-loader.service';
import { InputHandler } from './inputHandler';
import { RandomNumberService } from '../service/random-number.service';
import { GridService } from '../service/grid.service';
import { MoveObject } from '../animation/moveObject';
import { DrawObject } from '../animation/drawObject';
import { CharacterService } from '../service/character.service';

export class Game {


    private playerId = 1;
    private enemyId = 2;

    private _canvas: Canvas;
    private _gridService: GridService;
    private _animation: GameAnimation;
    private _drawObjectFactory: ObjectCreatorService;
    private _inputHandler: InputHandler;
    private _characterService: CharacterService;

    constructor(
        widthBlockNumber: number, 
        heightBlockNumber: number,
        containerId: string,
        backgroundColor?: string
        ) {

            this._drawObjectFactory = new ObjectCreatorService(new ImageLoaderService());
            this._gridService = new GridService(MapGenerator.generateMapArray(widthBlockNumber, heightBlockNumber, 25, new RandomNumberService()));
            this._characterService = new CharacterService();
            let containerNode = document.getElementById(containerId);
            this._canvas = new Canvas(containerNode, backgroundColor);
            this._animation = new GameAnimation(this._canvas.canvas, this._canvas.context ); //, this._objects);
            this._inputHandler = new InputHandler(this._canvas.canvas);
            this._inputHandler.init().subscribe((event: MouseEvent) => this.handleInput(new Point(event.layerX, event.layerY)));

            this.loadField()
            .then(()=>{
                return this.loadDrawObjects(this.playerId).then((item)=>{

                    item.endStepSubject.subscribe((id: number)=>{
                        //todo add this step to enemys

                        //player choords
                        let toUIPoint = item.getCoords();

                        //get all enemies
                        this._characterService.GetAll(this.enemyId).forEach((enemy)=>{

                            //set new move points
                            //move where the player is
                            let arrayPoints = this.getUIRouteCoordinatesFromUICoords(enemy.UIObject.getCoords(), toUIPoint);
                            if (arrayPoints.length > 0){
                                enemy.UIObject.setMove(arrayPoints);
                            }  
            
                        });

                    });
                    this._characterService.Add(item);
                    this._animation.addDrawObject(item);
                });
            }).then((i)=>{
                return this._animation.init();
            });

            //load enemy
            this.loadEnemy(this.enemyId, 3000, 3, 1);

            console.log( this._gridService.grid);
    }

    private loadEnemy(id: number, timeOut: number, maxNum: number, current: number){
        setTimeout(() => {
            this.loadDrawObjects(2).then((item)=>{
                this._characterService.Add(item);
                this._animation.addDrawObject(item);

                //load next until we reach the max number
                if (maxNum > current)  {
                    this.loadEnemy(id, timeOut, maxNum, ++current);
                }
            });
        }, timeOut);
    }

    private loadField(): Promise<void>{

        return this._drawObjectFactory.getFields(
                this._gridService, 
                this._canvas.contextBackground, 
                new Point(this.blockSizeX, this.blockSizeY))
            .then((items: DrawObject[]) => {
                items.forEach(item => {
                    this._animation.addDrawObject(item);
                });
            });
    }


    private loadDrawObjects(id: number ): Promise<MoveObject>{

        return this._drawObjectFactory.getCharacter(
                    id,
                    this._canvas.context,
                    new Point((Math.random() * this._canvas.width) + 1, (Math.random() * this._canvas.height) + 1),
                    new Point(this.blockSizeX, this.blockSizeY)
                );
      }
    
    private handleInput(inputPoint: Point){

        var character = this._characterService.Get(this.playerId);
        if (character) {

            let arrayPoints = this.getUIRouteCoordinatesFromUICoords(character.UIObject.getCoords(), inputPoint);
            if (arrayPoints.length > 0){
                character.UIObject.setMove(arrayPoints);
            }  

        }
    }

    private getUIRouteCoordinatesFromUICoords (start: Point, end: Point): Point[]{

        start = this.getBlockByCoordinate(start);
        end = this.getBlockByCoordinate(end);

        let arrayPoints: Point[] = [];
        let routes = this._gridService.getRoute(start, end);

        if (routes.length > 0){

            arrayPoints.push(this.getCoordinateByBlock(start));
            routes.forEach((element: Point) => {
                arrayPoints.push(this.getCoordinateByBlock(element));
            });
        }

        return arrayPoints;
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
