import { Direction } from "../direction";
import { Point } from "../point";
import { Subject } from "rxjs";
import { DrawObjectOptions } from "./drawObjectOptions";
import { DrawObject } from "./drawObject";
import { moveCursor } from "readline";

export class Sprite3x3 implements  DrawObject  {

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
    moveDirection: Direction;
    notificationSubject: Subject<any>;
    name: string;
    moveTo: Point;

    coord: Point;

    private movePoints: Point[];
    private index: number = 0;

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
        this.moveTo = this.coord;
        this.name = options.name;

        this.frameRowIndex = 0;
        this.frameHeightIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 7; 
        this.movePoints = [];
        this.index = 0;
        this.moveTo

        this.notificationSubject = new Subject();
    }

    getCoords(): Point{
        return this.coord;
    }

    moveArray(moveTo: Point[]): void {
        this.index = 0;
        this.movePoints = moveTo;
        
        this.notificationSubject.next();
    }

    update(){

        this.context.clearRect(this.coord.x, this.coord.y, this.displayWidth, this.displayHeight);

        if (!this.isFinished()){
            this.move();
            this.frameUpdate();
        }
        this.draw(); 
        this.check();
    }

    isFinished(): boolean{
        return this.movePoints.length == 0;
    }

    private check(): void{

        if (this.isStepFinished() && this.movePoints.length) {
            //this.context.clearRect(this.coord.x, this.coord.y, this.displayWidth, this.displayHeight);

            //this.coord.x = this.movePoints[this.index].x;
            //this.coord.y = this.movePoints[this.index].y;
            
            //this.draw(); 
            //console.log("this.index++;");
            this.index++;
        }

        if (this.movePoints.length && this.index >= this.movePoints.length){
            this.index = 0;
            this.movePoints = [];
        }
    }

    private draw(): void{
        this.context.drawImage(
            this.image, 
            this.frameRowIndex * this.frameWidth, 
            this.frameHeightIndex * this.frameHeight, 
            this.frameWidth, 
            this.frameHeight, 
            this.coord.x, 
            this.coord.y, 
            this.displayWidth, 
            this.displayHeight);        
    }

    private move(): void{

        let moveToNew = this.movePoints[this.index];
        if (this.moveTo.x != moveToNew.x || this.moveTo.y != moveToNew.y ){
            
            if ((moveToNew.x - this.moveTo.x) > 0){
                this.moveDirection = Direction.Right;
                console.log("Direction.Right;");
            }else if ((moveToNew.x - this.moveTo.x) < 0){
                this.moveDirection = Direction.Left;
                console.log("Direction.Left;");
            }
            if ((moveToNew.y - this.moveTo.y) > 0){
                this.moveDirection = Direction.Down;
                console.log("Direction.Down;");
            } else if ((moveToNew.y - this.moveTo.y) < 0){
                this.moveDirection = Direction.Up;
                console.log("Direction.Up;");
            }

            this.moveTo = moveToNew;

        //direction
            // if (this.moveTo){
            //     if ((this.moveTo.x - this.coord.x) > 0){
            //         this.moveDirection = Direction.Right;
            //         console.log("Direction.Right;");
            //     }else if ((this.moveTo.x - this.coord.x) < 0){
            //         this.moveDirection = Direction.Left;
            //         console.log("Direction.Left;");
            //     }
                
            //     if ((this.moveTo.y - this.coord.y) > 0){
            //         this.moveDirection = Direction.Down;
            //         console.log("Direction.Down;");
            //     } else if ((this.moveTo.y - this.coord.y) < 0){
            //         this.moveDirection = Direction.Up;
            //         console.log("Direction.Up;");
            //     }

            // }
        }

        //move
        switch (this.moveDirection){
            case Direction.Down:
                this.coord.y += this.speedY;
                break;
            case Direction.Up:
                this.coord.y -= this.speedY;
                break;
            case Direction.Left:
                this.coord.x -= this.speedX;
                break;
            case Direction.Right:
                this.coord.x += this.speedX;
                break;
        }
    }

    private isStepFinished(): boolean{

        if (this.movePoints.length){
            const yDiff = this.coord.y - this.moveTo.y;
            const xDiff = this.coord.x - this.moveTo.x;

            //TODO 
            switch (this.moveDirection){
                case Direction.Down:
                    return yDiff >= 5;
                case Direction.Up:
                    return yDiff <= 5;
                case Direction.Left:
                    return xDiff <= 5;
                case Direction.Right:
                    return xDiff >= 5;
            }
        }else {
            return true;
        }  
    }


    private frameUpdate(){
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
        	this.tickCount = 0;
             // Go to the next frame
            if (this.frameRowIndex < 3){
                this.frameRowIndex++;
            }else{
                this.frameRowIndex = 1;
            }
        }

        switch (this.moveDirection){
            case Direction.Down:
                this.frameHeightIndex = 0;
                break;
            case Direction.Up:
                this.frameHeightIndex = 3;
                break;
            case Direction.Left:
                this.frameHeightIndex = 1;
                break;
            case Direction.Right:
                this.frameHeightIndex = 2;
                break;
        }

    };     

}