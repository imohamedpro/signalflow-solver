import { ControllerService } from './../../services/controller/controller.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private controller: ControllerService) { }

  @Output() actionEmitter = new EventEmitter<string>();

  ngOnInit(): void {
  }

  emitAction(action: string) {
    this.actionEmitter.emit(action);
  }

  replay(){
    this.controller.restart().subscribe();
  }
  
  isRunning(): boolean{
    if(JSON.parse(sessionStorage.getItem('isRunning') as string) == true){
      return true;
    }
    return false;
  }

}