import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/Services/manager/manager.service';

@Component({
  selector: 'app-symbols-table',
  templateUrl: './symbols-table.component.html',
  styleUrls: ['./symbols-table.component.css']
})
export class SymbolsTableComponent implements OnInit {
  manager!: ManagerService;

  constructor(manager: ManagerService) {
    this.manager = manager;
   }

  ngOnInit(): void {
  }

  

}
