import { Client } from './client';
import { Host } from './host';
import { Role } from './role.enum';

/**
 * User model.
 */
export class User {
  /** User ID */
  public id: number;
  /** User role */
  public role: Role;
  /** User information in case it's a host. */
  public details: Host | Client;

  public constructor(data: Partial<User>) {
    this.id = data.id;
    this.role = data.role;
    this.details = data.details;
  }
}
