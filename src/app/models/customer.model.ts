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
}

export class ValidationCustomerModel{
  nameCustomer: string
  phone: string
  email: string
  gender: boolean
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