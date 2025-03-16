export class ApiResponse {
  public status: number;
  public success: boolean;
  public message: string;
  public data: object;

  constructor(message: string, data: object, status: number) {
    this.status = status;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
