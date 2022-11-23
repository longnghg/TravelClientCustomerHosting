import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  resScheduleFilter:  SearchScheduleFilter
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
    this.resScheduleFilter = new SearchScheduleFilter
    this.provinceService.views().then(res => {this.resProvince = res})
  }


  ngOnChanges(): void {
    
   
  }

  promotionFormat(){
    if(this.resScheduleFilter.kwPromotion){
      this.resScheduleFilter.kwPromotion = 2
    }
    else{
      this.resScheduleFilter.kwPromotion = 1
    }
   
  }

  priceFromToSmall(){
    this.resScheduleFilter.kwPriceFrom = 20000000
    this.resScheduleFilter.kwPriceTo = 5000000
  }

  priceFromToLarge(){
    this.resScheduleFilter.kwPriceFrom = 50000000
    this.resScheduleFilter.kwPriceTo = 10000000
  }

  searchFilter() {
    this.promotionFormat()
    this.kwSearch.emit(this.resScheduleFilter);
  }

}
