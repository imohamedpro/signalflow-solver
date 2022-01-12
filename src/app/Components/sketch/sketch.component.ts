import { Component, Input, OnInit } from '@angular/core';
import { Drawable } from 'src/app/Classes/Drawable';
import { Point } from 'src/app/Classes/Point';
import { DrawableManagerService } from 'src/app/Services/drawableManager/drawable-manager.service';

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
      this.isQNumberChosen = false;
      this.initialQ = 0;
    }
    else if(this._state == 'run'){
      this.manager.run(this.manager.getTotalProducts());
    }
    else if(this._state == 'replay'){
      this.manager.replay(this.manager.getTotalProducts());
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
    console.log(e.clientX);
    console.log(e.clientY);
    console.log(e.screenX);
    console.log(e.screenY);
    console.log(e.offsetX);
    console.log(e.offsetY);
    switch(this._state){
      case 'addQ':
        console.log('queue id ' + this.manager.nextId);
        this.manager.createDrawable('queue', new Point(e.offsetX, e.offsetY));
        break;
      case 'addM':
        console.log('machine id '+ this.manager.nextId);
        this.manager.createDrawable('machine', new Point(e.offsetX, e.offsetY));
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
    if(this.manager.factory.nextQueueNumber != 0 && (this.initialQ >=0 && this.initialQ < this.manager.factory.nextQueueNumber)){
      this.isQNumberChosen = true;
      this.manager.getInitialQueue(this.initialQ);
      console.log(this.manager.chosenQID);
    }
  }

}
