import { Role } from '../../models/role.enum';

/**
 * Login DTO model.
 */
export interface AuthDto {
    /** user id. */
    id: number;
    /** Token */
    token: string;
    /** User role */
    role: Role;
    /** Email. */
    email: string;
    /** Name. */
    name: string;
}
