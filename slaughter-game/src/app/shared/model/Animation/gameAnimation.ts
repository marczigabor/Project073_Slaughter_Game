import { DrawObject } from "./drawObject";

export class GameAnimation {

    private requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
    
    private cancelAnimationFrame = window.cancelAnimationFrame ||
             window.webkitCancelAnimationFrame;

    private raf: number;
    private canvas: HTMLCanvasElement;
    private context: any; 
    private objects: DrawObject[]; 

    constructor (canvas: HTMLCanvasElement, context: any){
        this.objects = [];
        this.canvas = canvas;
        this.context = context;
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

    addDrawObject(object: DrawObject){

        object.notificationSubject.subscribe(
            () => {this.draw()}
        );

        this.objects.push(object);
    }

    private draw = ():void => {
        let isMoving: boolean = false;
        
        this.cancelAnimationFrame(this.raf);

        this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

        this.objects.forEach (object => {

            object.update();
            if (!isMoving){
                isMoving = !object.isFinished();
            }
        });  
        
        if (isMoving){
            this.raf = this.requestAnimationFrame(this.draw);
        } 
    }
}