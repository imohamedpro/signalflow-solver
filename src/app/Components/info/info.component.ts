import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private controller: ControllerService) { }
  //constructor(){}
  text: string[] = [];
  ngOnInit(): void {
    this.controller.getServerSentEvent().subscribe( data =>{
      this.text.push(data.data);
      console.log(data);
    }
    )
  }

}
