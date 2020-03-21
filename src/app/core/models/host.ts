/** Host model. */
export class Host {
  /** User. */
  public id: number;
  /** Name. */
  public name: string;
  /** Is activated. */
  public isActivated: boolean;
  /** Avatar. */
  public avatar: string;

  public constructor(data: Partial<Host>) {
    this.id = data.id;
    this.name = data.name;
    this.isActivated = data.isActivated;
    this.avatar = data.avatar;
  }
}
