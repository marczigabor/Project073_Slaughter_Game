import { Point } from "./point";
import { Direction } from "./direction";

export class GameAnimation {

    private _requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
    
    private _cancelAnimationFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame;

    private _raf: number;
    private _canvas: HTMLCanvasElement;
    private _context:any; 

    private _moveTo: Point;
    //private _moveFrom: Point;
    private _moveDirection: Direction;
    private inMove: boolean;
    private movePoints: Point[];
    private  index: number = 0;

    constructor (context: any, canvas: HTMLCanvasElement){
        this._canvas = canvas;
        this._context = context;
    }

    private ball = {
        x: 0,
        y: 0,
        vx: 5,
        vy: 5,
        radius: 50,
        color: 'blue',
    };

    private ballDraw = ()=> {
        this._context.beginPath();
        this._context.arc(this.ball.x + this.ball.radius+50, this.ball.y + this.ball.radius+40, this.ball.radius, 0, Math.PI * 2, true);
        this._context.closePath();
        this._context.fillStyle = this.ball.color;
        this._context.fill();
    };
    
    displayGrid(xBlocks: number, yBlocks: number){

        for (let i = 0; i < xBlocks; i++ ) {
            this._context.beginPath();
            this._context.moveTo(i * (this._canvas.width / xBlocks) , 0);
            this._context.lineTo(i * (this._canvas.width / xBlocks), this._canvas.height);
            this._context.stroke();
        }
        for (let i=0; i<yBlocks; i++ ) {
            this._context.beginPath();
            this._context.moveTo(0,  i * (this._canvas.height / yBlocks));
            this._context.lineTo(this._canvas.width, i * (this._canvas.height / yBlocks));
            this._context.stroke();
        }

    }

    private draw = ():void => {
        this.inMove = true;
        this._context.clearRect(0,0, this._canvas.offsetWidth, this._canvas.height);
        
        this.displayGrid(4, 4);        
        this.ballDraw();
        

        switch (this._moveDirection){
            case Direction.Down:
                this.ball.y += this.ball.vy;
                break;
            case Direction.Up:
                this.ball.y -= this.ball.vy;
                break;
            case Direction.Left:
                this.ball.x -= this.ball.vx;
                break;
            case Direction.Right:
                this.ball.x += this.ball.vx;
                break;
        }
       
        switch (this._moveDirection){
            case Direction.Down:
            case Direction.Up:
                if (Math.abs(this.ball.y - this._moveTo.y) >5){
                    this._raf = this._requestAnimationFrame(this.draw);
                }else {
                    this.inMove = false;
                    this.ball.x = this._moveTo.x;
                    this.ball.y = this._moveTo.y;
                    this.index++;
                    this.step();
                }
                break;
            case Direction.Left:
            case Direction.Right:
                if (Math.abs(this.ball.x - this._moveTo.x) > 5){
                    this._raf = this._requestAnimationFrame(this.draw);
                }else {
                    this.inMove = false;
                    this.ball.x = this._moveTo.x;
                    this.ball.y = this._moveTo.y;
                    this.index++;
                    this.step();
                }
                break;
        }

    }

    getBallPoints(): Point{
        return new Point(this.ball.x, this.ball.y);
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

        this._moveTo = this.movePoints[this.index];

        this._cancelAnimationFrame(this._raf);

        if ((this._moveTo.x - this.ball.x) > 0){
            this._moveDirection = Direction.Right;
        }else if ((this._moveTo.x - this.ball.x) < 0){
            this._moveDirection = Direction.Left;
        }
        if ((this._moveTo.y - this.ball.y) > 0){
            this._moveDirection = Direction.Down;
        } else if ((this._moveTo.y - this.ball.y) < 0){
            this._moveDirection = Direction.Up;
        }

        this._raf = this._requestAnimationFrame(this.draw);

    }

}