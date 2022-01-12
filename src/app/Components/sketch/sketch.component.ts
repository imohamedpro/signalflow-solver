import { Component, Input, OnInit } from '@angular/core';
import { ControllerService } from '../../Services/controller/controller.service';
import { Drawable } from '../../Classes/Drawable';
import { Point } from '../../Classes/Point';
import { DrawableManagerService } from '../../Services/drawableManager/drawable-manager.service';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']
})
export class SketchComponent implements OnInit {
  _state!: string;
  manager!: DrawableManagerService;
  isQNumberChosen: boolean;
  initialQ: number;

  @Input() set state(value: string) {
    this._state = value;

    if (this._state == 'new') {
      this.manager.reset();
      this.isQNumberChosen = false;
      this.initialQ = 0;
    }
    else if (this._state == 'run') {
      this.manager.run(this.manager.getTotalProducts());
    }
    else if (this._state == 'replay') {
      this.manager.replay(this.manager.getTotalProducts());
    }
  }

  constructor(manager: DrawableManagerService, private controller: ControllerService) {
    this.manager = manager;
    this.isQNumberChosen = false;
    this.initialQ = 0;
  }


  ngOnInit(): void {
  }

  handleClick(e: MouseEvent) {
    switch (this._state) {
      case 'addQ':
        this.manager.createDrawable('queue', new Point(e.offsetX, e.offsetY));
        break;
      case 'addM':
        this.manager.createDrawable('machine', new Point(e.offsetX, e.offsetY));
    }
  }

  select(drawable: Drawable, e: MouseEvent) {
    if (this._state == 'connect') {
      this.manager.select(drawable, e);
    }
  }

  changeQ(e: any) {
    this.initialQ = e.target.value;
  }

  selectQ() {
    if (this.manager.factory.nextQueueNumber != 0 && (this.initialQ >= 0 && this.initialQ < this.manager.factory.nextQueueNumber)) {
      this.isQNumberChosen = true;
      this.manager.getInitialQueue(this.initialQ);
      this.controller.setStartQueue(this.initialQ).subscribe();
      console.log(this.manager.chosenQID);
    }
  }

}