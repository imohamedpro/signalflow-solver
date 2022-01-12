import { Injectable } from '@angular/core';
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
  edges!: Array<Edge>;

  constructor(factory: DrawableFactoryService, private controller: ControllerService) {
    this.factory = factory;
    this.drawables = new Array<Drawable>();
    this.selectedDrawables = new Array<Drawable>();
    this.edgePoints = new Array<Point>();
    this.edges = new Array<Edge>();
    this.controller.getServerSentEvent().subscribe(data => {
      console.log(data);
      let message = data.data.split(",");
      let id = Number(message[0]);
      switch (data.type) {
        case "Q":
          this.setNumberOfProducts(id, Number(message[1]));
          break;
        case "M":
          this.setMachineFillColor(id, message[1]);
          break;
      }
    });
  }

  createDrawable(type: string, center: Point) {
    let id: number = 0;
    switch (type) {
      case "queue":
        this.controller.addQueue().subscribe(data => {
          id = data;
          this.drawables.push(this.factory.createDrawable(type, id, center));
        })
        break;
      case "machine":
        this.controller.addMachine().subscribe(data => {
          id = data;
          this.drawables.push(this.factory.createDrawable(type, id, center));
        })
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
          this.edges.push(this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1]));
          this.selectedDrawables[1].nextMachine.push(this.selectedDrawables[0]);
          this.controller.setInput(this.selectedDrawables[0].id, this.selectedDrawables[1].id).subscribe();
        }
        else if (this.selectedDrawables[0].center.x > this.selectedDrawables[1].center.x
          && this.selectedDrawables[0].hasLeftEdge == false) {
          this.edges.push(this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1]));
          this.selectedDrawables[0].hasLeftEdge = true;
          this.selectedDrawables[0].nextQueue = this.selectedDrawables[1];
          this.controller.setOutput(this.selectedDrawables[0].id, this.selectedDrawables[1].id).subscribe();
        }
      }
      else if (this.selectedDrawables[1] instanceof Machine && this.selectedDrawables[0] instanceof Queue) {
        if (this.selectedDrawables[1].center.x > this.selectedDrawables[0].center.x
          && this.selectedDrawables[1].hasLeftEdge == false) {
          this.edges.push(this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1]));
          this.selectedDrawables[1].hasLeftEdge = true;
          this.selectedDrawables[1].nextQueue = this.selectedDrawables[0];
          this.controller.setOutput(this.selectedDrawables[1].id, this.selectedDrawables[0].id).subscribe();
        }
        else if (this.selectedDrawables[1].center.x < this.selectedDrawables[0].center.x) {
          this.edges.push(this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1]));
          this.selectedDrawables[0].nextMachine.push(this.selectedDrawables[1]);
          this.controller.setInput(this.selectedDrawables[1].id, this.selectedDrawables[0].id).subscribe();
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
    this.edges = [] as Edge[];
    this.factory.nextMachineNumber = 0;
    this.factory.nextQueueNumber = 0;
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
    this.controller.start(totalProducts).subscribe();
  }

  replay(totalProducts: number) {
    this.drawables.forEach((drawable: Drawable) => {
      if (drawable instanceof Queue) {
        drawable.numberOfProducts = 0;
      }else if(drawable instanceof Machine){
        drawable.fillColor = '#ffffff';
      }
    });
    this.controller.restart().subscribe();
  }

}