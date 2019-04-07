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
    private _moveFrom: Point;
    private _moveDirection: Direction;

    constructor (context: any, canvas: HTMLCanvasElement){
        this._canvas = canvas;
        this._context = context;
    }

    private ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 5,
        radius: 25,
        color: 'blue',
    };

    private ballDraw = ()=> {
        this._context.beginPath();
        this._context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2, true);
        this._context.closePath();
        this._context.fillStyle = this.ball.color;
        this._context.fill();
    };
    
    private draw = ():void => {
        this._context.clearRect(0,0, this._canvas.offsetWidth, this._canvas.height);
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
       
        if(Math.abs(this.ball.x - this._moveTo.x) > 10 || Math.abs(this.ball.y - this._moveTo.y) > 10 ){
            this._raf = this._requestAnimationFrame(this.draw);
        }

        // if (this.ball.y + this.ball.vy > this._canvas.height ||
        //     this.ball.y + this.ball.vy < 0) {
        //         this.ball.vy = -this.ball.vy;
        // }
        // if (this.ball.x + this.ball.vx > this._canvas.width ||
        //     this.ball.x + this.ball.vx < 0) {
        //         this.ball.vx = -this.ball.vx;
        // }
        
    }
    
    move = (fromPoint: Point, toPoint: Point) => {

        this._moveFrom = fromPoint;
        this._moveTo = toPoint;

        if ((this._moveTo.x - this._moveFrom.x) > 0){
            this._moveDirection = Direction.Right;
        }else if ((this._moveTo.x - this._moveFrom.x) < 0){
            this._moveDirection = Direction.Left;
        }
        if ((this._moveTo.y - this._moveFrom.y) > 0){
            this._moveDirection = Direction.Down;
        } else if ((this._moveTo.y - this._moveFrom.y) < 0){
            this._moveDirection = Direction.Up;
        }


        this.ball.x = fromPoint.x;
        this.ball.y = fromPoint.y;
        this._raf = this._requestAnimationFrame(this.draw);

        // this._canvas.addEventListener('mouseover', (e) => {
        //     this._raf = this._requestAnimationFrame(this.draw);
        // });

        // this._canvas.addEventListener('mouseout', (e)=> {
        //     this._cancelAnimationFrame(this._raf);
        // });
    }    
}