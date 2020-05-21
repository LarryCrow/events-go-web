import { SocialMedia } from './social-media';

/** Host model. */
export class Host {
  /** User. */
  public id: number;
  /** Email. */
  public email: string;
  /** Name. */
  public name: string;
  /** Is activated. */
  public isActivated: boolean;
  /** Avatar. */
  public avatar: string;
  /** Social media links */
  public social: SocialMedia;
  /** Information about a host. */
  public about: string;
  /** Working email. */
  public workEmail: string;
  /** Contact phone */
  public phone: string;

  public constructor(data: Partial<Host>) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.isActivated = data.isActivated;
    this.avatar = data.avatar;
    this.social = data.social;
    this.about = data.about;
    this.phone = data.phone;
    this.workEmail = data.workEmail;
  }
}
