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
    private isObjectsMoving: boolean;
    private init1: boolean = true;

    constructor (canvas: HTMLCanvasElement, context: any){
        this.objects = [];
        this.canvas = canvas;
        this.context = context;
    }

    addDrawObject(object: DrawObject){

        object.notificationSubject.subscribe(
            () => {
                if (!this.isObjectsMoving){
                    this.requestAnimationFrame(this.draw);
                }
            }
        );

        this.objects.push(object);
    }

    public init(){
        this.draw();
    }

    public draw = ():void => {

        this.isObjectsMoving = false;

        this.cancelAnimationFrame(this.raf);

        this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

        this.objects.forEach (object => {

            if (this.init1 || (object.speedX > 0 && object.speedY > 0)){
                 object.update();
            }
            if (!this.isObjectsMoving){
                this.isObjectsMoving = !object.isFinished();
            }
        });  
        this.init1 = false;

        if (this.isObjectsMoving){
            this.raf = this.requestAnimationFrame(this.draw);
        } 
    }
}