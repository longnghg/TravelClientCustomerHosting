import {Pipe, PipeTransform  } from '@angular/core';

@Pipe({name: 'forNumber'})
export class ForNumber implements PipeTransform {
  transform(value: number) : any {
    let res = [];
    for (let i = 0; i < value; i++) {
        res.push(i);
      }
      return res;
  }
}

