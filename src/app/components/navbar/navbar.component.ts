import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from "../../layouts/client-layout/client-layout.routing";
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus: any;
  public listTitles: any;
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    console.log(this.listTitles);

  }

  onRouterLinkActive(e: any, i: number){
    if (e) {
      this.listTitles[i].class = "active"
    }
    else  {
      this.listTitles[i].class = ""
    }
  }
}
