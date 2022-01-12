import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  constructor() { }

  @Output() actionEmitter = new EventEmitter<string>();

  ngOnInit(): void {
  }

  emitAction(action: string){
    this.actionEmitter.emit(action);
  }


}
