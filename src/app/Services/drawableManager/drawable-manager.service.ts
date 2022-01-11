import { Injectable } from '@angular/core';
import { Drawable } from 'src/app/Classes/Drawable';
import { Point } from 'src/app/Classes/Point';
import { DrawableFactoryService } from '../drawableFactory/drawable-factory.service';

@Injectable({
  providedIn: 'root'
})
export class DrawableManagerService {

  drawables: Map<number, Drawable>;
  nextId: number;

  constructor(private factory: DrawableFactoryService) {
    this.drawables = new Map<number, Drawable>();
    this.nextId = 0;
  }

  createDrawable( type: string, center: Point){
    this.drawables.set(this.nextId, this.factory.createDrawable(type, this.nextId, center));
    ++this.nextId;
  }

  reset(){
    this.drawables.clear();
    this.nextId = 0;
    this.factory.nextMachineNumber = 0;
  }

}
