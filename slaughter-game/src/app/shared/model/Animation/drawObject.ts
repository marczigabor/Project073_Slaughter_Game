import { Point } from "../point";

export interface DrawObject{
    draw(): void;
    move (moveTo: Point): void;
    isFinished(moveTo: Point): boolean;
    readonly coord: Point;
    readonly displayWidth: number;
    readonly displayHeight: number;    
}