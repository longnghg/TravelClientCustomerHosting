export class CommentModel {
    idComment: string
    commentTime: number
    commentTimeDisplay: string
    commentText: string
    idCustomer: string
    idTour: string
    nameCustomer: string
}

export class ValidationCommentModel{
  commentText: string = null
  total: number
}
export class ValidationCommentTextModel{
  commentText: string = null
  total: number
}

