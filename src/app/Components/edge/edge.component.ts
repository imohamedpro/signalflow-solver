import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Point } from 'src/app/Classes/Point';
import { ManagerService } from '../../Services/manager/manager.service';

@Component({
  selector: '[edge]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent implements OnInit {
  @Input() edge!: any;
  manager: ManagerService;
  id!: string;
  initialClick!: Point;

  constructor(manager: ManagerService) { 
    this.manager = manager;
  }

  ngOnInit(): void {
    this.id = "edge" + this.edge.id;
    this.edge.updatePath().then(this.edge.updateArrow);
    this.edge.updatePath().then(() => this.edge.updateArrow());
  }

  ngAfterViewInit() {
  }

  // rightClick(e: MouseEvent) {
  //   if (e.button == 1) {
      
  //   }
  // }

  triangleClick(e: MouseEvent){
    if((this.manager.state == 'addEdge') || (this.manager.state == 'move')){
      if(e.button == 0){
        this.edge.isSelected = !this.edge.isSelected;
      }
      else if(e.button == 2){
        // change from, to -> update arrow
        let temp = this.edge.endPoint1;
        this.edge.endPoint1 = this.edge.endPoint2;
        this.edge.endPoint2 = temp;
        this.edge.updatePath().then(() => this.edge.updateArrow());
      }
    }
  }

  mouseDown(e: MouseEvent) {
    if (e.button == 0) {
      this.edge.isDragging = true;
      this.initialClick = new Point(e.clientX, e.clientY);
    }
    else if (e.button == 2) {
      this.edge.isLeftTriangle = !this.edge.isLeftTriangle;
    }
  }

  mouseMove(e: MouseEvent) {
    if (this.edge.isDragging) {
      let offsetX = e.clientX - this.initialClick.x;
      let offsetY = e.clientY - this.initialClick.y;
      this.edge.curveCenter.x += offsetX;
      this.edge.curveCenter.y += offsetY;
      this.edge.updatePath().then(() => this.edge.updateArrow());
      this.initialClick = new Point(e.clientX, e.clientY);
    }
  }

  mouseUp(e: MouseEvent) {
    console.log("isDragging = false")
    this.edge.isDragging = false;
  }

  avoidP(e: any) {
    e.stopPropagation();
  }

}
