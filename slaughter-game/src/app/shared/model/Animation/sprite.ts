import { Direction } from "../direction";
import { Point } from "../point";
import { Subject } from "rxjs";

export interface SpriteOptions{
    image: HTMLImageElement;
    displayWidth: number; 
    displayHeight: number; 
    context: any;
    frameWidth: number;
    frameHeight: number;
    speedX: number;
    speedY: number;
}

export class Sprite {

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

    coord: Point;

    private movePoints: Point[];
    private index: number = 0;

    constructor(options: SpriteOptions){
        this.image = options.image;
        this.displayWidth = options.displayWidth;
        this.displayHeight = options.displayHeight;
        this.context = options.context;
        this.frameWidth = options.frameWidth;
        this.frameHeight = options.frameHeight;
        this.speedX = options.speedX;
        this.speedY = options.speedY;
        this.coord = new Point(0,0);

        this.frameRowIndex = 0;
        this.frameHeightIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 10; 
        this.movePoints = [];
        this.index = 0;

        this.notificationSubject = new Subject();
    }

    getCoords(): Point{
        return this.coord;
    }

    moveArray(moveTo: Point[]): void {
        this.movePoints = moveTo;
        this.index = 0;
        
        this.notificationSubject.next();
    }

    update(){
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

        if (this.isStepFinished()){
            this.coord.x = this.movePoints[this.index].x;
            this.coord.y = this.movePoints[this.index].y;
            this.draw();
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

        let moveTo = this.movePoints[this.index];
        //direction
        if (moveTo){
            if ((moveTo.x - this.coord.x) > 0){
                this.moveDirection = Direction.Right;
            }else if ((moveTo.x - this.coord.x) < 0){
                this.moveDirection = Direction.Left;
            }
            if ((moveTo.y - this.coord.y) > 0){
                this.moveDirection = Direction.Down;
            } else if ((moveTo.y - this.coord.y) < 0){
                this.moveDirection = Direction.Up;
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
    }

    private isStepFinished(): boolean{

        if (this.movePoints.length){
            switch (this.moveDirection){
                case Direction.Down:
                case Direction.Up:
                    if (Math.abs(this.coord.y - this.movePoints[this.index].y) > 2){
                        return false;
                    }else {
                        return true;
                    }
                case Direction.Left:
                case Direction.Right:
                    if (Math.abs(this.coord.x - this.movePoints[this.index].x) > 2){
                        return false;
                    }else {
                        return true;
                    }
            }
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