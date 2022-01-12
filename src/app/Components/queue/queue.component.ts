import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[drawable=queue]',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  @Input() queue!:  any;
  constructor() { }

  ngOnInit(): void {
  }

}
