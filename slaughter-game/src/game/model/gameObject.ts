import { Point } from "./point";
import { MoveObject } from "../animation/moveObject";

export class GameObject{

    public coords: Point;
    public UIObject: MoveObject;

    /**
     *
     */
    constructor(uiObject: MoveObject) {
        this.UIObject = uiObject;
    }

    public get Id() : number {
        return this.UIObject.id;
    }
    
} 