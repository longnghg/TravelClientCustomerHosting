export class AuthenticationModel{
  token: string = ""
  roleId: number = 0
  id: string = ""
  name: string = ""
  phone: string = ""
  image: string = ""
  email: string = ""
  dateTime: string
}

export class ValidationLoginModel{
  total: number = 0
  email: string = ""
  password: string = ""
}
