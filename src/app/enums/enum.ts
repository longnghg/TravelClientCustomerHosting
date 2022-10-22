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

export enum StatusBooking
{
    "Đã huỷ và đang chờ hoàn tiền" = -2, // Pending warning
    "Đã hoàn tiền" = -1, // Refunded success

    "Đã đặt tour nhưng chưa thanh toán" = 1, // Paying waning
    "Đã đặt tour và có đặt cọc" = 2, // Deposit waning

    "Đã thanh toán hết" = 3, //  Paid info
    "Hủy tour" = 4, // Cancel danger
    "Tour đã hoàn thành" = 5, // Finished success

}
