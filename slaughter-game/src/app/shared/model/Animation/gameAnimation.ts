import { Point } from "../point";
import { Direction } from "../direction";
import { Sprite } from "./sprite";

export class GameAnimation {

    private requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
    
    private cancelAnimationFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame;

    private raf: number;
    private canvas: HTMLCanvasElement;
    private context: any; 
    private sprite: Sprite; 

    private moveTo: Point;
    private inMove: boolean;
    private movePoints: Point[];
    private index: number = 0;

    constructor (context: any, canvas: HTMLCanvasElement, sprite: Sprite){
        this.canvas = canvas;
        this.context = context;
        this.sprite = sprite;
    }
    
    displayGrid(xBlocks: number, yBlocks: number){

        for (let i = 0; i < xBlocks; i++ ) {
            this.context.beginPath();
            this.context.moveTo(i * (this.canvas.width / xBlocks) , 0);
            this.context.lineTo(i * (this.canvas.width / xBlocks), this.canvas.height);
            this.context.stroke();
        }
        for (let i=0; i<yBlocks; i++ ) {
            this.context.beginPath();
            this.context.moveTo(0,  i * (this.canvas.height / yBlocks));
            this.context.lineTo(this.canvas.width, i * (this.canvas.height / yBlocks));
            this.context.stroke();
        }

    }


    getPoints(): Point{
        return this.sprite.coord;
    }

    private draw = ():void => {
        this.inMove = true;
        this.context.clearRect(0,0, this.canvas.offsetWidth, this.canvas.height);
        
        this.displayGrid(4, 4);        

        this.sprite.move(this.moveTo);
        this.sprite.draw();

        if (!this.sprite.isFinished(this.moveTo)){
            this.raf = this.requestAnimationFrame(this.draw);
        }else{
            this.inMove = false;
            this.sprite.coord.x = this.moveTo.x;
            this.sprite.coord.y = this.moveTo.y;
            this.index++;
            this.step();
        }

    }
    
    move = (movePoints: Point[]): void => {

        if (this.inMove || movePoints.length == 0 ) {
            return;
        }
        this.movePoints = movePoints;
        this.index = 0;
        this.step();
    }    

    step(){
        
        if (this.index >= this.movePoints.length){
            return;
        }

        this.moveTo = this.movePoints[this.index];

        this.cancelAnimationFrame(this.raf);

        this.sprite.move(this.moveTo);

        this.raf = this.requestAnimationFrame(this.draw);

    }

}