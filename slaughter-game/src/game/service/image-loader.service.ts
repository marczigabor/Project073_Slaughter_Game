export class ImageLoaderService {

  constructor() { }

  loadimage(url: string): Promise<HTMLImageElement> {
    
    return new Promise<HTMLImageElement>((resolve, reject) => {
      let image = new Image();
      image.src = url;    
  
      image.onload = (ev: Event) =>{
        resolve(image);
      }
  
      image.onerror = (ev: Event) =>{
        throw 'image not loaded: ' + url;
      }
    });
  }
}
