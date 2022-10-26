import {Pipe, PipeTransform  } from '@angular/core';

@Pipe({name: 'formatFromUnixTimestampToFullDateView'})
export class FormatFromUnixTimestampToFullDateView implements PipeTransform {
  transform(unix_timestamp: any) : any {
    var date = new Date(unix_timestamp).toLocaleDateString("en-US");
    var split = date.split("/")
    var day = split[1];
    if (Number.parseInt(day) < 10) {
      day = "0"+day
    }
    var month = split[0];
    if (Number.parseInt(month) < 10) {
      month = "0"+month
    }
    var year =  split[2];
    var formattedDate = day + '/' + month + '/' + year;
    return formattedDate
  }
}


@Pipe({name: 'formatFromUnixTimestampToFullDate'})
export class FormatFromUnixTimestampToFullDate implements PipeTransform {
  transform(unix_timestamp: any) : any {
    var date = new Date(unix_timestamp).toLocaleDateString("en-US");
    var split = date.split("/")
    var day = split[1];
    var month = split[0];
    var year =  split[2];
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate
  }
}


@Pipe({name: 'formatFromUnixTimestampToFullDateTimeView'})
export class FormatFromUnixTimestampToFullDateTimeView implements PipeTransform {
  transform(unix_timestamp: any) : any {
    var date = new Date(unix_timestamp);
    var day = ""
    var month =  ""
    var year = date.getFullYear()
    var hour =  ""
    var min = ""
    var sec = ""
    if (date.getDate() < 10) {
      day = "0"+date.getDate().toString()
    }
    else{
      day = date.getDate().toString()
    }

    if (date.getMonth() < 10) {
      month = "0"+date.getMonth().toString()
    }
    else{
      month = date.getMonth().toString()
    }

    if (date.getHours() < 10) {
      hour = "0"+date.getHours().toString()
    }
    else{
      hour = date.getHours().toString()
    }

    if (date.getMinutes() < 10) {
      min = "0"+date.getMinutes().toString()
    }
    else{
      min = date.getMinutes().toString()
    }

    if (date.getMinutes() < 10) {
      sec = "0"+date.getSeconds().toString()
    }
    else{
      sec = date.getSeconds().toString()
    }

    var formattedDate = day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
    return formattedDate
  }
}


@Pipe({name: 'formatFromUnixTimestampToFullStartEndDateView'})
export class FormatFromUnixTimestampToFullStartEndDateView implements PipeTransform {
  transform(start_unix_timestamp: any, end_unix_timestamp: any) : any {
    var start = new Date(start_unix_timestamp);
    var end = new Date(end_unix_timestamp);
    var startDay = ""
    var endDay = ""
    var month =  ""
    var year = end.getFullYear()

    if (start.getDate() < 10) {
      startDay = "0"+start.getDate().toString()
    }
    else{
      startDay = start.getDate().toString()
    }

    if (end.getDate() < 10) {
      endDay = "0"+end.getDate().toString()
    }
    else{
      endDay = end.getDate().toString()
    }

    if (end.getMonth() < 10) {
      month = "0"+end.getMonth().toString()
    }
    else{
      month = end.getMonth().toString()
    }

    var formattedDate = startDay + '-' + endDay  + '/' + month + '/' + year;
    return formattedDate
  }
}


@Pipe({name: 'formatFromUnixTimestampToFullTimeDateView'})
export class FormatFromUnixTimestampToFullTimeDateView implements PipeTransform {
  transform(unix_timestamp: any) : any {
    var date = new Date(unix_timestamp);
    var day = ""
    var month =  ""
    var year = date.getFullYear()
    var hour =  ""
    var min = ""
    if (date.getDate() < 10) {
      day = "0"+date.getDate().toString()
    }
    else{
      day = date.getDate().toString()
    }

    if (date.getMonth() < 10) {
      month = "0"+date.getMonth().toString()
    }
    else{
      month = date.getMonth().toString()
    }

    if (date.getHours() < 10) {
      hour = "0"+date.getHours().toString()
    }
    else{
      hour = date.getHours().toString()
    }

    if (date.getMinutes() < 10) {
      min = "0"+date.getMinutes().toString()
    }
    else{
      min = date.getMinutes().toString()
    }

    var formattedDate = hour + ':' + min + ' ' + day + '/' + month + '/' + year;
    return formattedDate
  }
}

@Pipe({name: 'formatDateToDateView'})
export class FormatDateToDateView implements PipeTransform {
  transform(date: any) : any {
    var split = date.split("-")
    var day = split[2];

    var month = split[1];

    var year =  split[0];
    var formattedDate = day + '/' + month + '/' + year;
    return formattedDate
  }
}
