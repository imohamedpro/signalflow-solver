import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[drawable=machine]',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  @Input() machine!: any;

  constructor() { }

  ngOnInit(): void {
  }

}