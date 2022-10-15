import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { TourService } from "../../services_API/tour.service";
import { TourModel } from "../../models/tour.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { NotificationService } from "../../services_API/notification.service";
import { ConfigService } from "../../services_API/config.service";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private tourService: TourService, private notificationService: NotificationService, private configService: ConfigService, private activatedRoute: ActivatedRoute, private router: Router) { }
  resTour: TourModel[]
  response: ResponseModel
  @ViewChild('slide') slide: ElementRef;
  list = [
    { img: "assets/images/hero-slider-1.jpg", location: "San Francisco."},
    { img: "assets/images/hero-slider-2.jpg", location: "Paris."},
    { img: "assets/images/hero-slider-3.jpg", location: "New Zealand."},
    { img: "assets/images/hero-slider-4.jpg", location: "Maui."},
    { img: "assets/images/hero-slider-5.jpg", location: "London."}]
    img = this.list[0].img
    location = ["San Francisco."," Paris."," New Zealand.", " Maui.", " London."]


  ngOnInit(): void {
    setInterval(() =>{
      this.prev()
    }, 4000)

    this.initTour()
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

  next(){
    let lists = document.querySelectorAll('.s_item');
    console.log(lists);

    this.slide.nativeElement.appendChild(lists[0]);
  }

  prev(){
    let lists = document.querySelectorAll('.s_item');
    this.slide.nativeElement.prepend(lists[lists.length - 1]);
  }

  initTour(){
    this.tourService.gets().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resTour = this.response.content
        console.log(this.resTour);

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  formatPrice(price: any){
    return price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
  }

  formatDate(date: any){
    return this.configService.formatFromUnixTimestampToFullDateView(date)
  }


  passData(data: any){
    sessionStorage.setItem("resTour", JSON.stringify(data))
  }
}

