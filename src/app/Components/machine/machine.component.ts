import { Component, OnInit, Input } from '@angular/core';
import { Drawable } from 'src/app/Classes/Drawable';

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
