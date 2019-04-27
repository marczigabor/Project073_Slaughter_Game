export class Canvas {
    
    canvas: HTMLCanvasElement;
    context:CanvasRenderingContext2D; 

    canvasBackground: HTMLCanvasElement;
    contextBackground:CanvasRenderingContext2D; 

    constructor(container: HTMLElement, backgroundColor: string) {

        this.canvas = this.getCanvasNode(container.offsetWidth, container.offsetHeight, 'transparent');
        this.canvasBackground = this.getCanvasNode(container.offsetWidth, container.offsetHeight, backgroundColor);

        this.context = this.getContext(this.canvas);
        this.contextBackground = this.getContext(this.canvasBackground);

        container.appendChild(this.canvasBackground);
        container.appendChild(this.canvas);
    }

    private getContext(canvas: HTMLCanvasElement): any {
        return canvas.getContext("2d");
    }

    private getCanvasNode(width: number, height: number, color: string): HTMLCanvasElement{
        
        let canvas = document.createElement("canvas");

        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';

        canvas.width = width;
        canvas.height = height;
        canvas.style.backgroundColor = color;

        return canvas;
    }

    get width(): number {
        return this.canvas.offsetWidth;
    }

    get height(): number {
        return this.canvas.offsetHeight;
    }
    
}
