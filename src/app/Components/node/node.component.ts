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

  constructor(manager: ManagerService) {
    this.manager = manager;
   }

  ngOnInit(): void {
  }

}