import { Injectable, Inject, PipeTransform, Pipe } from "@angular/core";
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigService{
  constructor(@Inject(DOCUMENT) private document: Document){}

  public apiUrl = "https://localhost:44394";
  public clientUrl = this.document.location.origin

  error(status: any, message: any){
    console.log('Status:  '  + status);
    console.log('Message: '  + message);

    if (status == 401){
        message = "Hết hạn đăng nhập !"
        document.location.assign(this.clientUrl +'/#/login');
    }
    else if (status == 200) {
        message = message;
    }
    else{
        message = "Không kết nối được đến server !"
    }

    return message
  }

  listGender(){
    var listGender = [
      {id: false, name: "Nam"},
      {id: true, name: "Nữ"}
    ]

    return listGender
  }

  listStatus(){
    var listStatus = [
      {id: false, name: "Chưa kích hoạt"},
      {id: true, name: "Đã kích hoạt"}
    ]

    return listStatus
  }

  validateCustomer(data: any){
    var err = []
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //name
    if(data.nameCustomer == null || data.nameCustomer == ""){
       err.push("[Họ và tên] không được để trống !")
    }else if (data.nameCustomer.length > 100) {
       err.push("[Họ và tên] quá dài !")
    }else if (data.nameCustomer.length < 1) {
      err.push("[Họ và tên] quá ngắn !")
    }


    // if (data.gender === null) {
    //    err.push("[Giới tính] không được để trống !")
    // }


    if (data.email == null || data.email == "") {
       err.push("[Email] không được để trống !")
    }else if (!filter.test(data.email)) {
       err.push("[Email] không hợp lệ !")
    }


    if (data.phone == null || data.phone == "") {
       err.push("[Số điện thoại] không được để trống !")
    }else if (data.phone.length > 10) {
       err.push("[Số điện thoại] vượt quá 10 số !")
    }else if (!data.phone.startsWith("0")) {
       err.push("[Số điện thoại] không hợp lệ !")
    }

    // if (data.birthday == null || data.birthday == "") {
    //    err.push("[Ngày sinh] không được để trống !")
    // }


    if (data.address == null || data.address == "") {
       err.push("[Địa chỉ] không được để trống !")
    }else if (data.address.length > 255) {
      err.push("[Địa chỉ] quá dài !")
   }

    if(data.password == null  || data.password == ""){
      err.push("[Mật khẩu] không được để trống !")
    }

    if(data.confirmPassword == null  || data.confirmPassword == ""){
      err.push("[Nhập lại mật khẩu] không được để trống !")
    }else if(data.password != data.confirmPassword){
      err.push("[Mật khẩu không khớp] nhập lại mật khẩu !")
    }
    return err

   }

   validateChangePass(password: string, newPassword: string, confirmPassword: string){
    var err = []

    if(password == null  || password == ""){
      err.push("[Mật khẩu cũ] không được để trống !")
    }

    if(newPassword == null  || newPassword == ""){
      err.push("[Mật khẩu mới] không được để trống !")
    }else if(password === newPassword){
      err.push("[Mật khẩu mới] không trùng mật khẩu cũ !")
    }

    if(confirmPassword == null  || confirmPassword == ""){
      err.push("[Nhập lại mật khẩu] không được để trống !")
    }else if(newPassword != confirmPassword){
      err.push("[Nhập lại mật khẩu không khớp] nhập lại mật khẩu !")
    }
    return err
   }

  validateEmployee(data: any){
    var err = []
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //name
    if(data.nameEmployee == null || data.nameEmployee == ""){
       err.push("[Họ và tên] không được để trống !")
    }else if (data.nameEmployee.length > 100) {
       err.push("[Họ và tên] quá dài !")
    }else if (data.nameEmployee.length < 1) {
      err.push("[Họ và tên] quá ngắn !")
    }


    //gender
    if (data.gender === null) {
       err.push("[Giới tính] không được để trống !")
    }

    // if (data.gender != "Nam" && data.gender != "Nữ" && data.gender != "Khác") {
    //    err.push("[Giới tính] không hợp lệ !")
    // }

    //role
    if (data.idRole == null || data.idRole == "") {
       err.push("[Quyền] không được để trống !")
    }

     //email
    if (data.email == null || data.email == "") {
       err.push("[Email] không được để trống !")
    }else if (!filter.test(data.email)) {
       err.push("[Email] không hợp lệ !")
    }

    //Phone
    if (data.phone == null || data.phone == "") {
       err.push("[Số điện thoại] không được để trống !")
    }else if (data.phone.length > 10) {
       err.push("[Số điện thoại] vượt quá 10 số !")
    }else if (!data.phone.startsWith("0")) {
       err.push("[Số điện thoại] không hợp lệ !")
    }

    // if (Number.parseInt(data.phone) == NaN) {
    //    err.push("[Số điện thoại] không hợp lệ !")
    // }

    //BirthDay
    if (data.birthday == null || data.birthday == "") {
       err.push("[Ngày sinh] không được để trống !")
    }


    //Address
    if (data.address == null || data.address == "") {
       err.push("[Địa chỉ] không được để trống !")
    }else if (data.address.length > 255) {
      err.push("[Địa chỉ] quá dài !")
   }

    //Img
    // if (data.image == null || data.image == "") {
    //    err.push("[Hình ảnh] không được để trống !")
    // }

    return err

   }

   validateProvince(data: any){
    var err = []
    //name
    if(data.nameProvince == null || data.nameProvince == ""){
       err.push("[Tên thành phố/tỉnh] không được để trống !")
    }
    else if (data.nameProvince.length > 30) {
       err.push("[Tên thành phố/tỉnh] quá dài !")
    }else if (data.nameProvince.length < 3) {
      err.push("[Tên thành phố/tỉnh] quá ngắn !")
    }


    return err

   }

   validateInfoCustomer(data: any, model: any, isCheck: boolean){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //nameCustomer
    if (isCheck) {
      if(data.nameCustomer == null || data.nameCustomer == ""){
        model.nameCustomer = "[Tên người đi] không được để trống !";
        model.total += 1
     }
     else if (data.nameCustomer > 30) {
      model.nameCustomer = "[Tên người đi] quá dài !";
      model.total += 1
     }else if (data.nameCustomer < 3) {
      model.nameCustomer = "[Tên người đi] quá ngắn !";
      model.total += 1
     }
    }

    //nameContact
    if(data.nameContact == null || data.nameContact == ""){
      model.nameContact = "[Tên người liên lạc] không được để trống !";
      model.total += 1
    }
    else if (data.nameContact > 30) {
      model.nameContact = "[Tên người liên lạc] quá dài !";
      model.total += 1
    }else if (data.nameContact < 3) {
      model.nameContact = "[Tên người liên lạc] quá ngắn !";
      model.total += 1
    }

    //Phone
    if (data.phone == null || data.phone == "") {
      model.phone = "[Số điện thoại] không được để trống !";
      model.total += 1
    }else if (data.phone.length > 15) {
      model.phone = "[Số điện thoại] vượt quá 10 số !";
      model.total += 1
    }else if (!data.phone.startsWith("0")) {
      model.phone = "[Số điện thoại] không hợp lệ !";
      model.total += 1
    }

    //email
    if (data.email == null || data.email == "") {
      model.email = "[Email] không được để trống !";
      model.total += 1
   }else if (!filter.test(data.email)) {
      model.email = "[Email] không hợp lệ !";
      model.total += 1
   }
    return model
   }

   validateDistrict(data: any){
    var err = []
    //name
    if(data.nameDistrict == null || data.nameDistrict == ""){
       err.push("[Tên quận/huyện] không được để trống !")
    }
    else if (data.nameDistrict.length > 30) {
       err.push("[Tên quận/huyện] quá dài !")
    }else if (data.nameDistrict.length < 3) {
      err.push("[Tên quận/huyện] quá ngắn !")
    }
    console.log(data);

    //province
    if (data.idProvince == null || data.idProvince == "") {
      err.push("[Thành phố/tỉnh] không được để trống !")
    }
    return err

   }

   validateWard(data: any){
    var err = []
    //name
    if(data.nameWard == null || data.nameWard == ""){
       err.push("[Tên phường/xã] không được để trống !")
    }
    else if (data.nameWard.length > 30) {
       err.push("[Tên phường/xã] quá dài !")
    }else if (data.nameWard.length < 3) {
      err.push("[Tên phường/xã] quá ngắn !")
    }

    //province
    if (data.idDistrict == null || data.idDistrict == "") {
      err.push("[Quận/huyện] không được để trống !")
    }
    return err

   }

   formatFromUnixTimestampToFullDate(unix_timestamp: number){
    var date = new Date(unix_timestamp).toLocaleDateString("en-US");
    var split = date.split("/")
    var day = split[1];
    var month = split[0];
    var year =  split[2];
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate
   }

   formatFromUnixTimestampToFullDateView(unix_timestamp: number){
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

   formatFromUnixTimestampToFullDateTimeView(unix_timestamp: number){
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

   formatFromUnixTimestampToFullStartEndDateView(start_unix_timestamp: number, end_unix_timestamp: number){
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

   formatFromUnixTimestampToFullTimeDateView(unix_timestamp: number){
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



