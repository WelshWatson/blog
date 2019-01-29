import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(myElement: ElementRef) { }

  ngOnInit() {
  }

  gotoTop() {
    const el = document.getElementById('target');
    console.log(el);
    el.scroll();
  }

}
