export class GameAnimation {

    private _requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
    
    private _cancelAnimationFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame;

    private _raf: number;
    private _canvas: HTMLCanvasElement;
    private _context:any; 

    constructor (context: any, canvas: HTMLCanvasElement){
        this._canvas = canvas;
        this._context = context;
    }

    private ball = {
        x: 100,
        y: 100,
        vx: 15,
        vy: 12,
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
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;
        
        if (this.ball.y + this.ball.vy > this._canvas.height ||
            this.ball.y + this.ball.vy < 0) {
                this.ball.vy = -this.ball.vy;
        }
        if (this.ball.x + this.ball.vx > this._canvas.width ||
            this.ball.x + this.ball.vx < 0) {
                this.ball.vx = -this.ball.vx;
        }
        
        this._raf = this._requestAnimationFrame(this.draw);
    }
    
    start = () => {
        this._canvas.addEventListener('mouseover', (e) => {
            this._raf = this._requestAnimationFrame(this.draw);
        });

        this._canvas.addEventListener('mouseout', (e)=> {
            this._cancelAnimationFrame(this._raf);
        });
    }    
}