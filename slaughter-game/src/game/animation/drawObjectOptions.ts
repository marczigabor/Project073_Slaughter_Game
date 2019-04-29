import { Point } from "../model/point";

export interface DrawObjectOptions{
    image: HTMLImageElement;
    displayWidth: number; 
    displayHeight: number; 
    context: any;
    frameWidth: number;
    frameHeight: number;
    speedX: number;
    speedY: number;
    coord: Point;
    name?: string;
}