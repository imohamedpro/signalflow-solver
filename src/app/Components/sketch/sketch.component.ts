import { Component, Input, OnInit } from '@angular/core';
import { Drawable } from 'src/app/Classes/Drawable';
import { Point } from 'src/app/Classes/Point';
import { DrawableManagerService } from 'src/app/Services/manager/drawable-manager.service';

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

  @Input() set state(value: string){
    this._state = value;

    if(this._state == 'new'){
      this.manager.reset();
    }
    else if(this._state == 'run'){
      //api call with parameter this.manager.chosenQID
    }
    else if(this._state == 'replay'){
      //api call with parameter this.manager.chosenQID
    }
  }
  
  constructor( manager: DrawableManagerService) {
    this.manager = manager;
    this.isQNumberChosen = false;
    this.initialQ = 0;
   }

  
  ngOnInit(): void {
  }

  handleClick(e: MouseEvent){
    switch(this._state){
      case 'addQ':
        console.log('queue id ' + this.manager.nextId);
        console.log(e.clientX);
        console.log(e.clientY);
        this.manager.createDrawable('queue', new Point(e.clientX, e.clientY));
        break;
      case 'addM':
        console.log('machine id '+ this.manager.nextId);
        console.log(e.clientX);
        console.log(e.clientY);
        this.manager.createDrawable('machine', new Point(e.clientX, e.clientY));
    }
  }

  select(drawable: Drawable, e: MouseEvent){
    if(this._state == 'connect'){
      this.manager.select(drawable, e);
    }
  }

  changeQ(e: any){
    this.initialQ = e.target.value;
  }

  selectQ(){
    if(this.manager.factory.nextQueueNumber != 0){
      this.isQNumberChosen = true;
      this.manager.getInitialQueue(this.initialQ);
      console.log(this.manager.chosenQID);
    }
  }

}
