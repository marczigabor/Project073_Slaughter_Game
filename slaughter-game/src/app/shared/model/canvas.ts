export class Canvas {
    private _width: number;
    private _height: number;
    private _backgroundColor: string;
    private _canvas: HTMLCanvasElement;
    private _context:any; 


    constructor(width: number, height: number, backgroundColor: string) {
        this._height = height;
        this._width = width;
        this._backgroundColor = backgroundColor;
    }

    createCanvasNode(): HTMLCanvasElement{
        this._canvas = document.createElement("canvas");
        this._context = this.canvas.getContext("2d");

        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._canvas.style.backgroundColor = this._backgroundColor;

        return this._canvas;
    }


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

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
    
    get backgroundColor(): string {
        return this._backgroundColor;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get context(): any {
        return this._context;
    }
    
}
