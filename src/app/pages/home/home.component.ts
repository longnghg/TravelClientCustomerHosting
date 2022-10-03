import { Component, OnInit } from '@angular/core';
import { findIndex } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  list = [
    { img: "assets/images/hero-slider-1.jpg", location: "San Francisco."},
    { img: "assets/images/hero-slider-2.jpg", location: "Paris."},
    { img: "assets/images/hero-slider-3.jpg", location: "New Zealand."},
    { img: "assets/images/hero-slider-4.jpg", location: "Maui."},
    { img: "assets/images/hero-slider-5.jpg", location: "London."}]
    img = this.list[0].img
    location = ["San Francisco."," Paris."," New Zealand.", " Maui.", " London."]


  ngOnInit(): void {
  }

  doSmth(){
    const output = document.getElementById("typing")
    this.list.forEach(element => {
      if(output?.innerText == element.location)
      {
        this.img = element.img
      }
     });
  }
}

