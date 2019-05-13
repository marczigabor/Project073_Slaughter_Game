import { Point } from "../model/point";
import { Subject } from "rxjs";

export interface DrawObject{
    update(): void;
    getCoords(): Point;
}

