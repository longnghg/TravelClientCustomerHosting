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
        // message = "Hết hạn đăng nhập !"
        // document.location.assign(this.clientUrl +'/login');
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


    // if (data.phone == null || data.phone == "") {
    //    err.push("[Số điện thoại] không được để trống !")
    // }else if (data.phone.length > 10) {
    //    err.push("[Số điện thoại] vượt quá 10 số !")
    // }else if (!data.phone.startsWith("0")) {
    //    err.push("[Số điện thoại] không hợp lệ !")
    // }

    // if (data.birthday == null || data.birthday == "") {
    //    err.push("[Ngày sinh] không được để trống !")
    // }


  //   if (data.address == null || data.address == "") {
  //      err.push("[Địa chỉ] không được để trống !")
  //   }else if (data.address.length > 255) {
  //     err.push("[Địa chỉ] quá dài !")
  //  }

    // if(data.password == null  || data.password == ""){
    //   err.push("[Mật khẩu] không được để trống !")
    // }

    // if(data.confirmPassword == null  || data.confirmPassword == ""){
    //   err.push("[Nhập lại mật khẩu] không được để trống !")
    // }else if(data.password != data.confirmPassword){
    //   err.push("[Mật khẩu không khớp] nhập lại mật khẩu !")
    // }
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

   validateLogin(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (data.email == null || data.email == "") {
      model.email = "[Email] không được để trống !"
      model.total += 1
    }else if (!filter.test(data.email)) {
      model.email = "[Email] không hợp lệ !"
      model.total += 1
    }

    if(data.password == null || data.password == ""){
      model.password = "[Mật khẩu] không được để trống !"
      model.total += 1
    }

    return model
   }

   validateRegister(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(data.nameCustomer == null || data.nameCustomer == ""){
      model.nameCustomer = "[Họ & tên] không được để trống !"
      model.total += 1
    }

    if (data.email == null || data.email == "") {
      model.email = "[Email] không được để trống !"
      model.total += 1
    }else if (!filter.test(data.email)) {
      model.email = "[Email] không hợp lệ !"
      model.total += 1
    }

    if(data.phone == null || data.phone == ""){
      model.phone = "[Số điện thoại] không được để trống !"
      model.total += 1
    }else if (data.phone.length > 15) {
      model.phone = "[Số điện thoại] vượt quá 10 số !";
      model.total += 1
    }else if (!data.phone.startsWith("0")) {
      model.phone = "[Số điện thoại] không hợp lệ !";
      model.total += 1
    }

    if(data.address == null || data.address == ""){
      model.address = "[Địa chỉ] không được để trống !"
      model.total += 1
    }

    if(data.password == null || data.password == ""){
      model.password = "[Mật khẩu] không được để trống !"
      model.total += 1
    }

    if(data.confirmPassword == null || data.confirmPassword == ""){
      model.confirmPassword = "[Nhập lại mật khẩu] không được để trống !"
      model.total += 1
    }else if(data.password != data.confirmPassword){
      model.confirmPassword = "[Nhập lại mật khẩu] không trùng khớp  !"
      model.total += 1
    }

    return model
   }
   validateForgotPass(data: any, model: any){
    model.total = 0

    if(data.password == null || data.password == ""){
      model.password = "[Mật khẩu] không được để trống !"
      model.total += 1
    }

    if(data.confirmPassword == null || data.confirmPassword == ""){
      model.confirmPassword = "[Nhập lại mật khẩu] không được để trống !"
      model.total += 1
    }else if(data.password != data.confirmPassword){
      model.confirmPassword = "[Nhập lại mật khẩu] không trùng khớp  !"
      model.total += 1
    }
    return model
   }

   validateOtp(data: any, model: any, isOtp: boolean){
    model.total = 0
    var timePresent = Date.now()
    console.log(timePresent);
    console.log(data);

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (isOtp) {
      if(data.checkOTP == null || data.checkOTP == ""){
        model.checkOTP = "[OTP] không được để trống !"
        model.total += 1
      }else if(data.checkOTP != data.otpCode){
        model.checkOTP = "[OTP] không hợp lệ !"
        model.total += 1
      }

      if(data.endTime < timePresent){
        model.checkOTP = "[OTP] không còn hợp lệ !"
        model.total += 1
      }
    }
    else{
      if (data.email == null || data.email == "") {
        model.email = "[Email] không được để trống !"
        model.total += 1
      }else if (!filter.test(data.email)) {
        model.email = "[Email] không hợp lệ !"
        model.total += 1
      }
    }

    return model
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

}



