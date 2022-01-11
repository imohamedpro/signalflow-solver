import { Injectable } from '@angular/core';
import { Drawable } from 'src/app/Classes/Drawable';
import { Machine } from 'src/app/Classes/Machine';
import { Point } from 'src/app/Classes/Point';
import { Queue } from 'src/app/Classes/Queue';

@Injectable({
  providedIn: 'root'
})
export class DrawableFactoryService {

  constructor() { }

  createDrawable(type: string, id: number, center: Point): Drawable{
    let drawable: Drawable = new Queue(id, center);
    switch(type){
      case 'queue':
        drawable = new Queue(id, center);
        break;
      case 'machine':
        drawable = new Machine(id, center);
        break;
    }
    return drawable;
  }
}
