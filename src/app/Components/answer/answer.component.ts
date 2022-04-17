import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/Services/manager/manager.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  
  constructor(public manager: ManagerService) { }

  ngOnInit(): void {
  }

}
