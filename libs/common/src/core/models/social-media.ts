/**
 * Links to social media.
 */
export class SocialMedia {
  /** Instagram link */
  public instagram?: string;
  /** Twitter link */
  public twitter?: string;
  /** Telegram link */
  public telegram?: string;
  /** Vk link */
  public vk?: string;

  public constructor(data: Partial<SocialMedia>) {
    this.instagram = data.instagram;
    this.twitter = data.twitter;
    this.telegram = data.telegram;
    this.vk = data.vk;
  }
}
