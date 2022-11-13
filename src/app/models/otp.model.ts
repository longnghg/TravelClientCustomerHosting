export class OTPModel{
 beginTime: string
 endTime: string
 id: number
 otpCode: string
 checkOTP: string
 email: string
}

export class ValidationOtp {
    total: number = 0
    email: string = null
    checkOTP: string = null
    otpCode: string = null
}
