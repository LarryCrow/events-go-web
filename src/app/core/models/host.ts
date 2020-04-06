import { SocialMedia } from './social-media';

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
  /** Social media links */
  public social: SocialMedia;

  public constructor(data: Partial<Host>) {
    this.id = data.id;
    this.name = data.name;
    this.isActivated = data.isActivated;
    this.avatar = data.avatar;
    this.social = data.social;
  }
}
