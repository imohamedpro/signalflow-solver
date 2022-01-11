import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']
})
export class SketchComponent implements OnInit {
  
  @Input() state!: string;
  constructor() { }

  
  ngOnInit(): void {
  }

  
}
