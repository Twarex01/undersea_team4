import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css']
})
export class BasicCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  closeCard() {
    this.router.navigate(["/"]);
  }

}
