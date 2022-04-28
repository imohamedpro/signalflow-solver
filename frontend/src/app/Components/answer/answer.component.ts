import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/Services/manager/manager.service';
import { KatexModule } from 'ng-katex';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  
  constructor(public manager: ManagerService) { }

  ngOnInit(): void {
  }
  equation: string = '$$ \\Delta_1 = {e_1.e_2.e_3 \\over e_4} $$';
  options: KatexOptions = {
    displayMode: true,
  };
}
