/** Feedback model. */
export class Feedback {
  /** Id */
  public id: number;
  /** Message */
  public message: string;
  /** Email */
  public email: string;

  public constructor(data: Partial<Feedback>) {
    this.id = data.id;
    this.message = data.message;
    this.email = data.email;
  }
}
