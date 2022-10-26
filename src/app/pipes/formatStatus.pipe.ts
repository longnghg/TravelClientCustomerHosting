import {Pipe, PipeTransform  } from '@angular/core';
import { StatusBooking  } from "../enums/enum";
@Pipe({name: 'formatStatusBooking'})
export class FormatStatusBooking implements PipeTransform {
  transform(status: any) : any {
    return StatusBooking[status]
  }
}

