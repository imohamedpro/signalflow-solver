import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Point } from 'src/app/Classes/Point';

@Component({
  selector: '[edge]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent implements OnInit {
  @Input() edge!: any;
  path_value!: string;
  rx: number = 0;
  ry: number = 0;
  // sweepFlag: number = 0;
  cx: number = 0;
  cy: number = 0;
  isLeftTriangle: boolean = false;
  isDragging: boolean = false;
  id!: string;
  initialClick!: Point;
  triangle_points!: string;
  constructor() { }

  ngOnInit(): void {
    this.id = "path" + this.edge.id;
    this.updatePath().then(() => this.updateCircle());
  }

  ngAfterViewInit() {
  }

  updatePath() {
    return new Promise<void>((resolve, reject) => {
      this.path_value = "M" + this.edge.center1.x + "," + this.edge.center1.y + " Q" + this.rx + " " + this.ry + " " + this.edge.center2.x + "," + this.edge.center2.y;
      resolve();
    });
  }

  updateCircle() {
    let path: any = document.getElementById(this.id);
    console.log(path);
    let pathLength = Math.floor(path.getTotalLength());
    let pt = path.getPointAtLength(0.5 * pathLength);
    console.log(pt);
    this.cx = Math.round(pt.x);
    this.cy = Math.round(pt.y);
    this.updateTriangle();
  }

  updateTriangle() {
    if (this.isLeftTriangle)
      this.triangle_points = this.cx + "," + this.cy + " " + (this.cx + 10) + "," + (this.cy - 7) + " " + (this.cx + 10) + "," + (this.cy + 7);
    else
      this.triangle_points = this.cx + "," + this.cy + " " + (this.cx - 10) + "," + (this.cy - 7) + " " + (this.cx - 10) + "," + (this.cy + 7);
  }

  rightClick(e: MouseEvent) {
    if (e.button == 1) {
      this.isLeftTriangle = !this.isLeftTriangle;
    }
  }

  mouseDown(e: MouseEvent) {
    if (e.button == 0) {
      this.isDragging = true;
      this.initialClick = new Point(e.clientX, e.clientY);
    }
    else if (e.button == 2) {
      this.isLeftTriangle = !this.isLeftTriangle;
    }
  }

  mouseMove(e: MouseEvent) {
    if (this.isDragging) {
      let offsetX = e.clientX - this.initialClick.x;
      let offsetY = e.clientY - this.initialClick.y;
      this.cx += offsetX;
      this.cy += offsetY;
      this.rx += offsetX;
      this.ry += offsetY;
      this.updateTriangle();
      this.updatePath();
      this.initialClick = new Point(e.clientX, e.clientY);
    }
  }

  mouseUp(e: MouseEvent) {
    console.log("isDragging = false")
    this.isDragging = false;
    this.updateCircle();
  }
}
