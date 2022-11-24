import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProvinceService } from "../../services_API/province.service";
import { LocationModel } from "../../models/location.model";
import { SearchScheduleFilter } from 'src/app/models/schedule.model';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  resProvince: LocationModel[]
  @Output() kwSearch = new EventEmitter<any>();
  @ViewChild('promotion') promotion: ElementRef;
  @Input() kwRoute: string
  resScheduleFilter:  SearchScheduleFilter  = new SearchScheduleFilter
  kwPriceFromToSmall: any
  value: number = 100;
  constructor(private provinceService: ProvinceService,) { }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  ngOnInit(): void {
    this.provinceService.views().then(res => {this.resProvince = res})
  }


  ngOnChanges(): void {
      console.log(this.resScheduleFilter);
     if (this.resScheduleFilter) {
      var split = []
      split =  this.kwRoute.split("&")
      this.resScheduleFilter.kwFrom = split[0].replace("from=", "")
      this.resScheduleFilter.kwTo = split[1].replace("to=", "")
      this.resScheduleFilter.kwDepartureDate = split[2].replace("departureDate=", "")
      this.resScheduleFilter.kwReturnDate = split[3].replace("returnDate=", "")
      console.log( this.resScheduleFilter);
     }

  }

  promotionFormat(){
    if(this.promotion.nativeElement.checked){
      this.resScheduleFilter.kwPromotion = 2
    }
    else{
      this.resScheduleFilter.kwPromotion = 1
    }
    this.searchFilter()
  }

  priceAll(){
    this.resScheduleFilter.kwPriceFrom = null
    this.resScheduleFilter.kwPriceTo = null
    this.searchFilter()
  }

  priceFromSmall(){
    this.resScheduleFilter.kwPriceFrom = null
    this.resScheduleFilter.kwPriceTo = null
    this.resScheduleFilter.kwPriceFrom = 2000000
    this.searchFilter()
  }

  priceToLarge(){
    this.resScheduleFilter.kwPriceFrom = null
    this.resScheduleFilter.kwPriceTo = null
    this.resScheduleFilter.kwPriceTo = 10000000
    this.searchFilter()
  }

  priceFromToSmall(){
    this.resScheduleFilter.kwPriceFrom = 2000000
    this.resScheduleFilter.kwPriceTo = 5000000
    this.searchFilter()
  }

  priceFromToLarge(){
    this.resScheduleFilter.kwPriceFrom = 5000000
    this.resScheduleFilter.kwPriceTo = 10000000
    this.searchFilter()
  }

  checkOption(){
    if (this.resScheduleFilter.kwIsAllOption) {
      this.resScheduleFilter.kwIsAllOption = false
      this.resScheduleFilter.kwPromotion = 1
       this.resScheduleFilter.kwIsHoliday = false
    }
    else{
      this.resScheduleFilter.kwIsAllOption = true
      this.promotion.nativeElement.checked = false
      this.resScheduleFilter.kwPromotion = 1
      this.resScheduleFilter.kwIsHoliday = false
    }
    this.searchFilter()
  }
  searchFilter() {
    this.kwSearch.emit(this.resScheduleFilter);
  }
}
