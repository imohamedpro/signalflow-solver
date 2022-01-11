import { Component, Input, OnInit } from '@angular/core';
import { Point } from 'src/app/Classes/Point';
import { DrawableManagerService } from 'src/app/Services/drawableManager/drawable-manager.service';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']
})
export class SketchComponent implements OnInit {

  @Input() state!: string;

  constructor(public manager: DrawableManagerService) {
   }

  
  ngOnInit(): void {
  }

  handleClick(e: MouseEvent){
    switch(this.state){
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

  
}
