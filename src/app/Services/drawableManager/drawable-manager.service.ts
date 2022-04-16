import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Drawable } from '../../Classes/Drawable';
import { Edge } from '../../Classes/Edge';
import { Machine } from '../../Classes/Machine';
import { Point } from '../../Classes/Point';
import { Queue } from '../../Classes/Queue';
import { ControllerService } from '../controller/controller.service';
import { DrawableFactoryService } from '../drawableFactory/drawable-factory.service';

@Injectable({
  providedIn: 'root'
})
export class DrawableManagerService {
  drawables: Array<Drawable>;
  selectedDrawables: Array<Drawable>
  edgePoints: Array<Point>;
  factory: DrawableFactoryService;
  chosenQID!: number;
  serverSentEvent!: Subscription;
  nextId: number;
  nextEdgeId: number;
  edges!: Map<number, Edge>;
  
  constructor(factory: DrawableFactoryService, controller: ControllerService) {
    this.factory = factory;
    this.drawables = new Array<Drawable>();
    this.selectedDrawables = new Array<Drawable>();
    this.edgePoints = new Array<Point>();
    sessionStorage.setItem('isRunning',JSON.stringify(false));
    this.edges = new Map<number, Edge>();
    this.nextId = 0;
    this.nextEdgeId = 0;
  }

  createDrawable(type: string, center: Point) {
    let id: number = 0;
    switch (type) {
      case "queue":
          this.drawables.push(this.factory.createDrawable(type, this.nextId++, center));
        break;
      case "machine":
          this.drawables.push(this.factory.createDrawable(type, this.nextId++, center));
        break;
    }
  }

  select(drawable: Drawable, e: MouseEvent) {
    if (this.selectedDrawables.length == 1) {
      this.selectedDrawables.push(drawable);
      this.edgePoints.push(new Point(e.offsetX, e.offsetY));
      if (this.selectedDrawables[0].getType() == this.selectedDrawables[1].getType()) {
        this.selectedDrawables = [] as Drawable[];
        this.edgePoints = [] as Point[];
        return;
      }
      else if (this.selectedDrawables[0] instanceof Machine && this.selectedDrawables[1] instanceof Queue) {
        if (this.selectedDrawables[0].center.x < this.selectedDrawables[1].center.x) {
          this.edges.set(this.nextEdgeId,this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1], this.nextEdgeId++));
          this.selectedDrawables[1].nextMachine.push(this.selectedDrawables[0]);
        }
        else if (this.selectedDrawables[0].center.x > this.selectedDrawables[1].center.x
          && this.selectedDrawables[0].hasLeftEdge == false) {
          this.edges.set(this.nextEdgeId, this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1], this.nextEdgeId++));
          this.selectedDrawables[0].hasLeftEdge = true;
          this.selectedDrawables[0].nextQueue = this.selectedDrawables[1];
        }
      }
      else if (this.selectedDrawables[1] instanceof Machine && this.selectedDrawables[0] instanceof Queue) {
        if (this.selectedDrawables[1].center.x > this.selectedDrawables[0].center.x
          && this.selectedDrawables[1].hasLeftEdge == false) {
          this.edges.set(this.nextEdgeId ,this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1], this.nextEdgeId++));
          this.selectedDrawables[1].hasLeftEdge = true;
          this.selectedDrawables[1].nextQueue = this.selectedDrawables[0];
        }
        else if (this.selectedDrawables[1].center.x < this.selectedDrawables[0].center.x) {
          this.edges.set(this.nextEdgeId, this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1], this.nextEdgeId++));
          this.selectedDrawables[0].nextMachine.push(this.selectedDrawables[1]);
        }
      }
      this.selectedDrawables = [] as Drawable[];
      this.edgePoints = [] as Point[];
      return;
    } else {
      this.selectedDrawables.push(drawable);
      this.edgePoints.push(new Point(e.offsetX, e.offsetY));
    }
  }

  reset() {
    this.drawables = [] as Drawable[];
    this.edges.clear();
    this.nextId = 0;
    this.factory.nextMachineNumber = 0;
    this.factory.nextQueueNumber = 0;
    this.serverSentEvent.unsubscribe();
    sessionStorage.setItem('isRunning',JSON.stringify(false));
  }

  getInitialQueue(queueNumber: number) {
    this.drawables.forEach((drawable: Drawable) => {
      if (drawable instanceof Queue) {
        if (drawable.queueNumber == queueNumber) this.chosenQID = drawable.id;
      }
    });
  }

  setMachineFillColor(id: number, fillColor: string) {
    this.drawables.forEach((drawable: Drawable) => {
      if (drawable instanceof Machine) {
        if (drawable.id == id) drawable.setFillColor(fillColor);
      }
    });
  }

  setNumberOfProducts(id: number, numberOfProducts: number) {
    this.drawables.forEach((drawable: Drawable) => {
      if (drawable instanceof Queue) {
        if (drawable.id == id) drawable.setNumberOfProducts(numberOfProducts);
      }
    });
  }

  getTotalProducts() {
    return JSON.parse(sessionStorage.getItem('numberOfProducts') as string);
  }

  run(totalProducts: number) {
    sessionStorage.setItem('isRunning',JSON.stringify(true));
  }

  replay(totalProducts: number) {
    this.drawables.forEach((drawable: Drawable) => {
      if (drawable instanceof Queue) {
        drawable.numberOfProducts = 0;
      }else if(drawable instanceof Machine){
        drawable.fillColor = '#ffffff';
      }
    });
    sessionStorage.setItem('isRunning',JSON.stringify(true));
  }

}