import { MovementService } from './../../Services/movement/movement.service';
import { Component, Input, OnInit } from '@angular/core';
import { Point } from '../../Classes/Point';
import { Node } from '../../Classes/Node'
import { ManagerService } from '../../Services/manager/manager.service';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']
})
export class SketchComponent implements OnInit {
  _state!: string;
  manager: ManagerService;
  movement: MovementService;

  @Input() set state(value: string) {
    this._state = value;

    if (this._state == 'clear') {
      this.manager.clear();
    }

  }

  constructor(manager: ManagerService, movement: MovementService) {
    this.manager = manager;
    this.movement = movement;
  }


  ngOnInit(): void {
  }

  handleClick(e: MouseEvent) {
    if (this._state == 'addNode') {
      this.manager.createNode(new Point(e.offsetX, e.offsetY));
    }
  }

  selectNode(node: Node) {
    if (this._state == 'addEdge') {
      this.manager.select(node);
    }
  }

  disableContext(e: Event){
    e.preventDefault();
  }

}