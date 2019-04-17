import { Point } from "../point";
import { Subject } from "rxjs";

export interface DrawObject{
    update(): void;
    moveArray(moveTo: Point[]): void;
    isFinished(): boolean;
    getCoords(): Point;
    readonly notificationSubject: Subject<any>;
}