import {Pipe, PipeTransform  } from '@angular/core';

@Pipe({name: 'formatFromUnixTimestampToFullDateView'})
export class FormatFromUnixTimestampToFullDateView implements PipeTransform {
  transform(unix_timestamp: any) : any {
    var date = new Date(unix_timestamp).toLocaleDateString();
    var split = date.split("/")
    var day = split[0];
    if (Number.parseInt(day) < 10) {
      day = "0"+day
    }
    var month = split[1];
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
    var date = new Date(unix_timestamp).toLocaleDateString();
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
    var date = new Date(unix_timestamp).toLocaleString();
    var splitDateTime = []
    splitDateTime = date.split(", ")

    var formattedDate = splitDateTime[1] + " " + splitDateTime[0];
    return formattedDate
  }
}


@Pipe({name: 'formatFromUnixTimestampToFullStartEndDateView'})
export class FormatFromUnixTimestampToFullStartEndDateView implements PipeTransform {
  transform(start_unix_timestamp: any, end_unix_timestamp: any) : any {
    var start = new Date(start_unix_timestamp).toLocaleString();
    var startDateTime = []
    startDateTime = start.split(", ")

    var end = new Date(end_unix_timestamp).toLocaleString();
    var endDateTime = []
    endDateTime = end.split(", ")


    var startDay = []
    startDay = startDateTime[1].split("/")
    if (Number.parseInt(startDay[0]) < 10) {
      startDay[0] = "0" +  startDay[0]
    }

    var endDay = []
    endDay = endDateTime[1].split("/")
    if (Number.parseInt(endDay[0]) < 10) {
      endDay[0] = "0" +  endDay[0]
    }

    if (Number.parseInt(endDay[1]) < 10) {
      endDay[1] = "0" +  endDay[1]
    }

    var formattedDate = startDay[0] + '-' + endDay[0] + "/" + endDay[1] + "/" + endDay[2];
    return formattedDate
  }
}


@Pipe({name: 'formatFromUnixTimestampToFullTimeDateView'})
export class FormatFromUnixTimestampToFullTimeDateView implements PipeTransform {
  transform(unix_timestamp: any) : any {
    var dateTime = new Date(unix_timestamp).toLocaleString();
    var splitDateTime = []
    splitDateTime = dateTime.split(", ")
    var time = []
    time = splitDateTime[0].split(":")


    var date = []
    date = splitDateTime[1].split("/")
    if (Number.parseInt(date[0]) < 10) {
      date[0] = "0" +  date[0]
    }

    if (Number.parseInt(time[1]) < 10) {
      date[1] = "0" +  date[1]
    }

    var formattedDate = time[0] + ':' + time[1] + ' ' + date[0] + '/' + date[1] + '/' + date[2];
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
