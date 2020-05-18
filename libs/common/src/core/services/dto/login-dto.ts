import { ClientDto } from './client.dto';
import { HostDto } from './host-dto';

/**
 * Login DTO model.
 */
export interface AuthDto {
    /** user id. */
    id: number;
    /** Token */
    token: string;
    /** User role */
    role: number;
    /** User details. */
    details: HostDto | ClientDto;
}
