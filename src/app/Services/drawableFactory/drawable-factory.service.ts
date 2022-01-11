import { Injectable } from '@angular/core';
import { Drawable } from 'src/app/Classes/Drawable';
import { Edge } from 'src/app/Classes/Edge';
import { Machine } from 'src/app/Classes/Machine';
import { Point } from 'src/app/Classes/Point';
import { Queue } from 'src/app/Classes/Queue';

@Injectable({
  providedIn: 'root'
})
export class DrawableFactoryService {
  nextMachineNumber!: number;
  nextQueueNumber!: number;

  constructor() {
    this.nextMachineNumber = 0;
    this.nextQueueNumber = 0;
   }

  createDrawable(type: string, id: number, center: Point): Drawable{
    if(type == 'queue'){
      return new Queue(id,this.nextQueueNumber++, center);
    }
    return new Machine(id,this.nextMachineNumber++, center);
  }

  connectDrawables(id: number, center1: Point, center2: Point): Drawable{
    return new Edge(id, center1, center2);
  }

}
