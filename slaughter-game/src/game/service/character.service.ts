import { GameObject } from "../model/gameObject";
import { ObjectCreatorService } from "./object-creator.service";
import { ImageLoaderService } from "./image-loader.service";
import { GridService } from "./grid.service";
import { MoveObject } from "../animation/moveObject";

export class CharacterService {

  private characters: GameObject[]

  constructor() {
    this.characters = [];
  }

  add(item: MoveObject) {
     //if (!this.characters.find((i :GameObject) => i.Id == item.id)){
      this.characters.push( new GameObject(item));
     //}
  }

  get (id: number): GameObject{
    return this.characters.find((i :GameObject) => i.Id == id);
  }

  getAll(id: number): GameObject[] {
    return this.characters.filter((i :GameObject) => i.Id == id);    
  }
}
