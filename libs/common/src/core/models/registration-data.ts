/**
 * Model for registration data.
 */
interface RegistrationData {
  /** Email */
  email: string;
  /** Pass */
  pass: string;
}

/**
 * Model for host registration
 */
export interface HostRegistrationData extends RegistrationData {
  /** Name */
  name: string;
  /** Avatar */
  avatar: File;
  /** Information about user */
  about: string;
  /** Working email */
  workEmail?: string;
  /** Phone */
  phone?: string;
  /** Vk url */
  vk?: string;
  /** Instagram url */
  instagram?: string;
  /** Twitter url */
  twitter?: string;
  /** Telegram url */
  telegram?: string;
}

/**
 * Model for client registration
 */
// tslint:disable-next-line: no-empty-interface
export interface ClientRegistrationData extends RegistrationData {
  // There are no extra fields that differ from the base model yet.
}
