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
    otpCode: string = null // 2 thằng này check ở đâu để tui demo thử á , 2 th đó check ở đây á
}
