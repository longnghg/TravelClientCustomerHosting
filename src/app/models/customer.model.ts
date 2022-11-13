export class CustomerModel{
  idCustomer: string
  nameCustomer: string
  phone: string
  email: string
  address: string
  gender: boolean
  password: string
  confirmPassword: string
  birthday: string
  createDate: number
  accessToken: string
  point: number
  facebookToken: string
  googleToken: string
  newPassword: string
}

export class ValidationCustomerModel{
  total: number
  nameCustomer: string
  phone: string
  address: string
  birthday: string
}

export class ValidationRegister{
  total: number
  nameCustomer: string
  phone: string
  email: string
  address: string
  password: string
  confirmPassword: string
}


export class ValidationForgotPass {
  total: number
  password: string = null
  confirmPassword: string = null
}

export class ValidationChangePass{
  total: number

  password: string = null
  newPassword: string = null
  confirmPassword: string = null
}
