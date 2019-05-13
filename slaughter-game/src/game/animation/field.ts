import { DrawObjectOptions } from "./drawObjectOptions";
import { DrawObject } from "./drawObject";
import { Subject } from "rxjs";
import { Point } from "../model/point";


export class Field implements DrawObject  {
    
    setMoveSubject: Subject<any>;
    context: any;
    displayWidth: number;
    displayHeight: number;
    image: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
    coord: Point;

    constructor(options: DrawObjectOptions){
        this.image = options.image;
        this.displayWidth = options.displayWidth;
        this.displayHeight = options.displayHeight;
        this.context = options.context;
        this.frameWidth = options.frameWidth;
        this.frameHeight = options.frameHeight;
        this.coord = options.coord;
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
    
    getCoords(): Point {
        return this. coord;
    }
}