/** Client model. */
export class Client {
  /** Name */
  public name: string;
  /** Email */
  public email: string;

  public constructor(data: Partial<Client>) {
    this.name = data.name;
    this.email = data.email;
  }
}
