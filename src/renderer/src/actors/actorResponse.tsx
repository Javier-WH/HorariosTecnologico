export default class ActorResponse {
  status: boolean
  message: string
  data: object | null

  constructor(status: boolean, message: string, data: object | null) {
    this.status = status
    this.message = message
    this.data = data
  }
}
