import { MovementService } from './../../Services/movement/movement.service';
import { ManagerService } from 'src/app/Services/manager/manager.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[node]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() node!: any;
  manager: ManagerService;
  movement: MovementService;

  constructor(manager: ManagerService, movement: MovementService) {
    this.manager = manager;
    this.movement = movement;
   }

  ngOnInit(): void {
  }

}