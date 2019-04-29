import { fromEvent, Observable } from "rxjs";

import { tap } from "rxjs/operators";

import { Point } from "../model/point";

export class InputHandler {

    constructor(private canvas: HTMLCanvasElement){
    }

    init (): Observable<Event>{
        return fromEvent(this.canvas, 'click');
    }
}