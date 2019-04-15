import { Direction } from "../direction";
import { Point } from "../point";

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
    frameIndex: number;
    frameWidth: number;
    frameHeight: number;
    speedX: number;
    speedY: number;
    moveDirection: Direction;

    coord: Point;
    //x: number;
    //y: number;

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

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 10; 
    }

    //32x48
    draw(){

        this.update();

        this.context.drawImage(
            this.image, 
            this.frameIndex * this.frameWidth, 
            0, 
            this.frameWidth, 
            this.frameHeight, 
            this.coord.x, 
            this.coord.y, 
            this.displayWidth, 
            this.displayHeight);        
    }

    move (moveTo: Point){

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

    isFinished(moveTo: Point): boolean{

        switch (this.moveDirection){
            case Direction.Down:
            case Direction.Up:
                if (Math.abs(this.coord.y - moveTo.y) >5){
                    return false;
                }else {
                    return true;
                }
            case Direction.Left:
            case Direction.Right:
                if (Math.abs(this.coord.x - moveTo.x) > 5){
                    return false;
                }else {
                    return true;
                }
        }
    }


    private update(){
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
        	this.tickCount = 0;
             // Go to the next frame
            if (this.frameIndex < 3){
                this.frameIndex += 1;
            }else{
                this.frameIndex = 1;
            }
        }
    };     

}