export class RoleModel {
  idRole: number = 0
  nameRole: string = ""
  description: string = ""
  isDelete: boolean = false
}
// export interface RoleModel {
//   id: number
//   name: string
//   name_vi: string
//   description: string
//   isDelete: boolean
// }


export enum RoleTitle {
  'Admin' = -1,
  'Quản lý cục bộ' = 1,
  'Quản lý dịch vụ' = 2,
  'Quản lý tour' = 3,
  'Quản lý tour booking' = 4
}

export enum StatusBooking {
  'Đã thanh toán',
  'Chưa thanh toán',
}

enum ApprovalStatus {
  'Đã duyệt',
  'Chưa duyệt',
  'Từ chối'
};

// const request =  {
//   id: 1,
//   status: ApprovalStatus.approved,
//   description: 'Please approve this request'
// };

// if(request.status === ApprovalStatus.approved) {
//   // send an email
//   console.log(request);

//   console.log('Send email to the Applicant...');
// }
