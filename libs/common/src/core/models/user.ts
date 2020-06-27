import { Role } from './role.enum';

/**
 * User model.
 */
export class User {
  /** User ID */
  public id: number;
  /** User role */
  public role: Role;
  /** Email. */
  public email: string;
  /** Name. */
  public name: string;

  public constructor(data: Partial<User>) {
    this.id = data.id;
    this.role = data.role;
    this.email = data.email;
    this.name = data.name;
  }
}
