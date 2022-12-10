export class CommentModel {
    idComment: string
    commentTime: number
    commentTimeDisplay: string
    commentText: string
    idCustomer: string
    idTour: string
    idSchedule: string
    nameCustomer: string
    idTourBooking: string
    rating: number
}

export class ValidationCommentModel{
  commentText: string = null
  total: number
}
export class ValidationCommentTextModel{
  commentText: string = null
  total: number
}

