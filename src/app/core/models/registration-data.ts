/**
 * Model for registration data.
 */
export interface RegistrationData {
  /** Email */
  email: string;
  /** Pass */
  pass: string;
  /** Name */
  name?: string;
  /** Avatar */
  avatar?: string;
}
