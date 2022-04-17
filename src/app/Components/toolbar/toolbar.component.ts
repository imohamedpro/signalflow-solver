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
  state!: string;

  ngOnInit(): void {
    this.state = "";
  }

  emitAction(action: string) {
    this.state = action;
    this.actionEmitter.emit(action);
  }

}