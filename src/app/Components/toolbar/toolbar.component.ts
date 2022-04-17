import { ControllerService } from "../../Services/controller/controller.service";
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

}