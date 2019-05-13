import { DrawObject } from "./drawObject";
import { MoveObject } from "./moveObject";

export class GameAnimation {

    private requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
    
    private cancelAnimationFrame = window.cancelAnimationFrame ||
             window.webkitCancelAnimationFrame;

    private raf: number;
    private canvas: HTMLCanvasElement;
    private context: any; 
    private moveObjects: MoveObject[]; 
    private backGroundObjects :DrawObject[]; 
    private isObjectsMoving: boolean;

    constructor (canvas: HTMLCanvasElement, context: any){
        this.moveObjects = [];
        this.backGroundObjects = [];
        this.canvas = canvas;
        this.context = context;
    }

    addDrawObject(object: DrawObject){

        const moveObject = object as MoveObject;

        if (moveObject.isMoveObject){
            moveObject.setMoveSubject.subscribe(
                () => {
                    if (!this.isObjectsMoving){
                        this.requestAnimationFrame(this.draw);
                    }
                }
            )
            this.moveObjects.push(moveObject);
        }else {
            this.backGroundObjects.push(object);
        }  
    }

    public init(){
        this.drawBackGround();
        this.draw();
    }

    public drawBackGround = ():void => {
        this.backGroundObjects.forEach(element => {
            element.update();
        });
    }

    public draw = ():void => {

        this.isObjectsMoving = false;

        this.cancelAnimationFrame(this.raf);

        this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

        this.moveObjects.forEach(object => {

            object.update();
            if (!this.isObjectsMoving){
                this.isObjectsMoving = !object.isFinished();
            }
        });  

        if (this.isObjectsMoving){
            this.raf = this.requestAnimationFrame(this.draw);
        } 
    }
}