import { Point } from "../point";
import { Subject } from "rxjs";

export interface DrawObject{
    update(): void;
    setMove(moveTo: Point[]): void;
    isFinished(): boolean;
    getCoords(): Point;
    readonly speedX: number;
    readonly speedY: number;
    readonly notificationSubject: Subject<any>;
    readonly name: string;
}

