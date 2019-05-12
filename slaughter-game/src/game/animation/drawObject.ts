import { Point } from "../model/point";
import { Subject } from "rxjs";

export interface DrawObject{
    update(): void;
    setMove(moveTo: Point[]): void;
    isFinished(): boolean;
    getCoords(): Point;
    readonly speedX: number;
    readonly speedY: number;
    readonly setMoveSubject: Subject<any>;
    readonly name: string;
}

