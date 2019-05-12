import { fromEvent, Observable } from "rxjs";

export class InputHandler {

    constructor(private canvas: HTMLCanvasElement){
    }

    init (): Observable<Event>{
        return fromEvent(this.canvas, 'click');
    }
}