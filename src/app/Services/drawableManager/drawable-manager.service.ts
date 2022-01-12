import { Injectable } from '@angular/core';
import { Drawable } from 'src/app/Classes/Drawable';
import { Edge } from 'src/app/Classes/Edge';
import { Machine } from 'src/app/Classes/Machine';
import { Point } from 'src/app/Classes/Point';
import { Queue } from 'src/app/Classes/Queue';
import { DrawableFactoryService } from '../drawableFactory/drawable-factory.service';

@Injectable({
  providedIn: 'root'
})
export class DrawableManagerService {

  drawables: Map<number, Drawable>;
  selectedDrawables: Array<Drawable>
  edgePoints: Array<Point>;
  nextId: number;
  factory: DrawableFactoryService;
  chosenQID!: number;
  edges!: Array<Edge>;
  
  constructor(factory: DrawableFactoryService) {
    this.factory = factory;
    this.drawables = new Map<number, Drawable>();
    this.selectedDrawables = new Array<Drawable>();
    this.edgePoints = new Array<Point>();
    this.edges = new Array<Edge>();
    this.nextId = 0;
  }

  createDrawable(type: string, center: Point){
    this.drawables.set(this.nextId, this.factory.createDrawable(type, this.nextId, center));
    ++this.nextId;
  }

  select(drawable: Drawable, e: MouseEvent){
    if(this.selectedDrawables.length == 1){
      this.selectedDrawables.push(drawable);
      this.edgePoints.push(new Point(e.offsetX, e.offsetY));
      console.log(this.selectedDrawables);
      if(this.selectedDrawables[0].getType() == this.selectedDrawables[1].getType()){
        this.selectedDrawables = [] as Drawable[];
        this.edgePoints = [] as Point[];
        return;
      }
      else if(this.selectedDrawables[0] instanceof Machine && this.selectedDrawables[1] instanceof Queue){
        if(this.selectedDrawables[0].center.x < this.selectedDrawables[1].center.x
          && this.selectedDrawables[0].hasRightEdge == false){
            this.edges.push(this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1]));
            ++this.nextId;
            this.selectedDrawables[0].hasRightEdge = true;
            this.selectedDrawables[1].nextMachine.push(this.selectedDrawables[0]); 
          }
        else if(this.selectedDrawables[0].center.x > this.selectedDrawables[1].center.x
          && this.selectedDrawables[0].hasLeftEdge == false){
            this.edges.push(this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1]));
            ++this.nextId;
            this.selectedDrawables[0].hasLeftEdge = true;
            this.selectedDrawables[0].nextQueue = this.selectedDrawables[1];
          }
      }
      else if(this.selectedDrawables[1] instanceof Machine && this.selectedDrawables[0] instanceof Queue){
        if(this.selectedDrawables[1].center.x > this.selectedDrawables[0].center.x
          && this.selectedDrawables[1].hasLeftEdge  == false){
            this.edges.push(this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1]));
            ++this.nextId;
            this.selectedDrawables[1].hasLeftEdge = true;
            this.selectedDrawables[1].nextQueue = this.selectedDrawables[0];
          }
        else if(this.selectedDrawables[1].center.x < this.selectedDrawables[0].center.x
          && this.selectedDrawables[1].hasRightEdge == false){
            this.edges.push(this.factory.connectDrawables(this.edgePoints[0], this.edgePoints[1]));
            ++this.nextId;
            this.selectedDrawables[1].hasRightEdge = true;
            this.selectedDrawables[0].nextMachine.push(this.selectedDrawables[1]); 
          }
      }
      this.selectedDrawables = [] as Drawable[];
      this.edgePoints = [] as Point[];
      return;
    }else{
      this.selectedDrawables.push(drawable);
      this.edgePoints.push(new Point(e.offsetX, e.offsetY));
      console.log(this.selectedDrawables);
    }
  }

  reset(){
    this.drawables.clear();
    this.edges = [] as Edge[];
    this.nextId = 0;
    this.factory.nextMachineNumber = 0;
    this.factory.nextQueueNumber = 0;
  }

  getInitialQueue(queueNumber: number){
    this.drawables.forEach((drawable: Drawable) => {
      if(drawable instanceof Queue){
        if(drawable.queueNumber == queueNumber) this.chosenQID = drawable.id;
      }
    });
  }

  //To be called to change machine color (product)
  setMachineFillColor(id: number, fillColor: string){
    this.drawables.forEach((drawable: Drawable, key: number) => {
      if(drawable instanceof Machine){
        if(key == id) drawable.setFillColor(fillColor);
      }
    });
  }
  
  //To be called to change queue size 
  setNumberOfProducts(id: number, numberOfProducts: number){
    this.drawables.forEach((drawable: Drawable, key: number) => {
      if(drawable instanceof Queue){
        if(key == id) drawable.setNumberOfProducts(numberOfProducts);
      }
    });
  }

  getTotalProducts(){
    return JSON.parse(sessionStorage.getItem('numberOfProducts') as string);
  }

  run(totalProducts: number){ //API call here
    //this.chosenQID for the initial Queue ID
  }
  
  replay(totalProducts: number){ //API call here
    //this.chosenQID for the initial Queue ID
  }
  
}
