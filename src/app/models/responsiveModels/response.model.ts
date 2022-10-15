import { NotificationModel } from "./notification.model";

export interface ResponseModel{
  content: any
  notification: NotificationModel
  totalResult: number
}
