import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data!: string;
  constructor() { }

  ngOnInit(): void {
  }

  changeState(newState: string) {
    this.data = newState;
  }

}