import { ManagerService } from 'src/app/Services/manager/manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data!: string;
  manager: ManagerService;
  constructor(manager: ManagerService) { 
    this.manager = manager;
  }

  ngOnInit(): void {
  }

  changeState(newState: string) {
    this.data = newState;
  }

}