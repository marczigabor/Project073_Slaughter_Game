import { DrawObjectOptions } from "./Animation/drawObjectOptions";
import { Sprite3x3 } from "./Animation/sprite3x3";
import { Point } from "./point";
import { DrawObject } from "./Animation/drawObject";
import { Field } from "./Animation/field";
import { Map } from "./map";
import { Injector } from "@angular/core";

export class DrawObjectFactory{

    private context: CanvasRenderingContext2D;
    private contextBackground: CanvasRenderingContext2D;
    private blockSize: Point;
    private canvasSize: Point;

    constructor(context: CanvasRenderingContext2D, contextBackground: CanvasRenderingContext2D, blockSize: Point, canvasSize: Point){
        this.context = context;
        this.contextBackground = contextBackground;
        this.blockSize = blockSize;
        this.canvasSize = canvasSize;
    }

    getFields(map: Map): Promise<DrawObject[]>{

        let fields: Field[] = [];
        var that = this;
        
        return new Promise(function(resolve) {

            var imageField = new Image();
            imageField.src = "assets/image/fields/grass.png";    
    
            var imageRock = new Image();
            imageRock.src = "assets/image/fields/rock2.png";    

            imageField.onload = (ev: Event) => {
    
                for (let i = 0; i < map.width; i++)
                {
                    for (let j=0; j<map.height; j++)
                    {
                        fields.push(new Field(that.getOptions(that.contextBackground, imageField, i, j)));
    
                        if(map.getValueOfBlock(i, j) == 0){
                            fields.push(new Field(that.getOptions(that.contextBackground, imageRock, i, j)));
                        }
    
                    }
                }
                resolve(fields);
            }
          });


    }

    private getOptions(context: CanvasRenderingContext2D, image: HTMLImageElement, i: number, j: number): DrawObjectOptions{

        const options: DrawObjectOptions = {
            context: context,
            frameHeight: 32,
            frameWidth: 32,
            displayHeight: this.blockSizeY,
            displayWidth: this.blockSizeX,
            image: image,
            speedX: 0,
            speedY: 0,
            coord:{
                x: this.blockSizeX * i,
                y: this.blockSizeY * j
            }
        }

        return options;
    }

    getCharacter(num: number): Promise<DrawObject>{

        //var that = this;
        return new Promise((resolve)=> {

            var image = new Image();
            switch (num){
                case 0:
                    image.src = "assets/image/characters/yuffiekisaragi.png";    
                    break;
                case 1:
                    image.src = "assets/image/characters/captainamerica_shield.png";    
                    break;
                case 2:
                    image.src = "assets/image/characters/elphaba3.png";    
                    break;
                case 3:
                    image.src = "assets/image/characters/england.png";    
                    break;
                case 4:
                    image.src = "assets/image/characters/pirate_m2.png";    
                    break;
                case 5:
                    image.src = "assets/image/characters/china.png";    
                    break;
            }

            image.onload = (ev: Event) => {

                const speed = 1.5;//(Math.random() * 3) + 0.2;
                const options: DrawObjectOptions = {
                    context: this.context,
                    frameHeight: 48,
                    frameWidth: 32,
                    displayHeight: this.blockSizeY,
                    displayWidth: this.blockSizeX,
                    image: image,
                    speedX: speed,
                    speedY: speed,
                    coord:{
                        x: (Math.random() * this.canvasSize.x) + 1,
                        y: (Math.random() * this.canvasSize.y) + 1
                    },
                    name: image.src.split('/')[6]
                }
    
                const character = new Sprite3x3(options);
                resolve(character);
            }
        });    
    }

    private get blockSizeX() {
        return this.canvasSize.x / this.blockSize.x;
    }

    private get blockSizeY() {
        return this.canvasSize.y / this.blockSize.y;
    }

}