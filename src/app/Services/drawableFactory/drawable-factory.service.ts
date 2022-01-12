import { Injectable } from '@angular/core';
import { Drawable } from '../../Classes/Drawable';
import { Edge } from '../../Classes/Edge';
import { Machine } from '../../Classes/Machine';
import { Point } from '../../Classes/Point';
import { Queue } from '../../Classes/Queue';

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

  createDrawable(type: string, id: number, center: Point): Drawable {
    if (type == 'queue') {
      sessionStorage.setItem('nextQueueNumber', JSON.stringify(this.nextQueueNumber + 1));
      return new Queue(id, this.nextQueueNumber++, center);
    }
    return new Machine(id, this.nextMachineNumber++, center);
  }

  connectDrawables(center1: Point, center2: Point): Edge {
    return new Edge(center1, center2);
  }

}