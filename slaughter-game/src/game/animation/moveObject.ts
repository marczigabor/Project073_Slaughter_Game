import { DrawObject } from "./drawObject";
import { Point } from "../model/point";
import { Subject } from "rxjs";

export interface MoveObject extends DrawObject{
    setMove(moveTo: Point[]): void;
    isFinished(): boolean;
    readonly speedX: number;
    readonly speedY: number;
    readonly setMoveSubject: Subject<any>;
    readonly endStepSubject: Subject<any>;
    readonly name: string;
    readonly id: number;
    readonly isMoveObject: boolean;
}

