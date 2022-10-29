import { Component, OnInit } from '@angular/core';
import { ProvinceService } from "../../services_API/province.service";
import { LocationModel } from "../../models/location.model";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  resProvince: LocationModel[]
  kwFrom: any = "TP Hồ Chí Minh"
  kwTo: any = null
  kwDepartureDate: any = ""
  kwReturnDate: any = ""
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

}
