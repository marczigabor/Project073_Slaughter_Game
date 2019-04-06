export class Canvas {
    private _width: number;
    private _height: number;
    private _backgroundColor: string;
    private _canvasNode: HTMLCanvasElement;

    constructor(width: number, height: number, backgroundColor: string) {
        this._height = height;
        this._width = width;
        this._backgroundColor = backgroundColor;
    }

    createCanvasNode(): HTMLCanvasElement{
        this._canvasNode = document.createElement("canvas");
        this._canvasNode.width = this._width;
        this._canvasNode.height = this._height;
        this._canvasNode.style.backgroundColor = this._backgroundColor;

        return this._canvasNode;
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
    get canvasNode(): HTMLCanvasElement {
        return this._canvasNode;
    }
}
