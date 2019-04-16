import { Point } from "../point";
import { DrawObject } from "./drawObject";

export class GameAnimation {

    private requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
    
    private cancelAnimationFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame;

    private raf: number;
    private canvas: HTMLCanvasElement;
    private context: any; 
    private object: DrawObject; 

    private moveTo: Point;
    //private inMove: boolean;
    private movePoints: Point[];
    private index: number = 0;
    
    private blokCountX: number = 0;
    private blokCountY: number = 0;

    constructor (context: any, canvas: HTMLCanvasElement, object: DrawObject, blokCountX: number, blokCountY: number){
        this.canvas = canvas;
        this.context = context;
        this.object = object;
        this.blokCountX = blokCountX;
        this.blokCountY = blokCountY;
    }
    
    // displayGrid(xBlocks: number, yBlocks: number){

    //     for (let i = 0; i < xBlocks; i++ ) {
    //         this.context.beginPath();
    //         this.context.moveTo(i * (this.canvas.width / xBlocks) , 0);
    //         this.context.lineTo(i * (this.canvas.width / xBlocks), this.canvas.height);
    //         this.context.stroke();
    //     }
    //     for (let i=0; i<yBlocks; i++ ) {
    //         this.context.beginPath();
    //         this.context.moveTo(0,  i * (this.canvas.height / yBlocks));
    //         this.context.lineTo(this.canvas.width, i * (this.canvas.height / yBlocks));
    //         this.context.stroke();
    //     }

    // }


    getPoints(): Point{
        return this.object.coord;
    }

    private draw = ():void => {
        //this.inMove = true;
        this.context.clearRect(this.object.coord.x-5, this.object.coord.y-5, this.object.displayWidth+5, this.object.displayHeight+5);
        
        //this.displayGrid(this.blokCountX, this.blokCountY); 

        this.object.move(this.moveTo);
        this.object.draw();

        if (!this.object.isFinished(this.moveTo)){
            this.raf = this.requestAnimationFrame(this.draw);
        }else{
            //this.inMove = false;
            this.object.coord.x = this.moveTo.x;
            this.object.coord.y = this.moveTo.y;
            this.index++;
            this.step();
        }
    }
    
    move = (movePoints: Point[]): void => {

        // if (this.inMove || movePoints.length == 0 ) {
        //     return;
        // }

        this.context.clearRect(this.object.coord.x-50, this.object.coord.y-50, 2*this.object.displayWidth, 2*this.object.displayHeight);
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

        this.object.move(this.moveTo);

        this.raf = this.requestAnimationFrame(this.draw);

    }

}