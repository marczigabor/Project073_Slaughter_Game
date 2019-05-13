import { IRandomNumberService } from "./iRandom-number.service";

export class ArrayGenerator {

    static generateMapArray = (x: number, y: number, wallPercent: number, randomNumberService: IRandomNumberService): number[][] => {
        let array: number[][] = [];
        let j=0;

        for (let i=0; i < x; i++){

             array[i] = Array.from(Array(y), () => ArrayGenerator.getblockValue(wallPercent, randomNumberService));
        }

        return array;
    }

    private static getblockValue (wallPercent: number, randomNumberService: IRandomNumberService): number {
        let generated: number = 0;
        let returnValue = 1;

        if (wallPercent > 0){
            generated = randomNumberService.getRandomInt(0, 100);
            if (generated >= wallPercent){
                returnValue = 1;
            }else{
                returnValue = 0;
            }
        } else {
            generated = 1;
        }

        return returnValue;
    }
}