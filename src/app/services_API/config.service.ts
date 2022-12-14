import { Injectable, Inject, PipeTransform, Pipe } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class ConfigService{
  constructor(@Inject(DOCUMENT) private document: Document){}

  private hubConnectionBuilder: HubConnection
  public apiUrl = "https://localhost:44394";
  public clientUrl = this.document.location.origin
  signalR(){
    return this.hubConnectionBuilder = new HubConnectionBuilder()
   .configureLogging(LogLevel.Information).withUrl(`${this.apiUrl}/travelhub`,
   {
       accessTokenFactory: () => localStorage.getItem("token")
   })
   .withAutomaticReconnect()
   .build();
  }

  callChatSignalR(id:string): void{
   this.hubConnectionBuilder.invoke('Chat',id)
  }
  callNotyfSignalR(roleId:string): void{
    this.hubConnectionBuilder.invoke('SendNotyf',roleId)
  }
  error(status: any, message: any){
    console.log('Status:  '  + status);
    console.log('Message: '  + message);

    if (status == 401){
        message = "Hết hạn đăng nhập !"
        document.location.assign(this.clientUrl +'/login');
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

  validateComment(data:any, model: any){
    model.total = 0
    if(data.commentText == null || data.commentText == ""){
      model.commentText = "[Bình luận] không được để trống !"
      model.total += 1
    }
    if(data.commentText.length > 1000){
      model.commentText = "[Bình luận] quá dài !"
      model.total += 1
    }
    return model
  }

  validateCommentText(data:any, model: any){
    var words = [ 'lolz', 'lone','đmm','Đmm','dmm','Dmm','cl','clm','clmm','clgt','Clgt','đéo', 'Đéo','Đụ','đụ','Bitch','bitch','Fuck','ncc','đỉ','Đĩ','đĩ','Lồn','lồn','lỏ','cc','khủng khiếp']

    var split = [""]
    split = data.commentText.split(" ")
    var text = ""
    split.forEach(element => {
      if (words.indexOf(element) >= 0) {
        text += "*** "
      }
      else{
        text += element + " "
      }
      data.commentText = text
    });


    return model

  }

  validateCustomer(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //name

    if(data.nameCustomer == null || data.nameCustomer == ""){
      model.nameCustomer = "[Họ và tên] không được để trống !"
      model.total += 1
    }else if (data.nameCustomer.length > 100) {
      model.nameCustomer = "[Họ và tên] quá dài !"
      model.total += 1
    }else if (data.nameCustomer.length < 1) {
      model.nameCustomer = "[Họ và tên] quá ngắn !"
      model.total += 1
    }

    // if (data.gender === null) {
    //    err.push("[Giới tính] không được để trống !")
    // }


    if (data.phone == null || data.phone == "") {
      model.phone = "[Số điện thoại] không được để trống !"
      model.total += 1
    }else if (data.phone.length > 15) {
      model.phone = "[Số điện thoại] vượt quá 15 số !"
      model.total += 1
    }
    else if (data.phone.length < 10) {
      model.phone = "[Số điện thoại] không hợp lệ !"
      model.total += 1
    }else if (!data.phone.startsWith("0")) {
      model.phone = "[Số điện thoại] không hợp lệ !"
      model.total += 1
    }

    if (data.address == null || data.address == "") {
      model.address = "[Địa chỉ] không được để trống !"
      model.total += 1
    }else if (data.address.length > 255) {
      model.address = "[Địa chỉ] quá dài !"
      model.total += 1
    }

    let timeDiff = Math.abs(Date.now() - Date.parse(data.birthday));
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    //BirthDay
    if(age < 16){
      model.birthday = "[Ngày sinh] phải trên 16 tuổi !"
      model.total += 1
    }
    // if(data.password == null  || data.password == ""){
    //   err.push("[Mật khẩu] không được để trống !")
    // }

    // if(data.confirmPassword == null  || data.confirmPassword == ""){
    //   err.push("[Nhập lại mật khẩu] không được để trống !")
    // }else if(data.password != data.confirmPassword){
    //   err.push("[Mật khẩu không khớp] nhập lại mật khẩu !")
    // }
    return model

   }

   validateChangePass(data: any, model: any){
    model.total = 0

    if(data.password == null  || data.password == ""){
      model.password = ("[Mật khẩu cũ] không được để trống !")
      model.total += 1
    }

    if(data.newPassword == null  || data.newPassword == ""){
      model.newPassword = ("[Mật khẩu mới] không được để trống !")
      model.total += 1
    }else if(data.password === data.newPassword){
      model.newPassword = ("[Mật khẩu mới] không trùng mật khẩu cũ !")
      model.total += 1
    }

    if(data.confirmPassword == null  || data.confirmPassword == ""){
      model.confirmPassword = ("[Nhập lại mật khẩu] không được để trống !")
      model.total += 1
    }else if(data.newPassword != data.confirmPassword){
      model.confirmPassword = ("[Nhập lại mật khẩu không khớp] nhập lại mật khẩu !")
      model.total += 1
    }
    return model
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



