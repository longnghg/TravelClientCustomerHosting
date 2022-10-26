import {Pipe, PipeTransform  } from '@angular/core';

@Pipe({name: 'formatPriceVi'})
export class FormatPriceVi implements PipeTransform {
  transform(price: any) : any {
    return price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
  }
}

