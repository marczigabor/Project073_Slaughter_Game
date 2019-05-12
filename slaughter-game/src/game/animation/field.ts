import { DrawObjectOptions } from "./drawObjectOptions";
import { DrawObject } from "./drawObject";
import { Subject } from "rxjs";
import { Point } from "../model/point";


export class Field implements  DrawObject  {
    
    setMoveSubject: Subject<any>;
    context: any;
    displayWidth: number;
    displayHeight: number;
    image: HTMLImageElement;
    ticksPerFrame: number; //fps
    tickCount: number;
    frameRowIndex: number;
    frameHeightIndex: number;
    frameWidth: number;
    frameHeight: number;
    speedX: number;
    speedY: number;
    coord: Point;
    name: string;

    constructor(options: DrawObjectOptions){
        this.image = options.image;
        this.displayWidth = options.displayWidth;
        this.displayHeight = options.displayHeight;
        this.context = options.context;
        this.frameWidth = options.frameWidth;
        this.frameHeight = options.frameHeight;
        this.speedX = options.speedX;
        this.speedY = options.speedY;
        this.coord = options.coord;

        this.frameRowIndex = 0;
        this.frameHeightIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 10; 

        this.setMoveSubject = new Subject();
    }

    
    private draw(): void{
        //this.context.globalAlpha = 1;
        this.context.drawImage(
            this.image,
            0, 
            0, 
            this.frameWidth, 
            this.frameHeight, 
            this.coord.x, 
            this.coord.y, 
            this.displayWidth, 
            this.displayHeight);      
    }

    update(): void {
        this.draw();
    }
    
    setMove(moveTo: Point[]): void {
    }

    isFinished(): boolean {
        return true;
    }

    getCoords(): Point {
        return this. coord;
    }
}