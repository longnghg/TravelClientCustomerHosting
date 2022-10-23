import { Injectable, Inject } from "@angular/core";
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

   validateInfoCustomer(data: any, isCheck: boolean){
    var err = []
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //nameCustomer
    if (isCheck) {
      if(data.nameCustomer == null || data.nameCustomer == ""){
        err.push("[Tên người đi] không được để trống !")
     }
     else if (data.nameCustomer > 30) {
        err.push("[Tên người đi] quá dài !")
     }else if (data.nameCustomer < 3) {
       err.push("[Tên người đi] quá ngắn !")
     }
    }

    //nameContact
    if(data.nameContact == null || data.nameContact == ""){
       err.push("[Tên người liên lạc] không được để trống !")
    }
    else if (data.nameContact > 30) {
       err.push("[Tên người liên lạc] quá dài !")
    }else if (data.nameContact < 3) {
      err.push("[Tên người liên lạc] quá ngắn !")
    }

    //Phone
    if (data.phone == null || data.phone == "") {
      err.push("[Số điện thoại] không được để trống !")
   }else if (data.phone.length > 10) {
      err.push("[Số điện thoại] vượt quá 10 số !")
   }else if (!data.phone.startsWith("0")) {
      err.push("[Số điện thoại] không hợp lệ !")
   }

    //email
    if (data.email == null || data.email == "") {
      err.push("[Email] không được để trống !")
   }else if (!filter.test(data.email)) {
      err.push("[Email] không hợp lệ !")
   }
    return err

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
    var month = split[0];
    var year =  split[2];
    var formattedDate = day + '/' + month + '/' + year;

    return formattedDate
   }

   formatFromUnixTimestampToFullDateTimeView(unix_timestamp: number){
    var date = new Date(unix_timestamp);
    var formattedDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()+ ':' + date.getMinutes();
    return formattedDate
   }
}
