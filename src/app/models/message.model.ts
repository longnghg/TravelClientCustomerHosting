export class GroupMessage{
  idCustomer: string
  nameCustomer: string
  isSeen: boolean
  totalNew: number = 0
  date: number
  messengers: Message[]
}
export class Message{
    idMessage: string
    senderName: string
    sendDate: number
    content: string
    senderId: string
    isSeen: boolean
    receiverId: string = "00000000-0000-0000-0000-000000000000"
}
