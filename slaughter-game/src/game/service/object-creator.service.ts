import { DrawObjectOptions } from '../animation/drawObjectOptions';
import { DrawObject } from '../animation/drawObject';
import { Field } from '../animation/field';
import { ImageLoaderService } from './image-loader.service';
import { Sprite3x3 } from '../animation/sprite3x3';
import { Point } from '../model/point';
import { MoveObject } from '../animation/moveObject';
import { GridService } from './grid.service';

export class ObjectCreatorService {

  constructor(private imageLoaderService: ImageLoaderService) { }

  getFields(map: GridService, contextBackground: CanvasRenderingContext2D, displaySize: Point): Promise<DrawObject[]>{

    let imageGrass: HTMLImageElement;
    let imageRock: HTMLImageElement;
  
    let fields: Field[] = [];
    var that = this;

    return new Promise((resolve: (arg0: Field[]) => void) => {

      let grassPromise = this.imageLoaderService.loadimage("assets/image/fields/grass.png");
      let rockPromise = this.imageLoaderService.loadimage("assets/image/fields/rock2.png");

      Promise.all([grassPromise, rockPromise]).then((values) => {
        imageGrass = values[0];
        imageRock = values[1];
      }).then(()=>{

        for (let i = 0; i < map.width; i++)
        {
            for (let j=0; j<map.height; j++)
            {
                fields.push(new Field(that.getOptions(contextBackground, imageGrass, i, j, displaySize, 0)));

                if(map.getValueOfBlock(i, j) == 0){
                    fields.push(new Field(that.getOptions(contextBackground, imageRock, i, j, displaySize, 0)));
                }
            }
        }
        resolve(fields);
      });
  });
}

private getOptions(context: CanvasRenderingContext2D, image: HTMLImageElement, i: number, j: number, displaySize: Point, id: number): DrawObjectOptions{

    const options: DrawObjectOptions = {
        context: context,
        frameHeight: 32,
        frameWidth: 32,
        displayWidth: displaySize.x,
        displayHeight: displaySize.y,
        image: image,
        speedX: 0,
        speedY: 0,
        id: id,
        coord:{
            x: displaySize.x * i,
            y: displaySize.y * j
        }
    }

    return options;
}

private characterSelctor(num: number): string{

  var path: string = '';
  switch (num){
      case 1:
          path = "assets/image/characters/yuffiekisaragi.png";    
          break;
      case 2:
          path =  "assets/image/characters/captainamerica_shield.png";    
          break;
      case 3:
          path  = "assets/image/characters/elphaba3.png";    
          break;
      case 4:
          path = "assets/image/characters/england.png";    
          break;
      case 5:
          path = "assets/image/characters/pirate_m2.png";    
          break;
      case 6:
          path = "assets/image/characters/china.png";    
          break;
  }

  return path;
}

// getCharacters(context: CanvasRenderingContext2D, startCoord: Point, blockSize: Point): Promise<DrawObject[]>{

//   let promises: Promise<DrawObject>[] = [];
//   for (let i=0; i<2; i++){
//     promises.push(this.getCharacter(i, context, startCoord, blockSize));
//   }

//   return new Promise<DrawObject[]>((resolve)=> {
//     Promise.all(promises).then((values)=>{
//       resolve(values);
//     });
//   }); 
// }

getCharacter(num: number, context: CanvasRenderingContext2D, startCoord: Point, blockSize: Point, speed: number): Promise<MoveObject>{

    return new Promise((resolve)=> {

      this.imageLoaderService.loadimage(this.characterSelctor(num)).then((image: HTMLImageElement) => {
    
        let originalSize = new Point(32, 48);
        let multiplier = blockSize.y / originalSize.y;

        let displaySize = new Point(originalSize.x * multiplier, originalSize.y * multiplier);

        const options: DrawObjectOptions = {
            context: context,
            frameHeight: 48,
            frameWidth: 32,
            displayWidth: displaySize.x,
            displayHeight: displaySize.y,
            image: image,
            speedX: speed,
            speedY: speed,
            id: num,
            coord:{
                x: startCoord.x,
                y: startCoord.y
            },
            name: image.src.split('/')[6].split('.')[0]
        }

        const character = new Sprite3x3(options);
        resolve(character);
      });
    });    
  }
}
